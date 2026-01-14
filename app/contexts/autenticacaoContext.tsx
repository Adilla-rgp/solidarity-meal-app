"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/app/lib/api/auth.service";

type TipoUsuario = "doador" | "beneficiario";

interface AuthData {
  email: string;
  tipo: TipoUsuario;
  nome?: string;
  id?: number;
  estabelecimento?: string;
  endereco?: string;
  telefone?: string;
  localizacao?: string;
  necessidade?: string;
}

interface AuthContextType {
  auth: AuthData | null;
  login: (email: string, senha: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loading: boolean;
  checkAuth: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [auth, setAuth] = useState<AuthData | null>(null);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  // Carregar usuário ao inicializar
  useEffect(() => {
    const loadUser = async () => {
      if (authService.isAuthenticated()) {
        try {
          const user = await authService.me();
          if (user) {
            setAuth({
              email: user.email,
              tipo: user.tipo,
              nome: user.nome,
              id: user.id,
              estabelecimento: user.estabelecimento,
              endereco: user.endereco,
              telefone: user.telefone,
              localizacao: user.localizacao,
              necessidade: user.necessidade
            });
          } else {
            // Token inválido, fazer logout
            await authService.logout();
          }
        } catch (error) {
          console.error('Erro ao carregar usuário:', error);
        }
      }
      setInitializing(false);
    };

    loadUser();
  }, []);

  async function login(email: string, senha: string): Promise<boolean> {
    if (!email || !senha) return false;

    setLoading(true);
    
    try {
      const result = await authService.login({ email, senha });
      
      if (!result.success || !result.user || !result.user.tipo) {
        console.error('Login falhou:', result.error || 'Usuário ou tipo não encontrado');
        return false;
      }

      // Agora temos certeza que result.user.tipo existe
      const user = result.user;
      
      setAuth({
        email: user.email,
        tipo: user.tipo,
        nome: user.nome,
        id: user.id,
        estabelecimento: user.estabelecimento,
        endereco: user.endereco,
        telefone: user.telefone,
        localizacao: user.localizacao,
        necessidade: user.necessidade
      });
      
      // Redireciona baseado no tipo retornado pelo backend
      if (typeof window !== 'undefined') {
        setTimeout(() => {
          router.push(
            user.tipo === "doador"
              ? "/doador/dashboard"
              : "/beneficiario/doacoes"
          );
        }, 100);
      }
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function logout(): Promise<void> {
    await authService.logout();
    setAuth(null);
    router.push("/login");
  }

  function checkAuth(): boolean {
    const isAuthenticated = authService.isAuthenticated();
    if (!isAuthenticated && auth) {
      setAuth(null);
    }
    return isAuthenticated;
  }

  if (initializing) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  return (
    <AuthContext.Provider value={{ auth, login, logout, loading, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}