"use client";

import { useDoador } from "@/app/contexts/DoadorContext";
import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function GraficoMensal() {
  const { doacoes } = useDoador();

  // Agrupar doações por mês e status
  const dadosMensais = useMemo(() => {
    const meses: Record<
      string,
      { ativa: number; reservada: number; entregue: number }
    > = {};

    doacoes.forEach((doacao) => {
      const mes = new Date(doacao.data).toLocaleString("pt-BR", {
        month: "short",
      });

      if (!meses[mes]) {
        meses[mes] = { ativa: 0, reservada: 0, entregue: 0 };
      }

      if (doacao.status === "ativa") meses[mes].ativa++;
      if (doacao.status === "reservada") meses[mes].reservada++;
      if (doacao.status === "entregue") meses[mes].entregue++;
    });

    return Object.entries(meses).map(([mes, valores]) => ({
      mes,
      ...valores,
    }));
  }, [doacoes]);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Doações por Mês
      </h3>
      {dadosMensais.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dadosMensais}>
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="ativa" fill="#16a34a" name="Ativas" />
            <Bar dataKey="reservada" fill="#f97316" name="Reservadas" />
            <Bar dataKey="entregue" fill="#2563eb" name="Entregues" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500 text-sm">
          Nenhuma doação registrada ainda.
        </p>
      )}
    </div>
  );
}