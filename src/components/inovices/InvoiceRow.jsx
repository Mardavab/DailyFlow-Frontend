import { useContext } from "react";
import { InvoiceContext } from "../../context/Invoice/InvoiceContext";

export const InvoiceRow = ({ 
  invoice,
  onShowPaymentForm,
  onShowHistoryModal,
  onClosePaymentForm,
  onCloseHistoryModal
}) => {
  const {
    handlerRemoveInvoice,
    suppliers
  } = useContext(InvoiceContext);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(amount);
  };

  const getSupplierName = (proveedorId) => {
    const supplier = suppliers.find((s) => s.id == proveedorId);
    return supplier ? supplier.nombre : "N/A";
  };

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case "pagada":
        return "badge-success";
      case "parcial":
        return "badge-info";
      case "pendiente":
        return "badge-warning";
      case "vencida":
        return "badge-danger";
      default:
        return "badge-secondary";
    }
  };

  return (
    <tr key={invoice.id}>
      <td>{invoice.id}</td>
      <td className="font-weight-bold">{invoice.numeroFactura}</td>
      <td>{getSupplierName(invoice.proveedorId)}</td>
      <td>{new Date(invoice.fechaEmision).toLocaleDateString("es-CO")}</td>
      <td className="text-right">{formatCurrency(invoice.total)}</td>
      <td
        className={`text-right font-weight-bold ${
          invoice.saldoPendiente > 0 ? "text-danger" : "text-success"
        }`}
      >
        {formatCurrency(invoice.saldoPendiente)}
      </td>
      <td>
        <span className={`badge ${getStatusBadgeClass(invoice.estado)}`}>
          {invoice.estado.toUpperCase()}
        </span>
      </td>
      <td>
        <div className="d-flex">
          <button
            type="button"
            className="btn btn-secondary btn-circle mr-2"
            onClick={() => onShowHistoryModal(invoice)} // Cambiado a objeto completo
            title="Ver historial de pagos"
            disabled={!invoice.pagos || invoice.pagos.length === 0}
          >
            <i className="fas fa-history"></i>
          </button>

          <button
            type="button"
            className="btn btn-success btn-circle mr-2"
            onClick={() => onShowPaymentForm(invoice)}
            title="Registrar pago"
            disabled={invoice.saldoPendiente <= 0}
          >
            <i className="fas fa-money-bill-wave"></i>
          </button>

          <button
            type="button"
            className="btn btn-danger btn-circle"
            onClick={() => handlerRemoveInvoice(invoice.id)}
            title="Eliminar factura"
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  );
};