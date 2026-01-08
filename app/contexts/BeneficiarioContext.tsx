"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface Reserva {
  id: string;
  doacaoId: string;
  data: string;
  status: "ativa" | "cancelada" | "concluida";
}

interface Beneficiario {
  id: string;
  nome: string;
  email: string;
  endereco: string;
  telefone?: string;
  necessidade?: string;
}

interface BeneficiarioContextType {
  beneficiario: Beneficiario | null;
  reservas: Reserva[];
  adicionarReserva: (reserva: { doacaoId: string }) => void;
  removerReserva: (id: string) => void;
  atualizarStatusReserva: (
    id: string,
    status: Reserva["status"]
  ) => void;
  cadastrarBeneficiario: (dados: Omit<Beneficiario, "id">) => void;
  carregarBeneficiario: (email: string) => void;
}

const BeneficiarioContext =
  createContext<BeneficiarioContextType | undefined>(undefined);

export function BeneficiarioProvider({ children }: { children: ReactNode }) {
  const [beneficiario, setBeneficiario] = useState<Beneficiario | null>(null);
  const [reservas, setReservas] = useState<Reserva[]>([]);

  const carregarBeneficiario = (email: string) => {
    const lista = JSON.parse(localStorage.getItem("beneficiarios") || "[]");
    const encontrado = lista.find(
      (b: Beneficiario) => b.email.toLowerCase() === email.toLowerCase()
    );

    if (encontrado) {
      setBeneficiario(encontrado);
      setReservas(JSON.parse(localStorage.getItem("reservas") || "[]"));
    }
  };

  const adicionarReserva = ({ doacaoId }: { doacaoId: string }) => {
    const nova: Reserva = {
      id: crypto.randomUUID(),
      doacaoId,
      data: new Date().toLocaleDateString("pt-BR"),
      status: "ativa",
    };

    const atualizadas = [...reservas, nova];
    setReservas(atualizadas);
    localStorage.setItem("reservas", JSON.stringify(atualizadas));
  };

  const removerReserva = (id: string) => {
    const atualizadas = reservas.filter((r) => r.id !== id);
    setReservas(atualizadas);
    localStorage.setItem("reservas", JSON.stringify(atualizadas));
  };

  const atualizarStatusReserva = (
    id: string,
    status: Reserva["status"]
  ) => {
    const atualizadas = reservas.map((r) =>
      r.id === id ? { ...r, status } : r
    );
    setReservas(atualizadas);
    localStorage.setItem("reservas", JSON.stringify(atualizadas));
  };

  const cadastrarBeneficiario = (dados: Omit<Beneficiario, "id">) => {
    const lista = JSON.parse(localStorage.getItem("beneficiarios") || "[]");

    const novo: Beneficiario = {
      id: crypto.randomUUID(),
      ...dados,
    };

    lista.push(novo);
    localStorage.setItem("beneficiarios", JSON.stringify(lista));
    setBeneficiario(novo);
  };

  return (
    <BeneficiarioContext.Provider
      value={{
        beneficiario,
        reservas,
        adicionarReserva,
        removerReserva,
        atualizarStatusReserva,
        cadastrarBeneficiario,
        carregarBeneficiario,
      }}
    >
      {children}
    </BeneficiarioContext.Provider>
  );
}

export function useBeneficiario() {
  const ctx = useContext(BeneficiarioContext);
  if (!ctx) throw new Error("useBeneficiario fora do provider");
  return ctx;
}