import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { Link } from "react-router-dom";
import styles from "./style.module.css";

export default function Card({
  id,
  image,
  name,
  favorite,
  rating,
  url,
  onClickFavorite,
}) {
  return (
    <div key={id} className={`${styles.card} ${!name ? styles.addBorder : ""}`}>
      <div
        className={`${styles.imageContainer} ${!name ? styles.addBorder : ""}`}
      >
        <Link to={url}>
          <img src={image} alt="img" className={styles.image} />
        </Link>
      </div>

      {name && (
        <div className={styles.nameContent}>
          <div>
            {" "}
            <Link to={url}>
              <h1 className={styles.name}> {name}</h1>{" "}
            </Link>
          </div>
          <div className={styles.ratingFaves}>
            <button type="button" onClick={() => onClickFavorite()} className={styles.selectFavorite}>
              {" "}
              {favorite ? <MdFavorite /> : <MdFavoriteBorder />}
            </button>
            <div>{rating ?? 0}</div>
          </div>
        </div>
      )}
    </div>
  );
}
