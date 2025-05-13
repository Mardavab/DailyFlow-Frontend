import { useContext } from "react";
import { SupplierForm } from "./SupplierForm ";
import { SupplierContext } from "../../context/Supplier/SupplierContext "

export const SupplierModalForm = () => {
  const { supplierSelected, handlerCloseForm } = useContext(SupplierContext);
  
  return (
    <div className="abrir-modal animacion fadeIn">
      <div className="modal" style={{ display: "block" }} tabIndex="-1">
        <div className="modal-dialog modal-lg" role="document">  {/* Added modal-lg for larger form */}
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">  {/* Added header styling */}
              <h5 className="modal-title">
                {supplierSelected.id > 0 ? "Editar" : "Registrar"} Proveedor
              </h5>
              <button 
                type="button" 
                className="close text-white" 
                onClick={handlerCloseForm}
              >
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <SupplierForm
                supplierSelected={supplierSelected}
                handlerCloseForm={handlerCloseForm}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};