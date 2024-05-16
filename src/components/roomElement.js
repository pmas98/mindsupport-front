import React, { useState } from 'react'; // Import useState hook
import { useNavigate } from 'react-router-dom';
export default function Component({ numPeople, existenceTime, roomId }) {
  const [isAddingUser, setIsAddingUser] = useState(false); // State for button loading
  const roomid = roomId
  const navigate = useNavigate();

  const handleAddUser = async () => {
    setIsAddingUser(true); // Set loading state to show visual feedback
  
    try {
      // Retrieve access token from localStorage
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('Missing access token');
      }
  
      const payload = { sala: roomid };  
  
      const response = await fetch('https://mindsupport-production.up.railway.app/api/v1/addUser/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,  // Include access token in header
          'Content-Type': 'application/json',  // Set Content-Type to JSON
        },
        body: JSON.stringify(payload),  // Convert payload to JSON string
      });
  
      if (!response.ok) {
        throw new Error(`Error adding user: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('User added successfully:', data); // Handle success response
      navigate(`/chat/${roomid}`);
    } catch (error) {
      console.error('Error adding user:', error.message); // Handle errors
    } finally {
      setIsAddingUser(false); // Reset loading state
    }
  };
  
  return (
    <div>
      <div className="flex items-center justify-between p-4 border rounded-md">
        <div className="flex items-center space-x-4">
          <span className="font-primaryMedium ml-4 text-[1.5rem">{numPeople} pessoas</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="font-primaryMedium text-[1rem]">Data de Criação: {existenceTime}</span>
          <button
            className="p-2"
            variant="ghost"
            disabled={isAddingUser} // Disable button while adding user
            onClick={handleAddUser}
          >
            {isAddingUser ? (
              // Display loading indicator while adding user (optional)
              <div className="h-4 w-4 animate-spin rounded-full bg-gray-200"></div>
            ) : (
              <GroupIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function GroupIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 7V5c0-1.1.9-2 2-2h2" />
      <path d="M17 3h2c1.1 0 2 .9 2 2v2" />
      <path d="M21 17v2c0 1.1-.9 2-2 2h-2" />
      <path d="M7 21H5c-1.1 0-2-.9-2-2v-2" />
      <rect width="7" height="5" x="7" y="7" rx="1" />
      <rect width="7" height="5" x="10" y="12" rx="1" />
    </svg>
  );
}

function PanelTopCloseIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M3 9h18" />
      <path d="m9 16 3-3 3 3" />
    </svg>
  );
}
