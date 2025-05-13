import { useContext } from "react";
import { SaleForm } from "./SaleForm";
import { SalesContext } from "../../context/sales/SalesContext";

export const SaleModalForm = () => {
  const { saleSelected, handlerCloseForm } = useContext(SalesContext);
  
  return (
    <div className="abrir-modal animacion fadeIn">
      <div className="modal" style={{ display: "block" }} tabIndex="-1">
        <div className="modal-dialog  modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {saleSelected.id > 0 ? "Editar" : "Registrar"} Venta
              </h5>
            </div>
            <div className="modal-body">
              <SaleForm
                saleSelected={saleSelected}
                handlerCloseForm={handlerCloseForm}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};