import { useContext } from "react";
import { RoleList } from "./RoleList";
import { RoleModalForm } from "./RoleModalForm";
import { RoleContext } from "../../context/role/RoleContext";

export const RolesContent = () => {
  const {
    roles,
    visibleForm,
    handlerOpenForm,
    handlerRemoveRole,
    handlerSelectRoleForm,
  } = useContext(RoleContext);

  return (
    <>
      {visibleForm && <RoleModalForm />}
      
      <div className="container-fluid">
        {/* Header */}
        <div className="d-sm-flex align-items-center justify-content-between mb-4"></div>

        {/* Roles Table */}
        <div className="card shadow mb-4">
          <div className="card-header py-3 d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 m-0 font-weight-bold text-primary">
              Gestión de Roles
            </h1>
            <button 
              onClick={handlerOpenForm} 
              className="btn btn-success btn-circle"
              title="Agregar nuevo rol"
            >
              <i className="fas fa-shield-alt"></i>
            </button>
          </div>

          <div className="card-body">
            <div className="table-responsive">
              {roles.length === 0 ? (
                <div className="alert alert-warning">
                  No hay roles definidos en el sistema
                </div>
              ) : (
                <RoleList />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};