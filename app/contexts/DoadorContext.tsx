"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface Doacao {
  id: string;
  nome: string;
  tipo: string;
  quantidade: string;
  unidade: string;
  validade: string;
  descricao: string;
  imagem?: string;
  data: string;
  status: "ativa" | "reservada" | "entregue";
}

interface Doador {
  id: string;
  estabelecimento: string;
  email: string;
  nome?: string;
  telefone?: string;
  localizacao?: string;
}

interface DoadorContextType {
  doador: Doador | null;
  doacoes: Doacao[];
  adicionarDoacao: (doacao: Omit<Doacao, "id" | "status" | "data">) => void;
  atualizarStatusDoacao: (
    doacaoId: string,
    status: "ativa" | "reservada" | "entregue"
  ) => void;
  cadastrarDoador: (dados: Omit<Doador, "id">) => void;
}

const DoadorContext = createContext<DoadorContextType | undefined>(undefined);

export function DoadorProvider({ children }: { children: ReactNode }) {

  const [doador] = useState<Doador | null>(() => {
    if (typeof window !== "undefined") {
      const doadorSave = localStorage.getItem("doador");
      return doadorSave ? JSON.parse(doadorSave) : null;
    }
    return null;
  });

  const [doacoes, setDoacoes] = useState<Doacao[]>(() => {
    if (typeof window !== "undefined") {
      const doacoesSave = localStorage.getItem("doacoes");
      return doacoesSave ? JSON.parse(doacoesSave) : [];
    }
    return [];
  });

  const adicionarDoacao = (novaDoacao: Omit<Doacao, "id" | "status" | "data">) => {
    const doacao: Doacao = {
      id: crypto.randomUUID(),
      ...novaDoacao,
      status: "ativa",
      data: new Date().toLocaleDateString("pt-BR"),
    };
    const atualizadas = [...doacoes, doacao];
    setDoacoes(atualizadas);
    localStorage.setItem("doacoes", JSON.stringify(atualizadas));
  };

  const atualizarStatusDoacao = (
    doacaoId: string,
    status: "ativa" | "reservada" | "entregue"
  ) => {
    const atualizadas = doacoes.map((d) =>
      d.id === doacaoId ? { ...d, status } : d
    );
    setDoacoes(atualizadas);
    localStorage.setItem("doacoes", JSON.stringify(atualizadas));
  };

  const cadastrarDoador = (dados: Omit<Doador, "id">) => {
    const novoDoador: Doador = {
      id: crypto.randomUUID(),
      ...dados,
    };
    localStorage.setItem("doador", JSON.stringify(novoDoador));
  };

  return (
    <DoadorContext.Provider
      value={{ doador, doacoes, adicionarDoacao, atualizarStatusDoacao, cadastrarDoador }}
    >
      {children}
    </DoadorContext.Provider>
  );
}

export function useDoador() {
  const context = useContext(DoadorContext);
  if (!context) {
    throw new Error("useDoador deve ser usado dentro de DoadorProvider");
  }
  return context;
}