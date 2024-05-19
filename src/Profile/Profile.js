import React from "react";
import Navbar from "../components/navbar";
import ColorPicker from "../components/colorSlider";
import DeleteAccountButton from "../components/deleteAccountButton";
import { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newNickname, setNewNickname] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          // Handle missing access token (e.g., redirect to login)
          throw new Error("Missing access token");
        }

        const response = await axios.get(
          "https://mindsupport-production.up.railway.app/api/v1/user/",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setUserData(response.data);
        console.log(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle color update using ColorPicker component (implementation not shown)

  const handleNicknameUpdate = async (newNickname) => {
    const accessToken = localStorage.getItem("accessToken");
  
    try {
      const response = await axios.patch(
        "https://mindsupport-production.up.railway.app/api/v1/user/",
        {
          nickname: newNickname,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
  
      // Update local state with new data, preserving existing properties
      setUserData({ ...userData, nickname: response.data.nickname });
      toast.success("Nickname alterado!");
    } catch (error) {
      toast.error("Erro ao alterar nickname");
      setError(error);
    }
  };
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Toaster />
      <div className="flex flex-col md:flex-row md:items-start md:justify-around mt-8 px-4 md:px-8 lg:px-16">
        {/* Left Side */}
        <div className="flex flex-col items-center mt-8 md:mb-0">
          {userData?.color ? (<ColorPicker color={userData.color} />) : null}
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
                  {userData?.created_at}
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
                    placeholder={userData?.username}
                    onChange={(e) => setNewNickname(e.target.value)}
                  />
                </div>
                <button onClick={() => handleNicknameUpdate(newNickname)} className="bg-gray-200 border border-gray-200 rounded-md px-4 py-1 sm:px-8 sm:py-2">
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
