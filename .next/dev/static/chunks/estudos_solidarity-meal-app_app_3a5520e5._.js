(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/estudos/solidarity-meal-app/app/components/FormInput.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

//form inputs
__turbopack_context__.s([
    "default",
    ()=>FormInput
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/estudos/solidarity-meal-app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function FormInput({ label, nome, tipo = "text", placeholder, requerido = false, helpText, valor, onChange }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mb-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block text-sm font-medium text-gray-700 mb-2",
                children: [
                    label,
                    " ",
                    requerido && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-red-500",
                        children: "*"
                    }, void 0, false, {
                        fileName: "[project]/estudos/solidarity-meal-app/app/components/FormInput.tsx",
                        lineNumber: 29,
                        columnNumber: 39
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/estudos/solidarity-meal-app/app/components/FormInput.tsx",
                lineNumber: 28,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: tipo,
                name: nome,
                value: valor,
                onChange: onChange,
                placeholder: placeholder,
                required: requerido,
                className: "w-full px-4 py-2.5 border border-green-700 rounded-lg  text-gray-700"
            }, void 0, false, {
                fileName: "[project]/estudos/solidarity-meal-app/app/components/FormInput.tsx",
                lineNumber: 32,
                columnNumber: 13
            }, this),
            helpText && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1 text-sm text-gray-700",
                children: helpText
            }, void 0, false, {
                fileName: "[project]/estudos/solidarity-meal-app/app/components/FormInput.tsx",
                lineNumber: 42,
                columnNumber: 26
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/estudos/solidarity-meal-app/app/components/FormInput.tsx",
        lineNumber: 26,
        columnNumber: 9
    }, this);
}
_c = FormInput;
var _c;
__turbopack_context__.k.register(_c, "FormInput");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/estudos/solidarity-meal-app/app/beneficiario/cadastro/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CadastroBeneficiarioPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/estudos/solidarity-meal-app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/estudos/solidarity-meal-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/estudos/solidarity-meal-app/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$app$2f$contexts$2f$BeneficiarioContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/estudos/solidarity-meal-app/app/contexts/BeneficiarioContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$app$2f$components$2f$FormInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/estudos/solidarity-meal-app/app/components/FormInput.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/estudos/solidarity-meal-app/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/estudos/solidarity-meal-app/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function CadastroBeneficiarioPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { cadastrarBeneficiario } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$app$2f$contexts$2f$BeneficiarioContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBeneficiario"])();
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        nome: "",
        senha: "",
        telefone: "",
        email: "",
        endereco: "",
        necessidade: ""
    });
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        if (errors[e.target.name]) {
            setErrors({
                ...errors,
                [e.target.name]: ""
            });
        }
    };
    const validateForm = ()=>{
        const newErrors = {};
        if (!formData.nome.trim()) {
            newErrors.nome = "Nome é obrigatório";
        }
        if (!formData.senha.trim()) {
            newErrors.senha = "Senha é obrigatória";
        }
        if (!formData.telefone.trim()) {
            newErrors.telefone = "Telefone é obrigatório";
        }
        if (!formData.email.trim()) {
            newErrors.email = "Email é obrigatório";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Email inválido";
        }
        if (!formData.endereco.trim()) {
            newErrors.endereco = "Endereço é obrigatório";
        }
        if (!formData.necessidade.trim()) {
            newErrors.necessidade = "Necessidade é obrigatória";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = (e)=>{
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        try {
            cadastrarBeneficiario(formData);
            alert("Cadastro realizado com sucesso!");
            router.push("/beneficiario/doacoes");
        } catch (error) {
            console.error(error);
            alert("Erro ao realizar cadastro. Tente novamente.");
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center mb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3 mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: "/logo.svg",
                                    alt: "Logo",
                                    width: 55,
                                    height: 55,
                                    className: "object-contain"
                                }, void 0, false, {
                                    fileName: "[project]/estudos/solidarity-meal-app/app/beneficiario/cadastro/page.tsx",
                                    lineNumber: 90,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-2xl font-bold text-green-600",
                                    children: "Prato Solidário"
                                }, void 0, false, {
                                    fileName: "[project]/estudos/solidarity-meal-app/app/beneficiario/cadastro/page.tsx",
                                    lineNumber: 98,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/estudos/solidarity-meal-app/app/beneficiario/cadastro/page.tsx",
                            lineNumber: 88,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-semibold text-gray-800",
                            children: "Cadastro de Beneficiário"
                        }, void 0, false, {
                            fileName: "[project]/estudos/solidarity-meal-app/app/beneficiario/cadastro/page.tsx",
                            lineNumber: 102,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-500 text-center mt-2",
                            children: "Preencha seus dados para receber doações:"
                        }, void 0, false, {
                            fileName: "[project]/estudos/solidarity-meal-app/app/beneficiario/cadastro/page.tsx",
                            lineNumber: 104,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/estudos/solidarity-meal-app/app/beneficiario/cadastro/page.tsx",
                    lineNumber: 87,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    className: "space-y-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$app$2f$components$2f$FormInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            label: "Nome Completo",
                            nome: "nome",
                            placeholder: "Digite seu nome completo",
                            requerido: true,
                            valor: formData.nome,
                            onChange: handleChange
                        }, void 0, false, {
                            fileName: "[project]/estudos/solidarity-meal-app/app/beneficiario/cadastro/page.tsx",
                            lineNumber: 110,
                            columnNumber: 21
                        }, this),
                        errors.nome && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-red-500 text-sm -mt-4",
                            children: errors.nome
                        }, void 0, false, {
                            fileName: "[project]/estudos/solidarity-meal-app/app/beneficiario/cadastro/page.tsx",
                            lineNumber: 118,
                            columnNumber: 38
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$app$2f$components$2f$FormInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            label: "Senha",
                            nome: "senha",
                            tipo: "password",
                            placeholder: "Digite sua senha",
                            requerido: true,
                            valor: formData.senha,
                            onChange: handleChange
                        }, void 0, false, {
                            fileName: "[project]/estudos/solidarity-meal-app/app/beneficiario/cadastro/page.tsx",
                            lineNumber: 120,
                            columnNumber: 21
                        }, this),
                        errors.senha && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-red-500 text-sm -mt-4",
                            children: errors.senha
                        }, void 0, false, {
                            fileName: "[project]/estudos/solidarity-meal-app/app/beneficiario/cadastro/page.tsx",
                            lineNumber: 129,
                            columnNumber: 39
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$app$2f$components$2f$FormInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            label: "Telefone",
                            nome: "telefone",
                            tipo: "tel",
                            placeholder: "(11) 98765-4321",
                            requerido: true,
                            valor: formData.telefone,
                            onChange: handleChange,
                            helpText: "Formato: (DDD) 12345-6789"
                        }, void 0, false, {
                            fileName: "[project]/estudos/solidarity-meal-app/app/beneficiario/cadastro/page.tsx",
                            lineNumber: 132,
                            columnNumber: 21
                        }, this),
                        errors.telefone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-red-500 text-sm -mt-4",
                            children: errors.telefone
                        }, void 0, false, {
                            fileName: "[project]/estudos/solidarity-meal-app/app/beneficiario/cadastro/page.tsx",
                            lineNumber: 142,
                            columnNumber: 42
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$app$2f$components$2f$FormInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            label: "Email",
                            nome: "email",
                            tipo: "email",
                            placeholder: "seu@email.com",
                            requerido: true,
                            valor: formData.email,
                            onChange: handleChange
                        }, void 0, false, {
                            fileName: "[project]/estudos/solidarity-meal-app/app/beneficiario/cadastro/page.tsx",
                            lineNumber: 144,
                            columnNumber: 21
                        }, this),
                        errors.email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-red-500 text-sm -mt-4",
                            children: errors.email
                        }, void 0, false, {
                            fileName: "[project]/estudos/solidarity-meal-app/app/beneficiario/cadastro/page.tsx",
                            lineNumber: 153,
                            columnNumber: 39
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$app$2f$components$2f$FormInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            label: "Endereço",
                            nome: "endereco",
                            placeholder: "Ex: Rua das Flores, 123 - Bairro - Cidade/UF",
                            requerido: true,
                            valor: formData.endereco,
                            onChange: handleChange
                        }, void 0, false, {
                            fileName: "[project]/estudos/solidarity-meal-app/app/beneficiario/cadastro/page.tsx",
                            lineNumber: 155,
                            columnNumber: 21
                        }, this),
                        errors.endereco && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-red-500 text-sm -mt-4",
                            children: errors.endereco
                        }, void 0, false, {
                            fileName: "[project]/estudos/solidarity-meal-app/app/beneficiario/cadastro/page.tsx",
                            lineNumber: 163,
                            columnNumber: 42
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$app$2f$components$2f$FormInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            label: "Necessidade",
                            nome: "necessidade",
                            placeholder: "Ex: Refeições, roupas, cestas básicas...",
                            requerido: true,
                            valor: formData.necessidade,
                            onChange: handleChange
                        }, void 0, false, {
                            fileName: "[project]/estudos/solidarity-meal-app/app/beneficiario/cadastro/page.tsx",
                            lineNumber: 165,
                            columnNumber: 21
                        }, this),
                        errors.necessidade && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-red-500 text-sm -mt-4",
                            children: errors.necessidade
                        }, void 0, false, {
                            fileName: "[project]/estudos/solidarity-meal-app/app/beneficiario/cadastro/page.tsx",
                            lineNumber: 173,
                            columnNumber: 45
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-4 pt-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    className: "flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition shadow-md",
                                    children: "Cadastrar"
                                }, void 0, false, {
                                    fileName: "[project]/estudos/solidarity-meal-app/app/beneficiario/cadastro/page.tsx",
                                    lineNumber: 177,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/login",
                                    className: "flex-1 border border-gray-300 hover:bg-gray-50 py-3 rounded-lg font-semibold text-gray-700 text-center transition",
                                    children: "Cancelar"
                                }, void 0, false, {
                                    fileName: "[project]/estudos/solidarity-meal-app/app/beneficiario/cadastro/page.tsx",
                                    lineNumber: 181,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/estudos/solidarity-meal-app/app/beneficiario/cadastro/page.tsx",
                            lineNumber: 176,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/estudos/solidarity-meal-app/app/beneficiario/cadastro/page.tsx",
                    lineNumber: 108,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-center text-sm text-gray-600 mt-6",
                    children: [
                        " Já tem cadastro?",
                        " ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/login",
                            className: "text-green-600 font-semibold hover:underline",
                            children: "Faça login"
                        }, void 0, false, {
                            fileName: "[project]/estudos/solidarity-meal-app/app/beneficiario/cadastro/page.tsx",
                            lineNumber: 189,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/estudos/solidarity-meal-app/app/beneficiario/cadastro/page.tsx",
                    lineNumber: 188,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/estudos/solidarity-meal-app/app/beneficiario/cadastro/page.tsx",
            lineNumber: 85,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/estudos/solidarity-meal-app/app/beneficiario/cadastro/page.tsx",
        lineNumber: 84,
        columnNumber: 9
    }, this);
}
_s(CadastroBeneficiarioPage, "zLT4T9s0LWCDe5MIwgBe/2Ejkpc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$estudos$2f$solidarity$2d$meal$2d$app$2f$app$2f$contexts$2f$BeneficiarioContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBeneficiario"]
    ];
});
_c = CadastroBeneficiarioPage;
var _c;
__turbopack_context__.k.register(_c, "CadastroBeneficiarioPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=estudos_solidarity-meal-app_app_3a5520e5._.js.map