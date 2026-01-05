"use client";

import Image from "next/image";

export default function Depoimentos() {
  const depoimentos = [
    {
      nome: "Maria Silva",
      cargo: "Coordenadora - ONG Esperança Viva",
      texto:
        "O Prato Solidário transformou nossa rotina. Agora conseguimos receber doações de forma organizada e atender mais famílias todas as semanas.",
      foto: "/perfil-depoimento1.svg",
    },
    {
      nome: "João Pereira",
      cargo: "Gerente - Supermercado Bom Sabor",
      texto:
        "Antes era difícil destinar os alimentos excedentes. Hoje, com a plataforma, tudo é simples, transparente e com impacto real.",
      foto: "/perfil-depoimento2.svg",
    },
    {
      nome: "Ana Costa",
      cargo: "Voluntária - Cozinha Comunitária Sementes",
      texto:
        "Ver a alegria das pessoas ao receber uma refeição nos motiva todos os dias. Essa iniciativa é essencial para o combate à fome.",
      foto: "/perfil-depoimento3.svg",
    },
  ];

  return (
    <section
      id="depoimentos"
      className="bg-gray-50 py-20 px-6 lg:px-8 text-center"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
          Depoimentos
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto mb-14">
          Conheça histórias de quem faz parte dessa rede de solidariedade.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {depoimentos.map((d, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm p-8 hover:shadow-md transition flex flex-col items-center text-center"
            >
              <div className="relative w-20 h-20 mb-5 rounded-full overflow-hidden">
                <Image
                  src={d.foto}
                  alt={d.nome}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <p className="text-slate-600 italic mb-4">“{d.texto}”</p>
              <h3 className="text-slate-900 font-semibold">{d.nome}</h3>
              <span className="text-slate-500 text-sm">{d.cargo}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
