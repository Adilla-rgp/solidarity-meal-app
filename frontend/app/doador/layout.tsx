"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";
import { AuthGuard } from "../components/authGuard";
import { DoadorProvider } from "../contexts/DoadorContext";

export default function DoadorLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  const semSidebar = pathname.includes("/doador/cadastro");

  return (
    <AuthGuard tipoPermitido="doador">
      <DoadorProvider>
        <div className="flex min-h-screen w-full">
          {!semSidebar && <Sidebar />}

          <main className="flex-1 bg-gray-50">
            <div className="p-6">
              {children}
            </div>
          </main>
        </div>
      </DoadorProvider>
    </AuthGuard>
  );
}