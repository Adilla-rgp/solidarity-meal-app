"use client";
import { Home, Package, User, LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Sidebar() {
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
          <h1 className="font-semibold text-lg text-green-700">Prato Solidário</h1>
        </div>

        <nav className="mt-4 flex flex-col gap-1">
          <Link
            href="/doacoes"
            className="flex items-center gap-3 px-6 py-3 text-green-700 bg-green-50 rounded-md font-medium"
          >
            <Home size={18} /> Encontrar Doações
          </Link>

          <Link
            href="#"
            className="flex items-center gap-3 px-6 py-3 hover:bg-gray-100 text-gray-700 rounded-md font-medium"
          >
            <Package size={18} /> Minhas Reservas
          </Link>

          <Link
            href="#"
            className="flex items-center gap-3 px-6 py-3 hover:bg-gray-100 text-gray-700 rounded-md font-medium"
          >
            <User size={18} /> Meu Perfil
          </Link>
        </nav>
      </div>

      <button className="flex items-center gap-2 text-red-500 px-6 py-3 font-medium hover:bg-red-50">
        <LogOut size={18} /> Sair
      </button>
    </aside>
  );
}
