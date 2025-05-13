import Swal from "sweetalert2";
import { usersReducer } from "../reducers/usersReducer";
import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

const initialUsers = [
  {
    id: 1,
    nombre: 'Juan Pérez',
    email: 'juan.perez@example.com',
    rol: 'Administrador',
    fechaRegistro: '2023-01-15'
  },
  {
    id: 2,
    nombre: 'María García',
    email: 'maria.garcia@example.com',
    rol: 'Técnico',
    fechaRegistro: '2023-02-20'
  },
  {
    id: 3,
    nombre: 'Carlos López',
    email: 'carlos.lopez@example.com',
    rol: 'Encargado',
    fechaRegistro: '2023-03-10'
  }
];

const initialUserForm = {
  id: 0,
  nombre: '',
  password: '',
  email: '',
  rol: '',
  fechaRegistro: new Date().toISOString().split('T')[0] 
};

export const useUser = () => {
  const [users, dispatch] = useReducer(usersReducer, initialUsers);
  const [userSelected, setUserSelected] = useState(initialUserForm);
  const [visibleform, setVisibleForm] = useState(false);
  const navigate = useNavigate();

  const handlerAddUser = (user) => {
    dispatch({
      type: user.id === 0 ? "addUser" : "updateUser",
      payload: user,
    });
    Swal.fire({
      title: user.id === 0 ? "Usuario Creado" : "Usuario Actualizado",
      text:
        user.id === 0
          ? "El usuario ha sido creado con exito!"
          : "El usuario ha sido actualizado con exito!",
      icon: "success",
    });
    handlerCloseForm();
    navigate('/security/users')
  };

  const handlerRemoveUser = (id) => {
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
          type: "removeUser",
          payload: id,
        });
        Swal.fire({
          title: "¡Eliminado!",
          text: "El usuario ha sido eliminado.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      }
    });
  };

  const handlerSelecterUserForm = (user) => {
    setUserSelected({ ...user });
    setVisibleForm(true);
  };

  const handlerOpenForm = () => {
    setVisibleForm(true);
  };
  const handlerCloseForm = () => {
    setVisibleForm(false);
    setUserSelected(initialUserForm);
  };
  return {
    users,
    userSelected,
    initialUserForm,
    visibleform,

    handlerOpenForm,
    handlerCloseForm,
    handlerAddUser,
    handlerRemoveUser,
    handlerSelecterUserForm,
  };
};
