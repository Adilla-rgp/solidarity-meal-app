import { Calendar, MapPin, Package } from "lucide-react";
import Image from "next/image";

interface Props {
  nome: string;
  doador: string;
  tipo: string;
  quantidade: string;
  validade: string;
  distancia: string;
  urgente?: boolean;
  imagem: string; // 🆕 Nova propriedade
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
}: Props) {
  return (
    <div className="border rounded-xl overflow-hidden shadow-sm bg-white flex flex-col justify-between hover:shadow-md transition">
      {/* ======= Imagem da doação ======= */}
      <div className="relative w-full h-40">
        <Image
          src={imagem}
          alt={nome}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* ======= Informações ======= */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
              Disponível
            </span>
            {urgente && (
              <span className="text-xs font-semibold text-yellow-600 bg-yellow-50 px-2 py-1 rounded">
                Urgente
              </span>
            )}
          </div>

          <h3 className="font-semibold text-gray-800">{nome}</h3>
          <p className="text-sm text-gray-600">
            {doador} • {tipo}
          </p>

          <div className="mt-2 text-sm text-gray-500 space-y-1">
            <div className="flex items-center gap-2">
              <Package size={14} /> {quantidade}
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={14} /> Validade: {validade}
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={14} /> {distancia}
            </div>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md">
            Reservar
          </button>
          <button className="flex-1 border border-gray-300 hover:bg-gray-50 py-2 rounded-md">
            Ver Detalhes
          </button>
        </div>
      </div>
    </div>
  );
}
