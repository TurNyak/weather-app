const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export async function getWeatherByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
  const res = await fetch(url);
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Failed to fetch weather");
  }
  return await res.json();
}

export async function getWeatherByCoords(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const res = await fetch(url);
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Failed to fetch weather");
  }
  return await res.json();
}
