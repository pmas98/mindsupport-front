import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import { Toaster, toast } from "react-hot-toast";

const Registro = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isModeratorChecked, setIsModeratorChecked] = useState(false);
  const [reason, setReason] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleModeratorChange = () => {
    setIsModeratorChecked(!isModeratorChecked);
  };

  const handleModeratorReasonChange = (e) => {
    setReason(e.target.value);
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      toast.error("Senhas não estão iguais.");
      return;
    }

    try {
      const endpoint = isModeratorChecked
        ? "https://mindsupport-production.up.railway.app/api/v1/register/moderator/"
        : "https://mindsupport-production.up.railway.app/api/v1/register/";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, reason }),
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
    <div>
      <Navbar />
      <Toaster />
      <div className="flex w-full h-screen">
        <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200">
          <div className="w-60 h-60 bg-gradient-to-tr from-red-500 to-pink-500 rounded-full animate-spin"></div>
          <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg"></div>
        </div>
        <div className="w-full flex items-center justify-center lg:w-1/2">
          <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-200">
            <h1 className="text-5xl font-semibold">Bem-Vindo!</h1>
            <p className="font-medium text-lg text-gray-500 mt-4">
              Cadastre-se aqui
            </p>
            <div className="mt-8 ">
              <div>
                <label className="text-lg font-medium">Email</label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  placeholder="Insira seu email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div>
                <label>Senha</label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  placeholder="Insira sua senha"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <div>
                <label>Confirme sua senha</label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  placeholder="Confirme sua senha"
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </div>
              <div className="mt-4">
                <label>
                  <input
                    type="checkbox"
                    checked={isModeratorChecked}
                    onChange={handleModeratorChange}
                  />{" "}
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
                    value={reason}
                    onChange={handleModeratorReasonChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    rows="4"
                    placeholder="Explique suas razões aqui..."
                  ></textarea>
                </div>
              )}
              <div className="mt-8 flex flex-col gap-y-4">
                <button
                  className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-red-400 text-white text-lg font-bold"
                  onClick={handleRegister}
                >
                  Registrar
                </button>
              </div>
            </div>
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

export default Registro;
