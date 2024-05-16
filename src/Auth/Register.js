import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import { Toaster, toast } from 'react-hot-toast';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModeratorChecked, setIsModeratorChecked] = useState(false);
  const [moderatorReason, setModeratorReason] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleModeratorChange = () => {
    setIsModeratorChecked(!isModeratorChecked);
  };

  const handleModeratorReasonChange = (e) => {
    setModeratorReason(e.target.value);
  };

  const handleRegister = async () => {
    try {
      const response = await fetch("https://mindsupport-production.up.railway.app/api/v1/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, isModeratorChecked, moderatorReason }),
      });

      if (response.ok) {
        const data = await response.json();
        const accessToken = data.accessToken;
        localStorage.setItem("accessToken", accessToken);

        toast.success("Registrado com Sucesso!");
      } else {
        console.error("Registration failed");
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("An error occurred during registration.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-col md:flex-row items-center justify-center mx-auto my-2 p-4 md:p-8">
        <div className="md:w-1/2 md:mr-8 mb-8 md:mb-0">
          <img
            src="3420.png"
            alt="Register Image"
            className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="w-full md:w-1/2 px-4 py-8">
          <div className="align-center justify-center bg-white border-2 border-gray-300 rounded-[10px] px-4 py-2 mb-6">
            <h2 className="text-xl md:text-4xl fontPrimary-bold text-gray-500 text-center">
              Registrar-se
            </h2>
          </div>
          <div className="md:bg-white md:border md:border-gray-300 md:rounded-lg px-8 py-2 w-full">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="fontPrimary-bold block text-gray-700 font-bold mb-2 text-2xl"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2 text-2xl"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your password"
              />
            </div>
            <div className="mb-6 flex items-center">
              <input
                type="checkbox"
                id="moderator"
                className="mr-2 leading-tight"
                checked={isModeratorChecked}
                onChange={handleModeratorChange}
              />
              <label htmlFor="moderator" className="text-gray-700">
                Quero ser moderador
              </label>
            </div>
            {isModeratorChecked && (
              <div className="mb-6">
                <label
                  htmlFor="moderatorReason"
                  className="fontPrimary-bold block text-gray-700 font-bold mb-2 text-2xl"
                >
                  Porque você quer ser um moderador?
                </label>
                <textarea
                  id="moderatorReason"
                  value={moderatorReason}
                  onChange={handleModeratorReasonChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows="4"
                  placeholder="Explique suas razões aqui..."
                ></textarea>
              </div>
            )}
            <button
              className="bg-[#e21b5a] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="button"
              onClick={handleRegister}
            >
              Registrar
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
      <Toaster />
    </div>
  );
};

export default Register;