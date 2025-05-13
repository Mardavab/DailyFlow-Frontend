import { useContext } from "react";
import { UserRow } from "./UserRow";
import { UserContext } from "../../context/User/UserContext";

export const UserList = () => {
  const { users = [] } = useContext(UserContext);
  return (
    <>
      <table
        className="table table-bordered"
        id="dataTableUsers"
        width="100%"
        cellSpacing="0"
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Fecha Registro</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tfoot>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Fecha Registro</th>
            <th>Acciones</th>
          </tr>
        </tfoot>

        <tbody>
          {users.map((user) => (
            <UserRow key={user.id} user={user}/>
          ))}
        </tbody>
      </table>
    </>
  );
};
