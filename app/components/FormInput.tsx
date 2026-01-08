import { ChangeEvent } from "react";

export interface FormInputProps {
    label: string;
    nome: string;
    tipo?: string;
    placeholder: string;
    requerido?: boolean;
    valor: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    helpText?: string;
    disabled?: boolean; // Adicionar esta prop
}

export default function FormInput({
    label,
    nome,
    tipo = "text",
    placeholder,
    requerido = false,
    valor,
    onChange,
    helpText,
    disabled = false, // Valor padrão
}: FormInputProps) {
    return (
        <div className="space-y-1">
            <label htmlFor={nome} className="block text-sm font-medium text-gray-700">
                {label}
                {requerido && <span className="text-red-500 ml-1">*</span>}
            </label>
            
            <input
                type={tipo}
                id={nome}
                name={nome}
                value={valor}
                onChange={onChange}
                placeholder={placeholder}
                required={requerido}
                disabled={disabled}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
            />
            
            {helpText && (
                <p className="text-xs text-gray-500 mt-1">{helpText}</p>
            )}
        </div>
    );
}