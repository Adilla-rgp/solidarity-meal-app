"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Login() {
  const [tipoUsuario, setTipoUsuario] = useState("doador");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // guarda o tipo de usuario localmente para mudar as páginas
    localStorage.setItem("tipoUsuario", tipoUsuario);

    // Redireciona de acordo com o tipo de usuário
    if (tipoUsuario === "beneficiario") {
      router.push("/doacoes");
    } else {
      router.push("/doador/dashboard");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* ======== Parte Esquerda (Formulário) ======== */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white px-6 py-10 md:px-12">
        <div className="flex items-center space-x-3 mb-8">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={55}
            height={55}
            className="object-contain"
          />
          <h1 className="text-2xl md:text-3xl font-bold text-[#00B37E] text-center">
            Prato Solidário
          </h1>
        </div>

        {/* Botões de tipo de usuário */}
        <div className="flex space-x-3 mb-8 bg-gray-100 rounded-2xl p-1">
          <button
            onClick={() => setTipoUsuario("doador")}
            className={`px-4 py-2 rounded-xl text-sm md:text-base font-medium transition-all duration-200 ${tipoUsuario === "doador"
              ? "bg-[#00B37E] text-white shadow-md"
              : "bg-transparent text-gray-600 hover:bg-[#00B37E] hover:text-white"
              }`}
          >
            Sou Doador
          </button>
          <button
            onClick={() => setTipoUsuario("beneficiario")}
            className={`px-4 py-2 rounded-xl text-sm md:text-base font-medium transition-all duration-200 ${tipoUsuario === "beneficiario"
              ? "bg-[#00B37E] text-white shadow-md"
              : "bg-transparent text-gray-600 hover:bg-[#00B37E] hover:text-white"
              }`}
          >
            Sou Beneficiário
          </button>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-3 text-center">
          Bem-vindo de volta
        </h2>
        <p className="text-gray-500 text-sm md:text-base mb-6 text-center">
          Entre na sua conta para continuar fazendo a diferença
        </p>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm md:text-base">
              E-mail
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B37E] text-sm md:text-base"
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm md:text-base">
              Senha
            </label>
            <input
              type="password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B37E] text-sm md:text-base"
              placeholder="Digite sua senha"
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="accent-[#00B37E]" />
              <span>Lembrar de mim</span>
            </label>
            <a href="#" className="text-[#00B37E] hover:underline">
              Esqueceu a senha?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-[#00B37E] text-white py-2 rounded-lg font-semibold hover:bg-[#00996D] transition text-sm md:text-base shadow-md"
          >
            Entrar
          </button>

          <p className="text-center text-sm text-gray-600">
            Ainda não tem uma conta?{" "}
            <a href="/doador/cadastro" className="text-[#00B37E] font-semibold hover:underline">
              Cadastre-se
            </a>
          </p>
        </form>
      </div>

      {/* ======== Parte Direita (Imagem e Slogan) ======== */}
      <div className="relative flex-1 flex items-center justify-center bg-linear-to-b from-green-50 to-white">
        <div className="absolute inset-0">
          <Image
            src="/login.svg"
            alt="Imagem de fundo"
            fill
            className="object-cover opacity-90"
            priority
          />
        </div>

        <div className="relative z-10 bg-white/70 p-6 md:p-10 rounded-2xl text-center max-w-md m-4 shadow-md">
          <h2 className="text-[#00B37E] text-lg md:text-2xl font-bold mb-3">
            Juntos contra o desperdício
          </h2>
          <p className="text-gray-700 text-xs md:text-sm leading-relaxed">
            Mais de <strong>234 parceiros</strong> já fazem parte da nossa rede
            de solidariedade, salvando <strong>18,5 toneladas</strong> de alimentos.
          </p>
        </div>
      </div>
    </div>
  );
}
