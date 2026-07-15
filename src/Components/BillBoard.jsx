import React, { useEffect, useState } from "react";
import heroVideo from "../assets/hero.mp4";
import { CiCircleInfo } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";

const BillBoard = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, [isMobile]);
  return (
    <div className="relative h-[55vh] md:h-[56.25vw] w-full overflow-hidden">
      {showVideo ? (
        <video
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover brightness-[60%]"
        />
      ) : (
        <img
          src="https://media.geektherapy.org/wp-content/uploads/2023/08/09145045/LaBrea_S2_KA_16x9_web-1024x576.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div className="absolute top-[32%] md:top-[32%] ml-4 md:ml-16">
        <p className="text-white text-4xl md:text-6xl h-full lg:text-6xl font-bold drop-Shadow-xl">
          LA BREA
        </p>
        <div className="flex flex-row gap-3 mt-4 md:mt-2 lg:mt-6 items-center text-white text-sm md:text-lg">
          <span>Sci-Fi</span>
          <hr className="bg-gray-400 rounded-full h-2 w-2 " />
          <span>2022</span>
          <hr className="bg-gray-400 rounded-full h-2 w-2 " />
          <span>2 Season</span>
          <hr className="bg-gray-400 rounded-full h-2 w-2 " />
          <span>A</span>
        </div>
        <p className="text-white text-xs md:text-lg mt-3 md:mt-8 w-[80%] md:w-[55%] lg:w-[50%] drop-shadow-xl">
          When the Earth Spilts open ,strangers fall down a sinkhole into an
          ancient era brimming with secrets and deadly creatures.
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
