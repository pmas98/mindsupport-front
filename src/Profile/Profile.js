import React from "react";
import Navbar from "../components/navbar";
import ColorPicker from "../components/colorSlider";

const Profile = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-col md:flex-row md:items-start md:justify-around mt-8 px-4 md:px-8 lg:px-16">
        {/* Left Side */}
        <div className="flex flex-col items-center mb-8 mt-16 md:mb-0">
          <ColorPicker />
        </div>
        <div className="mt-8 h-[20vw] border-2 border-gray-300"></div>
        {/* Right Side */}
        <div className="flex flex-col items-center items-start justify-center">
          <div className="align-center justify-center bg-white border-2 border-gray-300 rounded-[10px] px-8 py-2">
            <h2 className="text-4xl fontPrimary-bold text-gray-500">
              Meus Dados
            </h2>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between flex-row mt-4 bg-white p-4 rounded-md shadow">
              <div className="bg-white border border-gray-200 rounded-md px-4 py-1 sm:px-2 sm:py-2  mr-8">
                <p className="font-primaryRegular text-sm sm:text-lg md:text-[20px] text-gray-500">
                  Data de Criação
                </p>
              </div>

              <div className="bg-gray-200 border border-gray-200 rounded-md px-4 py-1 sm:px-8 sm:py-2">
                <p className="font-primaryRegular text-sm sm:text-lg md:text-[20px] text-gray-500">
                  25/03/2024
                </p>
              </div>
            </div>
            <div className="flex justify-between flex-row mt-4 bg-white p-4 rounded-md shadow">
              <div className="bg-white border border-gray-200 rounded-md px-4 py-1 sm:px-2 sm:py-2  mr-8">
                <p className="font-primaryRegular text-sm sm:text-lg md:text-[20px] text-gray-500">
                  N° de Salas
                </p>
              </div>

              <div className="bg-gray-200 border border-gray-200 rounded-md px-4 py-1 sm:px-8 sm:py-2">
                <p className="font-primaryRegular text-sm sm:text-lg md:text-[20px] text-gray-500">
                  4
                </p>
              </div>
            </div>
            <div className="flex justify-between flex-row mt-4 bg-white p-4 rounded-md shadow">
              <div className="bg-white border border-gray-200 rounded-md px-4 py-1 sm:px-2 sm:py-2  mr-8">
                <p className="font-primaryRegular text-sm sm:text-lg md:text-[20px] text-gray-500">
                  Nickname
                </p>
              </div>

              <div className="bg-gray-200 border border-gray-200 rounded-md px-4 py-1 sm:px-8 sm:py-2">
                <p className="font-primaryRegular text-sm sm:text-lg md:text-[20px] text-gray-500">
                  Icone de Alterar
                </p>
              </div>
            </div>
            <button className="bg-white text-red-500 border border-red-500 rounded-md px-4 py-2 fontPrimary-bold">
              Deletar
            </button>
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
