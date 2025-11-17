"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface Beneficiario {
    nome: string;
    telefone: string;
    email: string;
    endereco: string;
    necessidade: string;
}

interface Reserva {
    id: string;
    doacaoId: string;
    data: string;
    status: "ativa" | "cancelada" | "concluida";
}

interface BeneficiarioContextType {
    beneficiario: Beneficiario | null;
    reservas: Reserva[];
    cadastrarBeneficiario: (dados: Beneficiario) => void;
    adicionarReserva: (reserva: Omit<Reserva, "id" | "data" | "status">) => void;
    atualizarStatusReserva: (id: string, status: Reserva["status"]) => void;
    removerReserva: (id: string) => void;
}

const BeneficiarioContext = createContext<BeneficiarioContextType | undefined>(undefined);

export function BeneficiarioProvider({ children }: { children: ReactNode }) {
    // inicializa direto do localStorage
    const [beneficiario, setBeneficiario] = useState<Beneficiario | null>(() => {
        const beneficiarioSave = localStorage.getItem("beneficiario");
        return beneficiarioSave ? JSON.parse(beneficiarioSave) : null;
    });

    const [reservas, setReservas] = useState<Reserva[]>(() => {
        const reservasSave = localStorage.getItem("reservas");
        return reservasSave ? JSON.parse(reservasSave) : [];
    });

    const cadastrarBeneficiario = (dados: Beneficiario) => {
        setBeneficiario(dados);
        localStorage.setItem("beneficiario", JSON.stringify(dados));
    };

    const adicionarReserva = (reserva: Omit<Reserva, "id" | "data" | "status">) => {
        const novaReserva: Reserva = {
            ...reserva,
            id: Date.now().toString(),
            data: new Date().toLocaleDateString("pt-BR"),
            status: "ativa",
        };

        const novasReservas = [...reservas, novaReserva];
        setReservas(novasReservas);
        localStorage.setItem("reservas", JSON.stringify(novasReservas));
    };

    const atualizarStatusReserva = (id: string, status: Reserva["status"]) => {
        const reservasAtualizadas = reservas.map((reserva) =>
            reserva.id === id ? { ...reserva, status } : reserva
        );
        setReservas(reservasAtualizadas);
        localStorage.setItem("reservas", JSON.stringify(reservasAtualizadas));
    };

    const removerReserva = (id: string) => {
        const reservasFiltradas = reservas.filter((reserva) => reserva.id !== id);
        setReservas(reservasFiltradas);
        localStorage.setItem("reservas", JSON.stringify(reservasFiltradas));
    };

    return (
        <BeneficiarioContext.Provider
            value={{
                beneficiario,
                reservas,
                cadastrarBeneficiario,
                adicionarReserva,
                atualizarStatusReserva,
                removerReserva,
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