// Home.js
import React from "react";
import Navbar from "../components/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserChat from "../components/userChat";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import Spinner from "../components/loadingSpinner";
import TimeOut from "../components/timedOutMessage";
import { Link, useNavigate, useParams } from "react-router-dom";
import RemoveUserModal from "../components/removeUser";
import { Toaster, toast } from "react-hot-toast";

const Chat = () => {
  const { id } = useParams();
  const navigate = useNavigate
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [webSocket, setWebSocket] = useState(null);
  const [audioData, setAudioData] = useState(null);
  const userId = localStorage.getItem("userId");

  const [currentUserID, setCurrentUserID] = useState(userId); // Replace '1' with the actual user ID
  const [username, setUsername] = useState(""); // Replace '1' with the actual user ID
  const [timeout, setTimeOut] = useState(null); // Replace '1' with the actual user ID
  const isModerator = localStorage.getItem("isModerator");
  const chatContainerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const recorderControls = useAudioRecorder();
  const [shouldUpdate, setShouldUpdate] = useState(false);

  const addAudioElement = (blob) => {
    setAudioData(blob);
  };

  const handleUpdate = () => {
    setShouldUpdate(!shouldUpdate);
  };


  const sendAudioElement = () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("audio", audioData);
    formData.append("room", id); // Replace 'your_room_id' with the actual room ID
    formData.append("username", username); // Replace 'your_username' with the actual username
    const yourAccessToken = localStorage.getItem("accessToken");
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
          console.log("Sending audio message")
          webSocket.send(
            JSON.stringify({
              is_moderator: isModerator,
              message: newMessage,
              user_id: currentUserID,
              username: username,
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
          is_moderator: isModerator,
          message: newMessage,
          user_id: currentUserID,
          username: username,
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
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        room: id,
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
        //        setTimeOut(true)
        console.error("Error fetching messages:", error);
        setIsLoading(false);
      });
  };
  const fetchUserData = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        console.error("Access token not found in local storage");
        return;
      }

      const response = await fetch(
        "https://mindsupport-production.up.railway.app/api/v1/user/",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        const userData = await response.json();
        setCurrentUserID(userData.id);
        setUsername(userData.username);
        console.log("User data:", userData);
      } else {
        //        setTimeOut(true)
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleLeaveRoom = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.post(
        "https://mindsupport-production.up.railway.app/api/v1/removeUser/",
        { sala: id },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(response.data);
      // Handle the successful response
    } catch (error) {
      console.error(error);
      // Handle the error
    }
  };

  useEffect(() => {
    fetchMessages();
    fetchUserData();
    const ws = new WebSocket(`wss://mindsupport-production.up.railway.app/ws/${id}/`);

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      // Check if the message was sent by the current user
      if (message.user_id !== currentUserID) {
        console.log("Message received:", message)
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
  }, [messages, shouldUpdate]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Toaster />
      {timeout ? <TimeOut /> : null}
      <div className="flex-grow flex flex-col px-4 sm:px-8 md:px-16 lg:px-80">
        <div className="flex justify-between items-center pt-12 px-4">
          <div className="bg-white border-2 border-gray-300 rounded-[10px] px-8 py-2">
            <span className="font-primaryMedium text-l sm:text-3xl">
              Sala {id}
            </span>
          </div>
          <Link to="/salas">
          <button
            onClick={() => handleLeaveRoom()}
            className="font-primaryBold bg-white border-2 border-red-500 rounded-[10px] px-6 py-2 sm:px-8 sm:py-2"
          >
            <span className="text-red-500 text-xl sm:text-l md:text-3xl">
              Sair da Sala
            </span>
          </button>
          </Link>
        </div>

        <div className="bg-white border-2 border-gray-300 rounded-[10px] mx-4 my-2 p-2 sm:p-4 flex flex-col flex-grow">
          {/* Main content area */}
          <div className="flex justify-center mb-4">
            <div className="bg-gray-200 border border-gray-200 rounded-md px-4 py-1 sm:px-8 sm:py-2">
              <p className="font-primaryRegular text-sm sm:text-lg md:text-[20px] text-gray-500">
                Seja respeitoso com outros usuários
              </p>
            </div>
          </div>
          <div
            ref={chatContainerRef}
            className="flex-grow overflow-y-auto max-h-[750px]"
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
                    isModerator={message.is_moderator === "true"}
                    color={message.user_id === currentUserID ? localStorage.getItem("color") : "bg-red-400"}
                    username={message.username}
                    message={message.message}
                    onReport={handleReport}
                    isOwnMessage={message.user_id === currentUserID}
                    audio={message.audio ? message.audio : ""}
                    handleUpdate={handleUpdate}
                    user_id={message.user_id}
                    roomId={id}
                  />
                ))
            )}
          </div>
          <div className="flex mt-4">
            <input
              type="text"
              placeholder="Digite sua mensagem..."
              value={newMessage}
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
