'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import Product from "../../../components/Askeddoubts";
import Modal from "../../../components/Model";

export default function AskedDoubts() {
  const [doubts, setDoubts] = useState([]);
  const [selectedDoubt, setSelectedDoubt] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function getUserDoubts() {
      try {
        const res = await axios.get('/api/users/userdoubts');
        setDoubts(res.data.data);
      } catch (error) {
        console.log("Failed to fetch user doubts: ", error.message);
      }
    }
    getUserDoubts();
  }, []);

  const openModal = (doubt) => {
    setSelectedDoubt(doubt);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDoubt(null);
    setModalOpen(false);
  };

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-4">Asked Doubts</h1>
        {doubts.length === 0 ? (
          <p>No doubts asked yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {doubts.map((doubt) => (
              <div key={doubt._id}>
                <Product
                  id={doubt._id}
                  title={doubt.title}
                  price={doubt.bidRange}
                  description={doubt.description}
                />
                <button
                  onClick={() => openModal(doubt)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal open={modalOpen} onClose={closeModal} doubt={selectedDoubt} />
    </>
  );
}
