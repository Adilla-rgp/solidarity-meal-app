"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 text-center lg:text-left">
          <span className="inline-block text-green-700 font-medium text-sm mb-3">
            Solidariedade que alimenta
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6">
            Conectamos doadores com quem precisa de alimentos
          </h1>
          <p className="text-slate-600 text-base sm:text-lg mb-8">
            O <strong>Prato Solidário</strong> é uma plataforma que facilita a
            doação de alimentos excedentes de restaurantes, supermercados e
            feiras para instituições e pessoas em situação de vulnerabilidade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              href="/login"
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition"
            >
              Sou Doador
            </Link>
            <Link
              href="/login"
              className="px-6 py-3 border border-green-600 text-green-700 hover:bg-green-50 rounded-md font-medium transition"
            >
              Sou Beneficiário
            </Link>
          </div>
        </div>

        <div className="flex-1 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/header-image.svg" // ajuste o nome conforme seu arquivo
              alt="Doação de alimentos"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
