"use client";

import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import ReservaCard from "../../components/ReservaCard";
import { useBeneficiario } from "@/app/contexts/BeneficiarioContext";
import { useState } from "react";

interface Doacao {
  id: string;
  nome: string;
  imagem: string;
  status: "ativa" | "reservada" | "entregue";
}

export default function MinhasReservas() {
  const { reservas, removerReserva, atualizarStatusReserva } = useBeneficiario();

  const [doacoes, setDoacoes] = useState<Doacao[]>(() => {
    if (typeof window !== "undefined") {
      const doacoesSave = localStorage.getItem("doacoes");
      return doacoesSave ? JSON.parse(doacoesSave) : [];
    }
    return [];
  });

  const getDoacao = (doacaoId: string) => {
    return doacoes.find((d) => d.id === doacaoId);
  };

  const concluirReserva = (reservaId: string, doacaoId: string) => {
    // Atualiza status da reserva
    atualizarStatusReserva(reservaId, "concluida");

    // Atualiza status da doação correspondente
    const atualizadas = doacoes.map((d) =>
      d.id === doacaoId ? { ...d, status: "entregue" as const } : d
    );
    setDoacoes(atualizadas);
    localStorage.setItem("doacoes", JSON.stringify(atualizadas));
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <Topbar />
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Minhas Reservas
        </h1>

        {reservas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {reservas.map((item) => {
              const doacao = getDoacao(item.doacaoId);
              return (
                <div key={item.id} className="relative">
                  <ReservaCard
                    imagem={doacao?.imagem || "/placeholder.png"}
                    titulo={doacao?.nome || "Doação não encontrada"}
                    data={item.data}
                    status={
                      item.status === "ativa"
                        ? "pendente"
                        : item.status === "concluida"
                        ? "confirmada"
                        : "cancelada"
                    }
                  />

                  {/* Botões de ação */}
                  {item.status === "ativa" && (
                    <div className="absolute bottom-2 right-2 flex gap-2">
                      <button
                        onClick={() => concluirReserva(item.id, item.doacaoId)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                      >
                        Concluir
                      </button>
                      <button
                        onClick={() => removerReserva(item.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                      >
                        Cancelar
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500">Você ainda não possui reservas.</p>
        )}
      </main>
    </div>
  );
}
