import React from "react";
const MovieCard = ({ name, poster, year, rating, genre }) => {
  return (
    <div className="group">
      <div>
        <div className="group bg-zinc-900 relative w-full aspect-[2/3] overflow-hidden rounded-md">
          <img
            src={poster}
            alt=""
            className="h-full w-full object-center object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
