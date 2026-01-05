(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/estudos/solidarity-meal-app/app/contexts/BeneficiarioContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BeneficiarioProvider",
    ()=>BeneficiarioProvider,
    "useBeneficiario",
    ()=>useBeneficiario
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/estudos/solidarity-meal-app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/estudos/solidarity-meal-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
const BeneficiarioContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function BeneficiarioProvider({ children }) {
    _s();
    const [beneficiario, setBeneficiario] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [reservas, setReservas] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const carregarBeneficiario = (email)=>{
        const lista = JSON.parse(localStorage.getItem("beneficiarios") || "[]");
        const encontrado = lista.find((b)=>b.email.toLowerCase() === email.toLowerCase());
        if (encontrado) {
            setBeneficiario(encontrado);
            setReservas(JSON.parse(localStorage.getItem("reservas") || "[]"));
        }
    };
    const adicionarReserva = ({ doacaoId })=>{
        const nova = {
            id: crypto.randomUUID(),
            doacaoId,
            data: new Date().toLocaleDateString("pt-BR"),
            status: "ativa"
        };
        const atualizadas = [
            ...reservas,
            nova
        ];
        setReservas(atualizadas);
        localStorage.setItem("reservas", JSON.stringify(atualizadas));
    };
    const removerReserva = (id)=>{
        const atualizadas = reservas.filter((r)=>r.id !== id);
        setReservas(atualizadas);
        localStorage.setItem("reservas", JSON.stringify(atualizadas));
    };
    const atualizarStatusReserva = (id, status)=>{
        const atualizadas = reservas.map((r)=>r.id === id ? {
                ...r,
                status
            } : r);
        setReservas(atualizadas);
        localStorage.setItem("reservas", JSON.stringify(atualizadas));
    };
    const cadastrarBeneficiario = (dados)=>{
        const lista = JSON.parse(localStorage.getItem("beneficiarios") || "[]");
        const novo = {
            id: crypto.randomUUID(),
            ...dados
        };
        lista.push(novo);
        localStorage.setItem("beneficiarios", JSON.stringify(lista));
        setBeneficiario(novo);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BeneficiarioContext.Provider, {
        value: {
            beneficiario,
            reservas,
            adicionarReserva,
            removerReserva,
            atualizarStatusReserva,
            cadastrarBeneficiario,
            carregarBeneficiario
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/estudos/solidarity-meal-app/app/contexts/BeneficiarioContext.tsx",
        lineNumber: 97,
        columnNumber: 5
    }, this);
}
_s(BeneficiarioProvider, "6rgHTyBiCCFD7J6OKIJA6lAyEEU=");
_c = BeneficiarioProvider;
function useBeneficiario() {
    _s1();
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(BeneficiarioContext);
    if (!ctx) throw new Error("useBeneficiario fora do provider");
    return ctx;
}
_s1(useBeneficiario, "/dMy7t63NXD4eYACoT93CePwGrg=");
var _c;
__turbopack_context__.k.register(_c, "BeneficiarioProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/estudos/solidarity-meal-app/app/beneficiario/layout.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BeneficiarioLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/estudos/solidarity-meal-app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$app$2f$contexts$2f$BeneficiarioContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/estudos/solidarity-meal-app/app/contexts/BeneficiarioContext.tsx [app-client] (ecmascript)");
"use client";
;
;
function BeneficiarioLayout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$app$2f$contexts$2f$BeneficiarioContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BeneficiarioProvider"], {
        children: children
    }, void 0, false, {
        fileName: "[project]/estudos/solidarity-meal-app/app/beneficiario/layout.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
_c = BeneficiarioLayout;
var _c;
__turbopack_context__.k.register(_c, "BeneficiarioLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=estudos_solidarity-meal-app_app_cc644724._.js.map