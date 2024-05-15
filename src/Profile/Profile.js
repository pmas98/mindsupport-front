import React from "react";
import Navbar from "../components/navbar";

const Profile = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-col md:flex-row md:items-start md:justify-around mt-8 px-4 md:px-8 lg:px-16">
        {/* Left Side */}
        <div className="flex flex-col items-center mb-8 mt-32 md:mb-0">
          <div className="w-32 h-32 md:w-48 md:h-48 bg-red-500 rounded-full flex items-center justify-center mb-4">
          </div>
          <button className="bg-white text-red-500 border border-red-500 rounded-md px-4 py-2 fontPrimary-bold">
            Deletar
          </button>
        </div>
        <div className="mt-8 h-[20vw] border-2 border-gray-300"></div>
        {/* Right Side */}
        <div className="flex flex-col items-center md:items-start">
          <div className="bg-white border-2 border-gray-300 rounded-[10px] px-8 py-2">
            <h2 className="text-2xl md:text-3xl fontPrimary-bold text-gray-500">Meus Dados</h2>
          </div>
          <div className="flex flex-col gap-4">
            <div className="mt-4 bg-white p-4 rounded-md shadow">
              {/* Future Component 1 */}
            </div>
            <div className="bg-white p-4 rounded-md shadow">
              {/* Future Component 2 */}
            </div>
            <div className="bg-white p-4 rounded-md shadow">
              {/* Future Component 3 */}
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-[#e21b5a] py-4 sm:py-8 mt-auto">
        <div className="container mx-auto text-center">
          <p className="font-primaryMedium text-white text-sm sm:text-xl md:text-2xl">
            Todos os direitos reservados
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Profile;