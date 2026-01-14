"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ArrowLeft, Upload } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FormInput from "@/app/components/FormInput";
import FormSelect from "@/app/components/FormSelect";
import FormTextArea from "@/app/components/FormTextArea";
import FormDate from "@/app/components/FormDate";
import { useDoador } from "@/app/contexts/DoadorContext";
import { apiClient, Doacao } from "@/app/lib/api/client";

interface Option {
  value: string;
  label: string;
}

interface FormData {
  tipo: string;
  nome: string;
  quantidade: string;
  unidade: string;
  validade: string;
  descricao: string;
  imagem: string;
  distancia: string;
  urgente: boolean;
}

export default function NovaDoacaoPage() {
  const router = useRouter();
  const { adicionarDoacao, doador } = useDoador();

  const [formData, setFormData] = useState<FormData>({
    tipo: "",
    nome: "",
    quantidade: "",
    unidade: "",
    validade: "",
    descricao: "",
    imagem: "",
    distancia: "5 km",
    urgente: false
  });

  const [previaImagem, setPreviaImagem] = useState<string>("");
  const [tiposAlimento, setTiposAlimento] = useState<Option[]>([]);
  const [unidades, setUnidades] = useState<Option[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // redirecionar para cadastro (só se não tiver doador cadastrado)
  useEffect(() => {
    if (!doador) {
      router.push("/doador/cadastro");
    }
  }, [doador, router]);

  // Buscar os mocks com tratamento de erro
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.getMocks();
        if (response.success && response.data) {
          setTiposAlimento(response.data.tiposAlimento || []);
          setUnidades(response.data.unidades || []);
        }
      } catch (err: unknown) {
        console.error('Erro ao carregar opções:', err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setFormData((s) => ({ ...s, imagem: result }));
      setPreviaImagem(result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Converter dados para formato esperado pelo backend
      const doacaoData: Omit<Doacao, "id" | "doador" | "doador_estabelecimento" | "created_at"> = {
        nome: formData.nome,
        tipo: formData.tipo,
        quantidade: parseFloat(formData.quantidade),
        unidade: formData.unidade,
        validade: new Date(formData.validade).toISOString(),
        descricao: formData.descricao,
        imagem: formData.imagem,
        distancia: formData.distancia,
        urgente: formData.urgente,
        status: "ativa"
        // A propriedade 'doador' será preenchida pelo backend com base no usuário autenticado
      };

      const sucesso = await adicionarDoacao(doacaoData);
      
      if (sucesso) {
        alert("Doação cadastrada com sucesso!");
        router.push("/doador/dashboard");
      } else {
        setError("Erro ao cadastrar doação. Tente novamente.");
      }
    } catch (err: unknown) {
      console.error('Erro:', err);
      setError(err instanceof Error ? err.message : "Erro ao cadastrar doação");
    } finally {
      setLoading(false);
    }
  };

  if (!doador) {
    return null;
  }

  return (
    <div className="flex bg-gray-50 min-h-screen">
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

        {error && <p className="text-red-600 mb-4">{error}</p>}

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
                min="0"
                step="0.01"
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

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Foto da Doação
              </label>

              <div className="flex items-center gap-4">
                <div className="flex-1 relative border-2 border-dashed border-green-300 rounded-lg p-6 hover:bg-green-50 transition cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />

                  <div className="flex flex-col items-center justify-center pointer-events-none">
                    <Upload size={32} className="text-green-600 mb-2" />
                    <p className="text-gray-700 font-medium">
                      Clique ou arraste a imagem
                    </p>
                    <p className="text-gray-500 text-sm">
                      PNG, JPG, GIF até 5MB
                    </p>
                  </div>
                </div>
                {previaImagem && (
                  <div className="w-32 h-32 rounded-lg overflow-hidden border border-gray-200">
                    <Image
                      src={previaImagem}
                      alt="previa"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Cadastrando..." : "Cadastrar Doação"}
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