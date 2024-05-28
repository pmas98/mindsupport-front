import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { Toaster, toast } from "react-hot-toast";
import Component from "../components/roomElement";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CreateRoomModal from "../components/createRoom";
import CreateThemeModal from "../components/createTheme";

const Sala = () => {
  const [rooms, setRooms] = useState([]);
  const [themes, setThemes] = useState([]);
  const navigate = useNavigate();
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const isModerator = localStorage.getItem("isModerator") === "true"
  const [openModal, setOpenModal] = useState(false);
  const [openModalTheme, setOpenModalTheme] = useState(false);

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  const handleModalTheme = () => {
    setOpenModalTheme(!openModalTheme);
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch(
          "https://mindsupport-production.up.railway.app/api/v1/rooms/?theme_id=1",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Error fetching rooms`);
        }

        const data = await response.json();
        console.log(data);
        setRooms(data);
      } catch (error) {
        toast.error(error.message);
        navigate("/login");
      }
    };
    const fetchThemes = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch(
          "https://mindsupport-production.up.railway.app/api/v1/themes/",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Error fetching rooms`);
        }

        const data = await response.json();
        console.log(data);
        setThemes(data);
      } catch (error) {
        toast.error(error.message);
        navigate("/login");
      }
    };

    fetchRooms();
    fetchThemes();
  }, [shouldUpdate]);

  const handleUpdate = () => {
    setShouldUpdate(!shouldUpdate);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Toaster />
      {isModerator && openModal ? (
        <CreateRoomModal themes={themes} handleUpdate={handleUpdate} />
      ) : null}
      {isModerator && openModalTheme ? (
        <CreateThemeModal handleUpdate={handleUpdate} />
      ) : null}
      
      <div className="px-64 pt-16">
        <div className="flex flex-col space-y-4">
          {rooms.length !== 0 ? (
            <div>
              <div className="flex flex-row justify-between">
                <button
                  className="self-start font-primaryMedium text-4xl mb-6"
                  variant="outline"
                >
                  Suas Salas
                </button>
                {isModerator && (
                  <div>
                    <button
                      onClick={() => handleModal()}
                      className="self-start font-primaryBold text-4xl mb-6 bg-[#e21b5a] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      + Criar Sala
                    </button>
                    <button
                      onClick={() => handleModalTheme()}
                      className="self-start font-primaryBold text-4xl mb-6 bg-[#e21b5a] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
                    >
                     + Criar Tema
                    </button>
                  </div>
                )}
              </div>
              {rooms.map((room) =>
                room.user_in_room ? (
                  <Link key={room.id} to={`/chat/${room.id}`}>
                    <Component
                      numPeople={`${room.room_capacity}`}
                      theme={
                        themes.find((theme) => theme.id === room.theme)?.name
                      }
                      existenceTime={moment(room.date_created).format(
                        "DD/MM/YYYY"
                      )}
                      roomId={room.id}
                    />
                  </Link>
                ) : null
              )}
            </div>
          ) : null}
        </div>
        {themes.map((theme) => (
          <div>
            <div className="flex flex-row justify-between">
              <button
                className="self-start font-primaryMedium text-4xl mb-6"
                variant="outline"
              >
                Salas Disponíveis
              </button>
              <h2 className="self-start font-primaryBold text-4xl mb-6 text-[#e21b5a]">
                {theme.name}
              </h2>
            </div>
            {rooms.map((room) =>
              room.user_in_room
                ? null
                : room.theme === theme.id && (
                    <Component
                      key={room.id}
                      numPeople={room.room_capacity}
                      existenceTime={moment(room.date_created).format(
                        "DD/MM/YYYY"
                      )}
                      roomId={room.id}
                      handleUpdate={handleUpdate}
                    />
                  )
            )}
          </div>
        ))}
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

export default Sala;