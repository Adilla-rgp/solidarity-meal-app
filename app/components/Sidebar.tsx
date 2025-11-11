"use client";
import { Home, Package, User, LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const linkClasses = (path: string) => {
    const isActive = pathname === path;
    return `flex items-center gap-3 px-6 py-3 rounded-md font-medium transition ${
      isActive
        ? "bg-green-600 text-white"
        : "text-gray-700 hover:bg-green-50 hover:text-green-700"
    }`;
  };

  return (
    <aside className="w-64 h-screen bg-white border-r flex flex-col justify-between">
      <div>
        <div className="p-6 flex items-center gap-2">
          <div className="relative w-10 h-10">
            <Image
              src="/logo.svg"
              alt="Prato Solidário"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <h1 className="font-semibold text-lg text-green-700">
            Prato Solidário
          </h1>
        </div>

        <nav className="mt-4 flex flex-col gap-1">
          <Link href="/doacoes" className={linkClasses("/doacoes")}>
            <Home size={18} /> Encontrar Doações
          </Link>

          <Link href="/reservas" className={linkClasses("/reservas")}>
            <Package size={18} /> Minhas Reservas
          </Link>

          <Link href="/perfil" className={linkClasses("/perfil")}>
            <User size={18} /> Meu Perfil
          </Link>
        </nav>
      </div>

      <Link
        href="/login"
        className="flex items-center gap-2 text-red-500 px-6 py-3 font-medium hover:bg-red-50 transition"
      >
        <LogOut size={18} /> Sair
      </Link>
    </aside>
  );
}
