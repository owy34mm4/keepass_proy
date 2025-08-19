'use client'
import React, { useState } from 'react'
import ChangeMasterpassModal from './ChangeMasterpassModal';


export const ChangeMasterpass = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
      >
        Cambiar Master Password
      </button>

      <ChangeMasterpassModal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

export default ChangeMasterpass;

