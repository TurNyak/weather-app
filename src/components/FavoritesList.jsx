import React from "react";

export default function FavoritesList({ favorites, onSelect, onRemove, favoritesTitle }) {
  if (!favorites || favorites.length === 0) return null;

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">{favoritesTitle || "Favorites"}</h3>
      <ul className="space-y-2">
        {favorites.map(({ id, name }) => (
          <li
            key={id}
            className="flex justify-between items-center bg-gray-200 dark:bg-gray-700 rounded p-2"
          >
            <button
              onClick={() => onSelect(name)}
              className="text-left flex-grow hover:underline"
            >
              {name}
            </button>
            <button
              onClick={() => onRemove(id)}
              className="ml-4 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
              aria-label={`Remove ${name} from favorites`}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
