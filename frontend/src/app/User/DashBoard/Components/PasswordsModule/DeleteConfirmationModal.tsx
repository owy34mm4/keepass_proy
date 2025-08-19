'use client';

import React from 'react';
import Modal from '@/app/Components/Modal';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="¿Estás seguro?"
      confirmText="Eliminar"
      cancelText="Cancelar"
    >
      <p className="mb-4">Esta acción eliminará permanentemente la contraseña.</p>
    </Modal>
  );
};

export default DeleteConfirmationModal;
