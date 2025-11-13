//perfil do doador
"use client";
import Sidebar from "@/app/components/Sidebar";
import Image from "next/image";

export default function PerfilDoadorPage() {
    //informações e doações estáticas
    const doador = {
        nome: "João Doador",
        email: "joao@exemplo.com",
        estabelecimento: "Padaria Trigo Dourado",
        tipo: "Doador",
    };

    const doacoes = [
        { nome: "Pães e bolos", data: "02/10/2025", status: "Entregue" },
        { nome: "Frutas frescas", data: "28/09/2025", status: "Em andamento" },
    ];

    return (
        <div className="flex bg-gray-50 min-h-screen">
            <Sidebar />
            <main className="flex-1 p-8">
                { /*card de informações do doador */}
                <section className="bg-white rounded-xl p-6 shadow-sm mt-6">
                    <div className="flex items-center gap-6">

                        <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-green-600">
                            <Image src="/logo.svg" alt="Foto do doador" fill className="object-cover" />
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">{doador.nome}</h2>
                            <p className="text-gray-600">{doador.email}</p>
                            <p className="text-gray-500 text-sm mt-1">{doador.estabelecimento}</p>
                            <span className="mt-2 inline-block bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full font-medium">
                                {doador.tipo}
                            </span>
                        </div>
                    </div>

                </section>

                { /*quadro de doações */}

                <section className="bg-white rounded-xl p-6 shadow-sm mt-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4"> Doações Realizadas </h3>

                    {doacoes.length > 0 ? (
                        <table className="w-full text-sm text-left border-t border-gray-100">
                            <thead>
                                <tr className="text-gray-600 bg-gray-50">
                                    <th className="py-2 px-3 font-medium">Doação</th>
                                    <th className="py-2 px-3 font-medium">Data</th>
                                    <th className="py-2 px-3 font-medium">Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {doacoes.map((item, index) => (
                                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                        < td className="py-2 px-3 text-gray-700" > {item.nome}</td>
                                        <td className="py-2 px-3 text-gray-700">{item.data}</td>
                                        <td className={`py-2 px-3 font-medium ${item.status === "Entregue" ? "text-green-600" : "text-yellow-600"}`}>
                                            {item.status}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-gray-500">Você ainda não fez nenhuma doação.</p>
                    )}
                </section>
            </main >
        </div >
    );
}