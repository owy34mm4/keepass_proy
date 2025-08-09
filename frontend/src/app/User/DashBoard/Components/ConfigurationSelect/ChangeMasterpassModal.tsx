import UserService from '@/api/UserService';
import React,{useState} from 'react'

interface changeMasterpassProps{
    onSucess?:() =>void;
}

    

export const ChangeMasterpassModal:React.FC<changeMasterpassProps> = ({onSucess}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newPass, setNewPass] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleConfirm =async ()=>{
        setLoading(true)
        try{
            console.log(newPass)
            await UserService.changeMasterpass(newPass)
            setSuccess(true);
            setIsModalOpen(true);
            setNewPass('');
            if(onSucess)onSucess();
        }catch(error:any){
            setError(error.message || "Error al cambiar la masterpassword")
        }finally{
            setLoading(false)
        }
    };

   return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
      >
        Cambiar Master Password
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 text-red-600">
              Advertencia
            </h2>
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

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirm}
                disabled={loading || !newPass}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
              >
                {loading ? 'Cambiando...' : 'Confirmar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {error && <p className="text-red-600 mt-2">{error}</p>}
      {success && (
        <p className="text-green-600 mt-2">Master password cambiada con éxito.</p>
      )}
    </div>
  );
};

export default ChangeMasterpassModal;

