import React from "react";
import movies from "../Data/Movies";
import MovieCard from "./MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
const MovieRow = () => {
  return (
    <div className="text-white md:px-4 ">
      <h2 className="pt-10 pb-5 text-lg font-medium">Trending Movies</h2>
      <Swiper slidesPerView={"auto"} spaceBetween={10} className="mySwiper">
        {movies.map((object) => {
          return (
            <SwiperSlide key={object.id} className="max-w-72">
              <MovieCard
                name={object.name}
                poster={object.poster}
                year={object.year}
                rating={object.rating}
                genre={object.genre}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default MovieRow;
