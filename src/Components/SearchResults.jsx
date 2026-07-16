import React from "react";
import { IoClose } from "react-icons/io5";
import MovieCard from "./MovieCard";

const SearchResults = ({ results, query, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/98 overflow-y-auto pt-24 px-4 md:px-16">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white text-3xl hover:text-red-500 transition cursor-pointer"
        aria-label="Close search"
      >
        <IoClose />
      </button>

      <p className="text-white text-lg md:text-2xl mb-6">
        {results.length > 0
          ? `Results for "${query}"`
          : `No matches found for "${query}"`}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pb-16">
        {results.map((movie) => (
          <MovieCard
            key={movie.id}
            name={movie.title || movie.name}
            poster={movie.poster_path}
            year={movie.release_date?.slice(0, 4)}
            rating={movie.vote_average}
            genre={movie.genre_ids?.join(", ")}
            description={movie.overview}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
