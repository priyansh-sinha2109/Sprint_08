import React, { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import MovieCard from "./MovieCard";
import options from "../Data/options";

const SearchResults = ({ query, onClose }) => {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);


  const bottomRef = useRef(null);


  useEffect(() => {
    setResults([]);
    setPage(1);
    setHasMore(true);
  }, [query]);

 
  useEffect(() => {
    if (!query) return;

    setLoading(true);

    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        query,
      )}&language=en-US&page=${page}`,
      options,
    )
      .then((res) => res.json())
      .then((res) => {
        const newMovies = res.results || [];

       
        if (page === 1) {
          setResults(newMovies);
        } else {
          setResults((prev) => [...prev, ...newMovies]);
        }

        // TMDB Search result over then:-
        if (page >= res.total_pages || newMovies.length === 0) {
          setHasMore(false);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [query, page]);


  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 },
    );

    const currentBottom = bottomRef.current;
    if (currentBottom) {
      observer.observe(currentBottom);
    }

   
    return () => {
      if (currentBottom) {
        observer.unobserve(currentBottom);
      }
    };
  }, [hasMore, loading, results]);

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

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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

      {loading && (
        <p className="text-zinc-400 text-center py-6">Loading more movies...</p>
      )}

     
      <div ref={bottomRef} className="h-10"></div>
    </div>
  );
};

export default SearchResults;
