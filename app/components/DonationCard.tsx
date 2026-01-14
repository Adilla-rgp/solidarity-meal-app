"use client";

import Image from "next/image";
import { Clock, MapPin } from "lucide-react";

export interface DonationCardProps {
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
  onReservar: () => void;
  podeReservar?: boolean;
  doador_estabelecimento?: string;
}

export default function DonationCard({
  nome,
  doador,
  tipo,
  quantidade,
  validade,
  distancia,
  urgente,
  imagem,
  status,
  descricao,
  onReservar,
  podeReservar = true,
  doador_estabelecimento
}: DonationCardProps) {
  const formatarData = (data: string) => {
    try {
      return new Date(data).toLocaleDateString("pt-BR");
    } catch {
      return data;
    }
  };

  const exibirDoador = doador_estabelecimento || doador;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition">
      {/* Imagem */}
      <div className="relative h-48 w-full">
        <Image
          src={imagem || "/placeholder.png"}
          alt={nome}
          fill
          className="object-cover"
        />
        {urgente && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Urgente
          </div>
        )}
        <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
          {status === "ativa" ? "Disponível" : status === "reservada" ? "Reservada" : "Entregue"}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-4">
        <h3 className="font-bold text-gray-800 text-lg mb-1">{nome}</h3>
        <p className="text-gray-600 text-sm mb-3">{descricao}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm">Doador:</span>
            <span className="font-medium text-gray-700">{exibirDoador}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm">Tipo:</span>
            <span className="font-medium text-gray-700">{tipo}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm">Quantidade:</span>
            <span className="font-medium text-gray-700">{quantidade}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock size={14} className="text-gray-400" />
            <span className="text-gray-500 text-sm">Vence em:</span>
            <span className="font-medium text-gray-700">{formatarData(validade)}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-gray-400" />
            <span className="text-gray-500 text-sm">Distância:</span>
            <span className="font-medium text-gray-700">{distancia}</span>
          </div>
        </div>

        {/* Botão de reserva */}
        {status === "ativa" && podeReservar && (
          <button
            onClick={onReservar}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition"
          >
            Reservar
          </button>
        )}

        {status === "reservada" && (
          <button
            disabled
            className="w-full bg-gray-300 text-gray-600 py-2 rounded-lg font-semibold cursor-not-allowed"
          >
            Já Reservada
          </button>
        )}

        {status === "entregue" && (
          <button
            disabled
            className="w-full bg-blue-100 text-blue-600 py-2 rounded-lg font-semibold cursor-not-allowed"
          >
            Entregue
          </button>
        )}
      </div>
    </div>
  );
}