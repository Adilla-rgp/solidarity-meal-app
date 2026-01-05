"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/autenticacaoContext";


export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [tipoUsuario, setTipoUsuario] = useState<"doador" | "beneficiario">(
    "doador"
  );
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");

    const sucesso = login(email, senha, tipoUsuario);

    if (!sucesso) {
      setErro("Email ou senha inválidos");
      return;
    }

    router.push(
      tipoUsuario === "doador"
        ? "/doador/dashboard"
        : "/beneficiario/doacoes"
    );
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex flex-col justify-center items-center bg-white px-6">
        <div className="flex items-center gap-3 mb-8">
          <Image src="/logo.svg" alt="Logo" width={50} height={50} />
          <h1 className="text-2xl font-bold text-[#00B37E]">
            Prato Solidário
          </h1>
        </div>

        <div className="flex mb-6 bg-gray-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setTipoUsuario("doador")}
            className={`px-4 py-2 rounded-lg ${
              tipoUsuario === "doador"
                ? "bg-[#00B37E] text-white"
                : "text-gray-600"
            }`}
          >
            Sou Doador
          </button>

          <button
            type="button"
            onClick={() => setTipoUsuario("beneficiario")}
            className={`px-4 py-2 rounded-lg ${
              tipoUsuario === "beneficiario"
                ? "bg-[#00B37E] text-white"
                : "text-gray-600"
            }`}
          >
            Sou Beneficiário
          </button>
        </div>

        {erro && (
          <p className="mb-4 text-sm text-red-600 bg-red-50 px-4 py-2 rounded">
            {erro}
          </p>
        )}

        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 text-black placeholder:text-black">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-4 py-2 rounded"
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full border px-4 py-2 rounded"
          />

          <button
            type="submit"
            className="w-full bg-[#00B37E] text-white py-2 rounded font-semibold"
          >
            Entrar
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          Não tem conta?{" "}
          <a
            href={
              tipoUsuario === "doador"
                ? "/doador/cadastro"
                : "/beneficiario/cadastro"
            }
            className="text-[#00B37E] font-semibold"
          >
            Cadastre-se
          </a>
        </p>
      </div>

      <div className="hidden md:flex flex-1 items-center justify-center bg-green-50">
        <Image src="/login.svg" alt="Ilustração" width={400} height={400} />
      </div>
    </div>
  );
}