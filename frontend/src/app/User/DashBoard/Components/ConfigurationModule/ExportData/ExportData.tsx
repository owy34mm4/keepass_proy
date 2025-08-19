'use client'

import React,{useState} from 'react'
import Modal from '@/app/Components/Modal'
import Loader from '@/app/Components/Loader'
import ExportDataModal from './ExportDataModal'


const ExportData = () => {
    const [isModalOpen,setIsModalopen]= useState(false)
  return (
        <>
        <button
        onClick={()=>setIsModalopen(true)}>
        Exportar Informacion
        </button>

        <ExportDataModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalopen}
        />
        
        </>
  )
}

export default ExportData