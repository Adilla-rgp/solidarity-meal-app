"use client";

import { createContext, useContext, useState } from "react";

type TipoUsuario = "doador" | "beneficiario";

interface AuthData {
  email: string;
  tipo: TipoUsuario;
  logado: boolean;
}

interface AuthContextType {
  auth: AuthData | null;
  login: (email: string, senha: string, tipo: TipoUsuario) => boolean;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthData | null>(() => {
    if (typeof window === "undefined") return null;

    const authSalvo = localStorage.getItem("auth");
    return authSalvo ? JSON.parse(authSalvo) : null;
  });

  const [loading, setLoading] = useState(false);

  function login(email: string, senha: string, tipo: TipoUsuario) {
    if (!email || !senha) return false;

    const authData: AuthData = {
      email,
      tipo,
      logado: true,
    };

    localStorage.setItem("auth", JSON.stringify(authData));
    setAuth(authData);
    return true;
  }

  function logout() {
    localStorage.removeItem("auth");
    setAuth(null);
  }

  return (
    <AuthContext.Provider value={{ auth, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
