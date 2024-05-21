// Home.js
import React from "react";
import Navbar from "../components/navbar";
import Carousel from "../components/carousel";
const Homepage = () => {
  return (
    <div>
      <Navbar />
      <div className="px-4 md:px-24 sm:px-16 md:py-32 sm:py-16 py-6 flex flex-col lg:flex-row items-center">
        <div className="md:flex-1 sm:flex-1 px-12">
          <h1 className="xl:text-8xl md:text-7xl sm:text-6xl text-6xl font-primaryRegular text-gray-500 mb-4 md:mb-8 sm:mb-8">
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
        <div className="md:flex-1 sm:flex-1">
          <img
            src="people.jpg"
            alt="Image"
            className="rounded-md border xl:w-full sm:w-full md:w-auto mx-auto md:mx-0"
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
      <div className="py-8 mx-12 lg:mx-24">
        <div className="bg-[#e21b5a] rounded-lg border border-gray-200 shadow-md p-8 max-w-6xl mx-auto sm:max-w-full sm:px-4">
          <h2 className="font-primaryBold text-2xl sm:text-4xl font-bold text-center text-white">
            Como Funciona
          </h2>
        </div>
        <div className="flex flex-col md:flex-row items-center pt-8 pb-12">
          <div className="md:w-1/2 mb-8 md:mb-0 md:mr-8 order-2 md:order-1">
            <img
              src="https://placehold.co/800x400"
              alt="Image"
              className="rounded-md border w-full"
            />
          </div>
          <div className="md:w-2/3 order-2 md:order-1 lg:ml-16">
    <h3 className="font-primaryBold text-2xl md:text-4xl lg:text-6xl xl:text-8xl font-bold mb-2">
    Um espaço seguro de apoio.
    </h3>
    <h3 className="font-primaryMedium text-lg md:text-2xl text-gray-500 mb-8 lg:w-full max-w-full">
  O mindsupport oferece um ambiente seguro e acolhedor para você se conectar com outras pessoas que estão passando por desafios semelhantes.</h3>
  <p className="font-primaryMedium text-sm md:text-base text-gray-500">
  Em sessões moderadas por um profissional qualificado, você terá a oportunidade de:</p>
    <p>Compartilhar suas experiências e sentimentos:</p><p className="font-primaryMedium text-sm md:text-base text-gray-500"> Desabafe sobre problemas pessoais, como depressão, ansiedade, estresse, relacionamentos interpessoais, entre outros, sem julgamentos.</p>
    <p>Ouvir e aprender com outras pessoas:</p> <p className="font-primaryMedium text-sm md:text-base text-gray-500">As experiências e perspectivas dos outros membros do grupo podem te oferecer novas compreensões e insights sobre seus próprios desafios.</p>
    <p>Receber apoio e orientação:</p><p className="font-primaryMedium text-sm md:text-base text-gray-500">O moderador da terapia irá guiar o grupo, estimular a escuta ativa e o respeito mútuo, e oferecer suporte profissional durante todo o processo.</p>
  </div>
  </div>
        <div className="bg-[#e21b5a] rounded-lg border border-gray-200 shadow-md p-8 max-w-6xl mx-auto sm:max-w-full sm:px-4">
          <h2 className="font-primaryBold text-2xl sm:text-4xl font-bold text-center text-white">
            Nossos Valores
          </h2>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center md:space-x-24 xl:space-x-96 my-16">
          <div className="flex flex-col items-center mb-8 md:mb-0">
            <div className="w-40 h-40 bg-[#e21b5a] rounded-full flex justify-center items-center mb-4"></div>
            <p className="font-primaryMedium text-2xl text-center text-gray-600">
              Segurança
            </p>
          </div>

          <div className="flex flex-col items-center mb-8 md:mb-0">
            <div className="w-40 h-40 bg-[#e21b5a] rounded-full flex justify-center items-center mb-4"></div>
            <p className="font-primaryMedium text-2xl text-center text-gray-600">
              Privacidade
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-40 h-40 bg-[#e21b5a] rounded-full flex justify-center items-center mb-4"></div>
            <p className="font-primaryMedium text-2xl text-center text-gray-600">
              Suporte
            </p>
          </div>
        </div>
      </div>
      <footer className="bg-[#e21b5a] py-8">
        <div className="container mx-auto text-center">
          <p className="font-primaryMedium text-white text-2xl">
            Todos os direitos reservados
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;

