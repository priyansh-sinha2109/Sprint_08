import React from "react";
import NavBar from "../Components/NavBar";
import BillBoard from "../Components/BillBoard";
import MovieCard from "../Components/MovieCard";

const Home = () => {
  return (
    <div className="">
      <NavBar />
      <BillBoard />
      <MovieCard title="Trending Now" />
    </div>
  );
};

export default Home;
