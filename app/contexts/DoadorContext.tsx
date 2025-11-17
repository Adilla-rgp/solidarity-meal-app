"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Doador {
  nome: string;
  telefone: string;
  email: string;
  estabelecimento: string;
  localizacao: string;
}

interface Doacao {
  id: string;
  tipo: string;
  nome: string;
  quantidade: string;
  unidade: string;
  validade: string;
  descricao: string;
  data: string;
  status: "ativa" | "reservada" | "entregue";
}

interface DoadorContextType {
  doador: Doador | null;
  doacoes: Doacao[];
  cadastrarDoador: (dados: Doador) => void;
  adicionarDoacao: (doacao: Omit<Doacao, "id" | "data" | "status">) => void;
  atualizarStatusDoacao: (id: string, status: Doacao["status"]) => void;
  removerDoacao: (id: string) => void;
}

const DoadorContext = createContext<DoadorContextType | undefined>(undefined);

export function DoadorProvider({ children }: { children: ReactNode }) {
  const [doador, setDoador] = useState<Doador | null>(null);
  const [doacoes, setDoacoes] = useState<Doacao[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const doadorSave = localStorage.getItem("doador");
      const doacoesSave = localStorage.getItem("doacoes");

      if (doadorSave) {
        setDoador(JSON.parse(doadorSave));
      }

      if (doacoesSave) {
        setDoacoes(JSON.parse(doacoesSave));
      }
    }
  }, []);

  const cadastrarDoador = (dados: Doador) => {
    setDoador(dados);
    if (typeof window !== "undefined") {
      localStorage.setItem("doador", JSON.stringify(dados));
    }
  };

  const adicionarDoacao = (doacao: Omit<Doacao, "id" | "data" | "status">) => {
    const novaDoacao: Doacao = {
      ...doacao,
      id: Date.now().toString(),
      data: new Date().toLocaleDateString("pt-BR"),
      status: "ativa",
    };

    const novasDoacoes = [...doacoes, novaDoacao];
    setDoacoes(novasDoacoes);

    if (typeof window !== "undefined") {
      localStorage.setItem("doacoes", JSON.stringify(novasDoacoes));
    }
  };

  const atualizarStatusDoacao = (id: string, status: Doacao["status"]) => {
    const doacoesAtualizadas = doacoes.map((doacao) =>
      doacao.id === id ? { ...doacao, status } : doacao
    );
    setDoacoes(doacoesAtualizadas);

    if (typeof window !== "undefined") {
      localStorage.setItem("doacoes", JSON.stringify(doacoesAtualizadas));
    }
  };

  const removerDoacao = (id: string) => {
    const doacoesFiltradas = doacoes.filter((doacao) => doacao.id !== id);
    setDoacoes(doacoesFiltradas);

    if (typeof window !== "undefined") {
      localStorage.setItem("doacoes", JSON.stringify(doacoesFiltradas));
    }
  };

  return (
    <DoadorContext.Provider
      value={{
        doador,
        doacoes,
        cadastrarDoador,
        adicionarDoacao,
        atualizarStatusDoacao,
        removerDoacao,
      }}
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