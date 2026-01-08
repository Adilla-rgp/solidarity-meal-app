"use client";

import { Package, Warehouse, Truck } from "lucide-react";

export default function ComoFunciona() {
  const steps = [
    {
      icon: <Package className="w-10 h-10 text-orange-500" />,
      title: "Cadastre a Doação",
      description:
        "Estabelecimentos informam os alimentos disponíveis para doação de forma rápida e segura através da nossa plataforma.",
    },
    {
      icon: <Warehouse className="w-10 h-10 text-blue-500" />,
      title: "Armazene e Reserve",
      description:
        "As doações são registradas e encaminhadas para instituições parceiras que realizam o armazenamento adequado.",
    },
    {
      icon: <Truck className="w-10 h-10 text-green-500" />,
      title: "Entregue e Distribua",
      description:
        "Os alimentos são coletados e distribuídos para quem mais precisa, garantindo que cheguem frescos e em boas condições.",
    },
  ];

  return (
    <section
      id="como-funciona"
      className="bg-gray-50 py-20 px-6 lg:px-8 text-center"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
          Como Funciona
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto mb-12">
          Simples, solidário e eficiente. Em apenas três etapas você pode fazer
          a diferença.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition"
            >
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">
                {step.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
