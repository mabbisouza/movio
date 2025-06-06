import { useState } from "react";
import styles from "./style.module.css";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router";

export default function Header() {
  const [searchValue, setSearchValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  console.log("🚀 ~ Header ~ searchValue:", searchValue);
  const navigate = useNavigate();

  function handleClick() {
    navigate("/");
  }

  function getSearchValue(value) {
    setErrorMessage("");
    setSearchValue(value);
  }

  function search() {
    if (searchValue.length < 4) {
      setErrorMessage("Digite três ou mais caracteres.");
      return;
    }

    if (searchValue.length > 3) {
      navigate(`/search?q=${searchValue}`);
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.sloganWrapper}>
      <button
        type="button"
        onClick={() => handleClick()}
        className={styles.title}
      >
        Movio
      </button>
      <p className={styles.slogan}>
        O jeito mais rápido de montar sua lista de filmes.
      </p>
      </div>
      <div className={styles.controls}>
        <div className={styles.search}>
          <div className={styles.searchContainer}>
            <input
              type="search"
              placeholder="Buscar filmes"
              className={styles.input}
              onChange={(e) => getSearchValue(e.target.value)}
            />
            <div className={styles.searchIconContent}>
              <button className={styles.searchIcon} onClick={() => search()}>
                {" "}
                <IoSearch />{" "}
              </button>
            </div>
          </div>
          <p className={styles.errorMessage}>{errorMessage}</p>
        </div>
      </div>
      <button
        type="button"
        className={styles.favButton}
        onClick={() => {
          navigate("/meusfavoritos");
        }}
      >
        Meus Favoritos
      </button>
    </header>
  );
}
