import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router

const Navbar = () => {
  return (
    <div className="flex flex-col">
      {/* Navbar */}
      <nav className="bg-[#e21b5a] py-4 px-4 flex justify-between items-center rounded-bl-lg rounded-br-lg">
      <Link to="/"> {/* Add Link with correct path */}
        <div className="px-4 py-2 rounded-lg border-2 border-white text-white font-semibold text-2xl md:text-4xl font-primaryBold">mindsupport</div>
      </Link>
        <div className="flex space-x-4">
          <Link to="/salas"> {/* Add Link with correct path */}
            <button className="px-4 py-2 rounded-lg border border-white text-white font-medium hover:bg-white hover:text-[#e21b5a] font-primaryBold text-lg md:text-xl">
              Salas
            </button>
          </Link>
          <Link to="/login"> {/* Add Link with correct path */}
            <button className="px-4 py-2 rounded-lg border border-white text-white font-medium hover:bg-white hover:text-[#e21b5a] font-primaryBold text-lg md:text-xl">
              Login
            </button>
          </Link>
          <Link to="/registro"> {/* Add Link with correct path */}
            <button className="px-4 py-2 rounded-lg border border-white text-white font-medium hover:bg-white hover:text-[#e21b5a] font-primaryBold text-lg md:text-xl">
              Registro
            </button>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
