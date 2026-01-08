//form inputs

interface FormInputProps {
    label: string;
    nome: string;
    tipo?: string;
    placeholder?: string;
    requerido?: boolean;
    helpText?: string;
    valor?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormInput({
    label,
    nome,
    tipo = "text",
    placeholder,
    requerido = false,
    helpText,
    valor,
    onChange,
}: FormInputProps) {

    return (
        <div className="mb-6">

            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label} {requerido && <span className="text-red-500">*</span>}
            </label>

            <input
                type={tipo}
                name={nome}
                value={valor}
                onChange={onChange}
                placeholder={placeholder}
                required={requerido}
                className="w-full px-4 py-2.5 border border-green-700 rounded-lg  text-gray-700"
            />

            {helpText && <p className="mt-1 text-sm text-gray-700">{helpText}</p>}

        </div >
    );
}