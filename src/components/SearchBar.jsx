import React from "react";

export default function SearchBar({ city, setCity, onSearch, placeholder }) {
  return (
    <div className="flex gap-2 mb-6">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder={placeholder || "Enter city"}
        className="flex-grow px-4 py-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
      />
      <button
        onClick={onSearch}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Search
      </button>
    </div>
  );
}
