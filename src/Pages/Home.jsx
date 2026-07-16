import React, { useState } from "react";
import NavBar from "../Components/NavBar";
import BillBoard from "../Components/BillBoard";
import MovieRow from "../Components/MovieRow";
import Footer from "../Components/Footer";
import SearchResults from "../Components/SearchResults";
import options from "../Data/options";

const Home = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = () => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        search,
      )}&language=en-US&page=1`,
      options,
    )
      .then((res) => res.json())
      .then((res) => {
        setSearchResults(res.results || []);
        setShowSearch(true);
      })
      .catch((err) => console.error(err));
  };

  const closeSearch = () => {
    setShowSearch(false);
    setSearch("");
    setSearchResults([]);
  };

  return (
    <div>
      <NavBar
        search={search}
        setSearch={setSearch}
        onSearch={handleSearch}
        showSearch={showSearch}
        setShowSearch={setShowSearch}
      />

      {showSearch ? (
        <SearchResults
          results={searchResults}
          query={search}
          onClose={closeSearch}
        />
      ) : (
        <div>
          <BillBoard />
          <MovieRow title="Now Playing" category="now_playing" />
          <MovieRow title="Top Rated" category="top_rated" />
          <MovieRow title="Popular" category="popular" />
          <MovieRow title="Upcoming" category="upcoming" />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Home;
