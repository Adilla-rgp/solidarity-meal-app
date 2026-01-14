"use client";

import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";
import { apiClient, Reserva } from "@/app/lib/api/client";
import { useAuth } from "./autenticacaoContext";

interface Beneficiario {
  id: number;
  nome: string;
  email: string;
  endereco: string;
  telefone?: string;
  necessidade?: string;
}

interface BeneficiarioContextType {
  beneficiario: Beneficiario | null;
  reservas: Reserva[];
  loading: boolean;
  adicionarReserva: (doacaoId: string) => Promise<boolean>;
  removerReserva: (reservaId: string) => Promise<void>;
  atualizarStatusReserva: (reservaId: string, status: Reserva["status"]) => Promise<void>;
  carregarReservas: () => Promise<void>;
}

const BeneficiarioContext = createContext<BeneficiarioContextType | undefined>(undefined);

export function BeneficiarioProvider({ children }: { children: ReactNode }) {
  const { auth } = useAuth();
  const [beneficiario, setBeneficiario] = useState<Beneficiario | null>(null);
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(false);

  const carregarReservas = useCallback(async () => {
    if (auth?.tipo !== 'beneficiario') return;
    
    setLoading(true);
    try {
      const response = await apiClient.minhasReservas();
      if (response.success && response.data?.reservas) {
        setReservas(response.data.reservas);
      }
    } catch (error) {
      console.error('Erro ao carregar reservas:', error);
    } finally {
      setLoading(false);
    }
  }, [auth?.tipo]);

  // Carregar dados do beneficiário
  useEffect(() => {
    if (auth?.tipo === 'beneficiario' && auth) {
      setBeneficiario({
        id: auth.id || 0,
        nome: auth.nome || '',
        email: auth.email,
        endereco: auth.endereco || '',
        telefone: auth.telefone,
        necessidade: auth.necessidade
      });
      carregarReservas();
    }
  }, [auth, carregarReservas]);

  const adicionarReserva = async (doacaoId: string): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await apiClient.criarReserva(doacaoId);
      if (response.success && response.data?.reserva) {
        await carregarReservas(); // Recarregar para ter dados atualizados
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro ao adicionar reserva:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const removerReserva = async (reservaId: string) => {
    try {
      const response = await apiClient.cancelarReserva(reservaId);
      if (response.success) {
        await carregarReservas(); // Recarregar lista atualizada
      }
    } catch (error) {
      console.error('Erro ao remover reserva:', error);
    }
  };

  const atualizarStatusReserva = async (reservaId: string, status: Reserva["status"]) => {
    try {
      if (status === 'concluida') {
        await apiClient.concluirReserva(reservaId);
      } else if (status === 'cancelada') {
        await apiClient.cancelarReserva(reservaId);
      }
      await carregarReservas(); // Recarregar lista atualizada
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  return (
    <BeneficiarioContext.Provider
      value={{
        beneficiario,
        reservas,
        loading,
        adicionarReserva,
        removerReserva,
        atualizarStatusReserva,
        carregarReservas
      }}
    >
      {children}
    </BeneficiarioContext.Provider>
  );
}

export function useBeneficiario() {
  const context = useContext(BeneficiarioContext);
  if (context === undefined) {
    throw new Error('useBeneficiario deve ser usado dentro de um BeneficiarioProvider');
  }
  return context;
}