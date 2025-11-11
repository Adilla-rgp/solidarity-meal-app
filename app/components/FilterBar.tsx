const filtros = [
  "Pães e Massas",
  "Vegetais",
  "Frutas",
  "Laticínios",
  "Proteínas",
  "Próximo de vencer",
  "Menos de 5km",
];

export default function FilterBar() {
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {filtros.map((filtro, index) => (
        <button
          key={index}
          className="px-4 py-1.5 bg-gray-100 text-gray-700 rounded-full hover:bg-green-50 hover:text-green-600 transition"
        >
          {filtro}
        </button>
      ))}
    </div>
  );
}
