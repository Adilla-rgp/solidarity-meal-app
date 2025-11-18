"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface Usuario {
    id: string;
    email: string;
    senha: string;
    tipo: "doador" | "beneficiario";
}

interface AuthContextType {
    usuarioLogado: Usuario | null;
    login: (email: string, senha: string, tipo: "doador" | "beneficiario") => boolean;
    logout: () => void;
    registrar: (email: string, senha: string, tipo: "doador" | "beneficiario") => boolean;
    usuarioExiste: (email: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [usuarioLogado, setUsuarioLogado] = useState<Usuario | null>(() => {
        if (typeof window !== "undefined") {
            const userSave = localStorage.getItem("usuarioLogado");
            return userSave ? JSON.parse(userSave) : null;
        }
        return null;
    });

    const getUsuarios = (): Usuario[] => {
        if (typeof window !== "undefined") {
            const usuarios = localStorage.getItem("usuarios");
            return usuarios ? JSON.parse(usuarios) : [];
        }
        return [];
    };

    const salvarUsuarios = (usuarios: Usuario[]) => {
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    };


    const usuarioExiste = (email: string): boolean => {
        const usuarios = getUsuarios();
        return usuarios.some(u => u.email.toLowerCase() === email.toLowerCase());
    };

    const registrar = (email: string, senha: string, tipo: "doador" | "beneficiario"): boolean => {
        if (usuarioExiste(email)) {
            return false;
        }

        const usuarios = getUsuarios();
        const novoUsuario: Usuario = {
            id: crypto.randomUUID(),
            email: email.toLowerCase(),
            senha,
            tipo,
        };

        usuarios.push(novoUsuario);
        salvarUsuarios(usuarios);
        return true;
    };

    const login = (email: string, senha: string, tipo: "doador" | "beneficiario"): boolean => {
        const usuarios = getUsuarios();
        const usuario = usuarios.find(
            u => u.email.toLowerCase() === email.toLowerCase() &&
                u.senha === senha &&
                u.tipo === tipo
        );

        if (usuario) {
            setUsuarioLogado(usuario);
            localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
            localStorage.setItem("tipoUsuario", tipo);
            return true;
        }
        return false;
    };

    const logout = () => {
        setUsuarioLogado(null);
        localStorage.removeItem("usuarioLogado");
        localStorage.removeItem("tipoUsuario");
    };

    return (
        <AuthContext.Provider
            value={{
                usuarioLogado,
                login,
                logout,
                registrar,
                usuarioExiste,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de AuthProvider");
    }
    return context;
}