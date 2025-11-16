"use client";

import Sidebar from "@/app/components/Sidebar";
import QuadroEstatistico from "@/app/components/QuadroEstatistico";
import GraficoMensal from "@/app/components/GraficoMensal";
import ItemDeDoacao from "@/app/components/ItemDeDoacao";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Package, Clock, CheckCircle } from "lucide-react";

export default function DashboardDoadorPage() {
    const pathname = usePathname();

    const linkClasses = (path: string) => {
        const isActive = pathname === path;
        return `flex items-center gap-3 px-6 py-3 rounded-md font-medium transition ${isActive ? "bg-green-600 text-white" : "text-gray-700 hover:bg-green-50 hover:text-green-700"}`;
    };
    return (
        <div className="flex bg-gray-50 min-h-screen">
            <Sidebar />

            <main className="flex-1 p-8">
                {/* header */}

                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Painel do Doador</h1>
                        <p className="text-gray-500">Bem-vindo de volta, Restaurante Sabor & Arte</p>
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
                        valor="8"
                        subtitulo="Aguardando reserva"
                        icon={<Package className="w-6 h-6 text-green-600" />}
                        iconBgColor="bg-green-50"
                    />
                    <QuadroEstatistico
                        titulo="Pendentes de Coleta"
                        valor="3"
                        subtitulo="Reservadas hoje"
                        icon={<Clock className="w-6 h-6 text-orange-600" />}
                        iconBgColor="bg-orange-50"
                    />
                    <QuadroEstatistico
                        titulo="Finalizadas Este Mês"
                        valor="21"
                        subtitulo="+15% vs mês anterior"
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

                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Doações Ativas
                        </h3>

                        <div className="space-y-2">
                            <ItemDeDoacao
                                nome="Pães e bolos sortidos"
                                peso="8kg"
                                visualizacoes={24}
                                validade="Vence em 1 dia"
                                urgente={true}
                            />

                            <ItemDeDoacao
                                nome="Legumes diversos"
                                peso="15kg"
                                visualizacoes={18}
                                validade="Vence em 2 dias"
                                urgente={true}
                            />

                            <ItemDeDoacao
                                nome="Frutas frescas"
                                peso="10kg"
                                visualizacoes={12}
                                validade="Vence em 3 dias"
                                urgente={false}
                            />

                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}