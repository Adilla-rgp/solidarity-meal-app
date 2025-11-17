"use client";
import Image from "next/image";

interface DonationCardProps {
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
  onReservar?: () => void;
}

export default function DonationCard(props: DonationCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col">
      <div className="relative w-full h-40 mb-4">
        <Image
          src={props.imagem}
          alt={props.nome}
          fill
          className="object-cover rounded-lg"
        />
        {props.urgente && (
          <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
            Urgente
          </span>
        )}
      </div>

      <h3 className="text-lg font-semibold text-gray-800">{props.nome}</h3>
      <p className="text-sm text-gray-600">Doador: {props.id}</p>
      <p className="text-sm text-gray-600">Tipo: {props.tipo}</p>
      <p className="text-sm text-gray-600">
        Quantidade: {props.quantidade} | Validade: {props.validade}
      </p>
      <p className="text-sm text-gray-500">Distância: {props.distancia}</p>

      {props.status === "ativa" ? (
        <button
          onClick={props.onReservar}
          className="mt-4 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Reservar
        </button>
      ) : props.status === "reservada" ? (
        <span className="mt-4 inline-block bg-yellow-500 text-white py-2 rounded-lg text-center">
          Reservada
        </span>
      ) : (
        <span className="mt-4 inline-block bg-gray-400 text-white py-2 rounded-lg text-center">
          Entregue
        </span>
      )}
    </div>
  );
}