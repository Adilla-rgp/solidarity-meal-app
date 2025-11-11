"use client";
import Image from "next/image";

interface ReservaCardProps {
  imagem: string;
  titulo: string;
  data: string;
  status: "pendente" | "confirmada" | "cancelada";
}

export default function ReservaCard({ imagem, titulo, data, status }: ReservaCardProps) {
  const cores = {
    pendente: "bg-yellow-100 text-yellow-800",
    confirmada: "bg-green-100 text-green-800",
    cancelada: "bg-red-100 text-red-800",
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      <Image src={imagem} alt={titulo} width={400} height={250} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{titulo}</h3>
        <p className="text-sm text-gray-500">Data: {data}</p>
        <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${cores[status]}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
    </div>
  );
}
