import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwipeCore, { Navigation } from "swiper";
import styles from "./style.module.css";
import "swiper/css";
import "swiper/css/navigation";
// import Carousel from "react-multi-carousel";
import Card from "../../components/card";
import { useFavoriteContext } from "../../context/FavContext";
// import { useMediaQuery } from "react-responsive";

// eslint-disable-next-line react-hooks/rules-of-hooks
SwipeCore.use([Navigation]);

export default function Shows() {
  const [shows, setShows] = useState([]);
  const [limitCards, setLimitCards] = useState(31);
  const { favorites, setFavorites } = useFavoriteContext();
  // const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  // const isTablet = useMediaQuery({
  //   query: "(max-width: 1024px) and (min-width: 464px)",
  // });
  // const isMobile = useMediaQuery({
  //   query: "(max-width: 464px) and (min-width: 0)",
  // });;

  function incrementCards() {
    setLimitCards((prev) => prev + 20);
  }

  function handleFavorites(item) {
    // console.log("🚀 ~ handleFavorites ~ id:", id);
    const isFavorite = favorites.some((fav) => fav.id === item.id);
    if (isFavorite) {
      const newList = favorites.filter((fav) => fav.id !== item.id);
      setFavorites(newList);
    } else {
      setFavorites((prev) => [...prev, item]);
    }
  }

  // const responsive = {
  //   superLargeDesktop: {
  //     breakpoint: { max: 3000, min: 1480 },
  //     items: 5,
  //   },
  //   desktop: {
  //     breakpoint: { max: 1480, min: 1024 },
  //     items: 4,
  //     partialVisibilityGutter: 30,
  //     slidesToSlide: 2,
  //   },
  //   tablet: {
  //     breakpoint: { max: 1024, min: 768 },
  //     items: 3,
  //   },
  //   mobile: {
  //     breakpoint: { max: 768, min: 0 },
  //     items: 2,
  //   },
  // };

  async function getShows() {
    const response = await fetch("https://api.tvmaze.com/show");
    // console.log("🚀 ~ getShows ~ response:", response);

    const data = await response.json();
    // console.log("🚀 ~ getShows ~ data:", data);

    setShows(data);
  }

  useEffect(() => {
    getShows();
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.highlights}>
            <h2>Destaques da Plataforma</h2>
          </div>

          {shows.length > 0 && (
            <Swiper
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },

                630: {
                  slidesPerView: 2,
                },
                980: {
                  slidesPerView: 3,
                },
                1280: {
                  slidesPerView: 4,
                },
                1780: {
                  slidesPerView: 5,
                },
                1920: {
                  slidesPerView: 6,
                },
              }}
              navigation
              //  style= {{display: "none"}}
              className={styles.swiper}
              spaceBetween={0}
              slidesPerView={6}
              onSlideChange={() => console.log("slide change")}
              // onSwiper={(swiper) => console.log(swiper)}
            >
              {shows.slice(0, 20).map((item, index) => {
                return (
                  <SwiperSlide className={styles.cardWrapper}>
                    <div className={styles.position}>{index + 1}</div>
                    <Card
                      url={`/shows/${item.id}`}
                      rating={item.rating.average}
                      position={index + 1}
                      navigation
                      id={item.id}
                      image={item.image.original}
                      name={item.name}
                      favorite={favorites.find((fav) => fav.id === item.id)}
                      onClickFavorite={() => handleFavorites(item)}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
          <div className={styles.navMovies}>
            <h2>Mais Filmes</h2>
          </div>
          <div className={styles.navCard}>
            {shows.length > 10 &&
              shows.slice(21, limitCards).map((item) => {
                return (
                  <Card
                    url={`/shows/${item.id}`}
                    rating={item.rating.average}
                    id={item.id}
                    image={item.image.original}
                    name={item.name}
                    favorite={favorites.find((fav) => fav.id === item.id)}
                    onClickFavorite={() => handleFavorites(item)}
                  />
                );
              })}
          </div>
          <button
            type="button"
            onClick={() => incrementCards()}
            className={styles.button}
          >
            Ver mais
          </button>
        </div>
      </div>
    </main>
  );
}
