"use client";
import { useEffect, useState } from "react";
import DonationCard from "../../components/DonationCard";
import FilterBar from "../../components/FilterBar";
import SearchBar from "../../components/SearchBar";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

interface Doacao {
  nome: string;
  doador: string;
  tipo: string;
  quantidade: string;
  validade: string;
  distancia: string;
  urgente?: boolean;
  imagem: string;
}

export default function DoacoesPage() {
  const [doacoes, setDoacoes] = useState<Doacao[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/mocks");
        if (!res.ok) throw new Error("Erro ao carregar doações");
        const data = await res.json();
        setDoacoes(data.doacoes as Doacao[]);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Erro desconhecido");
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
        <SearchBar />
        <FilterBar />

        {error ? (
          <p className="text-red-600 mt-6">{error}</p>
        ) : (
          <>
            <p className="text-gray-500 mt-6">
              {doacoes.length} doações disponíveis
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-4">
              {doacoes.map((item, index) => (
                <DonationCard key={index} {...item} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
