import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import { useMediaQuery } from "react-responsive"; // Import useMediaQuery hook from react-responsive

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isSmallScreen = useMediaQuery({ maxWidth: 768 }); // Define a boolean variable to check if screen size is small

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col">
      <nav
        className={`${
          isSmallScreen
            ? "bg-[#e21b5a] px-4 py-4 rounded-bl-lg rounded-br-lg "
            : "bg-[#e21b5a] py-4 px-4"
        } flex justify-between items-center`}
      >
        {" "}
        <Link to="/">
          {" "}
          {/* Add Link with correct path */}
          <div className="px-4 py-2 rounded-lg border-2 border-white text-white font-semibold text-2xl md:text-4xl font-primaryBold">
            mindsupport
          </div>
        </Link>
        <div className="md:hidden">
          {" "}
          {/* Hide on medium and larger screens */}
          <button onClick={toggleNavbar} className="text-white">
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
        {isSmallScreen ? (
          <div
            className={`flex flex-col space-y-4 ${
              isOpen ? "mt-5 justify-between items-center" : "hidden"
            }`}
          >
            <Link to="/salas">
              {" "}
              {/* Add Link with correct path */}
              <button className="px-4 py-2 rounded-lg border border-white text-white font-medium hover:bg-white hover:text-[#e21b5a] font-primaryBold text-lg md:text-xl">
                Salas
              </button>
            </Link>
            <Link to="/login">
              {" "}
              {/* Add Link with correct path */}
              <button className="px-4 py-2 rounded-lg border border-white text-white font-medium hover:bg-white hover:text-[#e21b5a] font-primaryBold text-lg md:text-xl">
                Login
              </button>
            </Link>
            <Link to="/register">
              {" "}
              {/* Add Link with correct path */}
              <button className="px-4 py-2 rounded-lg border border-white text-white font-medium hover:bg-white hover:text-[#e21b5a] font-primaryBold text-lg md:text-xl">
                Registro
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex space-x-4">
            <Link to="/salas">
              {" "}
              {/* Add Link with correct path */}
              <button className="px-4 py-2 rounded-lg border border-white text-white font-medium hover:bg-white hover:text-[#e21b5a] font-primaryBold text-lg md:text-xl">
                Salas
              </button>
            </Link>
            <Link to="/login">
              {" "}
              {/* Add Link with correct path */}
              <button className="px-4 py-2 rounded-lg border border-white text-white font-medium hover:bg-white hover:text-[#e21b5a] font-primaryBold text-lg md:text-xl">
                Login
              </button>
            </Link>
            <Link to="/register">
              {" "}
              {/* Add Link with correct path */}
              <button className="px-4 py-2 rounded-lg border border-white text-white font-medium hover:bg-white hover:text-[#e21b5a] font-primaryBold text-lg md:text-xl">
                Registro
              </button>
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
