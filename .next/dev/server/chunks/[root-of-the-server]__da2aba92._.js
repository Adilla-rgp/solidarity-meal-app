module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/estudos/solidarity-meal-app/app/api/mocks/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/estudos/solidarity-meal-app/node_modules/next/server.js [app-route] (ecmascript)");
;
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
            imagem: "/paes-e-bolos.jpg"
        },
        {
            nome: "Legumes frescos variados",
            doador: "Mercado Vila Verde",
            tipo: "Supermercado",
            quantidade: "15kg",
            validade: "04/10/2025",
            distancia: "2.8 km",
            imagem: "/cesta-dos-vegetais.jpg"
        },
        {
            nome: "Frutas frescas sortidas",
            doador: "Feira Orgânica São José",
            tipo: "Feira",
            quantidade: "10kg",
            validade: "03/10/2025",
            distancia: "3.5 km",
            imagem: "/frutas.jpg"
        }
    ],
    tiposAlimento: [
        {
            value: "paes",
            label: "Pães"
        },
        {
            value: "bolos",
            label: "Bolos"
        },
        {
            value: "frutas",
            label: "Frutas"
        },
        {
            value: "legumes",
            label: "Legumes"
        },
        {
            value: "verduras",
            label: "Verduras"
        },
        {
            value: "carnes",
            label: "Carnes"
        },
        {
            value: "bebidas",
            label: "Bebidas"
        },
        {
            value: "laticinios",
            label: "Laticínios"
        },
        {
            value: "enlatados",
            label: "Enlatados"
        },
        {
            value: "outros",
            label: "Outros"
        }
    ],
    unidades: [
        {
            value: "unidade",
            label: "Unidade"
        },
        {
            value: "kg",
            label: "Quilo (kg)"
        },
        {
            value: "g",
            label: "Grama (g)"
        },
        {
            value: "litro",
            label: "Litro (L)"
        },
        {
            value: "ml",
            label: "Mililitro (ml)"
        },
        {
            value: "caixa",
            label: "Caixa"
        },
        {
            value: "pacote",
            label: "Pacote"
        },
        {
            value: "saco",
            label: "Saco"
        }
    ],
    perfilDoador: {
        nome: "João Doador",
        email: "joao@exemplo.com",
        estabelecimento: "Padaria Trigo Dourado",
        tipo: "Doador",
        doacoes: [
            {
                nome: "Pães e bolos",
                data: "02/10/2025",
                status: "Entregue"
            },
            {
                nome: "Frutas frescas",
                data: "28/09/2025",
                status: "Em andamento"
            }
        ]
    },
    perfil: {
        nome: "marlon rios",
        email: "riosmarlon@example.com",
        endereco: "Rua das Flores, 123 - Recife, PE",
        tipo: "Beneficiário",
        doacoes: [
            {
                nome: "Cesta básica",
                data: "02/10/2025",
                status: "Entregue"
            },
            {
                nome: "Legumes frescos",
                data: "28/09/2025",
                status: "Em andamento"
            }
        ],
        beneficios: [
            {
                nome: "Cesta básica recebida",
                data: "01/10/2025"
            },
            {
                nome: "Kit de frutas frescas",
                data: "25/09/2025"
            }
        ]
    },
    reservas: [
        {
            imagem: "/cesta_alimentos.jpg",
            titulo: "Cesta de alimentos - Mercado Esperança",
            data: "10/11/2025",
            status: "confirmada"
        },
        {
            imagem: "/frutas.jpg",
            titulo: "frutas - Feira Central",
            data: "12/11/2025",
            status: "pendente"
        },
        {
            imagem: "/cesta-dos-vegetais.jpg",
            titulo: "Verduras frescas - Horta Comunitária",
            data: "14/11/2025",
            status: "cancelada"
        }
    ],
    grafico: [
        {
            mes: "Jun",
            doacoes: 12
        },
        {
            mes: "Jul",
            doacoes: 18
        },
        {
            mes: "Ago",
            doacoes: 15
        },
        {
            mes: "Set",
            doacoes: 24
        },
        {
            mes: "Out",
            doacoes: 20
        }
    ]
};
async function GET() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(mocks);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__da2aba92._.js.map