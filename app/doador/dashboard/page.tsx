"use client";

import Sidebar from "@/app/components/Sidebar";
import QuadroEstatistico from "@/app/components/QuadroEstatistico";
import GraficoMensal from "@/app/components/GraficoMensal";
import ItemDeDoacao from "@/app/components/ItemDeDoacao";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, Clock, CheckCircle } from "lucide-react";
import { useDoador } from "@/app/contexts/DoadorContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardDoadorPage() {
    const pathname = usePathname();
    const router = useRouter();
    const { doador, doacoes } = useDoador();

    useEffect(() => {
        if (!doador) {
            alert("Complete seu cadastro primeiro!");
            router.push("/doador/cadastro");
        }
    }, [doador, router]);

    const linkClasses = (path: string) => {
        const isActive = pathname === path;
        return `flex items-center gap-3 px-6 py-3 rounded-md font-medium transition ${isActive ? "bg-green-600 text-white" : "text-gray-700 hover:bg-green-50 hover:text-green-700"}`;
    };

    //calculo das estatisticas
    const doacoesAtivas = doacoes.filter((d) => d.status === "ativa").length;
    const doacoesPendentes = doacoes.filter((d) => d.status === "reservada").length;
    const doacoesFinalizadas = doacoes.filter((d) => d.status === "entregue").length;

    // pega últimas 3 doações ativas
    const ultimasDoacoes = doacoes
        .filter((d) => d.status === "ativa")
        .slice(-3)
        .reverse();

    if (!doador) {
        return null;
    }

    return (
        <div className="flex bg-gray-50 min-h-screen">
            <Sidebar />

            <main className="flex-1 p-8">
                {/* header */}

                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Painel do Doador</h1>
                        <p className="text-gray-500">Bem-vindo de volta, {doador.estabelecimento}</p>
                    </div>

                    { /*botao de nova doaçao*/}
                    <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition">
                        <Link href="/doador/nova_doacao" className={linkClasses("/doador/nova_doacao")}>
                            <span className="text-xl" >+</span> Nova Doação
                        </Link>

                    </button>
                </div>

                {/* quadros estatisticos das doações */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <QuadroEstatistico
                        titulo="Doações Ativas"
                        valor={doacoesAtivas.toString()}
                        subtitulo="Aguardando reserva"
                        icon={<Package className="w-6 h-6 text-green-600" />}
                        iconBgColor="bg-green-50"
                    />
                    <QuadroEstatistico
                        titulo="Pendentes de Coleta"
                        valor={doacoesPendentes.toString()}
                        subtitulo="Reservadas"
                        icon={<Clock className="w-6 h-6 text-orange-600" />}
                        iconBgColor="bg-orange-50"
                    />
                    <QuadroEstatistico
                        titulo="Finalizadas"
                        valor={doacoesFinalizadas.toString()}
                        subtitulo="Doações entregues"
                        icon={<CheckCircle className="w-6 h-6 text-blue-600" />}
                        iconBgColor="bg-blue-50"
                    />
                </div>

                {/* grafico e doações ativas */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    <div className="lg:col-span-2">
                        <GraficoMensal />
                    </div>

                    {/* litsa de doações ativas */}
                    <div className="bg-white rounded-xl p-6 shadow-sm">

                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Doações Ativas</h3>

                        {ultimasDoacoes.length > 0 ? (
                            <div className="space-y-2">
                                {ultimasDoacoes.map((doacao) => (
                                    <ItemDeDoacao
                                        key={doacao.id}
                                        nome={doacao.nome}
                                        peso={`${doacao.quantidade} ${doacao.unidade}`}
                                        visualizacoes={0}
                                        validade={`Vence em ${doacao.validade}`}
                                        urgente={
                                            new Date(doacao.validade) <=
                                            new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
                                        }
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm">
                                Você ainda não tem doações ativas. Clique em "Nova Doação" para
                                começar.
                            </p>
                        )}
                    </div>
                </div>

                {/* Todas as doações */}
                {doacoes.length > 0 && (
                    <div className="bg-white rounded-xl p-6 shadow-sm mt-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Todas as Doações</h3>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-3 px-4 text-gray-600 font-medium">Nome</th>


                                        <th className="text-left py-3 px-4 text-gray-600 font-medium">Tipo</th>

                                        <th className="text-left py-3 px-4 text-gray-600 font-medium">Quantidade</th>

                                        <th className="text-left py-3 px-4 text-gray-600 font-medium">Validade</th>


                                        <th className="text-left py-3 px-4 text-gray-600 font-medium">Status</th>


                                        <th className="text-left py-3 px-4 text-gray-600 font-medium">Data</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {doacoes.map((doacao) => (
                                        <tr
                                            key={doacao.id}
                                            className="border-b border-gray-100 hover:bg-gray-50"
                                        >
                                            <td className="py-3 px-4 text-gray-800">{doacao.nome}</td>
                                            <td className="py-3 px-4 text-gray-600">{doacao.tipo}</td>
                                            <td className="py-3 px-4 text-gray-600">{doacao.quantidade} {doacao.unidade} </td>

                                            <td className="py-3 px-4 text-gray-600">{new Date(doacao.validade).toLocaleDateString("pt-BR")}</td>

                                            <td className="py-3 px-4">
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs font-medium ${doacao.status === "ativa"
                                                        ? "bg-green-100 text-green-700" : doacao.status === "reservada" ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"}`
                                                    }
                                                >
                                                    {doacao.status === "ativa" ? "Ativa" : doacao.status === "reservada" ? "Reservada" : "Entregue"}

                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-gray-600">{doacao.data}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

            </main >
        </div >
    );
}