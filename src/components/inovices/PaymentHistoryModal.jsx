export const PaymentHistoryModal = ({ invoice, onClose }) => {
  return (
    <div className="abrir-modal animacion fadeIn">
      <div
        className="modal fade show"
        style={{ display: "block" }}
        tabIndex="-1"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">
                Historial de Pagos - Factura #{invoice.numeroFactura}
              </h5>
              <button
                type="button"
                className="close text-white"
                onClick={onClose}
              >
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Monto</th>
                    <th>Fecha</th>
                    <th>Metodo</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.pagos.map((pago) => (
                    <tr key={pago.id}>
                      <td>{new Date(pago.fecha).toLocaleDateString()}</td>
                      <td>{pago.monto}</td>
                      <td>{pago.fecha}</td>
                      <td>{pago.metodo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
