import { useContext } from "react";
import { InvoiceContext } from "../../context/Invoice/InvoiceContext";
import { PaymentForm } from "./PaymentForm";

export const PaymentModalForm = ({ show, handlerCloseModal, invoice }) => {
  const { handlerAddPayment } = useContext(InvoiceContext);

  if (!show || !invoice) return null;

  return (
    <div className="modal d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Registrar Pago</h5>
            <button
              type="button"
              className="close"
              onClick={handlerCloseModal}
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <PaymentForm
              invoice={invoice}
              handlerAddPayment={handlerAddPayment}
              handlerClose={handlerCloseModal}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
