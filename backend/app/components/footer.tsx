"use client";

import Image from "next/image";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0F1A36] text-gray-300 py-12 px-8 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-gray-700 pb-10">
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-[#1DD1A1] p-2 rounded-lg flex items-center justify-center">
              <Image
                src="/logo.svg"
                alt="Logo Prato Solidário"
                width={28}
                height={28}
                className="w-6 h-6"
              />
            </div>
            <h2 className="text-lg font-semibold text-white">Prato Solidário</h2>
          </div>
          <p className="text-sm leading-relaxed">
            Combatendo o desperdício de alimentos e conectando solidariedade.
          </p>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">Plataforma</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-[#1DD1A1] transition-colors">Como Funciona</a></li>
            <li><a href="#" className="hover:text-[#1DD1A1] transition-colors">Para Doadores</a></li>
            <li><a href="#" className="hover:text-[#1DD1A1] transition-colors">Para Beneficiários</a></li>
            <li><a href="#" className="hover:text-[#1DD1A1] transition-colors">Parceiros</a></li>
          </ul>
        </div>

        {/* ===== Suporte ===== */}
        <div>
          <h3 className="text-white font-semibold mb-4">Suporte</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-[#1DD1A1] transition-colors">Central de Ajuda</a></li>
            <li><a href="#" className="hover:text-[#1DD1A1] transition-colors">Termos de Uso</a></li>
            <li><a href="#" className="hover:text-[#1DD1A1] transition-colors">Política de Privacidade</a></li>
            <li><a href="#" className="hover:text-[#1DD1A1] transition-colors">Contato</a></li>
          </ul>
        </div>

        {/* ===== Contato ===== */}
        <div>
          <h3 className="text-white font-semibold mb-4">Conecte-se</h3>
          <p className="text-sm mb-4">contato@pratosolidario.com.br</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-[#1DD1A1] transition-colors">
              <FaFacebookF size={18} />
            </a>
            <a href="#" className="hover:text-[#1DD1A1] transition-colors">
              <FaInstagram size={18} />
            </a>
            <a href="#" className="hover:text-[#1DD1A1] transition-colors">
              <FaLinkedinIn size={18} />
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto text-center text-sm text-gray-500 mt-8">
        © 2025 <span className="text-white font-medium">Prato Solidário</span>. Todos os direitos reservados.
      </div>
    </footer>
  );
}
