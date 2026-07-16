import React from "react";
import NavBar from "../Components/NavBar";
import BillBoard from "../Components/BillBoard";
import MovieRow from "../Components/MovieRow";
import Footer from "../Components/Footer";

const Home = () => {
  return (
    <div className="">
      <NavBar />
      <BillBoard />
      <MovieRow title="Now Playing" category="now_playing" />
      <MovieRow title="Top Rated" category="top_rated" />
      <MovieRow title="Popular" category="popular" />
      <MovieRow title="Upcoming" category="upcoming" />
      <Footer />
    </div>
  );
};

export default Home;
