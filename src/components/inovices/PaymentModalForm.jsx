import { useContext } from "react";
import { PaymentForm } from "./PaymentForm";
import { InvoiceContext } from "../../context/Invoice/InvoiceContext";

export const PaymentModalForm = ({ invoice, onClose }) => {
  const { paymentSelected, handlerClosePaymentForm, showPaymentModal } =
    useContext(InvoiceContext);
    
    if (!invoice) return null;

  if (!showPaymentModal || !paymentSelected) return null;

  return (
    <div className="abrir-modal animacion fadeIn">
      <div className="modal" style={{ display: "block" }} tabIndex="-1">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">
                {paymentSelected.id
                  ? "Registrar Pago Adicional"
                  : "Registrar Nuevo Pago"}
              </h5>
              <button
                type="button"
                className="close text-white"
                onClick={handlerClosePaymentForm}
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <PaymentForm
                invoice={paymentSelected} // Cambiado a invoice si PaymentForm lo espera así
                onClose={handlerClosePaymentForm}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
