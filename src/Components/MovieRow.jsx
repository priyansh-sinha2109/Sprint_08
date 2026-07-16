import React, { useEffect, useState } from "react";
import options from "../Data/options";
import MovieCard from "./MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
const MovieRow = ({ title, category }) => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`,
      options,
    )
      .then((res) => res.json())
      .then((res) => setMovies(res.results))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="text-white md:px-4 ">
      <p className="pt-10 pb-5 text-lg font-medium">{title}</p>
      <Swiper slidesPerView={"auto"} spaceBetween={10} className="mySwiper">
        {movies.map((object) => {
          return (
            <SwiperSlide key={object.id} className="max-w-72 ">
              <MovieCard
                movie={object}
                name={object.title || object.name}
                poster={object.poster_path}
                year={object.release_date?.slice(0, 4)}
                rating={object.vote_average}
                genre={object.genre_ids?.join(", ")}
                description={object.overview}
                category={object.category}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default MovieRow;
