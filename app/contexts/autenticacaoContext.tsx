"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/app/lib/api/auth.service";

type TipoUsuario = "doador" | "beneficiario";

interface AuthData {
  logado: boolean;
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
          if (user && user.tipo) {
            console.log("Usuário carregado:", user);
            setAuth({
              logado: true,
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
            console.log("Token inválido ou sem tipo, fazendo logout");
            await authService.logout();
            setAuth(null);
          }
        } catch (error) {
          console.error('Erro ao carregar usuário:', error);
          await authService.logout();
          setAuth(null);
        }
      }
      setInitializing(false);
    };

    loadUser();
  }, []);

  async function login(email: string, senha: string): Promise<boolean> {
    if (!email || !senha) {
      console.log("Email ou senha vazios");
      return false;
    }

    setLoading(true);
    
    try {
      console.log("Tentando login...", { email });
      const result = await authService.login({ email, senha });
      
      console.log("Resultado do login:", result);
      
      if (!result.success || !result.user) {
        console.error('Login falhou:', result.error || 'Usuário não encontrado');
        setLoading(false);
        return false;
      }

      // CRÍTICO: Verificar se o tipo existe
      if (!result.user.tipo) {
        console.error('Usuário sem tipo', result.user);
        setLoading(false);
        return false;
      }

      const user = result.user;
      
      console.log("Login bem-sucedido:");
      console.log("   Tipo:", user.tipo);
      console.log("   Email:", user.email);
      console.log("   Nome:", user.nome);
      
      setAuth({
        logado: true,
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
      
      // Redireciona baseado no tipo
      const redirectPath = user.tipo === "doador"
        ? "/doador/dashboard"
        : "/beneficiario/doacoes";
      
      console.log("redirecionando para:", redirectPath);
      
      // Usar setTimeout para garantir que o estado foi atualizado
      setTimeout(() => {
        router.push(redirectPath);
      }, 100);
      
      setLoading(false);
      return true;
    } catch (error) {
      console.error('Erro no login:', error);
      setLoading(false);
      return false;
    }
  }

  async function logout(): Promise<void> {
    console.log("Fazendo logout...");
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