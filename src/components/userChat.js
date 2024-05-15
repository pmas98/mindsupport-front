import React, { useState, useRef } from "react";

const UserChat = ({ color, username, message, onReport, isOwnMessage, audio }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const isAudioMessage = (url) => {
    const audioExtensions = ['.mp3', '.wav', '.ogg'];
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
    <div className={`flex items-start mb-4 ${isOwnMessage ? 'flex-row-reverse pr-5' : ''}`}>
      <div
        className={`mt-3 w-10 h-10 rounded-full bg-${color}-500 ${
          isOwnMessage ? 'ml-2 sm:ml-4' : 'mr-2 sm:mr-4'
        }`}
      ></div>
      <div
        className={`mt-2 flex-1 ${
          isAudioMessage(audio) ? 'max-w-[200px]' : 'max-w-[600px] sm:max-w-[300px] md:max-w-[500px]'
        } ${isOwnMessage ? 'bg-gray-200 border border-gray-200 rounded-md text-right px-2 py-1 sm:px-4 sm:py-2' : ''}`}
      >
        <div className={`flex items-center ${isOwnMessage ? 'justify-end' : 'justify-between'}`}>
          <h3 className="font-primaryBold text-sm sm:text-base">{username}</h3>
        </div>
        <div
          className={`font-primaryRegular text-gray-700 break-words pr-2 sm:pr-3 ${
            isOwnMessage ? 'ml-auto' : ''
          }`}
        >
          {isAudioMessage(audio) ? (
            <div className="flex pl-2 sm:pl-0">
              <button
                onClick={handleAudioPlayPause}
                className="bg-blue-500 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-full flex items-center"
              >
                <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
                <span className="ml-2 hidden sm:inline">{isPlaying ? 'Pause' : 'Play'} Audio</span>
              </button>
              <audio ref={audioRef} src={audio} onEnded={() => setIsPlaying(false)} />
            </div>
          ) : (
            <p className="text-sm sm:text-base">{message}</p>
          )}
        </div>
      </div>
      <div className={`mt-3 flex items-center ${isOwnMessage ? 'hidden' : 'pr-2 sm:pr-5'}`}>
        <button
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-500 text-white flex items-center justify-center"
          onClick={onReport}
        >
          <span className="text-sm sm:text-lg font-primaryBold">!</span>
        </button>
      </div>
    </div>
  );
};

export default UserChat;