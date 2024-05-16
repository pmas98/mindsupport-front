import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { Toaster, toast } from "react-hot-toast";
import Component from "../components/roomElement";
import moment from "moment/moment";

const Sala = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch("https://mindsupport-production.up.railway.app/api/v1/rooms/?theme_id=1", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Error fetching rooms: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data)
        setRooms(data);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Toaster />
      <div className="px-64 pt-16">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-row justify-between">
            <button
              className="self-start font-primaryMedium text-4xl mb-6"
              variant="outline"
            >
              SALAS
            </button>
            <h2 className="self-start font-primaryBold text-4xl mb-6 text-[#e21b5a]">Tema</h2>
          </div>
        </div>
        {rooms.map((room) => (
          <Component key={room.id} numPeople={room.room_capacity} existenceTime={moment(room.date_created).format("DD/MM/YYYY")} roomId={room.id} />
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
