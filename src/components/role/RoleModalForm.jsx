import { useContext } from "react";
import { RoleForm } from "./RoleForm";
import { RoleContext } from "../../context/role/RoleContext";

export const RoleModalForm = () => {
  const { roleSelected, handlerCloseForm } = useContext(RoleContext);
  
  return (
    <div className="abrir-modal animacion fadeIn">
      <div className="modal" style={{ display: "block" }} tabIndex="-1">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {roleSelected.id > 0 ? "Editar" : "Crear"} Rol
              </h5>
            </div>
            <div className="modal-body">
              <RoleForm
                roleSelected={roleSelected}
                handlerCloseForm={handlerCloseForm}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};