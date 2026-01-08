"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/autenticacaoContext";

interface Props {
  children: ReactNode;
  tipoPermitido: "doador" | "beneficiario";
}

export function AuthGuard({ children, tipoPermitido }: Props) {
  const { auth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth || auth.tipo !== tipoPermitido) {
      router.replace("/login");
    }
  }, [auth, tipoPermitido, router]);

  if (!auth || auth.tipo !== tipoPermitido) return null;

  return <>{children}</>;
}