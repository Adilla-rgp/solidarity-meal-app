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
}

interface BeneficiarioContextType {
  beneficiario: Beneficiario | null;
  reservas: Reserva[];
  adicionarReserva: (reserva: { doacaoId: string }) => void;
  removerReserva: (reservaId: string) => void;
  atualizarStatusReserva: (
    reservaId: string,
    status: "ativa" | "cancelada" | "concluida"
  ) => void;
  cadastrarBeneficiario: (dados: Omit<Beneficiario, "id">) => void;
}

const BeneficiarioContext = createContext<BeneficiarioContextType | undefined>(
  undefined
);

export function BeneficiarioProvider({ children }: { children: ReactNode }) {
  const [beneficiario, setBeneficiario] = useState<Beneficiario | null>(() => {
    if (typeof window !== "undefined") {
      const beneficiarioSave = localStorage.getItem("beneficiario");
      return beneficiarioSave ? JSON.parse(beneficiarioSave) : null;
    }
    return null;
  });

  const [reservas, setReservas] = useState<Reserva[]>(() => {
    if (typeof window !== "undefined") {
      const reservasSave = localStorage.getItem("reservas");
      return reservasSave ? JSON.parse(reservasSave) : [];
    }
    return [];
  });

  const adicionarReserva = ({ doacaoId }: { doacaoId: string }) => {
    const novaReserva: Reserva = {
      id: crypto.randomUUID(),
      doacaoId,
      data: new Date().toLocaleDateString("pt-BR"),
      status: "ativa",
    };
    const atualizadas = [...reservas, novaReserva];
    setReservas(atualizadas);
    localStorage.setItem("reservas", JSON.stringify(atualizadas));

    // Atualização do status da doação para "reservada"
    const doacoes: Doacao[] = JSON.parse(localStorage.getItem("doacoes") || "[]");
    const doacoesAtualizadas = doacoes.map((d) =>
      d.id === doacaoId ? { ...d, status: "reservada" as const } : d
    );
    localStorage.setItem("doacoes", JSON.stringify(doacoesAtualizadas));
  };

  const removerReserva = (reservaId: string) => {
    const atualizadas = reservas.filter((r) => r.id !== reservaId);
    setReservas(atualizadas);
    localStorage.setItem("reservas", JSON.stringify(atualizadas));
  };

  const atualizarStatusReserva = (
    reservaId: string,
    status: "ativa" | "cancelada" | "concluida"
  ) => {
    const atualizadas = reservas.map((r) =>
      r.id === reservaId ? { ...r, status } : r
    );
    setReservas(atualizadas);
    localStorage.setItem("reservas", JSON.stringify(atualizadas));

    // atualização da doação para entregue
    if (status === "concluida") {
      const reserva = reservas.find((r) => r.id === reservaId);
      if (reserva) {
        const doacoes: Doacao[] = JSON.parse(localStorage.getItem("doacoes") || "[]");
        const doacoesAtualizadas = doacoes.map((d) =>
          d.id === reserva.doacaoId ? { ...d, status: "entregue" as const } : d
        );
        localStorage.setItem("doacoes", JSON.stringify(doacoesAtualizadas));
      }
    }
  };

  const cadastrarBeneficiario = (dados: Omit<Beneficiario, "id">) => {
    const novoBeneficiario: Beneficiario = {
      id: crypto.randomUUID(),
      ...dados,
    };
    setBeneficiario(novoBeneficiario);
    localStorage.setItem("beneficiario", JSON.stringify(novoBeneficiario));
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
      }}
    >
      {children}
    </BeneficiarioContext.Provider>
  );
}

export function useBeneficiario() {
  const context = useContext(BeneficiarioContext);
  if (!context) {
    throw new Error("useBeneficiario deve ser usado dentro de BeneficiarioProvider");
  }
  return context;
}

// Tipagem para doações
interface Doacao {
  id: string;
  nome: string;
  tipo: string;
  quantidade: string;
  unidade: string;
  validade: string;
  data: string;
  status: "ativa" | "reservada" | "entregue";
}