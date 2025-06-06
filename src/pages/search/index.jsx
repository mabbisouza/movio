import { useEffect, useState } from "react";
import styles from "./style.module.css";
import { useSearchParams, Link, useNavigate, Navigate } from "react-router";
import { SpinnerInfinity } from "spinners-react";

export default function Search() {
  const [showList, setShowList] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log("🚀 ~ Search ~ showList:", showList);
  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get("q");
  const navigate = useNavigate();

  useEffect(() => {
    const getList = async () => {
      setLoading(true);
      const response = await fetch(
        `https://api.tvmaze.com/search/shows?q=${searchValue}`
      );
      const res = await response.json();
      setShowList(res);
      setLoading(false);
    };

    if (searchValue) {
      getList();
    } else {
      navigate("/");
    }
  }, [navigate, searchValue]);

  return (
    <main className={styles.fullContainer}>
      <div className={styles.containerWrapper}>
        {!loading ? (
          <>
            {showList.length > 0 &&
              showList.map((item) => {
                return (
                  <div className={styles.showImages}>
                    <Link to={`/shows/${item.show.id}`}>
                      <img
                        src={item.show?.image?.medium || "./assets/default-image.png"}
                        alt="img"
                        className={styles.image}
                      />
                    </Link>
                  </div>
                );
              })}
          </>
        ) : (
          <SpinnerInfinity
            size={59}
            thickness={100}
            speed={150}
            color="rgba(255, 255, 255, 1)"
            secondaryColor="rgba(139, 0, 0, 1)"
          />
        )}
      </div>
    </main>
  );
}
