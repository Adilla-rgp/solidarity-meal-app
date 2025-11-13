import DonationCard from "../components/DonationCard";
import FilterBar from "../components/FilterBar";
import SearchBar from "../components/SearchBar";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function DoacoesPage() {
  const doacoes = [
    {
      nome: "Pães e bolos sortidos",
      doador: "Padaria Trigo Dourado",
      tipo: "Padaria",
      quantidade: "8kg (aprox. 40 unidades)",
      validade: "Hoje às 20h",
      distancia: "1.2 km",
      urgente: true,
      imagem: "/paes-e-bolos.jpg",
    },
    {
      nome: "Legumes frescos variados",
      doador: "Mercado Vila Verde",
      tipo: "Supermercado",
      quantidade: "15kg",
      validade: "04/10/2025",
      distancia: "2.8 km",
      imagem: "/cesta-dos-vegetais.jpg",
    },
    {
      nome: "Frutas frescas sortidas",
      doador: "Feira Orgânica São José",
      tipo: "Feira",
      quantidade: "10kg",
      validade: "03/10/2025",
      distancia: "3.5 km",
      imagem: "/frutas.jpg",
    },
  ];

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
          {doacoes.map((item, index) => (
            <DonationCard key={index} {...item} />
          ))}
        </div>
      </main>
    </div>
  );
}