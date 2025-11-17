"use client";
import { useState } from "react";
import DonationCard from "../../components/DonationCard";
import FilterBar from "../../components/FilterBar";
import SearchBar from "../../components/SearchBar";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { useBeneficiario } from "@/app/contexts/BeneficiarioContext";

interface Doacao {
  id: string;
  nome: string;
  doador: string;
  tipo: string;
  quantidade: string;
  validade: string;
  distancia: string;
  urgente?: boolean;
  imagem: string;
  status: "ativa" | "reservada" | "entregue";
  descricao?: string;
}

export default function DoacoesPage() {
  const [doacoes, setDoacoes] = useState<Doacao[]>(() => {
    if (typeof window !== "undefined") {
      const doacoesSave = localStorage.getItem("doacoes");
      return doacoesSave ? JSON.parse(doacoesSave) : [];
    }
    return [];
  });

  const [searchQuery, setSearchQuery] = useState("");
  const { adicionarReserva } = useBeneficiario();

  const handleReservar = (doacaoId: string) => {
    adicionarReserva({ doacaoId });

    const atualizadas = doacoes.map((d) =>
      d.id === doacaoId ? { ...d, status: "reservada" as const } : d
    );

    setDoacoes(atualizadas);
    localStorage.setItem("doacoes", JSON.stringify(atualizadas));
  };

  const doacoesFiltradas = doacoes.filter((doacao) => {
    const termo = searchQuery.toLowerCase();
    return (
      doacao.nome.toLowerCase().includes(termo) ||
      doacao.tipo.toLowerCase().includes(termo) ||
      doacao.doador.toLowerCase().includes(termo)
    );
  });

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <Topbar />
        <SearchBar />
        <FilterBar />

        <p className="text-gray-500 mt-6">
          {doacoes.length} doações disponíveis
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-4">
          {doacoes.map((item) => (
            <DonationCard
              key={item.id}
              {...item}
              onReservar={() => handleReservar(item.id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}