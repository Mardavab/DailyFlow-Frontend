import { useContext, useEffect, useState } from "react";
import { RoleContext } from "../../context/role/RoleContext";

export const RoleForm = ({ handlerCloseForm, roleSelected }) => {
  const { handlerAddRole, initialRoleForm } = useContext(RoleContext);
  const [roleForm, setRoleForm] = useState(initialRoleForm);
  const { id, nombre, descripcion, permisos } = roleForm;

  useEffect(() => {
    setRoleForm({
      ...roleSelected,
    });
  }, [roleSelected]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setRoleForm({
      ...roleForm,
      [name]: value,
    });
  };

  const onPermissionChange = (permission) => {
    setRoleForm(prev => ({
      ...prev,
      permisos: prev.permisos.includes(permission)
        ? prev.permisos.filter(p => p !== permission)
        : [...prev.permisos, permission]
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!nombre || !descripcion || permisos.length === 0) {
      alert("Debe completar todos los campos obligatorios");
      return;
    }

    handlerAddRole(roleForm);
    setRoleForm(initialRoleForm);
  };

  const onCloseForm = () => {
    handlerCloseForm();
    setRoleForm(initialRoleForm);
  };

  // Available permissions with labels
  const availablePermissions = [
    { value: 'all', label: 'Todos los permisos' },
    { value: 'read', label: 'Lectura' },
    { value: 'write', label: 'Escritura' },
    { value: 'delete', label: 'Eliminación' },
  ];

  return (
    <form onSubmit={onSubmit} className="p-4">
      <div className="mb-4">
        <label htmlFor="nombre" className="form-label fw-bold">Nombre del Rol</label>
        <input
          type="text"
          className="form-control"
          id="nombre"
          placeholder="Ej: Administrador"
          name="nombre"
          value={nombre || ''}
          onChange={onInputChange}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="descripcion" className="form-label fw-bold">Descripción</label>
        <textarea
          className="form-control"
          id="descripcion"
          placeholder="Describe las funciones de este rol"
          name="descripcion"
          value={descripcion || ''}
          onChange={onInputChange}
          rows="3"
          required
        />
      </div>

      <div className="mb-4">
        <label className="form-label fw-bold d-block mb-3">Permisos</label>
        <div className="row">
          {availablePermissions.map((perm) => (
            <div key={perm.value} className="col-md-6 mb-2">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`permiso-${perm.value}`}
                  checked={permisos.includes(perm.value)}
                  onChange={() => onPermissionChange(perm.value)}
                />
                <label className="form-check-label" htmlFor={`permiso-${perm.value}`}>
                  {perm.label}
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      <input type="hidden" name="id" value={id} />

      <div className="d-flex justify-content-end gap-2 mt-4">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={onCloseForm}
        >
          Cancelar
        </button>
        <button className="btn btn-primary" type="submit">
          {id > 0 ? "Actualizar Rol" : "Crear Rol"}
        </button>
      </div>
    </form>
  );
};