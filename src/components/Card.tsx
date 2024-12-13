import React from "react";
import { FaLinkedin } from "react-icons/fa"; // Import LinkedIn icon from react-icons

const Card = ({ imageSrc, name, role, linkedin }) => {
  return (
    <div className="relative group w-36 sm:w-44 min-h-[260px] overflow-hidden rounded-xl rounded-lg shadow-lg flex flex-col border-2 border-transparent transition-all duration-300 hover:border-white hover:shadow-[0_0_15px_white]">
      {/* Card Image */}
      <img
        src={imageSrc}
        alt={name}
        className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />

      {/* Card Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 transition-opacity duration-500 group-hover:opacity-100 opacity-0"></div>

      {/* Card Content */}
      <div className="relative z-10 flex flex-col justify-between p-3 flex-grow text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="text-center">
          <h1 className="text-base sm:text-lg font-semibold">{name}</h1>
          <p className="mt-2 text-xs sm:text-sm">{role}</p>
        </div>
        <div className="mt-3 flex justify-center">
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-2xl hover:text-dodgerblue transition-colors"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
