"use client";
import { useState, useEffect } from "react";
import DonationCard from "../../components/DonationCard";
import FilterBar from "../../components/FilterBar";
import SearchBar from "../../components/SearchBar";
import Topbar from "../../components/Topbar";
import { useBeneficiario } from "@/app/contexts/BeneficiarioContext";
import { apiClient, Doacao } from "@/app/lib/api/client";

export default function DoacoesPage() {
  const [doacoes, setDoacoes] = useState<Doacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtros, setFiltros] = useState({ tipo: "", distancia: "" });

  const { adicionarReserva } = useBeneficiario();

  // Buscar doacoes do backend
  useEffect(() => {
    const carregarDoacoes = async () => {
      try {
        setLoading(true);
        const response = await apiClient.listarDoacoes();

        if (response.success && response.data?.doacoes) {
          setDoacoes(response.data.doacoes);
        }
      } catch (error) {
        console.error("Erro ao carregar doacoes:", error);
        setDoacoes([]);
      } finally {
        setLoading(false);
      }
    };

    carregarDoacoes();
  }, []);

  const handleReservar = async (doacaoId: string) => {
    try {
      const sucesso = await adicionarReserva(doacaoId);
      
      if (sucesso) {
        // Atualizar status localmente com tipo correto
        const atualizadas = doacoes.map((d) =>
          d.id === doacaoId ? { ...d, status: "reservada" } : d
        ) as Doacao[];
        setDoacoes(atualizadas);
        alert("Doação reservada com sucesso!");
      } else {
        alert("Erro ao reservar doação. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao reservar doacao:", error);
      alert("Erro ao reservar doação.");
    }
  };

  const doacoesFiltradas = doacoes.filter((doacao) => {
    if (filtros.tipo && doacao.tipo !== filtros.tipo) return false;
    if (filtros.distancia && doacao.distancia) {
      // Extrair número da string de distância (ex: "5 km" -> 5)
      const match = doacao.distancia.match(/(\d+)/);
      const distanciaNum = match ? parseInt(match[1]) : 0;
      const filtroDistancia = parseInt(filtros.distancia);
      return !isNaN(distanciaNum) && !isNaN(filtroDistancia) && distanciaNum <= filtroDistancia;
    }
    return true;
  });

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <main className="flex-1 p-8">
        <Topbar />
        <SearchBar />
        <FilterBar onFilterChange={setFiltros} />

        {loading ? (
          <p className="text-gray-500 mt-6">Carregando doações...</p>
        ) : (
          <>
            <p className="text-gray-500 mt-6">
              {doacoesFiltradas.length} doações disponíveis
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-4">
              {doacoesFiltradas.map((item) => (
                <DonationCard
                  key={item.id}
                  id={item.id}
                  nome={item.nome}
                  doador={item.doador || ""}
                  tipo={item.tipo}
                  quantidade={item.quantidade.toString()}
                  validade={item.validade}
                  distancia={item.distancia || "5 km"}
                  urgente={item.urgente}
                  imagem={item.imagem || "/placeholder.png"}
                  status={item.status}
                  descricao={item.descricao}
                  doador_estabelecimento={item.doador_estabelecimento}
                  onReservar={() => handleReservar(item.id)}
                  podeReservar={item.status === "ativa"}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}