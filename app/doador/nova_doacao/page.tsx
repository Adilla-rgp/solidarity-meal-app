"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Sidebar from "@/app/components/Sidebar";
import FormInput from "@/app/components/FormInput";
import FormSelect from "@/app/components/FormSelect";
import FormTextArea from "@/app/components/FormTextArea";
import FormDate from "@/app/components/FormDate";

export default function NovaDoacaoPage() {
    const [formData, setFormData] = useState({
        tipo: "",
        nome: "",
        quantidade: "",
        unidade: "",
        validade: "",
        descricao: "",
    });

    const tiposAlimento = [
        { value: "paes-massas", label: "Pães e Massas" },
        { value: "vegetais", label: "Vegetais" },
        { value: "frutas", label: "Frutas" },
        { value: "laticinios", label: "Laticínios" },
        { value: "proteinas", label: "Proteínas" },
        { value: "graos", label: "Grãos e Cereais" },
        { value: "outros", label: "Outros" },
    ];

    const unidades = [
        { value: "kg", label: "Quilogramas (kg)" },
        { value: "unidade", label: "Unidades" },
        { value: "litros", label: "Litros (L)" },
        { value: "pacotes", label: "Pacotes" },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value, })
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Dados da doação:", formData);
        alert("Doação cadastrada com sucesso");
    };

    return (
        <div className="flex bg-gray-50 min-h-screen">
            <Sidebar />

            <main className="flex-1 p-8">

                { /*cabeçalho da pagina*/}
                <div className="mb-8">
                    { /*setinha de cima de voltar */}
                    <Link href="/doador/dashboard" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition">
                        <ArrowLeft size={18} /> Voltar
                    </Link>

                    <h1 className="text-2xl font-bold text-gray-800">Nova Doação</h1>
                    <p className="text-gray-700">Preencha as informações sobre os alimentos que deseja doar</p>
                </div>

                {/* campo de cadastro das comidas */}
                <div className="bg-white rounded-xl shadow-sm p-8 max-w-3xl">
                    <form onSubmit={handleSubmit}>
                        {/* Tipo de Alimento */}
                        <FormSelect
                            label="Tipo de Alimento"
                            nome="tipo"
                            options={tiposAlimento}
                            requerido
                            valor={formData.tipo}
                            onChange={handleChange}
                            placeholder="Selecione o tipo"
                        />

                        {/* nome da doação */}
                        <FormInput
                            label="Nome da Doação"
                            nome="nome"
                            placeholder="Ex: Pães franceses do dia, Legumes frescos variados"
                            requerido
                            valor={formData.nome}
                            onChange={handleChange}
                            helpText="Seja específico para facilitar a busca dos beneficiários"
                        />

                        {/* quantidade e unidade dos alimentos*/}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormInput
                                label="Quantidade"
                                nome="quantidade"
                                tipo="number"
                                placeholder="0"
                                requerido
                                valor={formData.quantidade}
                                onChange={handleChange}
                            />

                            <FormSelect
                                label="Unidade"
                                nome="unidade"
                                options={unidades}
                                requerido
                                valor={formData.unidade}
                                onChange={handleChange}
                                placeholder="Selecione"
                            />
                        </div>

                        {/* data de validade */}
                        <FormDate
                            label="Data de Validade"
                            nome="validade"
                            requerido
                            valor={formData.validade}
                            onChange={handleChange}
                            helpText="Informe até quando o alimento pode ser consumido com segurança"
                        />

                        {/* dwscrição */}
                        <FormTextArea
                            label="Descrição"
                            nome="descricao"
                            placeholder="Adicione detalhes sobre o estado dos alimentos, condições de armazenamento, observações especiais..."
                            valor={formData.descricao}
                            onChange={handleChange}
                            linhas={5}
                        />

                        {/* outros botoes*/}
                        <div className="flex gap-4 mt-8">
                            <button type="submit" className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition">
                                Cadastrar Doação
                            </button>
                            <Link href="/doador/dashboard" className="flex-1 border border-gray-300 hover:bg-gray-50 py-3 rounded-lg font-semibold text-gray-700 text-center transition">
                                Cancelar
                            </Link>
                        </div>
                    </form>
                </div>
            </main >
        </div >
    );
}