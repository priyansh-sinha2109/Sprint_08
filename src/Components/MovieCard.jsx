import React from "react";
import { FaPlay, FaPlus, FaChevronDown } from "react-icons/fa";
import options from "../Data/options";

const MovieCard = ({
  name,
  poster,
  year,
  rating,
  genre,
  description,
  title,
}) => {
  return (
    <div className="group relative w-full">
      <div
        className="relative w-full origin-top
        transition-transform duration-300 ease-out
        md:group-hover:scale-80 md:group-hover:-translate-y-6 md:group-hover:z-20"
      >
        {/* Poster */}
        <div
          className="relative w-full aspect-[2/3] overflow-hidden rounded-md bg-zinc-800
          transition-all duration-300 ease-out
          md:group-hover:rounded-b-none md:group-hover:shadow-2xl md:group-hover:shadow-black/70"
        >
          <img
            src={`https://image.tmdb.org/t/p/w500/${poster}`}
            alt={name}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="mt-2 px-0.5 md:group-hover:hidden">
          <h2 className="text-sm font-medium text-white truncate">{name}</h2>
          <p className="text-xs text-zinc-400">
            ⭐ {rating} • {year}
          </p>
        </div>

        {/* Hover panel*/}
        <div
          className="hidden md:block absolute left-0 top-full w-full z-20
          bg-zinc-900 rounded-b-md shadow-xl p-3
          opacity-0 -translate-y-2 pointer-events-none
          md:group-hover:opacity-100 md:group-hover:translate-y-0 md:group-hover:pointer-events-auto
          transition-all duration-300 ease-out"
        >
          <div className="flex items-center gap-2 mb-3">
            <button
              aria-label="Play"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-black hover:bg-white/80 transition cursor-pointer"
            >
              <FaPlay size={12} className="ml-0.5" />
            </button>
            <button
              aria-label="Add to Wishlist"
              className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-zinc-400 text-white hover:border-white transition cursor-pointer"
            >
              <FaPlus size={12} />
            </button>
            <button
              aria-label="More Info"
              className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-zinc-400 text-white hover:border-white transition ml-auto cursor-pointer"
            >
              <FaChevronDown size={12} />
            </button>
          </div>

          <h3 className="text-white font-semibold text-sm mb-1 truncate">
            {name}
          </h3>

          <div className="flex items-center gap-2 text-xs mb-1">
            <span className="text-green-500 font-semibold">⭐ {rating}</span>
            <span className="text-zinc-300">{year}</span>
          </div>

          <p className="text-xs text-zinc-400 mb-1 truncate">{genre}</p>

          <p className="text-xs text-zinc-300 line-clamp-2">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
