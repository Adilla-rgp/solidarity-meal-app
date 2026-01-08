"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { href: "#como-funciona", label: "Como Funciona" },
    { href: "#impacto", label: "Nosso Impacto" },
    { href: "#depoimentos", label: "Depoimentos" },
  ];

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center">
              <div className="relative w-8 h-8">
                <Image
                  src="/logo.svg"
                  alt="Prato Solidário"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <span className="ml-2 text-lg font-semibold text-slate-800">
                Prato Solidário
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex md:items-center md:space-x-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-slate-700 hover:text-slate-900 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center space-x-3">
            <Link
              href="/login"
              className="hidden sm:inline-block px-4 py-2 rounded-md border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
            >
              Entrar
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Abrir menu"
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:bg-slate-100"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {open ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="md:hidden border-t border-slate-100">
          <div className="px-4 pt-4 pb-6 space-y-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block text-slate-700 text-base font-medium py-2 rounded hover:bg-slate-50"
              >
                {item.label}
              </a>
            ))}

            <Link
              href="/entrar"
              onClick={() => setOpen(false)}
              className="block w-full text-center px-4 py-2 rounded-md border border-slate-200 text-sm font-medium text-slate-700 bg-white"
            >
              Entrar
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
