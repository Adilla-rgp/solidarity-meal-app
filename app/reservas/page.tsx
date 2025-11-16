"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import ReservaCard from "../components/ReservaCard";

// Tipagem para as reservas
interface Reserva {
  imagem: string;
  titulo: string;
  data: string;
  status: "confirmada" | "pendente" | "cancelada";
}

export default function MinhasReservas() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Buscar os dados com tratamento de erro
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/mocks");
        if (!res.ok) throw new Error("Erro ao carregar reservas");
        const data = await res.json();
        setReservas(data.reservas);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Erro desconhecido ao carregar dados");
        }
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <Topbar />
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Minhas Reservas
        </h1>

        {error ? (
          <p className="text-red-600">{error}</p>
        ) : reservas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {reservas.map((item, index) => (
              <ReservaCard key={index} {...item} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Você ainda não possui reservas.</p>
        )}
      </main>
    </div>
  );
}
