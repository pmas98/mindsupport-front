import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from "react-hot-toast";

const CreateRoomModal = ({ themes, handleUpdate }) => {
  const [showModal, setShowModal] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const navigate = useNavigate();

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleConfirm = async () => {
  
    try {
      // Retrieve access token from localStorage
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('Missing access token');
      }
  
      const payload = { theme: selectedTheme };  
  
      const response = await fetch('https://mindsupport-production.up.railway.app/api/v1/rooms/', {
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
      toast.success('Sala criada com sucesso!');
      setShowModal(false);
      handleUpdate()
      // navigate(`/chat/${roomid}`);
    } catch (error) {
      console.error('Error adding user:', error.message); // Handle errors
    } 
  };

  const handleThemeChange = (e) => {
    setSelectedTheme(e.target.value);
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-lg font-bold mb-4">Criar Sala</h2>
            <select
              value={selectedTheme || ''}
              onChange={handleThemeChange}
              className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
            >
              <option value="">Selecione um tema</option>
              {themes.map((theme) => (
                <option key={theme.id} value={theme.id}>
                  {theme.name}
                </option>
              ))}
            </select>
            <div className="flex justify-end">
              <button
                className="bg-gray-300 text-gray-700 rounded-md px-4 py-2 mr-2"
                onClick={handleCancel}
              >
                Cancelar
              </button>
              <button
                className="bg-red-500 text-white rounded-md px-4 py-2"
                onClick={handleConfirm}
                disabled={!selectedTheme}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateRoomModal;