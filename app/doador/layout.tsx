"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";
import { DoadorProvider } from "@/app/contexts/DoadorContext";
import { useAuth } from "@/app/contexts/autenticacaoContext";

export default function DoadorLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const { auth } = useAuth();

  // Sidebar não aparece na página de cadastro ou quando não há autenticação
  const semSidebar = pathname.includes("/doador/cadastro") || !auth;

  return (
    <DoadorProvider>
      <div className="flex min-h-screen w-full">
        {!semSidebar && <Sidebar />}
        <main className="flex-1 bg-gray-50">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </DoadorProvider>
  );
}
