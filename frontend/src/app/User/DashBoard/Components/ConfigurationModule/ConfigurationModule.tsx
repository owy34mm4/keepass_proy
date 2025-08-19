'use client'

import React from 'react'
import ChangeMasterpass from './ChangeMasterpass/ChangeMasterpass'
import ExportData from './ExportData/ExportData'


const Configuration = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Configuración</h2>
      <ChangeMasterpass />
      <br />
      <ExportData/>
    </div>
  )
}

export default Configuration