import Swal from "sweetalert2";
import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { rolesReducer } from "../reducers/rolesReducer";

const initialRoles = [
  {
    id: 1,
    nombre: 'Tecnico',
    descripcion: 'Acceso completo al sistema',
    permisos: ['all'],
    fechaCreacion: '2023-01-01'
  },
  {
    id: 2,
    nombre: 'Administrador',
    descripcion: 'Puede crear y editar contenido',
    permisos: ['create', 'edit'],
    fechaCreacion: '2023-02-15'
  },
  {
    id: 3,
    nombre: 'Encargado',
    descripcion: 'Solo lectura',
    permisos: ['read'],
    fechaCreacion: '2023-03-10'
  }
];

const initialRoleForm = {
  id: 0,
  nombre: '',
  descripcion: '',
  permisos: [],
  fechaCreacion: new Date().toISOString().split('T')[0]
};

export const useRole = () => {
  const [roles, dispatch] = useReducer(rolesReducer, initialRoles);
  const [roleSelected, setRoleSelected] = useState(initialRoleForm);
  const [visibleForm, setVisibleForm] = useState(false);
  const navigate = useNavigate();

  const handlerAddRole = (role) => {
    dispatch({
      type: role.id === 0 ? "addRole" : "updateRole",
      payload: role,
    });
    Swal.fire({
      title: role.id === 0 ? "Rol Creado" : "Rol Actualizado",
      text:
        role.id === 0
          ? "El rol ha sido creado con éxito!"
          : "El rol ha sido actualizado con éxito!",
      icon: "success",
    });
    handlerCloseForm();
    navigate('/security/roles');
  };

  const handlerRemoveRole = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, ¡elimínalo!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({
          type: "removeRole",
          payload: id,
        });
        Swal.fire({
          title: "¡Eliminado!",
          text: "El rol ha sido eliminado.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      }
    });
  };

  const handlerSelectRoleForm = (role) => {
    setRoleSelected({ ...role });
    setVisibleForm(true);
  };

  const handlerOpenForm = () => {
    setVisibleForm(true);
  };

  const handlerCloseForm = () => {
    setVisibleForm(false);
    setRoleSelected(initialRoleForm);
  };

  return {
    roles,
    roleSelected,
    initialRoleForm,
    visibleForm,

    handlerOpenForm,
    handlerCloseForm,
    handlerAddRole,
    handlerRemoveRole,
    handlerSelectRoleForm,
  };
};