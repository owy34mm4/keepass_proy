'use client'

import React from 'react'
import ChangeMasterpass from './ChangeMasterpass/ChangeMasterpass'

const Configuration = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Configuración</h2>
      <ChangeMasterpass />
    </div>
  )
}

export default Configuration