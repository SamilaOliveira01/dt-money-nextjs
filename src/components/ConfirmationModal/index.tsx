import React from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden bg-white text-left shadow-xl transition-all duration-300 ease-out sm:my-8 sm:w-full sm:max-w-lg">
          <div className="bg-white px-8 pb-8 pt-16 sm:text-left relative">
            <button onClick={onClose} className="absolute right-4 top-4">
              &times;
            </button>
            <h1 className="text-xl font-semibold leading-6 text-gray-900 px-3">
              Confirmação
            </h1>
            <p className="mt-4 px-3">{message}</p>
            <div className="mt-6 flex gap-4 justify-end px-3">
              <button
                onClick={onConfirm}
                className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              >
                Confirmar
              </button>
              <button
                onClick={onClose}
                className="rounded-md bg-gray-200 px-4 py-2 text-gray-900 hover:bg-gray-300"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
