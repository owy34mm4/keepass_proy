'use client'

import Modal from '@/app/Components/Modal'
import React, { useState } from 'react'
import Loader from '@/app/Components/Loader'
import UserService from '@/api/UserService'
import { useRouter } from 'next/navigation'
import { logoutUser } from '@/app/Auth/Components/AuthComponents'

interface ChangeMasterpassModalProps {
    isModalOpen: boolean,
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ChangeMasterpassModal: React.FC<ChangeMasterpassModalProps> = ({ isModalOpen, setIsModalOpen }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    // const [isModalOpen, setIsModalOpen] = useState(false);
    const [newPass, setNewPass] = useState('');
    const [error, setError] = useState('');

    const handleCloseModal = () => { setIsModalOpen(false);setNewPass('') }

    const handleSucess = async () => {
        alert("✅ Cambio realizado, Se cerrará tu sesión");
        await logoutUser();
        router.push("/");
    }

    const handleConfirm = async () => {
        setLoading(true)
        try {
            await UserService.changeMasterpass(newPass)
            setIsModalOpen(false);
            setNewPass('');
            handleSucess();
        } catch (error: any) {
            setError(error.message || "Error al cambiar la masterpassword")
        } finally {
            setLoading(false)
        }
    };
    return (
        <>
            {loading && <Loader message='Cambiando Masterpassm ....' />}

            <Modal
                isOpen={isModalOpen}
                title='Advenrtencia'
                onClose={handleCloseModal}
                cancelText='Cancelar'
                confirmText='Confirmar Cambio'
                onConfirm={handleConfirm}
            >
                <p className="mb-4">
                    Cambiar la master password puede afectar el acceso a tus datos.
                    ¿Seguro que deseas continuar?
                </p>

                <input
                    type="password"
                    placeholder="Nueva master password"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    className="border px-3 py-2 rounded w-full mb-4"
                />

            </Modal>
        </>
    )
}

export default ChangeMasterpassModal