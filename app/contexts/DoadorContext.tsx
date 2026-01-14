"use client";

import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";
import { apiClient, Doacao } from "@/app/lib/api/client";
import { useAuth } from "./autenticacaoContext";

interface Doador {
  id: number;
  estabelecimento: string;
  email: string;
  nome?: string;
  telefone?: string;
  localizacao?: string;
}

interface DoadorContextType {
  doador: Doador | null;
  doacoes: Doacao[];
  loading: boolean;
  adicionarDoacao: (doacaoData: Omit<Doacao, "id" | "doador" | "doador_estabelecimento" | "created_at">) => Promise<boolean>;
  atualizarStatusDoacao: (doacaoId: string, status: Doacao["status"]) => Promise<void>;
  carregarDoacoes: () => Promise<void>;
}

const DoadorContext = createContext<DoadorContextType | undefined>(undefined);

export function DoadorProvider({ children }: { children: ReactNode }) {
  const { auth } = useAuth();
  const [doador, setDoador] = useState<Doador | null>(null);
  const [doacoes, setDoacoes] = useState<Doacao[]>([]);
  const [loading, setLoading] = useState(false);

  const carregarDoacoes = useCallback(async () => {
    if (auth?.tipo !== 'doador') return;
    
    setLoading(true);
    try {
      const response = await apiClient.minhasDoacoes();
      if (response.success && response.data?.doacoes) {
        setDoacoes(response.data.doacoes);
      }
    } catch (error) {
      console.error('Erro ao carregar doações:', error);
    } finally {
      setLoading(false);
    }
  }, [auth?.tipo]);

  // Carregar dados do doador
  useEffect(() => {
    if (auth?.tipo === 'doador' && auth) {
      setDoador({
        id: auth.id || 0,
        estabelecimento: auth.estabelecimento || '',
        email: auth.email,
        nome: auth.nome,
        telefone: auth.telefone,
        localizacao: auth.localizacao
      });
      carregarDoacoes();
    }
  }, [auth, carregarDoacoes]);

  const adicionarDoacao = async (doacaoData: Omit<Doacao, "id" | "doador" | "doador_estabelecimento" | "created_at">): Promise<boolean> => {
    setLoading(true);
    try {
      // Garantir que o status seja "ativa" por padrão
      const doacaoComStatus: Omit<Doacao, "id" | "doador" | "doador_estabelecimento" | "created_at"> = {
        ...doacaoData,
        status: "ativa"
      };
      
      const response = await apiClient.criarDoacao(doacaoComStatus);
      if (response.success && response.data?.doacao) {
        setDoacoes(prev => [...prev, response.data!.doacao]);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro ao adicionar doação:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const atualizarStatusDoacao = async (doacaoId: string, status: Doacao["status"]) => {
    try {
      const response = await apiClient.put(`/doacoes/${doacaoId}`, { status });
      if (response.success) {
        setDoacoes(prev => 
          prev.map(d => d.id === doacaoId ? { ...d, status } : d)
        );
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  return (
    <DoadorContext.Provider
      value={{
        doador,
        doacoes,
        loading,
        adicionarDoacao,
        atualizarStatusDoacao,
        carregarDoacoes
      }}
    >
      {children}
    </DoadorContext.Provider>
  );
}

export function useDoador() {
  const context = useContext(DoadorContext);
  if (context === undefined) {
    throw new Error('useDoador deve ser usado dentro de um DoadorProvider');
  }
  return context;
}