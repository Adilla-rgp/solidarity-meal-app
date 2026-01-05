module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/estudos/solidarity-meal-app/app/contexts/DoadorContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DoadorProvider",
    ()=>DoadorProvider,
    "useDoador",
    ()=>useDoador
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/estudos/solidarity-meal-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/estudos/solidarity-meal-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const DoadorContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function DoadorProvider({ children }) {
    // evitar setState em useEffect
    const [doador] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return null;
    });
    const [doacoes, setDoacoes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return [];
    });
    const adicionarDoacao = (novaDoacao)=>{
        const doacao = {
            id: crypto.randomUUID(),
            ...novaDoacao,
            status: "ativa",
            data: new Date().toLocaleDateString("pt-BR")
        };
        const atualizadas = [
            ...doacoes,
            doacao
        ];
        setDoacoes(atualizadas);
        localStorage.setItem("doacoes", JSON.stringify(atualizadas));
    };
    const atualizarStatusDoacao = (doacaoId, status)=>{
        const atualizadas = doacoes.map((d)=>d.id === doacaoId ? {
                ...d,
                status
            } : d);
        setDoacoes(atualizadas);
        localStorage.setItem("doacoes", JSON.stringify(atualizadas));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DoadorContext.Provider, {
        value: {
            doador,
            doacoes,
            adicionarDoacao,
            atualizarStatusDoacao
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/estudos/solidarity-meal-app/app/contexts/DoadorContext.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
function useDoador() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(DoadorContext);
    if (!context) {
        throw new Error("useDoador deve ser usado dentro de DoadorProvider");
    }
    return context;
}
}),
"[project]/estudos/solidarity-meal-app/app/contexts/BeneficiarioContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BeneficiarioProvider",
    ()=>BeneficiarioProvider,
    "useBeneficiario",
    ()=>useBeneficiario
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/estudos/solidarity-meal-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/estudos/solidarity-meal-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const BeneficiarioContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function BeneficiarioProvider({ children }) {
    // evitando setState em useEffect
    const [beneficiario] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return null;
    });
    const [reservas, setReservas] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return [];
    });
    const adicionarReserva = ({ doacaoId })=>{
        const novaReserva = {
            id: crypto.randomUUID(),
            doacaoId,
            data: new Date().toLocaleDateString("pt-BR"),
            status: "ativa"
        };
        const atualizadas = [
            ...reservas,
            novaReserva
        ];
        setReservas(atualizadas);
        localStorage.setItem("reservas", JSON.stringify(atualizadas));
        // Atualização do status da doação para "reservada"
        const doacoes = JSON.parse(localStorage.getItem("doacoes") || "[]");
        const doacoesAtualizadas = doacoes.map((d)=>d.id === doacaoId ? {
                ...d,
                status: "reservada"
            } : d);
        localStorage.setItem("doacoes", JSON.stringify(doacoesAtualizadas));
    };
    const removerReserva = (reservaId)=>{
        const atualizadas = reservas.filter((r)=>r.id !== reservaId);
        setReservas(atualizadas);
        localStorage.setItem("reservas", JSON.stringify(atualizadas));
    };
    const atualizarStatusReserva = (reservaId, status)=>{
        const atualizadas = reservas.map((r)=>r.id === reservaId ? {
                ...r,
                status
            } : r);
        setReservas(atualizadas);
        localStorage.setItem("reservas", JSON.stringify(atualizadas));
        // atualização da doação para entregue
        if (status === "concluida") {
            const reserva = reservas.find((r)=>r.id === reservaId);
            if (reserva) {
                const doacoes = JSON.parse(localStorage.getItem("doacoes") || "[]");
                const doacoesAtualizadas = doacoes.map((d)=>d.id === reserva.doacaoId ? {
                        ...d,
                        status: "entregue"
                    } : d);
                localStorage.setItem("doacoes", JSON.stringify(doacoesAtualizadas));
            }
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BeneficiarioContext.Provider, {
        value: {
            beneficiario,
            reservas,
            adicionarReserva,
            removerReserva,
            atualizarStatusReserva
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/estudos/solidarity-meal-app/app/contexts/BeneficiarioContext.tsx",
        lineNumber: 101,
        columnNumber: 5
    }, this);
}
function useBeneficiario() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(BeneficiarioContext);
    if (!context) {
        throw new Error("useBeneficiario deve ser usado dentro de BeneficiarioProvider");
    }
    return context;
}
}),
"[project]/estudos/solidarity-meal-app/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/estudos/solidarity-meal-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/estudos/solidarity-meal-app/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/estudos/solidarity-meal-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/estudos/solidarity-meal-app/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__5aabc359._.js.map