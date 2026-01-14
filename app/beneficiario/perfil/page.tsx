"use client";

import Image from "next/image";
import { useBeneficiario } from "@/app/contexts/BeneficiarioContext";

export default function PerfilBeneficiarioPage() {
  const { beneficiario, reservas } = useBeneficiario();

  if (!beneficiario) {
    return (
      <div className="flex bg-gray-50 min-h-screen">
        <main className="flex-1 p-8">
          <p className="text-gray-500">Carregando perfil...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <main className="flex-1 p-8">
        {/* Cabeçalho do Perfil */}
        <section className="bg-white rounded-xl p-6 shadow-sm mt-6">
          <div className="flex items-center gap-6">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-green-600">
              <Image
                src="/perfil-depoimento1.svg"
                alt="Foto de perfil"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{beneficiario.nome}</h2>
              <p className="text-gray-600">{beneficiario.email}</p>
              <p className="text-gray-500 text-sm mt-1">{beneficiario.endereco}</p>
              <span className="mt-2 inline-block bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full font-medium">
                Beneficiário
              </span>
            </div>
          </div>
        </section>

        {/* Seção de Benefícios Recebidos */}
        <section className="bg-white rounded-xl p-6 shadow-sm mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Benefícios Recebidos
          </h3>
          {reservas.length > 0 ? (
            <table className="w-full text-sm text-left border-t border-gray-100">
              <thead>
                <tr className="text-black bg-gray-50">
                  <th className="py-2 px-3 font-medium">Doação</th>
                  <th className="py-2 px-3 font-medium">Data</th>
                  <th className="py-2 px-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {reservas.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-100 text-black hover:bg-gray-50 transition"
                  >
                    <td className="py-2 px-3">{item.doacao?.nome || "Doação não encontrada"}</td>
                    <td className="py-2 px-3">
                      {item.data_reserva ? new Date(item.data_reserva).toLocaleDateString('pt-BR') : '-'}
                    </td>
                    <td
                      className={`py-2 px-3 font-medium ${
                        item.status === "concluida"
                          ? "text-green-600"
                          : item.status === "ativa"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {item.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">Nenhum benefício recebido ainda.</p>
          )}
        </section>
      </main>
    </div>
  );
}