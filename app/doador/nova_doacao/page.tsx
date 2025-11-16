"use client";

import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import Sidebar from "@/app/components/Sidebar";
import FormInput from "@/app/components/FormInput";
import FormSelect from "@/app/components/FormSelect";
import FormTextArea from "@/app/components/FormTextArea";
import FormDate from "@/app/components/FormDate";

interface Option {
  value: string;
  label: string;
}

export default function NovaDoacaoPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    tipo: "",
    nome: "",
    quantidade: "",
    unidade: "",
    validade: "",
    descricao: "",
  });

  const [tiposAlimento, setTiposAlimento] = useState<Option[]>([]);
  const [unidades, setUnidades] = useState<Option[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Buscar os mocks com tratamento de erro
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/mocks");
        if (!res.ok) throw new Error("Erro ao carregar opções de alimentos");
        const data = await res.json();
        setTiposAlimento(data.tiposAlimento || []);
        setUnidades(data.unidades || []);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Erro desconhecido ao carregar dados");
        }
      }
    };
    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/mocks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Erro ao cadastrar doação");

      alert("Doação cadastrada com sucesso!");
      router.push("/doacoes"); // redireciona para a tela de doações
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro desconhecido ao cadastrar doação");
      }
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        {/* cabeçalho da página */}
        <div className="mb-8">
          <Link
            href="/doador/dashboard"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition"
          >
            <ArrowLeft size={18} /> Voltar
          </Link>

          <h1 className="text-2xl font-bold text-gray-800">Nova Doação</h1>
          <p className="text-gray-700">
            Preencha as informações sobre os alimentos que deseja doar
          </p>
        </div>

        {error && (
          <p className="text-red-600 mb-4">
            {error}
          </p>
        )}

        {/* formulário */}
        <div className="bg-white rounded-xl shadow-sm p-8 max-w-3xl">
          <form onSubmit={handleSubmit}>
            <FormSelect
              label="Tipo de Alimento"
              nome="tipo"
              options={tiposAlimento}
              requerido
              valor={formData.tipo}
              onChange={handleChange}
              placeholder="Selecione o tipo"
            />

            <FormInput
              label="Nome da Doação"
              nome="nome"
              placeholder="Ex: Pães franceses do dia, Legumes frescos variados"
              requerido
              valor={formData.nome}
              onChange={handleChange}
              helpText="Seja específico para facilitar a busca dos beneficiários"
            />

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

            <FormDate
              label="Data de Validade"
              nome="validade"
              requerido
              valor={formData.validade}
              onChange={handleChange}
              helpText="Informe até quando o alimento pode ser consumido com segurança"
            />

            <FormTextArea
              label="Descrição"
              nome="descricao"
              placeholder="Adicione detalhes sobre o estado dos alimentos, condições de armazenamento, observações especiais..."
              valor={formData.descricao}
              onChange={handleChange}
              linhas={5}
            />

            <div className="flex gap-4 mt-8">
              <button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
              >
                Cadastrar Doação
              </button>
              <Link
                href="/doador/dashboard"
                className="flex-1 border border-gray-300 hover:bg-gray-50 py-3 rounded-lg font-semibold text-gray-700 text-center transition"
              >
                Cancelar
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}