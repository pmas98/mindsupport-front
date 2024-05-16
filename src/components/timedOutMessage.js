import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TimeOut = () => {
  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate();

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleInvalidSession = () => {
    // Remove the invalid access token from local storage
    localStorage.removeItem('accessToken');

    // Redirect to the /login route
    navigate('/login');
  };

  const handleConfirm = () => {
    // Handle invalid session token
    handleInvalidSession();

    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-lg font-bold mb-4">Sua sessão expirou</h2>
            <p className="mb-4">Faça login novamente para ter acesso ao chat</p>
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
                Fazer login novamente
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TimeOut;