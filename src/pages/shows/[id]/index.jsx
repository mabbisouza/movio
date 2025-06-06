import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styles from "./style.module.css";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useFavoriteContext } from "../../../context/FavContext";

export default function ShowIdPage() {
  const [cardContent, setCardContent] = useState(null);
  const { favorites, setFavorites } = useFavoriteContext();
  const { id } = useParams();

  function handleFavorites(item) {
    const isFavorite = favorites.some((fav) => fav.id === item.id);
    if (isFavorite) {
      const newList = favorites.filter((fav) => fav.id !== item.id);
      setFavorites(newList);
    } else {
      setFavorites((prev) => [...prev, item]);
    }
  }

  useEffect(() => {
    const getCard = async () => {
      const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
      const res = await response.json();
      setCardContent(res);
    };

    if (id) {
      getCard();
    }
  }, [id]);
  
  if (!cardContent) return "carregando...";

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <img
          src={cardContent?.image?.medium || "/assets/default-image.png"}
          alt={cardContent?.name}
          className={styles.cardImage}
        />
        <div className={styles.cardInfo}>
          <div className={styles.titleWrapper}>
            <h1 className={styles.cardTitle}>{cardContent?.name}</h1>
            <button
              type="button"
              onClick={() => handleFavorites(cardContent)}
              className={styles.favorited}
            >
              {favorites.find((fav) => fav.id === cardContent.id) ? (
                <MdFavorite />
              ) : (
                <MdFavoriteBorder />
              )}
            </button>
          </div>
          <p
            className={styles.cardSummary}
            dangerouslySetInnerHTML={{ __html: cardContent.summary }}
          />
        </div>
      </div>
    </main>
  );
}
