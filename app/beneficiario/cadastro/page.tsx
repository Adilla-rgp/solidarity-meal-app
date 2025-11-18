"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBeneficiario } from "@/app/contexts/BeneficiarioContext";
import FormInput from "@/app/components/FormInput";
import Image from "next/image";
import Link from "next/link";

export default function CadastroBeneficiarioPage() {
    const router = useRouter();
    const { cadastrarBeneficiario } = useBeneficiario();


    const [formData, setFormData] = useState({
        nome: "",
        telefone: "",
        email: "",
        endereco: "",
        necessidade: "",
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: "" });
        }
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.nome.trim()) {
            newErrors.nome = "Nome é obrigatório";
        }

        if (!formData.telefone.trim()) {
            newErrors.telefone = "Telefone é obrigatório";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email é obrigatório";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Email inválido";
        }

        if (!formData.endereco.trim()) {
            newErrors.endereco = "Endereço é obrigatório";
        }

        if (!formData.necessidade.trim()) {
            newErrors.necessidade = "Necessidade é obrigatória";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            cadastrarBeneficiario(formData);
            alert("Cadastro realizado com sucesso!");
            router.push("/beneficiario/doacoes");
        } catch (error) {
            console.error(error);
            alert("Erro ao realizar cadastro. Tente novamente.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl">
                {/* logo e título */}
                <div className="flex flex-col items-center mb-8">
                    <div className="flex items-center gap-3 mb-4">

                        <Image
                            src="/logo.svg"
                            alt="Logo"
                            width={55}
                            height={55}
                            className="object-contain"
                        />

                        <h1 className="text-2xl font-bold text-green-600">Prato Solidário</h1>

                    </div>

                    <h2 className="text-xl font-semibold text-gray-800">Cadastro de Beneficiário</h2>

                    <p className="text-gray-500 text-center mt-2">Preencha seus dados para receber doações:</p>
                </div>

                {/* formulario */}
                <form onSubmit={handleSubmit} className="space-y-6">

                    <FormInput
                        label="Nome Completo"
                        nome="nome"
                        placeholder="Digite seu nome completo"
                        requerido
                        valor={formData.nome}
                        onChange={handleChange}
                    />
                    {errors.nome && (<p className="text-red-500 text-sm -mt-4">{errors.nome}</p>)}

                    <FormInput
                        label="Telefone"
                        nome="telefone"
                        tipo="tel"
                        placeholder="(11) 98765-4321"
                        requerido
                        valor={formData.telefone}
                        onChange={handleChange}
                        helpText="Formato: (DDD) 12345-6789"
                    />
                    {errors.telefone && (<p className="text-red-500 text-sm -mt-4">{errors.telefone}</p>)}

                    <FormInput
                        label="Email"
                        nome="email"
                        tipo="email"
                        placeholder="seu@email.com"
                        requerido
                        valor={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && (<p className="text-red-500 text-sm -mt-4">{errors.email}</p>)}

                    <FormInput
                        label="Endereço"
                        nome="endereco"
                        placeholder="Ex: Rua das Flores, 123 - Bairro - Cidade/UF"
                        requerido
                        valor={formData.endereco}
                        onChange={handleChange}
                    />
                    {errors.endereco && (<p className="text-red-500 text-sm -mt-4">{errors.endereco}</p>)}

                    <FormInput
                        label="Necessidade"
                        nome="necessidade"
                        placeholder="Ex: Refeições, roupas, cestas básicas..."
                        requerido
                        valor={formData.necessidade}
                        onChange={handleChange}
                    />
                    {errors.necessidade && (<p className="text-red-500 text-sm -mt-4">{errors.necessidade}</p>)}

                    {/* botões */}
                    <div className="flex gap-4 pt-4">
                        <button type="submit" className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition shadow-md">
                            Cadastrar
                        </button>

                        <Link href="/login" className="flex-1 border border-gray-300 hover:bg-gray-50 py-3 rounded-lg font-semibold text-gray-700 text-center transition">
                            Cancelar
                        </Link>
                    </div>
                </form>

                {/* link para login */}
                <p className="text-center text-sm text-gray-600 mt-6"> Já tem cadastro?{" "}
                    <Link href="/login" className="text-green-600 font-semibold hover:underline">
                        Faça login
                    </Link>
                </p>
            </div>
        </div>
    );
}
