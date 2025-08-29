'use client';

import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  confirmText: string;
  cancelText: string;
  children: React.ReactNode;
}


/** 
*Componente Funcional Cuyo unico proposito es ser llamado como plantilla para multiples modales ajenos a él.
*Dispone de multiples Props los cuales cumplen la funcion de recibir elemnetos y funciones, esto con la finalidad de insertar en su estructura dichos elemntos

@prop {boolean} isOpen - Contorlador de Ejecucion->Reribe prop boolean el cual determina si el contenido muestra o no

@prop {function} onClose - Funcion que se ejecuta al cerrar el modal con el botón de cierre o cancelacion
@prop {string}  cancelText - Texto que se insertará en el botón de Cerrar Modal

@prop {function} onConfirm - Funcion que se ejcutará al aciionar el Botón de COnfirmacion en el modal
@prop {string} confirmText - Texto que se insertará en el interior dle botón de Confirmacion

@prop {React.ReactNode} - Contenido del Modal (texto,imagenes,formualrios,etc. Cualquier JSX que se desee renderizar)

@returns JSX.Element | null - Puede retornar Null o un Componente de Modal, el cual insertará dinamicamente todo lo necesario 
*/
const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  confirmText, 
  cancelText, 
  children 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div>{children}</div>
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            {cancelText}
          </button>

          <button 
            onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
