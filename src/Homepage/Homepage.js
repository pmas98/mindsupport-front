// Home.js
import React, { useEffect } from "react";
import Navbar from "../components/navbar";
import Carousel from "../components/carousel";
import { useState } from "react";

const Homepage = () => {
  return (
    <div>
      <Navbar />
      <div className="px-4 md:px-24 sm:px-16 md:py-16 sm:py-16 py-6 flex flex-col lg:flex-row items-center">
        <div className="md:flex-1 sm:flex-1 px-12 sm:pr-0">
          <h1 className="xl:text-8xl md:text-7xl sm:text-6xl text-5xl font-primaryRegular text-gray-500 mb-4 md:mb-8 sm:mb-8">
            Sua plataforma de saúde mental{" "}
            <span className="text-[#e21b5a] font-primaryBold underline">
              colaborativa
            </span>
          </h1>
          <h3 className="font-primaryMedium text-lg md:text-2xl text-gray-500 mb-8 lg:w-full max-w-full">
            Seu espaço seguro para compartilhar experiências, buscar ajuda e
            ajudar outras pessoas.
          </h3>
        </div>
        <div className="md:flex-1 sm:flex-1 mt-8 md:mt-0 ml-4">
          <img
            src="people.jpg"
            alt="Image"
            className="rounded-md border w-full object-cover object-center mx-auto"
          />
        </div>
      </div>

      <div className="px-4 py-16 lg:px-24">
        <div className="bg-[#e21b5a] rounded-lg border border-gray-200 shadow-md p-8 max-w-6xl mx-auto sm:max-w-full sm:px-4 mb-16">
          <h2 className="font-primaryBold text-2xl sm:text-4xl font-bold text-center text-white">
            Temas
          </h2>
        </div>
        <Carousel />
      </div>

      <hr className="w-[40vw] border-[#e21b5a] mx-auto border-[.1vw] mb-4" />
      <div className="py-8 mx-4 lg:mx-24">
        <div className="bg-[#e21b5a] rounded-lg border border-gray-200 shadow-md p-8 max-w-6xl mx-auto sm:max-w-full sm:px-4">
          <h2 className="font-primaryBold text-2xl sm:text-4xl font-bold text-center text-white">
            Como Funciona
          </h2>
        </div>
        <div className="flex flex-col md:flex-row items-center pt-8 pb-12 px-6">
          <div className="md:w-1/2 mb-8 md:mb-0 md:mr-8 order-2 md:order-1">
            <img
              src="example.png"
              alt="Image"
              className="rounded-md border w-full shadow-lg transition-all duration-300 hover:shadow-xl"
            />
          </div>

          <div className="md:w-2/3 order-1 md:order-2 lg:ml-16">
            <h3 className="font-primaryBold text-4xl md:text-4xl lg:text-4xl xl:text-6xl font-bold mb-2">
              Um espaço seguro de apoio.
            </h3>
            <p className="font-primaryMedium text-base md:text-lg text-gray-500">
              O mindsupport oferece um ambiente seguro e acolhedor para você se conectar com outras pessoas que estão passando por desafios semelhantes.
            </p>
              
            <p className="font-primaryMedium text-base md:text-lg text-gray-500">
            Em sessões moderadas você poderá compartilhar suas experiências, buscar ajuda e ajudar outras pessoas.
            </p>

          </div>
        </div>
        <div className="bg-[#e21b5a] rounded-lg border border-gray-200 shadow-md p-8 max-w-6xl mx-auto sm:max-w-full sm:px-4">
          <h2 className="font-primaryBold text-2xl sm:text-4xl font-bold text-center text-white">
            Nossos Valores
          </h2>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center md:space-x-8 xl:space-x-24 my-16">
          <div className="flex flex-col items-center mb-8 md:mb-0">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-[#e21b5a] rounded-full flex justify-center items-center mb-4"></div>
            <p className="font-primaryMedium text-lg md:text-2xl text-center text-gray-600">
              Segurança
            </p>
          </div>

          <div className="flex flex-col items-center mb-8 md:mb-0">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-[#e21b5a] rounded-full flex justify-center items-center mb-4"></div>
            <p className="font-primaryMedium text-lg md:text-2xl text-center text-gray-600">
              Privacidade
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-[#e21b5a] rounded-full flex justify-center items-center mb-4"></div>
            <p className="font-primaryMedium text-lg md:text-2xl text-center text-gray-600">
              Suporte
            </p>
          </div>
        </div>
      </div>
      <footer className="bg-[#e21b5a] py-8">
        <div className="container mx-auto text-center">
          <p className="font-primaryMedium text-white text-xl md:text-2xl">
            Todos os direitos reservados
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;