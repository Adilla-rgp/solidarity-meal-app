import { NextResponse } from "next/server";

const mocks = {
  doacoes: [
    {
      nome: "Pães e bolos sortidos",
      doador: "Padaria Trigo Dourado",
      tipo: "Padaria",
      quantidade: "8kg (aprox. 40 unidades)",
      validade: "Hoje às 20h",
      distancia: "1.2 km",
      urgente: true,
      imagem: "/paes-e-bolos.jpg",
    },
    {
      nome: "Legumes frescos variados",
      doador: "Mercado Vila Verde",
      tipo: "Supermercado",
      quantidade: "15kg",
      validade: "04/10/2025",
      distancia: "2.8 km",
      imagem: "/cesta-dos-vegetais.jpg",
    },
    {
      nome: "Frutas frescas sortidas",
      doador: "Feira Orgânica São José",
      tipo: "Feira",
      quantidade: "10kg",
      validade: "03/10/2025",
      distancia: "3.5 km",
      imagem: "/frutas.jpg",
    },
  ],
  tiposAlimento: [
    { value: "paes", label: "Pães" },
    { value: "bolos", label: "Bolos" },
    { value: "frutas", label: "Frutas" },
    { value: "legumes", label: "Legumes" },
    { value: "verduras", label: "Verduras" },
    { value: "carnes", label: "Carnes" },
    { value: "bebidas", label: "Bebidas" },
    { value: "laticinios", label: "Laticínios" },
    { value: "enlatados", label: "Enlatados" },
    { value: "outros", label: "Outros" },
  ],
  unidades: [
    { value: "unidade", label: "Unidade" },
    { value: "kg", label: "Quilo (kg)" },
    { value: "g", label: "Grama (g)" },
    { value: "litro", label: "Litro (L)" },
    { value: "ml", label: "Mililitro (ml)" },
    { value: "caixa", label: "Caixa" },
    { value: "pacote", label: "Pacote" },
    { value: "saco", label: "Saco" },
  ],
  perfilDoador: {
    nome: "João Doador",
    email: "joao@exemplo.com",
    estabelecimento: "Padaria Trigo Dourado",
    tipo: "Doador",
    doacoes: [
      { nome: "Pães e bolos", data: "02/10/2025", status: "Entregue" },
      { nome: "Frutas frescas", data: "28/09/2025", status: "Em andamento" },
    ],
  },
  perfil: {
    nome: "marlon rios",
    email: "riosmarlon@example.com",
    endereco: "Rua das Flores, 123 - Recife, PE",
    tipo: "Beneficiário",
    doacoes: [
      { nome: "Cesta básica", data: "02/10/2025", status: "Entregue" },
      { nome: "Legumes frescos", data: "28/09/2025", status: "Em andamento" },
    ],
    beneficios: [
      { nome: "Cesta básica recebida", data: "01/10/2025" },
      { nome: "Kit de frutas frescas", data: "25/09/2025" },
    ],
  },
  reservas: [
    {
      imagem: "/cesta_alimentos.jpg",
      titulo: "Cesta de alimentos - Mercado Esperança",
      data: "10/11/2025",
      status: "confirmada" as const,
    },
    {
      imagem: "/frutas.jpg",
      titulo: "frutas - Feira Central",
      data: "12/11/2025",
      status: "pendente" as const,
    },
    {
      imagem: "/cesta-dos-vegetais.jpg",
      titulo: "Verduras frescas - Horta Comunitária",
      data: "14/11/2025",
      status: "cancelada" as const,
    },
  ],
  grafico: [
    { mes: "Jun", doacoes: 12 },
    { mes: "Jul", doacoes: 18 },
    { mes: "Ago", doacoes: 15 },
    { mes: "Set", doacoes: 24 },
    { mes: "Out", doacoes: 20 },
  ],
};

export async function GET() {
  return NextResponse.json(mocks);
}