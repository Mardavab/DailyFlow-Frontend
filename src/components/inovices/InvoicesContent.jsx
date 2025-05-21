import { useState, useContext } from "react";
import { InvoiceContext } from "../../context/Invoice/InvoiceContext";
import { InvoiceModalForm } from "./InvoiceModalForm";
import { InvoiceList } from "./InvoiceList";
import { PaymentModalForm } from "./PaymentModalForm";
import { PaymentHistoryModal } from "./PaymentHistoryModal";
import { InvoiceStatCard } from "./InvoiceStatCard";

export const InvoicesContent = () => {
  const {
    invoices,
    invoiceSelected,
    initialInvoiceForm,
    visibleForm,
    handlerOpenForm,
    handlerCloseForm,
    handlerSelectInvoiceForm,
  } = useContext(InvoiceContext);

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [activeInvoice, setActiveInvoice] = useState(null);

  const handleShowPaymentForm = (invoice) => {
    setActiveInvoice(invoice);
    setShowPaymentModal(true);
  };

  const handleShowHistoryModal = (invoice) => {
    setActiveInvoice(invoice);
    setShowHistoryModal(true);
  };

  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
    setActiveInvoice(null);
  };

  const handleCloseHistoryModal = () => {
    setShowHistoryModal(false);
    setActiveInvoice(null);
  };

  // Estadísticas
  const stats = {
    total: invoices.length,
    paid: invoices.filter((i) => i.status === "PAGADO").length,
    pending: invoices.filter((i) => i.status === "PENDIENTE").length,
    partial: invoices.filter((i) => i.status === "PARCIAL").length,
    totalAmount: invoices.reduce((sum, inv) => sum + (inv.total || 0), 0),
    pendingAmount: invoices.reduce(
      (sum, inv) => sum + (inv.pendingBalance || 0),
      0
    ),
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Facturación</h2>
        <button className="btn btn-primary" onClick={handlerOpenForm}>
          <i className="fas fa-plus"></i> Nueva Factura
        </button>
      </div>
      <div className="row mb-4">
        <InvoiceStatCard
          label="Facturas"
          value={stats.total}
          color="primary"
          icon="fas fa-file-invoice"
        />
        <InvoiceStatCard
          label="Pagadas"
          value={stats.paid}
          color="success"
          icon="fas fa-check-circle"
        />
        <InvoiceStatCard
          label="Pendientes"
          value={stats.pending}
          color="warning"
          icon="fas fa-clock"
        />
        <InvoiceStatCard
          label="Parciales"
          value={stats.partial}
          color="info"
          icon="fas fa-exclamation"
        />
        <InvoiceStatCard
          label="Monto Total"
          value={stats.totalAmount.toLocaleString("es-CO")}
          color="dark"
          icon="fas fa-dollar-sign"
        />
        <InvoiceStatCard
          label="Pendiente"
          value={stats.pendingAmount.toLocaleString("es-CO")}
          color="danger"
          icon="fas fa-exclamation-circle"
        />
      </div>
      <InvoiceList
        onShowPaymentForm={handleShowPaymentForm}
        onShowHistoryModal={handleShowHistoryModal}
      />
      <InvoiceModalForm
        show={visibleForm}
        handlerCloseForm={handlerCloseForm}
        invoiceSelected={invoiceSelected}
      />
      <PaymentModalForm
        show={showPaymentModal}
        handlerCloseModal={handleClosePaymentModal}
        invoice={activeInvoice}
      />
      <PaymentHistoryModal
        show={showHistoryModal}
        handlerCloseModal={handleCloseHistoryModal}
        invoice={activeInvoice}
      />
    </div>
  );
};
