import React, { useState, useCallback, useEffect } from "react";
import NavBar from "../Components/NavBar";
import BillBoard from "../Components/BillBoard";
import MovieRow from "../Components/MovieRow";
import Footer from "../Components/Footer";
import MoodMatcher from "../Components/MoodMatcher";
import SearchResults from "../Components/SearchResults";
import debounce from "../Utils/Debounce";

const Home = () => {
  const [search, setSearch] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const debouncedSearch = useCallback(
    debounce((value) => {
      if (value.trim() === "") {
        setShowSearch(false);
        setActiveQuery("");
        return;
      }
      setActiveQuery(value);
      setShowSearch(true);
    }, 500),
    [],
  );

  useEffect(() => {
    debouncedSearch(search);
  }, [search, debouncedSearch]);

  const handleSearch = () => {
    if (search.trim() === "") return;
    setActiveQuery(search);
    setShowSearch(true);
  };

  const closeSearch = () => {
    setShowSearch(false);
    setSearch("");
    setActiveQuery("");
  };

  const handleMoodResult = (title) => {
    setSearch(title);
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

      <div className="fixed bottom-6 right-6 z-50">
        <MoodMatcher onMoodResult={handleMoodResult} />
      </div>

      {showSearch ? (
        <SearchResults query={activeQuery} onClose={closeSearch} />
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
