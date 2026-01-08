"use client";

import { Users, Package, Heart } from "lucide-react";

export default function Impacto() {
  const stats = [
    {
      icon: <Package className="w-10 h-10 text-green-600" />,
      value: "2.847",
      label: "Doações Realizadas",
    },
    {
      icon: <Heart className="w-10 h-10 text-orange-500" />,
      value: "18,5 ton",
      label: "Alimentos Doado",
    },
    {
      icon: <Users className="w-10 h-10 text-blue-500" />,
      value: "234",
      label: "Parceiros Ativos",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 text-purple-500"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6l4 2m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      value: "47.300",
      label: "Refeições Servidas",
    },
  ];

  return (
    <section
      id="impacto"
      className="bg-white py-20 px-6 lg:px-8 text-center border-t border-gray-100"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
          Nosso Impacto
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto mb-14">
          Números que expressam a força da solidariedade em ação.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition"
            >
              <div className="mb-4">{stat.icon}</div>
              <h3 className="text-3xl font-bold text-slate-900 mb-2">
                {stat.value}
              </h3>
              <p className="text-slate-600 text-sm font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
