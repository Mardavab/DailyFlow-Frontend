import { useContext } from "react";
import { UserList } from "./UserList";
import { UserContext } from "../../context/User/UserContext";
import { UserModalForm } from "../users/UserModalForm";


export const UsersContent = () => {
  const {
    users,
    visibleform,
    handlerOpenForm,
    handlerRemoveUser,
    handlerSelecterUserForm,
  } = useContext(UserContext)
  return (
    <>
    {!visibleform || (
        <UserModalForm/>
      )}
    <div className="container-fluid">
      {/* Encabezado */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4"></div>

      {/* Tabla de Usuarios */}
      <div className="card shadow mb-4">
        <div className="card-header py-3 d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 m-0 font-weight-bold text-primary">
            Gestión de Usuarios
          </h1>
          <button onClick={handlerOpenForm} className="btn btn-success btn-circle">
            <i className="fas fa-user-plus"></i>
          </button>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            {users.length === 0 ? (
              <div className="alert alert-warning">
                No hay usuarios en el sistema
              </div>
            ) : (
              <UserList/>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
    
  );
};
