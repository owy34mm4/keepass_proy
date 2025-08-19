'use client'

import React, { useState } from 'react'
import Loader from '@/app/Components/Loader'
import Modal from '@/app/Components/Modal'
import UserService from '@/api/UserService'

interface ExportDataModalProps {
    isModalOpen: boolean
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
};

const ExportDataModal: React.FC<ExportDataModalProps> = ({ isModalOpen, setIsModalOpen }) => {
    const [loading, setLoading] = useState(false);

    const handelClose = () => { setIsModalOpen(false) };

    const handleConfirm = async () => {
        setLoading(true);
        try{
            const data=await UserService.downloadData()
            const url: string = window.URL.createObjectURL(new Blob([data]));
            const link = document.createElement('a');
            link.href=url;
            link.setAttribute('download','exported_data.xlsx');
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(url)
            setIsModalOpen(false)
            // alert("Sí la descarga no empezó automaticamente da click aquí -->")
        }catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }

    }
    return (
        <>
            {loading && <Loader message='Exportando Informacion ...' />}

            <Modal
                isOpen={isModalOpen}
                onClose={handelClose}
                title='Exportacion de Informacion'
                cancelText='Cancelar'
                confirmText='Descargar Informacion'
                onConfirm={handleConfirm }
            >
                <p>
                    Al dar click en la confirmacion de esta ventana
                    empezará automaticamente la descarga del archivo XLSX(Excel)
                    el cual contiene toda tu Informacion
                </p>

            </Modal>
        </>
    )
}

export default ExportDataModal