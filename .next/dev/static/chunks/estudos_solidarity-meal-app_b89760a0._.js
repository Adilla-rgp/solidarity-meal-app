(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/estudos/solidarity-meal-app/app/contexts/DoadorContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DoadorProvider",
    ()=>DoadorProvider,
    "useDoador",
    ()=>useDoador
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/estudos/solidarity-meal-app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/estudos/solidarity-meal-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
const DoadorContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function DoadorProvider({ children }) {
    _s();
    const [doador, setDoador] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [doacoes, setDoacoes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const carregarDoador = (email)=>{
        const doadores = JSON.parse(localStorage.getItem("doadores") || "[]");
        const encontrado = doadores.find((d)=>d.email.toLowerCase() === email.toLowerCase());
        if (encontrado) {
            setDoador(encontrado);
            setDoacoes(JSON.parse(localStorage.getItem("doacoes") || "[]").filter((d)=>d.doadorEmail === email));
        }
    };
    const adicionarDoacao = (novaDoacao)=>{
        if (!doador) return;
        const doacao = {
            id: crypto.randomUUID(),
            ...novaDoacao,
            status: "ativa",
            data: new Date().toLocaleDateString("pt-BR"),
            doadorEmail: doador.email
        };
        const atualizadas = [
            ...doacoes,
            doacao
        ];
        setDoacoes(atualizadas);
        localStorage.setItem("doacoes", JSON.stringify(atualizadas));
    };
    const atualizarStatusDoacao = (id, status)=>{
        const atualizadas = doacoes.map((d)=>d.id === id ? {
                ...d,
                status
            } : d);
        setDoacoes(atualizadas);
        localStorage.setItem("doacoes", JSON.stringify(atualizadas));
    };
    const cadastrarDoador = (dados)=>{
        const lista = JSON.parse(localStorage.getItem("doadores") || "[]");
        const novo = {
            id: crypto.randomUUID(),
            ...dados
        };
        lista.push(novo);
        localStorage.setItem("doadores", JSON.stringify(lista));
        setDoador(novo);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DoadorContext.Provider, {
        value: {
            doador,
            doacoes,
            adicionarDoacao,
            atualizarStatusDoacao,
            cadastrarDoador,
            carregarDoador
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/estudos/solidarity-meal-app/app/contexts/DoadorContext.tsx",
        lineNumber: 104,
        columnNumber: 5
    }, this);
}
_s(DoadorProvider, "/XbbRZiZ6kdwpunpC2oE6pO3s2Y=");
_c = DoadorProvider;
function useDoador() {
    _s1();
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(DoadorContext);
    if (!ctx) throw new Error("useDoador fora do provider");
    return ctx;
}
_s1(useDoador, "/dMy7t63NXD4eYACoT93CePwGrg=");
var _c;
__turbopack_context__.k.register(_c, "DoadorProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
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
"[project]/estudos/solidarity-meal-app/app/login/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LoginPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/estudos/solidarity-meal-app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/estudos/solidarity-meal-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/estudos/solidarity-meal-app/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$app$2f$contexts$2f$autenticacaoContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/estudos/solidarity-meal-app/app/contexts/autenticacaoContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$app$2f$contexts$2f$DoadorContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/estudos/solidarity-meal-app/app/contexts/DoadorContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$app$2f$contexts$2f$BeneficiarioContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/estudos/solidarity-meal-app/app/contexts/BeneficiarioContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function LoginPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { login } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$app$2f$contexts$2f$autenticacaoContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const { carregarDoador } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$app$2f$contexts$2f$DoadorContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDoador"])();
    const { carregarBeneficiario } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$app$2f$contexts$2f$BeneficiarioContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBeneficiario"])();
    const [tipoUsuario, setTipoUsuario] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("doador");
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [senha, setSenha] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [erro, setErro] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const handleSubmit = (e)=>{
        e.preventDefault();
        setErro("");
        if (!email || !senha) {
            setErro("Preencha todos os campos");
            return;
        }
        const sucesso = login(email, senha, tipoUsuario);
        if (!sucesso) {
            setErro("Email ou senha inválidos");
            return;
        }
        if (tipoUsuario === "doador") {
            carregarDoador(email);
            router.push("/doador/dashboard");
        } else {
            carregarBeneficiario(email);
            router.push("/beneficiario/doacoes");
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: handleSubmit,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "email",
                value: email,
                onChange: (e)=>setEmail(e.target.value)
            }, void 0, false, {
                fileName: "[project]/estudos/solidarity-meal-app/app/login/page.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "password",
                value: senha,
                onChange: (e)=>setSenha(e.target.value)
            }, void 0, false, {
                fileName: "[project]/estudos/solidarity-meal-app/app/login/page.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "submit",
                children: "Entrar"
            }, void 0, false, {
                fileName: "[project]/estudos/solidarity-meal-app/app/login/page.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/estudos/solidarity-meal-app/app/login/page.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, this);
}
_s(LoginPage, "dkyNuhqw76mAU71hUHjHjcFyJgI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$app$2f$contexts$2f$autenticacaoContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$app$2f$contexts$2f$DoadorContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDoador"],
        __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$app$2f$contexts$2f$BeneficiarioContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBeneficiario"]
    ];
});
_c = LoginPage;
var _c;
__turbopack_context__.k.register(_c, "LoginPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/estudos/solidarity-meal-app/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/estudos/solidarity-meal-app/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=estudos_solidarity-meal-app_b89760a0._.js.map