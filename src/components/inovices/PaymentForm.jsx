import { useState } from "react";

export const PaymentForm = ({ invoice, handlerAddPayment, handlerClose }) => {
  const [payment, setPayment] = useState({
    date: new Date().toISOString().slice(0, 10),
    amount: "",
    method: "",
  });

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setPayment({ ...payment, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!payment.amount || !payment.method) {
      alert("Ingrese monto y método de pago.");
      return;
    }
    handlerAddPayment(invoice.id, payment);
    handlerClose();
  };

  return (
    <form onSubmit={onSubmit} className="p-3">
      <h5>Registrar Pago a Factura {invoice.invoiceNumber}</h5>
      <div className="form-group">
        <label>Fecha de Pago</label>
        <input
          type="date"
          className="form-control"
          name="date"
          value={payment.date}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Monto</label>
        <input
          type="number"
          className="form-control"
          name="amount"
          value={payment.amount}
          min="1"
          max={invoice.pendingBalance}
          onChange={onInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Método</label>
        <input
          type="text"
          className="form-control"
          name="method"
          value={payment.method}
          onChange={onInputChange}
          required
        />
      </div>
      <div className="d-flex justify-content-end mt-3">
        <button type="button" className="btn btn-secondary mr-2" onClick={handlerClose}>
          Cancelar
        </button>
        <button className="btn btn-success" type="submit">
          Registrar Pago
        </button>
      </div>
    </form>
  );
};
