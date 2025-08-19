'use client';

import React, { useState } from 'react';
import Modal from '@/app/Components/Modal';
import { PasswordItem } from './PasswordsModule';

interface AddPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  newPassword: Partial<PasswordItem>; //Recibimos el Password item del padre
  setNewPassword: React.Dispatch<React.SetStateAction<Partial<PasswordItem>>>; // Recibimos el seter del password item dle padre
  onConfirm: (newPassword: Partial<PasswordItem>) => void;
}

const AddPasswordModal: React.FC<AddPasswordModalProps> = ({
  isOpen,
  onClose,
  newPassword,
  setNewPassword,
  onConfirm,
}) => {
  // const [newPassword, setNewPassword] = useState<Partial<PasswordItem>>({
  //   title: "",
  //   user_name: "",
  //   password: "",
  //   url: "",
  //   notes: "",
  // });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPassword((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    onConfirm(newPassword);
    setNewPassword({ title: "", user_name: "", password: "", url: "", notes: "" });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleAdd}
      title="Añadir Contraseña"
      confirmText="Añadir"
      cancelText="Cancelar"
    >
      <input
        name="title"
        value={newPassword.title}
        onChange={handleChange}
        className="w-full p-2 mb-2 border rounded"
        placeholder="Servicio"
      />
      <input
        name="user_name"
        value={newPassword.user_name}
        onChange={handleChange}
        className="w-full p-2 mb-2 border rounded"
        placeholder="Usuario"
      />
      <input
        name="password"
        value={newPassword.password}
        onChange={handleChange}
        className="w-full p-2 mb-2 border rounded"
        placeholder="Contraseña"
      />
      <input
        name="url"
        value={newPassword.url}
        onChange={handleChange}
        className="w-full p-2 mb-2 border rounded"
        placeholder="URL"
      />
      <input
        name="notes"
        value={newPassword.notes}
        onChange={handleChange}
        className="w-full p-2 mb-2 border rounded"
        placeholder="Notas"
      />
    </Modal>
  );
};

export default AddPasswordModal;
