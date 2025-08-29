'use client';

import React, { useEffect } from 'react';
import Modal from '@/app/Components/Modal';
import { PasswordItem } from './PasswordsModule';

interface EditPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: Partial<PasswordItem>
  setFormData: React.Dispatch<React.SetStateAction<Partial<PasswordItem>>>
  password: PasswordItem | null; // Cambié esto para poder verificar si `password` es null
  onSave: (updatedPassword: Partial<PasswordItem>) => void;
}

const EditPasswordModal: React.FC<EditPasswordModalProps> = ({ 
    isOpen,
    onClose,
    password,
    formData,
    setFormData,
    onSave }) => {
  // const [formData, setFormData] = useState<PasswordItem | null>(null);

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
    <Modal 
      isOpen={isOpen}
      onClose={onClose}
      title='Editar Contraseña'
      onConfirm={handleSave}
      confirmText='Guardar Cambios'
      cancelText='Cancelar'>
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
    
      </div>
    </Modal>
  );
};

export default EditPasswordModal;
