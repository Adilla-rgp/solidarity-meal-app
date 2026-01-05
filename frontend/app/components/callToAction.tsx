"use client";

import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="bg-green-600 text-white py-20 px-6 lg:px-8 text-center">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          Pronto para Fazer Parte dessa Corrente do Bem?
        </h2>
        <p className="text-green-50 text-lg mb-10 max-w-2xl mx-auto">
          Junte-se a milhares de doadores, voluntários e instituições que
          acreditam no poder da solidariedade. Cada doação faz a diferença.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/cadastro"
            className="px-6 py-3 bg-white text-green-700 font-semibold rounded-md shadow hover:bg-green-50 transition"
          >
            Cadastrar-se
          </Link>
          <Link
            href="#como-funciona"
            className="px-6 py-3 border border-white text-white font-semibold rounded-md hover:bg-green-700 transition"
          >
            Saiba Mais
          </Link>
        </div>
      </div>
    </section>
  );
}
