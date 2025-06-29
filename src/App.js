import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa"; // npm install react-icons
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import FavoritesList from "./components/FavoritesList";
import { getWeatherByCity, getWeatherByCoords } from "./utils/api";
import { loadFavorites, saveFavorites } from "./utils/favorites";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    const savedFavorites = loadFavorites();
    if (savedFavorites && savedFavorites.length > 0) setFavorites(savedFavorites);

    const lastCity = localStorage.getItem("lastCity");
    if (lastCity) {
      fetchWeather(lastCity);
    } else {
      if (!navigator.geolocation) return;
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          try {
            const { latitude, longitude } = pos.coords;
            const data = await getWeatherByCoords(latitude, longitude);
            setWeather(data);
            setCity(data.name);
          } catch {
            setError("Error fetching weather by location");
          }
        },
        () => setError("Please allow access to geolocation")
      );
    }
  }, []);

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const fetchWeather = async (searchCity) => {
    setError("");
    try {
      const data = await getWeatherByCity(searchCity);
      setWeather(data);
      setCity(searchCity);
      localStorage.setItem("lastCity", searchCity);
    } catch (err) {
      setWeather(null);
      setError(err.message || "Error fetching weather");
    }
  };

  const handleAddFavorite = () => {
    if (!weather) return;
    const exists = favorites.find((f) => f.id === weather.id);
    if (!exists) setFavorites([...favorites, { id: weather.id, name: weather.name }]);
  };

  const handleRemoveFavorite = (id) => {
    setFavorites(favorites.filter((f) => f.id !== id));
  };

  const handleSelectFavorite = (name) => {
    fetchWeather(name);
  };

  return (
    <div className="min-h-screen p-4 bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300 relative">
      {/* Кнопка переключения темы справа сверху */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-4 right-4 p-3 rounded-full bg-gray-300 dark:bg-gray-700 text-yellow-500 dark:text-yellow-400 shadow-lg hover:scale-110 transition-transform"
        aria-label="Toggle Dark Mode"
        title="Toggle Dark Mode"
      >
        {darkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
      </button>

      <div className="max-w-md mx-auto bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg">
        <header className="mb-4 flex flex-col items-center gap-4">
          <h1 className="text-2xl font-bold">🌤 Weather App</h1>
        </header>

        <SearchBar
          city={city}
          setCity={setCity}
          onSearch={() => fetchWeather(city)}
          placeholder="Enter city"
        />

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <WeatherCard weather={weather} onAddFavorite={handleAddFavorite} addFavoriteText="Add to Favorites" />

        <FavoritesList
          favorites={favorites}
          onSelect={handleSelectFavorite}
          onRemove={handleRemoveFavorite}
          favoritesTitle="Favorites"
        />
      </div>
    </div>
  );
}

export default App;
