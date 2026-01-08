//quadro estatistico das doações
import { ReactNode } from "react";

interface quadroEstatisticoProps {
    titulo: string;
    valor: string | number;
    subtitulo: string;
    icon: ReactNode;
    iconBgColor: string;
}

export default function QuadroEstatistico({
    titulo,
    valor,
    subtitulo,
    icon,
    iconBgColor,
}: quadroEstatisticoProps) {

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-gray-500 text-sm mb-1">{titulo}</p>
                    <h3 className="text-3xl font-bold text-gray-800">{valor}</h3>
                </div>
                <div className={`p-3 rounded-lg ${iconBgColor}`}>{icon}</div>
            </div>
            <p className="text-gray-500 text-sm">{subtitulo}</p>
        </div>
    );

}