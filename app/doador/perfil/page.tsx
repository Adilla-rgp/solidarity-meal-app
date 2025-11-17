"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";
import Image from "next/image";
import { useDoador } from "@/app/contexts/DoadorContext";
import Link from "next/link";

export default function PerfilDoadorPage() {
  const router = useRouter();
  const { doador, doacoes } = useDoador();

  // Redirecionar para cadastro se não tiver doador
  useEffect(() => {
    if (!doador) {
      alert("Complete seu cadastro primeiro!");
      router.push("/doador/cadastro");
    }
  }, [doador, router]);

  if (!doador) {
    return null;
  }

  // estatísticas
  const totalDoacoes = doacoes.length;
  const doacoesAtivas = doacoes.filter((d) => d.status === "ativa").length;
  const doacoesEntregues = doacoes.filter((d) => d.status === "entregue").length;

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Meu Perfil</h1>

        {/* card de informações do doador */}
        <section className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-6">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-green-600 bg-green-50 flex items-center justify-center">
                <Image
                  src="/logo.svg"
                  alt="Foto do doador"
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {doador.nome}
                </h2>
                <p className="text-gray-600 mt-1">{doador.email}</p>
                <p className="text-gray-600">{doador.telefone}</p>
                <p className="text-gray-500 text-sm mt-2">
                  {doador.localizacao}
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <span className="inline-block bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full font-medium">
                    {doador.estabelecimento}
                  </span>
                  <span className="inline-block bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full font-medium">
                    Doador
                  </span>
                </div>
              </div>
            </div>

            <Link
              href="/doador/cadastro"
              className="px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg text-sm font-medium transition"
            >
              Editar Perfil
            </Link>
          </div>

          {/* estatísticas do perfil */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">
                {totalDoacoes}
              </p>
              <p className="text-gray-500 text-sm mt-1">Total de Doações</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-600">
                {doacoesAtivas}
              </p>
              <p className="text-gray-500 text-sm mt-1">Doações Ativas</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">
                {doacoesEntregues}
              </p>
              <p className="text-gray-500 text-sm mt-1">Doações Entregues</p>
            </div>
          </div>
        </section>

        {/* histórico de doações */}
        <section className="bg-white rounded-xl p-6 shadow-sm mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Histórico de Doações</h3>

          {doacoes.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-left">
                    <th className="py-3 px-4 text-gray-600 font-medium">Doação</th>

                    <th className="py-3 px-4 text-gray-600 font-medium">Tipo</th>

                    <th className="py-3 px-4 text-gray-600 font-medium">Quantidade</th>

                    <th className="py-3 px-4 text-gray-600 font-medium">Data</th>

                    <th className="py-3 px-4 text-gray-600 font-medium">Status</th>

                  </tr>
                </thead>

                <tbody>
                  {doacoes
                    .slice()
                    .reverse()
                    .map((doacao) => (
                      <tr
                        key={doacao.id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition"
                      >
                        <td className="py-3 px-4 text-gray-700 font-medium">
                          {doacao.nome}
                        </td>
                        <td className="py-3 px-4 text-gray-600">{doacao.tipo}</td>

                        <td className="py-3 px-4 text-gray-600">{doacao.quantidade} {doacao.unidade}</td>

                        <td className="py-3 px-4 text-gray-600"> {doacao.data}</td>

                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${doacao.status === "ativa"
                              ? "bg-green-100 text-green-700"
                              : doacao.status === "reservada"
                                ? "bg-orange-100 text-orange-700"
                                : "bg-blue-100 text-blue-700"
                              }`}
                          >

                            {doacao.status === "ativa" ? "Ativa" : doacao.status === "reservada" ? "Reservada" : "Entregue"}

                          </span>
                        </td>
                      </tr>
                    ))}

                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Você ainda não realizou nenhuma doação. </p>

              <Link
                href="/doador/nova_doacao"
                className="inline-block px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition"
              >Fazer Primeira Doação</Link>
            </div>

          )}
        </section>

        {/* detalhes de contato */}
        <section className="bg-white rounded-xl p-6 shadow-sm mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Informações de Contato</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <p className="text-sm text-gray-500 mb-1">Email</p>
              <p className="text-gray-800 font-medium">{doador.email}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Telefone</p>
              <p className="text-gray-800 font-medium">{doador.telefone}</p>
            </div>

            <div className="md:col-span-2">
              <p className="text-sm text-gray-500 mb-1">Endereço</p>
              <p className="text-gray-800 font-medium">{doador.localizacao}</p>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
}
