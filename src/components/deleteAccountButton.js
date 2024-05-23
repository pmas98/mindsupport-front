import React, { useState } from 'react';

const DeleteAccountButton = () => {
  const [showModal, setShowModal] = useState(false);

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleConfirm = () => {
    // Perform the account deletion logic here
    console.log('Account deleted');
    setShowModal(false);
  };

  return (
    <>
      <button
        className="bg-white text-red-500 border border-red-500 rounded-md px-4 py-2 fontPrimary-bold sm:mb-2"
        onClick={handleDeleteClick}
      >
        Deletar Conta
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-lg font-bold mb-4">Confirmar exclusão de conta</h2>
            <p className="mb-4">Tem certeza de que deseja excluir sua conta?</p>
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
}

export default DeleteAccountButton;