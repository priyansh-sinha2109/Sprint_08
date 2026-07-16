const STORAGE_KEY = "myFavorites";

export function getFavorites() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function isFavorite(movieId) {
  const favorites = getFavorites();
  return favorites.some((item) => item.id === movieId);
}

export function addFavorite(movie) {
  const favorites = getFavorites();
  // avoid adding the same movie twice
  if (favorites.some((item) => item.id === movie.id)) return favorites;
  const updated = [...favorites, movie];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function removeFavorite(movieId) {
  const favorites = getFavorites();
  const updated = favorites.filter((item) => item.id !== movieId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}
