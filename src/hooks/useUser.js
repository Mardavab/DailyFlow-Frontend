import { useReducer, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../api/api";
import { usersReducer } from "../reducers/usersReducer";

const initialUserForm = {
  id: 0,
  username: "",
  password: "",
  email: "",
  role: "",
};

export const useUser = () => {
  const [users, dispatch] = useReducer(usersReducer, []);
  const [userSelected, setUserSelected] = useState(initialUserForm);
  const [visibleform, setVisibleForm] = useState(false);
  const navigate = useNavigate();

  // 1) Carga la lista de usuarios al montar el componente
  useEffect(() => {
    api
      .get("/users")
      .then(({ data }) => {
        dispatch({ type: "loadUsers", payload: data });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "No se pudieron cargar los usuarios", "error");
      });
  }, []);

  // 2) Crear o actualizar usuario
  const handlerAddUser = async (user) => {
  try {
    let res;
    if (!user.id || user.id === 0) {
      const { id, ...payload } = user;
      // Si tu backend espera roles como [{id:...}], aquí va directo
      res = await api.post("/users", payload);
      dispatch({ type: "addUser", payload: res.data });
      Swal.fire("Usuario creado", "El usuario ha sido creado con éxito.", "success");
    } else {
      res = await api.put(`/users/${user.id}`, user);
      dispatch({ type: "updateUser", payload: res.data });
      Swal.fire("Usuario actualizado", "El usuario ha sido actualizado con éxito.", "success");
    }
    handlerCloseForm();
    navigate("/security/users");
  } catch (err) {
    console.error(err);
    let msg = "No se pudo guardar el usuario";
    if (err.response?.status === 409) msg = "El usuario o email ya existe";
    Swal.fire("Error", msg, "error");
  }
};

  // 3) Eliminar usuario
  const handlerRemoveUser = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, ¡elimínalo!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/users/${id}`);
          dispatch({ type: "removeUser", payload: id });
          Swal.fire("¡Eliminado!", "El usuario ha sido eliminado.", "success");
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "No se pudo eliminar el usuario", "error");
        }
      }
    });
  };

  // 4) Abrir formulario en modo edición
  const handlerSelecterUserForm = (user) => {
    setUserSelected({ ...user });
    setVisibleForm(true);
  };

  // 5) Control de visibilidad del form
  const handlerOpenForm = () => setVisibleForm(true);
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
