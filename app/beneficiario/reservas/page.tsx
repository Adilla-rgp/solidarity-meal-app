"use client";

import Topbar from "../../components/Topbar";
import ReservaCard from "../../components/ReservaCard";
import { useBeneficiario } from "@/app/contexts/BeneficiarioContext";

export default function MinhasReservas() {
  const { reservas, removerReserva, atualizarStatusReserva } = useBeneficiario();

  const concluirReserva = (reservaId: string) => {
    atualizarStatusReserva(reservaId, "concluida");
    alert("Reserva concluída com sucesso!");
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <main className="flex-1 p-8">
        <Topbar />
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Minhas Reservas
        </h1>

        {reservas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {reservas.map((item) => (
              <div key={item.id} className="relative bg-white rounded-xl shadow-sm p-4">
                <ReservaCard
                  imagem={item.doacao?.imagem || "/placeholder.png"}
                  titulo={item.doacao?.nome || "Doação não encontrada"}
                  data={item.data_reserva ? new Date(item.data_reserva).toLocaleDateString('pt-BR') : '-'}
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
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => concluirReserva(item.id.toString())}
                      className="flex-1 bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 transition"
                    >
                      Concluir
                    </button>
                    <button
                      onClick={() => removerReserva(item.id.toString())}
                      className="flex-1 bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 transition"
                    >
                      Cancelar
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Você ainda não possui reservas.</p>
        )}
      </main>
    </div>
  );
}