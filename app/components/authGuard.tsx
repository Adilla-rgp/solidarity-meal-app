"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/autenticacaoContext";

interface Props {
  children: ReactNode;
  tipoPermitido: "doador" | "beneficiario";
}

export function AuthGuard({ children, tipoPermitido }: Props) {
  const { auth, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!auth) {
        router.replace("/login");
      } else if (auth.tipo !== tipoPermitido) {
        // Redirecionar para a página correta baseada no tipo de usuário
        router.replace(auth.tipo === "doador" ? "/doador/dashboard" : "/beneficiario/doacoes");
      }
    }
  }, [auth, loading, tipoPermitido, router]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  if (!auth || auth.tipo !== tipoPermitido) {
    return null;
  }

  return <>{children}</>;
}