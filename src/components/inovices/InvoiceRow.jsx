import { useContext } from "react";
import { InvoiceContext } from "../../context/invoice/InvoiceContext";

export const InvoiceRow = ({
  invoice,
  onShowPaymentForm,
  onShowHistoryModal,
}) => {
  const { handlerRemoveInvoice, suppliers = [] } = useContext(InvoiceContext);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(amount);

  const getSupplierName = (supplierId) => {
    const supplier = (suppliers || []).find((s) => s.id === Number(supplierId));
    return supplier ? (supplier.nombre || supplier.name) : "N/A";
  };

  const getStatusBadgeClass = (status) => {
    switch (status?.toUpperCase()) {
      case "PAGADO":
        return "badge-success";
      case "PARCIAL":
        return "badge-info";
      case "PENDIENTE":
        return "badge-warning";
      case "VENCIDA":
        return "badge-danger";
      default:
        return "badge-secondary";
    }
  };

  return (
    <tr>
      <td>{invoice.id}</td>
      <td>{invoice.invoiceNumber}</td>
      <td>{getSupplierName(invoice.supplier?.id || invoice.supplierId)}</td>
      <td>
        {invoice.issueDate
          ? new Date(invoice.issueDate).toLocaleDateString("es-CO")
          : ""}
      </td>
      <td className="text-right">{formatCurrency(invoice.total)}</td>
      <td
        className={`text-right font-weight-bold ${
          invoice.pendingBalance > 0 ? "text-danger" : "text-success"
        }`}
      >
        {formatCurrency(invoice.pendingBalance)}
      </td>
      <td>
        <span className={`badge ${getStatusBadgeClass(invoice.status)}`}>
          {invoice.status?.toUpperCase()}
        </span>
      </td>
      <td>
        <div className="d-flex">
          <button
            type="button"
            className="btn btn-secondary btn-circle mr-2"
            onClick={() => onShowHistoryModal(invoice)}
            title="Ver historial de pagos"
            disabled={!invoice.payments || invoice.payments.length === 0}
          >
            <i className="fas fa-history"></i>
          </button>
          <button
            type="button"
            className="btn btn-success btn-circle mr-2"
            onClick={() => onShowPaymentForm(invoice)}
            title="Registrar pago"
            disabled={invoice.pendingBalance <= 0}
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
