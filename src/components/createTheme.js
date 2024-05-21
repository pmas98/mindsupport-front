import React, { useState } from 'react';
import { Toaster, toast } from "react-hot-toast";

const CreateThemeModal = ({ handleUpdate }) => {
  const [showModal, setShowModal] = useState(true);
  const [themeName, setThemeName] = useState('');

  const handleCancel = () => {
    setShowModal(false);
    setThemeName('');
  };

  const handleConfirm = async () => {
    try {
      // Retrieve access token from localStorage
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('Missing access token');
      }

      const payload = { name: themeName };

      const response = await fetch('https://mindsupport-production.up.railway.app/api/v1/themes/', {
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
    } catch (error) {
      console.error('Error creating theme:', error.message); // Handle errors
      toast.error(error.message);
    }
  };

  const handleThemeNameChange = (e) => {
    setThemeName(e.target.value);
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-lg font-bold mb-4">Criar Tema</h2>
            <input
              type="text"
              placeholder="Nome do Tema"
              value={themeName}
              onChange={handleThemeNameChange}
              className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
            />
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
                disabled={!themeName}
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

export default CreateThemeModal;