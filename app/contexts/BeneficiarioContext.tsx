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
  removerReserva: (reservaId: string) => void;
  atualizarStatusReserva: (
    reservaId: string,
    status: "ativa" | "cancelada" | "concluida"
  ) => void;
  cadastrarBeneficiario: (dados: Omit<Beneficiario, "id">) => void;
  carregarBeneficiario: (email: string) => void;
}

const BeneficiarioContext = createContext<BeneficiarioContextType | undefined>(
  undefined
);

export function BeneficiarioProvider({ children }: { children: ReactNode }) {
  const [beneficiario, setBeneficiario] = useState<Beneficiario | null>(() => {
    if (typeof window !== "undefined") {
      const beneficiarioSave = localStorage.getItem("beneficiarioAtual");
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

  const carregarBeneficiario = (email: string) => {
    if (typeof window !== "undefined") {
      const beneficiarios = localStorage.getItem("beneficiarios");
      if (beneficiarios) {
        const listaBeneficiarios: Beneficiario[] = JSON.parse(beneficiarios);
        const beneficiarioEncontrado = listaBeneficiarios.find(
          b => b.email.toLowerCase() === email.toLowerCase()
        );

        if (beneficiarioEncontrado) {
          setBeneficiario(beneficiarioEncontrado);
          localStorage.setItem("beneficiarioAtual", JSON.stringify(beneficiarioEncontrado));
        }
      }
    }
  };

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
    const doacoesAtualizadas = doacoes.map((d: any) =>
      d.id === doacaoId ? { ...d, status: "reservada" } : d
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

    const beneficiariosExistentes = localStorage.getItem("beneficiarios");
    const listaBeneficiarios: Beneficiario[] = beneficiariosExistentes
      ? JSON.parse(beneficiariosExistentes)
      : [];


    const indiceExistente = listaBeneficiarios.findIndex(
      b => b.email.toLowerCase() === dados.email.toLowerCase()
    );

    const novoBeneficiario: Beneficiario = {
      id: indiceExistente >= 0 ? listaBeneficiarios[indiceExistente].id : crypto.randomUUID(),
      ...dados,
    };

    if (indiceExistente >= 0) {
      listaBeneficiarios[indiceExistente] = novoBeneficiario;
    } else {
      listaBeneficiarios.push(novoBeneficiario);
    }

    localStorage.setItem("beneficiarios", JSON.stringify(listaBeneficiarios));


    setBeneficiario(novoBeneficiario);
    localStorage.setItem("beneficiarioAtual", JSON.stringify(novoBeneficiario));
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