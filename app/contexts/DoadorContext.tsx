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
  adicionarDoacao: (doacao: Omit<Doacao, "id" | "status" | "data" | "doadorEmail">) => void;
  atualizarStatusDoacao: (doacaoId: string, status: "ativa" | "reservada" | "entregue") => void;
  cadastrarDoador: (dados: Omit<Doador, "id">) => void;
  carregarDoador: (email: string) => void;
}

const DoadorContext = createContext<DoadorContextType | undefined>(undefined);

export function DoadorProvider({ children }: { children: ReactNode }) {
  const [doador, setDoador] = useState<Doador | null>(() => {
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

  // 🔹 Funções do contexto
  const carregarDoador = (email: string) => {
    if (typeof window !== "undefined") {
      const doadores = localStorage.getItem("doadores");
      if (doadores) {
        const listaDoadores: Doador[] = JSON.parse(doadores);
        const doadorEncontrado = listaDoadores.find(
          (d) => d.email.toLowerCase() === email.toLowerCase()
        );

        if (doadorEncontrado) {
          setDoador(doadorEncontrado);
          localStorage.setItem("doadorAtual", JSON.stringify(doadorEncontrado));
        }
      }
    }
  };

  const adicionarDoacao = (
    novaDoacao: Omit<Doacao, "id" | "status" | "data" | "doadorEmail">
  ) => {
    const doacao: Doacao = {
      id: crypto.randomUUID(),
      ...novaDoacao,
      status: "ativa",
      data: new Date().toLocaleDateString("pt-BR"),
      doadorEmail: doador?.email || "",
    };

    const novasDoacoes = [...doacoes, doacao];
    setDoacoes(novasDoacoes);
    localStorage.setItem("doacoes", JSON.stringify(novasDoacoes));
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
    const doadoresExistentes = localStorage.getItem("doadores");
    const listaDoadores: Doador[] = doadoresExistentes
      ? JSON.parse(doadoresExistentes)
      : [];

    const indiceExistente = listaDoadores.findIndex(
      (d) => d.email.toLowerCase() === dados.email.toLowerCase()
    );

    const novoDoador: Doador = {
      id:
        indiceExistente >= 0
          ? listaDoadores[indiceExistente].id
          : crypto.randomUUID(),
      ...dados,
    };

    if (indiceExistente >= 0) {
      listaDoadores[indiceExistente] = novoDoador;
    } else {
      listaDoadores.push(novoDoador);
    }

    localStorage.setItem("doadores", JSON.stringify(listaDoadores));

    setDoador(novoDoador);
    localStorage.setItem("doadorAtual", JSON.stringify(novoDoador));
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
  const context = useContext(DoadorContext);
  if (!context) {
    throw new Error("useDoador deve ser usado dentro de DoadorProvider");
  }
  return context;
}