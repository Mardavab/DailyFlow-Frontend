import { useContext } from "react";
import { InvoiceContext } from "../../context/invoice/InvoiceContext";
import { InvoiceForm } from "./InvoiceForm";

export const InvoiceModalForm = ({ show, handlerCloseForm, invoiceSelected }) => {
  if (!show) return null;
  return (
    <div className="modal d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {invoiceSelected && invoiceSelected.id > 0
                ? "Editar Factura"
                : "Nueva Factura"}
            </h5>
            <button
              type="button"
              className="close"
              onClick={handlerCloseForm}
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <InvoiceForm
              handlerCloseForm={handlerCloseForm}
              invoiceSelected={invoiceSelected}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
