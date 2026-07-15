import React from "react";
import NavBar from "../Components/NavBar";
import BillBoard from "../Components/BillBoard";
import MovieRow from "../Components/MovieRow";

const Home = () => {
  return (
    <div className="">
      <NavBar />
      <BillBoard />
      <MovieRow />
      <MovieRow />
      <MovieRow />
    </div>
  );
};

export default Home;
