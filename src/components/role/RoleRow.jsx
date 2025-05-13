import { useContext } from "react";
import { RoleContext } from "../../context/role/RoleContext";

export const RoleRow = ({ role }) => {
  const { handlerSelectRoleForm, handlerRemoveRole } = useContext(RoleContext);

  return (
    <tr key={role.id}>
      <td>{role.id}</td>
      <td>{role.nombre}</td>
      <td>{role.descripcion}</td>
      <td>
        {role.permisos?.join(', ') || 'Sin permisos'}
      </td>
      <td>{role.fechaCreacion}</td>
      <td>
        <div style={{ display: "inline-block" }}>
          <button
            type="button"
            className="btn btn-info btn-circle"
            onClick={() => handlerSelectRoleForm(role)}
            title="Editar rol"
          >
            <i className="fas fa-edit"></i>
          </button>
        </div>
        <div style={{ display: "inline-block", marginLeft: "5px" }}>
          <button
            type="button"
            className="btn btn-danger btn-circle"
            onClick={() => handlerRemoveRole(role.id)}
            title="Eliminar rol"
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  );
};