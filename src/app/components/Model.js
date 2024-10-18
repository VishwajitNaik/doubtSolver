import React from 'react';

const Modal = ({ open, onClose, doubt }) => {
  if (!open || !doubt) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md w-96 relative">
        <button className="absolute top-2 right-2 text-gray-600" onClick={onClose}>
          Close
        </button>

        <h2 className="text-2xl font-bold mb-4 text-black">{doubt.title}</h2>
        <p className="text-black">{doubt.description}</p>
        <p className="text-black">Type: {doubt.type}</p>
        <p className="text-black">Bid Range: {doubt.bidRange}</p>
        {/* Add more fields as necessary */}
      </div>
    </div>
  );
};

export default Modal;

