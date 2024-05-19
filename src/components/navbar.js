import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import { useMediaQuery } from "react-responsive"; // Import useMediaQuery hook from react-responsive
import { useEffect } from "react";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isSmallScreen = useMediaQuery({ maxWidth: 768 }); // Define a boolean variable to check if screen size is small
  const [username, setUsername] = useState(null);
  console.log(username);
  const fetchUserData = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        console.error("Access token not found in local storage");

        return;
      }

      const response = await fetch(
        "https://mindsupport-production.up.railway.app/api/v1/user/",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        const userData = await response.json();
        localStorage.setItem("userId", userData.id);
        localStorage.setItem("color", userData.color);
        setUsername(userData.username);

        console.log("User data:", userData);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUsername(null);
  };


  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      fetchUserData(accessToken);
    } else {
      // Handle the case where the accessToken doesn't exist
      // For example, redirect the user to the login page
      console.log("Access token not found in local storage");
    }
  }, []);
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
          </div>
        ) : (
          <div className="flex space-x-4">
            {username !== null ? (
              <div className="text-white font-primaryBold text-lg md:text-xl flex justify-between items-center">
                <h2>Oi, {username}</h2>
              </div>
            ) : null}
            {username !== null ? (
              <div>
                <Link to="/salas">
                  {" "}
                  {/* Add Link with correct path */}
                  <button className="px-4 py-2 rounded-lg border border-white text-white font-medium hover:bg-white hover:text-[#e21b5a] font-primaryBold text-lg md:text-xl">
                    Salas
                  </button>
                </Link>
                <Link to="/profile">
                  {" "}
                  {/* Add Link with correct path */}
                  <button className="ml-1 px-4 py-2 rounded-lg border border-white text-white font-medium hover:bg-white hover:text-[#e21b5a] font-primaryBold text-lg md:text-xl">
                    Perfil
                  </button>
                </Link>
                <Link to="/">
                  <button
                    onClick={() => logout()}
                    className="ml-2 px-4 py-2 rounded-lg border border-white text-white font-medium hover:bg-white hover:text-[#e21b5a] font-primaryBold text-lg md:text-xl"
                  >
                    Logout
                  </button>
                </Link>
              </div>
            ) : (
              <div>
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
                  <button className="ml-2 px-4 py-2 rounded-lg border border-white text-white font-medium hover:bg-white hover:text-[#e21b5a] font-primaryBold text-lg md:text-xl">
                    Registro
                  </button>
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
