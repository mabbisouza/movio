import { createContext, useState, useContext, useEffect } from "react";

const FavContext = createContext();

const FavProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [initial, setInitial] = useState(true);

  useEffect(() => {
    const loadedFavorites = localStorage.getItem("favorites");
    if (favorites.length > 0) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setInitial(false);
    } else if (
      favorites?.length === 0 &&
      !initial &&
      loadedFavorites?.length > 0
    ) {
      localStorage.setItem("favorites", []);
      setInitial(false);
    }
  }, [favorites, initial]);

  useEffect(() => {
    const loadedFavorites = localStorage.getItem("favorites");
    if (loadedFavorites?.length > 0) {
      setFavorites(JSON.parse(loadedFavorites));
    }
  }, []);

  return (
    <FavContext.Provider value={{ favorites, setFavorites }}>
      {children}
    </FavContext.Provider>
  );
};

const useFavoriteContext = () => {
  return useContext(FavContext);
};

// eslint-disable-next-line react-refresh/only-export-components
export { FavProvider, useFavoriteContext };
