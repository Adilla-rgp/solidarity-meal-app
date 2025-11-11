"use client";
import Sidebar from "../components/SideBar";
import Topbar from "../components/TopBar";
import ReservaCard from "../components/ReservaCard";

const reservas = [
  {
    imagem: "/cesta_alimentos.jpg",
    titulo: "Cesta de alimentos - Mercado Esperança",
    data: "10/11/2025",
    status: "confirmada" as const,
  },
  {
    imagem: "/frutas.jpg",
    titulo: "frutas - Feira Central",
    data: "12/11/2025",
    status: "pendente" as const,
  },
  {
    imagem: "/cesta-dos-vegetais.jpg",
    titulo: "Verduras frescas - Horta Comunitária",
    data: "14/11/2025",
    status: "cancelada" as const,
  },
];

export default function MinhasReservas() {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <Topbar />
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Minhas Reservas</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {reservas.map((item, index) => (
            <ReservaCard key={index} {...item} />
          ))}
        </div>
      </main>
    </div>
  );
}
