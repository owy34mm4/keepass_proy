'use client';

import React, { useState, useEffect } from 'react';
import Modal from '@/app/Components/Modal';
import { PasswordItem } from './PasswordsModule';

interface EditPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  password: PasswordItem | null; // Cambié esto para poder verificar si `password` es null
  onSave: (updatedPassword: PasswordItem) => void;
}

const EditPasswordModal: React.FC<EditPasswordModalProps> = ({ isOpen, onClose, password, onSave }) => {
  const [formData, setFormData] = useState<PasswordItem | null>(null);

  // Este useEffect se ejecutará cuando el modal se abra y `password` cambie
  useEffect(() => {
    if (password && isOpen) {
      setFormData(password);  // Solo setear cuando el modal se abre y tenemos un `password` válido
    }
  }, [isOpen, password]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSave = () => {
    if (formData) {
      onSave(formData); // Guardar los cambios
      onClose(); // Cerrar el modal
    }
  };

  // Si no tenemos `formData`, no mostramos el modal
  if (!formData) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Editar Contraseña</h2>
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Servicio"
        className="w-full p-2 mb-4 border rounded"
      />
      <input
        name="user_name"
        value={formData.user_name}
        onChange={handleChange}
        placeholder="Usuario"
        className="w-full p-2 mb-4 border rounded"
      />
      <input
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Contraseña"
        className="w-full p-2 mb-4 border rounded"
      />
      <input
        name="url"
        value={formData.url}
        onChange={handleChange}
        placeholder="URL"
        className="w-full p-2 mb-4 border rounded"
      />
      <input
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        placeholder="Notas"
        className="w-full p-2 mb-4 border rounded"
      />
      <div className="flex justify-end gap-2">
        <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
          Cancelar
        </button>
        <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Guardar
        </button>
      </div>
    </Modal>
  );
};

export default EditPasswordModal;
