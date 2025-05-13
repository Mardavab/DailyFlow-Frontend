import { useContext } from "react";
import { RoleRow } from "./RoleRow";
import { RoleContext } from "../../context/role/RoleContext";

export const RoleList = () => {
  const { roles = [] } = useContext(RoleContext);
  
  return (
    <>
      <table
        className="table table-bordered"
        id="dataTableRoles"
        width="100%"
        cellSpacing="0"
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Permisos</th>
            <th>Fecha Creación</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tfoot>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Permisos</th>
            <th>Fecha Creación</th>
            <th>Acciones</th>
          </tr>
        </tfoot>

        <tbody>
          {roles.map((role) => (
            <RoleRow key={role.id} role={role}/>
          ))}
        </tbody>
      </table>
    </>
  );
};