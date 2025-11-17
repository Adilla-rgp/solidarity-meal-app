"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";


//definição dos tipos
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

//criando o provider
export function DoadorProvider({ children }: { children: ReactNode }) {
    const [doador, setDoador] = useState<Doador | null>(null);
    const [doacoes, setDoacoes] = useState<Doacao[]>([]);

    useEffect(() => {
        //carrega dados do localstorage
        const doadorSave = localStorage.getItem("doador");
        const doacoesSave = localStorage.getItem("doacoes");

        if (doadorSave) {
            setDoador(JSON.parse(doadorSave));
        }

        if (doacoesSave) {
            setDoacoes(JSON.parse(doacoesSave));
        }
    }, []);

    //cadastro do doador (recebendo dados do formulario)
    const cadastrarDoador = (dados: Doador) => {
        setDoador(dados);
        localStorage.setItem("doador", JSON.stringify(dados));
    };

    //adicionando a nova doação e atribuindo dados omitidos
    const adicionarDoacao = (doacao: Omit<Doacao, "id" | "data" | "status">) => {
        const novaDoacao: Doacao = {
            ...doacao,
            id: Date.now().toString(),
            data: new Date().toLocaleDateString("pt-BR"),
            status: "ativa",
        };

        const novasDoacoes = [...doacoes, novaDoacao];
        setDoacoes(novasDoacoes);
        localStorage.setItem("doacoes", JSON.stringify(novasDoacoes));
    };

    //atualiza o status da doação salvando na lista
    const atualizarStatusDoacao = (id: string, status: Doacao["status"]) => {
        const doacoesAtualizadas = doacoes.map((doacao) =>
            doacao.id === id ? { ...doacao, status } : doacao
        );
        setDoacoes(doacoesAtualizadas);
        localStorage.setItem("doacoes", JSON.stringify(doacoesAtualizadas));
    };


    const removerDoacao = (id: string) => {
        const doacoesFiltradas = doacoes.filter((doacao) => doacao.id !== id);
        setDoacoes(doacoesFiltradas);
        localStorage.setItem("doacoes", JSON.stringify(doacoesFiltradas));
        //tira a doação desejada (pelo id)
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
    )
}

//hook para acesso direto
export function useDoador() {
    const context = useContext(DoadorContext);
    if (!context) {
        throw new Error("useDoador deve ser usado dentro de DoadorProvider");
    }
    return context;
}