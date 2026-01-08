"use client";
import { Search } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setQuery(q);
    if (onSearch) onSearch(q);
  };

  return (
    <div className="flex items-center gap-2 mt-6">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Buscar por tipo de alimento, doador..."
          className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
    </div>
  );
}
