export const PaymentHistoryModal = ({ show, handlerCloseModal, invoice }) => {
  if (!show || !invoice) return null;
  const payments = invoice.payments || [];

  return (
    <div className="modal d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              Historial de Pagos - Factura {invoice.invoiceNumber}
            </h5>
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
            {payments.length === 0 ? (
              <div>No hay pagos registrados.</div>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Monto</th>
                    <th>Método</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((pay, i) => (
                    <tr key={i}>
                      <td>{new Date(pay.date).toLocaleDateString("es-CO")}</td>
                      <td>
                        {new Intl.NumberFormat("es-CO", {
                          style: "currency",
                          currency: "COP",
                        }).format(pay.amount)}
                      </td>
                      <td>{pay.method}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
