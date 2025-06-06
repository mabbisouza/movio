import { useFavoriteContext } from "../../context/FavContext";
import Card from "../../components/card";
import styles from "./style.module.css";

export default function FavoritePage() {
    const {favorites, setFavorites} = useFavoriteContext();

    function handleFavorites(item) {
      const isFavorite = favorites.some((fav) => fav.id === item.id) 
      if (isFavorite) {
        const newList = favorites.filter((fav) => fav.id !== item.id)
        setFavorites(newList)
      } else {
        setFavorites(prev => [...prev, item])
      }
    }

    return (
        <main className={styles.main}>
      <div className={styles.container}>
        { favorites.length > 0 ? favorites.map((item) => {
            return (
                <Card
                url={`/shows/${item.id}`}
                rating={item.rating.average}
                id={item.id}
                image={item.image.original}
                name={item.name}
                favorite={favorites.find(fav => fav.id === item.id)}
                onClickFavorite={() => handleFavorites(item)}
                />
            )
        }) : <p className={styles.noFavMessage}>Não há favoritos.</p>}
      </div>
    </main>

    )
}