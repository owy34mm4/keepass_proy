'use client'

import React, { JSX, use, useState } from 'react'
import DeleteConfirmationModal from './DeleteConfirmationModal';
import AddPasswordModal from './AddPasswordModal';
import EditPasswordModal from './EditPasswordModal';


export interface PasswordItem {
  id: number;
  title: string;
  user_name: string;
  password: string;
  url: string;
  notes: string;
}

interface PasswordListProps {
  passwords: PasswordItem[];
  onDelete: (id: number) => void;
  onEdit: (id: number, data: Partial<PasswordItem>) => void;
  onAdd: (newPassword: Partial<PasswordItem>) => void;
  // onAdd: () => void;
}

/**
 * Componente funcional en el cual se renderiza todo el modulo de passwords
 * @prop { PasswordItem[ ] } passwords - Recibe como prop de funcion un array de objetos PasswordItem
 * @prop {function} onDelete -Recibe como prop de funcion una funcion, orientada a ejecutar el Delete
 * @prop {function} onEdit - -Recibe como prop de funcion una funcion, orientada a ejecutar el Update
 * @prop {function} onAdd - -Recibe como prop de funcion una funcion, orientada a ejecutar la insericon
 * @returns {JSX.Element} Retorna Todo el modulo de passwords
 */
const PasswordList: React.FC<PasswordListProps> = ({ passwords, onDelete, onEdit, onAdd }) => {
  const [filter, setFilter] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<PasswordItem>>({});
  const [selectedPassword, setSelectedPassword] = useState<PasswordItem | null>(null)
  const [newPasswordForm, setNewPasswordForm] = useState<Partial<PasswordItem>>({
    title: '',
    user_name: 'estado padre', 
    password: '',
    url: '',
    notes: '',
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [passwordToDelete, setPasswordToDelete] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  /**
   *Funcion Que filtra las contraseñas y las almacena en una constante
   *
   Funciona aplicandole un .filter( {condiciones de filtrado} ) al estado que originalmente almacena todas las contraseñas
   */
  const filteredPasswords = passwords.filter(p =>
    p.title.toLowerCase().includes(filter.toLowerCase()) ||
    p.user_name.toLowerCase().includes(filter.toLowerCase()) ||
    p.password.toLowerCase().includes(filter.toLowerCase()) ||
    p.url.toLowerCase().includes(filter.toLowerCase()) ||
    p.notes.toLowerCase().includes(filter.toLowerCase())
  );

  /**
    * Accion ejecutable cuando clickean en la opcion de editar"
    * 
    *@param PasswordItem -it contains an own declared typescript object, one that contains the json info of the passwords :p
    *
    *It works by seting states to work properly.
    *
    *-Set the editing id as the pwd selected.id then set the selectedpassword state as the p selected then stablish a new json that contaisn the info of the new pwd
    *
    *-Set the modal avalible to see

  In fact,this work more like a replacer than an editer
  */
  const handleEditClick = (p: PasswordItem) => {
    setEditingId(p.id);
    setSelectedPassword(p); // Añadimos esto para asegurarnos de que tenemos el objeto completo
    setEditForm({ // Establecemos los valores de forma segura
      title: p.title || '',
      user_name: p.user_name || '',
      password: p.password || '',
      url: p.url || '',
      notes: p.notes || '',
    });
    setShowEditModal(true);
  };

  /**
    * Accion ejecutable cuando guardan en la vista de actualizar item
    * 
    *Funciona condicionando el estado que almancea el id a ejecutar {editingId} {editingId ? Exec : null}
    *
    *Empieza utilizando la funcion que se pasa por parametro al componente padre, a la cual se le envain los parametros (editingId, editingForm {json password} ) {onEdit(editingId,editingForm)}
    *
    *Setea el valor del boolean que controla el renderizado a False, para que una vez confirmada la edicion, el modal cierre
    *
    *Setea el editingId a null para evitar ejecuciones infortuitas
  */
  const handleSaveEdit = () => {
    if (editingId !== null) {
      onEdit(editingId, editForm);
      setShowEditModal(false);
      setEditingId(null);
    }
  };

  /**
   * Accion ejecutable cuando guardan nuevo item
   * 
   * Empiza ejecutando la funcion que se apsa  por props al componente Padre, pasandole como parametro el contenedor json de la nueva contraseña(newPasswordForm) {onAdd(nPF)}
   * 
   * Setea el booleando condicional de renderizado a componente en False, apra que despues de la ejecucion este se cierre
   * 
   * Setea el valor de newPasswordForm a vacio en todas sus entradas
   * */
  const handleAddPassword = () => {
    console.log(newPasswordForm);
    // onAdd();
    onAdd(newPasswordForm);
    setShowAddModal(false);
    setNewPasswordForm({ title: "", user_name: "", password: "", url: "", notes: "" })
  };

  /**
   * Accion ejecutable cuando seleccionen "eliminar. Abre el modal"
   * 
   * Setea el valor del estado passwordToDelete con el id del objeto password
   * 
   * Setea el valor de showDeleteModal en true, lo cual habilita la renderizacion del modal
   * */
  const handleDeleteClick = (id: number) => {
    setPasswordToDelete(id);
    setShowDeleteModal(true);
  };

  /** 
    *Accion ejecutable al confirmar la eliminacion
    * Funciona condicionando el valor del estado passwordToDelete {ifpTD!=null} then execute.
    * 
    *Ejecuta la funcion pasada por prop al componente padre, recibiendo comoparametro el id de pa password a eliminar {onDelete(pTD->id)}
    *
    *Setea el valor del state boolean que controla el renderizado del componente a False
    *
    *Setea el valor del passwordToDelete a Null, esto para evitar errores de multiple eliminacion o ejecucion infortuita
  */
  const handleConfirmDelete = () => {
    if (passwordToDelete !== null) {
      onDelete(passwordToDelete);
      setShowDeleteModal(false);
      setPasswordToDelete(null);
    }
  };


  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Contraseñas</h2>
      <input
        type="text"
        placeholder="Filtrar por servicio o usuario..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <button
        onClick={() => setShowAddModal(true)}
        className="mb-4 p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Añadir Contraseña
      </button>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Servicio</th>
            <th className="p-2 border">Usuario</th>
            <th className="p-2 border">Contraseña</th>
            <th className="p-2 border">URL</th>
            <th className="p-2 border">Notas</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredPasswords.map((p) => (
            <tr key={p.id} className="border-b">
              <td className="p-2 border">{p.title}</td>
              <td className="p-2 border">{p.user_name}</td>
              <td className="p-2 border">{p.password}</td>
              <td className="p-2 border">{p.url}</td>
              <td className="p-2 border">{p.notes}</td>
              <td className="p-2 border">
                <button onClick={() => handleEditClick(p)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Editar</button>
                <button onClick={() => handleDeleteClick(p.id)} className="bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de Edicion */}
      <EditPasswordModal
        isOpen={showEditModal}
        onClose={() => {setEditingId(null);setShowEditModal(false)}}
        password={selectedPassword!}
        onSave={handleSaveEdit}
      />

      {/* Modal Eliminacion */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {setPasswordToDelete(null); setShowDeleteModal(false)}}
        onConfirm={() => { passwordToDelete != null ? handleConfirmDelete() : alert("No id recibido") }}
      />
      {/* Modal de Insercion */}
      <AddPasswordModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        newPassword={newPasswordForm}
        setNewPassword={setNewPasswordForm}
        onConfirm={handleAddPassword}
      />

    </div>
  );
}

export default PasswordList


