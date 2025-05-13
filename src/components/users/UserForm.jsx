import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/User/UserContext";

export const UserForm = ({ handlerCloseForm, userSelected }) => {
  const { handlerAddUser, initialUserForm } = useContext(UserContext);
  const [userForm, setUserForm] = useState(initialUserForm);
  const { id, nombre, password, email, rol } = userForm;

  useEffect(() => {
    setUserForm({
      ...userSelected,
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
    if (!nombre || !email || !rol) {
      alert("Debe completar todos los campos obligatorios");
      return;
    }

    handlerAddUser(userForm);
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
        name="nombre"
        value={nombre || ''}
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
        name="rol"
        value={rol || ''}
        onChange={onInputChange}
        required
      >
        <option value="">Seleccione un rol</option>
        <option value="Administrador">Administrador</option>
        <option value="Técnico">Técnico</option>
        <option value="Encargado">Encargado</option>
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