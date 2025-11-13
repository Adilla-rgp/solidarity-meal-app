
interface FormTextareaProps {
    label: string;
    nome: string;
    placeholder?: string;
    requerido?: boolean;
    valor?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    linhas?: number;
}
//area do texto no form
export default function FormTextArea({
    label,
    nome,
    placeholder,
    requerido = false,
    valor,
    onChange,
    linhas = 4,
}: FormTextareaProps) {
    return (
        <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label} {requerido && <span className="text-red-500">*</span>}
            </label>
            <textarea
                name={nome}
                value={valor}
                onChange={onChange}
                placeholder={placeholder}
                required={requerido}
                rows={linhas}
                className="w-full px-4 py-2.5 border border-green-700 rounded-lg text-gray-700"
            />
        </div>
    );
}