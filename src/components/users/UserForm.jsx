import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/User/UserContext";
import { useRoles } from "../../hooks/useRoles"; // <--- Importa el hook de roles

export const UserForm = ({ handlerCloseForm, userSelected }) => {
  const { handlerAddUser, initialUserForm } = useContext(UserContext);
  const roles = useRoles(); // <--- Aquí traes los roles del backend

  const [userForm, setUserForm] = useState(initialUserForm);
  const { id, username, password, email, roleId } = userForm; // roleId será el campo para enviar

  useEffect(() => {
    setUserForm({
      ...userSelected,
      roleId: userSelected.roleId || "", // por defecto vacío si no está
    });
  }, [userSelected]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setUserForm({
      ...userForm,
      [name]: value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!username || !email || !userForm.roleId) {
      alert("Debe completar todos los campos obligatorios");
      return;
    }

    // El backend espera roles como una lista de objetos con id
    // OJO: ajusta esto si tu backend espera un campo diferente
    const userToSend = {
      ...userForm,
      roles: [{ id: Number(userForm.roleId) }]
    };

    handlerAddUser(userToSend);
    setUserForm(initialUserForm);
  };

  const onCloseForm = () => {
    handlerCloseForm();
    setUserForm(initialUserForm);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        className="form-control my-3 w-75"
        placeholder="Nombre completo"
        name="username"
        value={username || ''}
        onChange={onInputChange}
        required
      />
      {id > 0 || (
        <input
          type="password"
          className="form-control my-3 w-75"
          placeholder="Password"
          name="password"
          value={password || ''}
          onChange={onInputChange}
          minLength="6"
          required
        />
      )}
      <input
        type="email"
        className="form-control my-3 w-75"
        placeholder="Email"
        name="email"
        value={email || ''}
        onChange={onInputChange}
        required
      />
      <select
        className="form-control my-3 w-75"
        name="roleId"
        value={userForm.roleId || ''}
        onChange={onInputChange}
        required
      >
        <option value="">Seleccione un rol</option>
        {roles.map(role => (
          <option key={role.id} value={role.id}>
            {role.name}
          </option>
        ))}
      </select>
      <input type="hidden" name="id" value={id} />
      <button className="btn btn-primary" type="submit">
        {id > 0 ? "Actualizar" : "Crear"}
      </button>
      {!handlerCloseForm || (
        <button
          onClick={onCloseForm}
          type="button"
          className="btn-primary btn mx-2"
        >
          Cerrar
        </button>
      )}
    </form>
  );
};
