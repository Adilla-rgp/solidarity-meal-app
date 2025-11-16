"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Tipagem para os dados do gráfico
interface GraficoData {
  mes: string;
  doacoes: number;
}

export default function GraficoMensal() {
  const [data, setData] = useState<GraficoData[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Buscar os dados centralizados com tratamento de erro
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/mocks");
        if (!res.ok) throw new Error("Erro ao carregar gráfico de doações");
        const dados = await res.json();
        setData(dados.grafico);
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

  // Calcular total de doações
  const totalDoacoes = data.reduce((acc, item) => acc + item.doacoes, 0);

  if (error) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <p className="text-gray-500">Carregando dados do gráfico...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Doações nos Últimos Meses
          </h3>
          <p className="text-sm text-gray-500">
            Total de {totalDoacoes} doações realizadas
          </p>
        </div>
        <div className="text-green-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
            />
          </svg>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="mes" stroke="#6b7280" fontSize={12} />
          <YAxis stroke="#6b7280" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
            }}
          />
          <Bar dataKey="doacoes" fill="#10b981" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}