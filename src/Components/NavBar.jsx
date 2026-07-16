import React, { useCallback, useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { TfiBell } from "react-icons/tfi";
import { IoClose } from "react-icons/io5";
import NavBaritem from "./NavBaritem";
import { IoChevronDown } from "react-icons/io5";
import MobileMenu from "./MobileMenu";
import Accountmenu from "./Accountmenu";
import logo from "../assets/mirrorflix-logo.jpg";

const TOP_OFFSET = 66;
const NavBar = ({ search, setSearch, onSearch, showSearch, setShowSearch }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountmenu, setShowAccountmenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  const toggleAccountmenu = useCallback(() => {
    setShowAccountmenu((current) => !current);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && search.trim() !== "") {
      onSearch();
      setShowMobileSearch(false);
    }
  };

  const handleSearchIconClick = () => {
    if (window.innerWidth < 1024) {
      setShowMobileSearch((current) => !current);
      return;
    }
    if (search.trim() !== "") onSearch();
  };

  const closeMobileSearch = () => {
    setShowMobileSearch(false);
    setSearch("");
  };

  return (
    <div className="w-full fixed z-40">
      <div
        className={`px-4 md:px-16 py-5 flex flex-row items-center transition duration-500 ${showBackground ? "bg-zinc-900 bg-opacity-90" : ""}`}
      >
        <h1 className="text-3xl font-extrabold tracking-wide text-red-600 drop-shadow-[0_0_10px_rgba(220,38,38,0.7)] select-none cursor-pointer">
          MirrorFlix
        </h1>

        <div className=" flex-row ml-8 gap-7 hidden lg:flex">
          <NavBaritem title="Home" />
          <NavBaritem title="Tv Shows" />
          <NavBaritem title="Movies" />
          <NavBaritem title="New & Popular" />
          <NavBaritem title="My List" />
          <NavBaritem title="Browse by Languages" />
        </div>
        <div
          onClick={toggleMobileMenu}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-white text-md">Browse</p>
          <IoChevronDown
            className={`text-white transition ${showMobileMenu ? "rotate-180" : "rotate-0"}`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition flex items-center gap-2 text-xl">
            <IoIosSearch
              className="cursor-pointer"
              onClick={handleSearchIconClick}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              className="hidden lg:block bg-black border-gray-500 text-white px-3 py-1 rounded-md outline-none focus:border-white"
              placeholder="Search Movies..."
            />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition text-2xl">
            <TfiBell />
          </div>

          <div
            onClick={toggleAccountmenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative"
          >
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                alt=""
              />
            </div>
            <IoChevronDown
              className={`text-white transition ${showAccountmenu ? "rotate-180" : "rotate-0"}`}
            />
            <Accountmenu visible={showAccountmenu} />
          </div>
        </div>
      </div>
      {showMobileSearch && (
        <div className="lg:hidden flex flex-row items-center gap-2 px-4 py-3 bg-zinc-900">
          <input
            type="text"
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-black border border-gray-500 text-white px-3 py-2 rounded-md outline-none focus:border-white"
            placeholder="Search Movies..."
          />
          <IoClose
            className="text-white text-2xl cursor-pointer"
            onClick={closeMobileSearch}
          />
        </div>
      )}
    </div>
  );
};

export default NavBar;
