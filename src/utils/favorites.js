export const loadFavorites = () => {
  try {
    const saved = localStorage.getItem("favorites");
    console.log("Загружаем избранное из localStorage:", saved);
    return saved ? JSON.parse(saved) : [];
  } catch (err) {
    console.error("Ошибка чтения избранного:", err);
    return [];
  }
};


export const saveFavorites = (favorites) => {
  try {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  } catch (err) {
    console.error("Ошибка сохранения избранного:", err);
  }
};
