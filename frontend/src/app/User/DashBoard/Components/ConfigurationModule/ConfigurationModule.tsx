import React from 'react'
import ChangeMasterpassModal from './ChangeMasterpassModal'
const Configuration = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Configuración</h2>
      <ChangeMasterpassModal onSucess={() => alert("✅ Cambio realizado")} />
    </div>
  )
}

export default Configuration