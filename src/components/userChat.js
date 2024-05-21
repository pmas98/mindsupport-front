import React, { useState, useRef } from "react";
import RemoveUserModal from "./removeUser";

const UserChat = ({
  color,
  username,
  message,
  user_id,
  onReport,
  isOwnMessage,
  isModerator,
  audio,
  roomId,
  handleUpdate,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const userIsModerator = localStorage.getItem("isModerator") === "true";
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  const isAudioMessage = (url) => {
    const audioExtensions = [".mp3", ".wav", ".ogg"];
    return audioExtensions.some((ext) => url.includes(ext));
  };

  const handleAudioPlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div
      className={`flex items-start mb-4 ${
        isOwnMessage ? "flex-row-reverse pr-5" : ""
      }`}
    >
      {openModal ? (
        <RemoveUserModal
          userId={user_id}
          roomId={roomId}
          handleUpdate={handleUpdate}
        />
      ) : null}
      <div
        className={`mt-3 w-10 h-10 rounded-full ${color} ${
          isOwnMessage ? "ml-2 sm:ml-4" : "mr-2 sm:mr-4"
        } ${
          isModerator && isOwnMessage
            ? "outline outline-green-500 outline-4"
            : ""
        }`}
      ></div>
      <div
        className={`mt-2 flex-1 ${
          isAudioMessage(audio)
            ? "max-w-[200px]"
            : "max-w-[200px] sm:max-w-[200px] md:max-w-[200px]"
        } ${
          isOwnMessage
            ? "bg-gray-200 border border-gray-200 rounded-md text-right px-2 py-1 sm:px-4 sm:py-2"
            : ""
        }`}
      >
        <div
          className={`flex items-center ${
            isOwnMessage ? "justify-end" : "justify-between"
          }`}
        >
          <h3 className="font-primaryBold text-sm sm:text-base">{username}</h3>
        </div>
        <div
          className={` font-primaryRegular text-gray-700 break-words pr-2 sm:pr-3 ${
            isOwnMessage ? "ml-auto" : ""
          }`}
        >
          {isAudioMessage(audio) ? (
            <div className="flex pl-2 sm:pl-0">
              <button
                onClick={handleAudioPlayPause}
                className="bg-blue-500 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-full flex items-center"
              >
                <i className={`fas ${isPlaying ? "fa-pause" : "fa-play"}`}></i>
                <span className="ml-2 hidden sm:inline">
                  {isPlaying ? "Pause" : "Play"} Audio
                </span>
              </button>
              <audio
                ref={audioRef}
                src={audio}
                onEnded={() => setIsPlaying(false)}
              />
            </div>
          ) : (
            <p className="text-sm sm:text-base">{message}</p>
          )}
        </div>
      </div>
      <div className="mt-3 flex items-center">
        {userIsModerator && !isOwnMessage && (
          <button onClick={handleModal} className="font-primaryBold w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-500 text-white flex items-center justify-center">
            !
          </button>
        )}
      </div>
      <div></div>
    </div>
  );
};

export default UserChat;
