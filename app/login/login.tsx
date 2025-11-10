"use client";
import { useState } from "react";
import Image from "next/image";

export default function Login() {
  const [tipoUsuario, setTipoUsuario] = useState("doador");

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* ======== Parte Esquerda (Formulário) ======== */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white px-6 py-10 md:px-12">
        {/* Logo + Nome do Sistema */}
        <div className="flex items-center space-x-3 mb-8">
          <Image
            src="/logo.svg" // imagem local dentro da pasta public
            alt="Logo"
            width={55}
            height={55}
            className="object-contain"
          />
          <h1 className="text-2xl md:text-3xl font-bold text-indigo-700 text-center">
            Prato Solidário
          </h1>
        </div>

        {/* Botões de tipo de usuário */}
        <div className="flex space-x-3 mb-8">
          <button
            onClick={() => setTipoUsuario("doador")}
            className={`px-4 py-2 rounded-xl text-sm md:text-base font-medium transition ${
              tipoUsuario === "doador"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Sou Doador
          </button>
          <button
            onClick={() => setTipoUsuario("beneficiario")}
            className={`px-4 py-2 rounded-xl text-sm md:text-base font-medium transition ${
              tipoUsuario === "beneficiario"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Sou Beneficiário
          </button>
        </div>

        {/* Mensagem de Boas-vindas */}
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 text-center">
          Bem-vindo(a) de volta!
        </h2>

        {/* Formulário */}
        <form className="w-full max-w-sm space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm md:text-base">
              E-mail
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm md:text-base"
              placeholder="Digite seu e-mail"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm md:text-base">
              Senha
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm md:text-base"
              placeholder="Digite sua senha"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition text-sm md:text-base"
          >
            Entrar
          </button>
        </form>
      </div>

      {/* ======== Parte Direita (Imagem e Slogan) ======== */}
      <div className="relative flex-1 flex items-center justify-center bg-indigo-50">
        {/* Imagem grande de fundo */}
        <div className="absolute inset-0">
          <Image
            src="/login.svg" // imagem na pasta public
            alt="Imagem de fundo"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Slogan */}
        <div className="relative z-10 bg-black/40 p-6 md:p-10 rounded-2xl text-center max-w-md m-4">
          <h2 className="text-white text-lg md:text-2xl font-bold mb-3">
            “Conectando solidariedade e esperança”
          </h2>
          <p className="text-gray-200 text-xs md:text-sm">
            Uma plataforma que une doadores e beneficiários para combater o
            desperdício e alimentar quem mais precisa.
          </p>
        </div>
      </div>
    </div>
  );
}
