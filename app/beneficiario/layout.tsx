"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";
import { BeneficiarioProvider } from "@/app/contexts/BeneficiarioContext";
import { useAuth } from "@/app/contexts/autenticacaoContext";

export default function BeneficiarioLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const { auth } = useAuth();

  const semSidebar =
    pathname.includes("/beneficiario/cadastro") || !auth?.logado;

  return (
    <BeneficiarioProvider>
      <div className="flex min-h-screen w-full">
        {!semSidebar && <Sidebar />}

        <main className="flex-1 bg-gray-50">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </BeneficiarioProvider>
  );
}