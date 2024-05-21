import React, { useState } from 'react';
import { Toaster, toast } from "react-hot-toast";

const RemoveUserModal = ({ userId, roomId, handleUpdate }) => {
  const [showModal, setShowModal] = useState(true);
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

      const payload = { sala: roomId, user: userId, is_moderator: true };

      const response = await fetch('https://mindsupport-production.up.railway.app/api/v1/moderator/removeUser/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`, // Include access token in header
          'Content-Type': 'application/json', // Set Content-Type to JSON
        },
        body: JSON.stringify(payload), // Convert payload to JSON string
      });

      if (!response.ok) {
        throw new Error(`Error creating theme: ${response.statusText}`);
      }

      toast.success('Tema criado com sucesso!');
      setShowModal(false);
      handleUpdate();
      toast.success('Usuário removido com sucesso!');
    } catch (error) {
      console.error('Error creating theme:', error.message); // Handle errors
      toast.error(error.message);
    }
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <Toaster />
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-lg font-bold mb-4">Deseja remover o usuário?</h2>
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

export default RemoveUserModal;