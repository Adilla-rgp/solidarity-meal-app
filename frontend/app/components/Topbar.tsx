import { MapPin, Grid, Map } from "lucide-react";

export default function Topbar() {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">Encontrar Doações</h2>
        <p className="text-gray-500">Descubra alimentos disponíveis próximos a você</p>
      </div>

      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1 px-3 py-2 border rounded-md text-gray-700 hover:bg-gray-50">
          <MapPin size={16} /> 2km de distância
        </button>
        <button className="p-2 border rounded-md hover:bg-gray-50">
          <Grid size={18} />
        </button>
        <button className="p-2 border rounded-md hover:bg-gray-50">
          <Map size={18} />
        </button>
      </div>
    </div>
  );
}
