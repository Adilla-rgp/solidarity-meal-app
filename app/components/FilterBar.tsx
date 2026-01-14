"use client";

import { useState } from "react";

interface FilterBarProps {
  onFilterChange: (filters: { tipo: string; distancia: string }) => void;
}

export default function FilterBar({ onFilterChange }: FilterBarProps) {
  const [tipo, setTipo] = useState("");
  const [distancia, setDistancia] = useState("");

  const handleTipoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTipo = e.target.value;
    setTipo(newTipo);
    onFilterChange({ tipo: newTipo, distancia });
  };

  const handleDistanciaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDistancia = e.target.value;
    setDistancia(newDistancia);
    onFilterChange({ tipo, distancia: newDistancia });
  };

  return (
    <div className="flex gap-4 mt-6">
      <select
        value={tipo}
        onChange={handleTipoChange}
        className="border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-700"
      >
        <option value="">Todos os tipos</option>
        <option value="fruta">Frutas</option>
        <option value="verdura">Verduras</option>
        <option value="legume">Legumes</option>
        <option value="pao">Pães</option>
        <option value="laticinio">Laticínios</option>
        <option value="proteina">Proteínas</option>
        <option value="pronto">Refeições Prontas</option>
      </select>

      <select
        value={distancia}
        onChange={handleDistanciaChange}
        className="border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-700"
      >
        <option value="">Qualquer distância</option>
        <option value="5">Até 5 km</option>
        <option value="10">Até 10 km</option>
        <option value="15">Até 15 km</option>
        <option value="20">Até 20 km</option>
      </select>
    </div>
  );
}