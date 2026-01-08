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
  doadorEmail: string;
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
  adicionarDoacao: (
    doacao: Omit<Doacao, "id" | "status" | "data" | "doadorEmail">
  ) => void;
  atualizarStatusDoacao: (
    doacaoId: string,
    status: "ativa" | "reservada" | "entregue"
  ) => void;
  cadastrarDoador: (dados: Omit<Doador, "id">) => void;
  carregarDoador: (email: string) => void;
}

const DoadorContext = createContext<DoadorContextType | undefined>(undefined);

export function DoadorProvider({ children }: { children: ReactNode }) {
  const [doador, setDoador] = useState<Doador | null>(null);
  const [doacoes, setDoacoes] = useState<Doacao[]>([]);

  const carregarDoador = (email: string) => {
    const doadores = JSON.parse(localStorage.getItem("doadores") || "[]");
    const encontrado = doadores.find(
      (d: Doador) => d.email.toLowerCase() === email.toLowerCase()
    );

    if (encontrado) {
      setDoador(encontrado);
      setDoacoes(
        JSON.parse(localStorage.getItem("doacoes") || "[]").filter(
          (d: Doacao) => d.doadorEmail === email
        )
      );
    }
  };

  const adicionarDoacao = (
    novaDoacao: Omit<Doacao, "id" | "status" | "data" | "doadorEmail">
  ) => {
    if (!doador) return;

    const doacao: Doacao = {
      id: crypto.randomUUID(),
      ...novaDoacao,
      status: "ativa",
      data: new Date().toLocaleDateString("pt-BR"),
      doadorEmail: doador.email,
    };

    const atualizadas = [...doacoes, doacao];
    setDoacoes(atualizadas);
    localStorage.setItem("doacoes", JSON.stringify(atualizadas));
  };

  const atualizarStatusDoacao = (id: string, status: Doacao["status"]) => {
    const atualizadas = doacoes.map((d) =>
      d.id === id ? { ...d, status } : d
    );
    setDoacoes(atualizadas);
    localStorage.setItem("doacoes", JSON.stringify(atualizadas));
  };

  const cadastrarDoador = (dados: Omit<Doador, "id">) => {
    const lista = JSON.parse(localStorage.getItem("doadores") || "[]");

    const novo: Doador = {
      id: crypto.randomUUID(),
      ...dados,
    };

    lista.push(novo);
    localStorage.setItem("doadores", JSON.stringify(lista));
    setDoador(novo);
  };

  return (
    <DoadorContext.Provider
      value={{
        doador,
        doacoes,
        adicionarDoacao,
        atualizarStatusDoacao,
        cadastrarDoador,
        carregarDoador,
      }}
    >
      {children}
    </DoadorContext.Provider>
  );
}

export function useDoador() {
  const ctx = useContext(DoadorContext);
  if (!ctx) throw new Error("useDoador fora do provider");
  return ctx;
}