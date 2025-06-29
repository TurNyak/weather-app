import React from "react";

export default function WeatherCard({ weather, onAddFavorite, addFavoriteText }) {
  if (!weather) return null;

  const { name, weather: weatherInfo, main } = weather;
  const iconCode = weatherInfo[0].icon;
  const iconUrl = iconCode
    ? `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    : "";

  return (
    <div className="mb-6 p-4 rounded bg-gray-100 dark:bg-gray-800 shadow">
      <h2 className="text-xl font-semibold mb-2">{name}</h2>
      <div className="flex items-center gap-4">
        {iconUrl && <img src={iconUrl} alt={weatherInfo[0].description} />}
        <div>
          <p className="text-lg font-bold">{Math.round(main.temp)}°C</p>
          <p className="capitalize">{weatherInfo[0].description}</p>
          <p>Humidity: {main.humidity}%</p>
        </div>
      </div>
      {onAddFavorite && (
        <button
          onClick={onAddFavorite}
          className="mt-4 px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500 transition"
        >
          {addFavoriteText || "Add to Favorites"}
        </button>
      )}
    </div>
  );
}
