import React from "react";
import Navbar from "../components/navbar";
import ColorPicker from "../components/colorSlider";
import DeleteAccountButton from "../components/deleteAccountButton";

const Profile = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-col md:flex-row md:items-start md:justify-around mt-8 px-4 md:px-8 lg:px-16">
        {/* Left Side */}
        <div className="flex flex-col items-center mb-8 mt-16 md:mb-0">
          <ColorPicker />
        </div>
        {/* Right Side */}
        <div className="flex flex-col items-center justify-center">
          <div className="align-center justify-center bg-white border-2 border-gray-300 rounded-[10px] px-4 py-2 w-full">
            <h2 className="text-xl md:text-4xl fontPrimary-bold text-gray-500 text-center">
              Meus Dados
            </h2>
          </div>

          <div className="flex flex-col gap-4 w-full mt-4">
            <div className="flex flex-col md:flex-row justify-between bg-white p-4 rounded-md shadow">
              <div className="bg-white border border-gray-200 rounded-md px-4 py-1 sm:px-2 sm:py-2">
                <p className="font-primaryRegular text-sm sm:text-lg md:text-[20px] text-gray-500">
                  Data de Criação
                </p>
              </div>
              <div className="bg-gray-200 border border-gray-200 rounded-md px-4 py-1 sm:px-8 sm:py-2 mt-2 md:mt-0">
                <p className="font-primaryRegular text-sm sm:text-lg md:text-[20px] text-gray-500">
                  25/03/2024
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between bg-white p-4 rounded-md shadow">
              <div className="bg-white border border-gray-200 rounded-md px-4 py-1 sm:px-2 sm:py-2">
                <p className="font-primaryRegular text-sm sm:text-lg md:text-[20px] text-gray-500">
                  N° de Salas
                </p>
              </div>
              <div className="bg-gray-200 border border-gray-200 rounded-md px-4 py-1 sm:px-8 sm:py-2 mt-2 md:mt-0">
                <p className="font-primaryRegular text-sm sm:text-lg md:text-[20px] text-gray-500">
                  4
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between bg-white p-4 rounded-md shadow">
              <div className="flex items-center mt-2 md:mt-0 md:flex-grow">
                <div className="bg-white border border-gray-200 rounded-md px-4 py-1 sm:px-2 sm:py-2 md:mr-4 xs:mr-4 mr-2">
                  <p className="font-primaryRegular text-sm sm:text-lg md:text-[20px] text-gray-500">
                    Nickname
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-md px-4 py-1 sm:px-2 sm:py-2 mr-2 flex items-center justify-center  w-full">
                  <input
                    type="text"
                    className="font-primaryRegular text-sm sm:text-lg md:text-[20px] text-gray-500 text-center"
                    placeholder="Fulano"
                  />
                </div>
                <button className="bg-gray-200 border border-gray-200 rounded-md px-4 py-1 sm:px-8 sm:py-2">
                  <i className="fa-solid fa-check"></i>
                </button>
              </div>
            </div>
            <DeleteAccountButton />
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
