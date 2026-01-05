//selecionador de tipos de alimento e quantidades

interface FormSelectProps {
    label: string;
    nome: string;
    options: { value: string; label: string }[];
    requerido?: boolean;
    valor?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    placeholder?: string;
}

export default function FormSelect({
    label,
    nome,
    options,
    requerido = false,
    valor,
    onChange,
    placeholder = "Selecione uma opção",
}: FormSelectProps) {
    return (
        <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label} {requerido && <span className="text-red-500">*</span>}
            </label>
            <select
                name={nome}
                value={valor}
                onChange={onChange}
                required={requerido}
                className="w-full px-4 py-2.5 border border-green-700 rounded-lg bg-white text-gray-400"
            >
                <option value="" className="block text-sm font-medium text-green-700 mb-2">{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value} className="block text-sm font-medium text-gray-700 mb-2">
                        {option.label}
                    </option>
                ))}
            </select>
        </div >
    );
}