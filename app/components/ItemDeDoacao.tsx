//itens das doações
interface itemDeDoacaoProps {
    nome: string;
    peso: string;
    visualizacoes: number;
    validade: string;
    urgente: boolean;
}

export default function ItemDeDoacao({
    nome,
    peso,
    visualizacoes,
    validade,
    urgente = false,
}: itemDeDoacaoProps) {
    return (
        <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
            <div className="flex-1">

                <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-gray-800">{nome}</h4>
                    {urgente && (<span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded"> Urgente!</span>)}
                </div>

                <p className="text-sm text-gray-500">{peso} - {visualizacoes} visualizações</p>

            </div>


            <div className="text-right">
                <p className="text-sm font-medium text-gray-700">{validade}</p>
            </div>
        </div>
    );
}