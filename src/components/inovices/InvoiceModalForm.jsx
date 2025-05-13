import { useContext } from "react";
import { InvoiceForm } from "./InvoiceForm";
import { InvoiceContext } from "../../context/Invoice/InvoiceContext";

export const InvoiceModalForm = () => {
  const { invoiceSelected, handlerCloseForm } = useContext(InvoiceContext);
  
  return (
    <div className="abrir-modal animacion fadeIn">
      <div className="modal" style={{ display: "block" }} tabIndex="-1">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">
                {invoiceSelected.id > 0 ? "Editar" : "Nueva"} Factura
              </h5>
              <button 
                type="button" 
                className="close text-white" 
                onClick={handlerCloseForm}
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <InvoiceForm
                invoiceSelected={invoiceSelected}
                handlerCloseForm={handlerCloseForm}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};