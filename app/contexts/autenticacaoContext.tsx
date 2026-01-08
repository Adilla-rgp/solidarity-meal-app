"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../lib/api/auth.service";

type TipoUsuario = "doador" | "beneficiario";

interface AuthData {
  email: string;
  tipo: TipoUsuario;
  logado: boolean;
  username?: string;
  user_id?: number;
}

interface AuthContextType {
  auth: AuthData | null;
  login: (email: string, senha: string, tipo: TipoUsuario) => Promise<boolean>;
  logout: () => Promise<void>;
  loading: boolean;
  checkAuth: () => boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthData | null>(() => {
    if (typeof window === "undefined") return null;

    // Verificar se já tem token válido
    if (authService.isAuthenticated()) {
      const user = authService.getUser();
      return {
        email: user?.email as string || "",
        tipo: (user?.tipo as TipoUsuario) || "doador",
        logado: true,
        username: user?.username as string,
        user_id: user?.id as number,
      };
    }

    return null;
  });

  const [loading, setLoading] = useState(false);

  async function login(email: string, senha: string, tipo: TipoUsuario): Promise<boolean> {
    if (!email || !senha) return false;

    setLoading(true);
    
    try {
      // Agora o backend aceita email OU username
      const result = await authService.login({
        username: email, // Pode ser email ou username
        password: senha
      });

      if (!result.success) {
        console.error("Login falhou:", result.error);
        return false;
      }

      const user = authService.getUser();
      
      const authData: AuthData = {
        email: user?.email as string || email,
        tipo: (user?.tipo as TipoUsuario) || tipo,
        logado: true,
        username: user?.username as string,
        user_id: user?.id as number,
      };

      localStorage.setItem("auth", JSON.stringify(authData));
      setAuth(authData);
      return true;

    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function logout(): Promise<void> {
    await authService.logout();
    localStorage.removeItem("auth");
    setAuth(null);
  }

  function checkAuth(): boolean {
    const isAuthenticated = authService.isAuthenticated();
    
    if (!isAuthenticated && auth) {
      setAuth(null);
      localStorage.removeItem("auth");
    }
    
    return isAuthenticated;
  }

  // Verificar autenticação ao carregar
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, logout, loading, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}