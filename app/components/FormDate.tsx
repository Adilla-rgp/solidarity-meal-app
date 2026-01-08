//funcionalidade de selecionar data no formulário do doador
import { Calendar } from "lucide-react";

interface FormDateProps {
    label: string;
    nome: string;
    requerido: boolean;
    valor?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    helpText?: string;
}

export default function FormDate({
    label,
    nome,
    requerido = false,
    valor,
    onChange,
    helpText,
}: FormDateProps) {
    return (
        <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label} {requerido && <span className="text-red-500">*</span>}
            </label>

            {/*calendario para selecionar a data */}
            <div className="relative">
                <Calendar className="absolute left-3 top-3 text-green-700" size={18} />
                <input
                    type="date"
                    name={nome}
                    value={valor}
                    onChange={onChange}
                    required={requerido}
                    className="w-full pl-10 pr-4 py-2.5 border border-green-700 rounded-lg  text-gray-400"
                />
            </div>
            {helpText && <p className="mt-1 text-sm text-gray-700">{helpText}</p>}
        </div>
    );
}