// Home.js
import React from "react";
import Navbar from "../components/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserChat from "../components/userChat";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import Spinner from "../components/loadingSpinner";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [webSocket, setWebSocket] = useState(null);
  const [audioData, setAudioData] = useState(null);
  const currentUserID = 1;
  const chatContainerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const recorderControls = useAudioRecorder();

  const addAudioElement = (blob) => {
    setAudioData(blob);
  };

  const sendAudioElement = () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("audio", audioData);
    formData.append("room", 1); // Replace 'your_room_id' with the actual room ID
    formData.append("username", "Fulano"); // Replace 'your_username' with the actual username
    const yourAccessToken =
    "access_token";
    fetch(
      "https://mindsupport-production.up.railway.app/api/v1/upload-audio/",
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${yourAccessToken}`, // Include your access token if required
        },
      }
    )
      .then((response) => {
        setIsLoading(false);
        if (response.ok) {
          return response.json();
        }
        throw new Error("Failed to upload audio");
      })
      .then((data) => {
        console.log(data);
        if (webSocket && webSocket.readyState === WebSocket.OPEN) {
          webSocket.send(
            JSON.stringify({
              message: newMessage,
              user_id: currentUserID,
              username: "Fulano",
              audio: data.audio,
            })
          );
          setNewMessage(""); // Clear input field after sending message
          setAudioData(null);
        }
        console.log("Audio uploaded successfully:", data.audio);
      })
      .catch((error) => {
        console.error("Error uploading audio:", error);
      });
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return; // Don't send empty messages
    if (webSocket && webSocket.readyState === WebSocket.OPEN) {
      webSocket.send(
        JSON.stringify({
          message: newMessage,
          user_id: currentUserID,
          username: "Fulano",
        })
      );
      setNewMessage(""); // Clear input field after sending message
    }
  };

  const handleReport = () => {
    // Add your report logic here
    console.log("Report clicked");
  };
  const fetchMessages = () => {
    setIsLoading(true);
    const accessToken =
    "access_token";

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        room: "1",
        limit: 100, // Example value for limit, replace it with your desired limit
      },
    };

    axios
      .get(
        "https://mindsupport-production.up.railway.app/api/v1/roomMessages/",
        config
      )
      .then((response) => {
        setMessages(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    fetchMessages();
    const ws = new WebSocket("ws://127.0.0.1:8000/ws/1/");

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      // Check if the message was sent by the current user
      if (message.userid !== currentUserID) {
        setMessages((prevMessages) => [message, ...prevMessages]); // Add message to the beginning of the array
      }
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    // Update WebSocket state without closing it
    setWebSocket(ws);

    // Cleanup function
    return () => {
      // Close WebSocket connection only when component unmounts
      if (ws) {
        ws.close();
      }
    };
  }, []);
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow flex flex-col px-4 sm:px-8 md:px-16 lg:px-80">
        <div className="flex justify-between items-center pt-12 px-4">
          <div className="bg-white border-2 border-gray-300 rounded-[10px] px-8 py-2">
            <span className="font-primaryMedium text-l sm:text-3xl">
              Sala X
            </span>
          </div>
          <button className="font-primaryBold bg-white border-2 border-red-500 rounded-[10px] px-6 py-2 sm:px-8 sm:py-2">
            <span className="text-red-500 text-xl sm:text-l md:text-3xl">
              Sair da Sala
            </span>
          </button>
        </div>

        <div className="bg-white border-2 border-gray-300 rounded-[10px] mx-4 my-2 p-2 sm:p-4 flex flex-col flex-grow">
          {/* Main content area */}
          <div className="flex justify-center mb-4">
            <div className="bg-gray-200 border border-gray-200 rounded-md px-4 py-1 sm:px-8 sm:py-2">
              <p className="font-primaryRegular text-sm sm:text-lg md:text-[20px] text-gray-500">
                Be respectful with other users
              </p>
            </div>
          </div>
          <div
            ref={chatContainerRef}
            className="flex-grow overflow-y-auto max-h-[450px]"
          >
            {isLoading ? (
              <Spinner />
            ) : (
              messages
                .slice()
                .reverse()
                .map((message, index) => (
                  <UserChat
                    key={index}
                    color="red"
                    username={message.username}
                    message={message.message}
                    onReport={handleReport}
                    isOwnMessage={message.user_id === currentUserID}
                    audio={message.audio ? message.audio : ""}
                  />
                ))
            )}
          </div>
          <div className="flex mt-4">
            <input
              type="text"
              placeholder="Digite sua mensagem..."
              onChange={(e) => setNewMessage(e.target.value)}
              className="font-primaryRegular flex-grow border border-gray-300 rounded-l-md px-2 sm:px-4 py-1 sm:py-2"
            />
            <div className="flex">
              <div>
                <AudioRecorder
                  onRecordingComplete={(blob) => addAudioElement(blob)}
                  recorderControls={recorderControls}
                  className="rounded-full"
                  showVisualizer={true}
                />
              </div>
              <button
                className="bg-[#e21b5a] text-white px-2 sm:px-4 py-1 sm:py-2 rounded-r-none"
                onClick={() => (audioData ? sendAudioElement() : sendMessage())}
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-[#e21b5a] py-4 sm:py-8">
        <div className="container mx-auto text-center">
          <p className="font-primaryMedium text-white text-sm sm:text-xl md:text-2xl">
            Todos os direitos reservados
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Chat;
