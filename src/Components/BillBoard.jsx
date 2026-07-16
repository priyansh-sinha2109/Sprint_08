import React, { useEffect, useState } from "react";
import { CiCircleInfo } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";

const GENRE_MAP = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

const BillBoard = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MmMxNDg3YzRiZDVmMmU0YjQ0ODkyOTY4N2QyNzA3YSIsIm5iZiI6MTc4NDAzMjk5Ni4xMzIsInN1YiI6IjZhNTYyZWU0M2NmNDYxZjk1ZWRhZTczZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.C05x8k31rM6KfsL5w8PNZqTIOoJURb1iQtPTvJtenSQ",
    },
  };

  // Track screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch a random upcoming movie
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      options,
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.results && res.results.length > 0) {
          const randomIndex = Math.floor(Math.random() * res.results.length);
          setMovie(res.results[randomIndex]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  // Once we have a movie, fetch its trailer (YouTube key)
  useEffect(() => {
    if (!movie) return;
    fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`,
      options,
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.results && res.results.length > 0) {
          const trailer =
            res.results.find(
              (v) => v.type === "Trailer" && v.site === "YouTube",
            ) || res.results.find((v) => v.site === "YouTube");
          if (trailer) setTrailerKey(trailer.key);
        }
      })
      .catch((err) => console.error(err));
  }, [movie]);

  // Show video after 2s delay, only on desktop, and only if a trailer exists
  useEffect(() => {
    if (isMobile || !trailerKey) return;
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, [isMobile, trailerKey]);

  if (!movie) {
    return <p>Loading...</p>;
  }

  const releaseYear = movie.release_date?.slice(0, 4) || "N/A";
  const genreNames =
    movie.genre_ids
      ?.map((id) => GENRE_MAP[id])
      .filter(Boolean)
      .slice(0, 2)
      .join(", ") || "N/A";
  const rating = movie.adult ? "A" : "U/A";

  return (
    <div className="relative h-[55vh] md:h-[56.25vw] w-full overflow-hidden">
      {showVideo && trailerKey ? (
        <iframe
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&loop=1&playlist=${trailerKey}&controls=0&modestbranding=1&showinfo=0`}
          title="Movie Trailer"
          allow="autoplay; encrypted-media"
          className="absolute inset-0 w-full h-full object-cover brightness-[60%] pointer-events-none scale-[1.5]"
        />
      ) : (
        <img
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          alt={movie.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div className="absolute top-[32%] md:top-[32%] ml-4 md:ml-16">
        <p className="text-white text-4xl md:text-6xl h-full lg:text-6xl font-bold drop-Shadow-xl">
          {movie.title}
        </p>
        <div className="flex flex-row gap-3 mt-4 md:mt-2 lg:mt-6 items-center text-white text-sm md:text-lg">
          <span>{genreNames}</span>
          <hr className="bg-gray-400 rounded-full h-2 w-2 " />
          <span>{releaseYear}</span>
          <hr className="bg-gray-400 rounded-full h-2 w-2 " />
          <span>⭐ {movie.vote_average?.toFixed(1)}</span>
          <hr className="bg-gray-400 rounded-full h-2 w-2 " />
          <span>{rating}</span>
        </div>
        <p className="text-white text-xs md:text-lg mt-3 md:mt-8 w-[80%] md:w-[55%] lg:w-[50%] drop-shadow-xl line-clamp-3">
          {movie.overview}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          <button className="bg-white text-black opacity-60 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-s lg:text-lg font-semibold flex flex-row items-center hover:opacity-20 cursor-pointer transition">
            <CiCircleInfo className="mr-1" />
            More Info
          </button>
          <button className="bg-white text-black opacity-60 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-s lg:text-lg font-semibold flex flex-row items-center hover:opacity-20 cursor-pointer transition">
            <CiHeart className="mr-1" />
            Add to WhishList
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillBoard;
