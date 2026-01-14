"use client";

interface FormInputProps {
  label: string;
  nome: string;
  tipo?: string;
  placeholder?: string;
  requerido?: boolean;
  valor: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  helpText?: string;
  disabled?: boolean;
  min?: string;
  step?: string;
}

export default function FormInput({
  label,
  nome,
  tipo = "text",
  placeholder = "",
  requerido = false,
  valor,
  onChange,
  helpText,
  disabled = false,
  min,
  step
}: FormInputProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {requerido && <span className="text-red-500">*</span>}
      </label>
      <input
        type={tipo}
        name={nome}
        placeholder={placeholder}
        required={requerido}
        value={valor}
        onChange={onChange}
        disabled={disabled}
        min={min}
        step={step}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
      />
      {helpText && (
        <p className="mt-1 text-sm text-gray-500">{helpText}</p>
      )}
    </div>
  );
} 