import { useContext, useState } from "react";
import { InvoiceRow } from "./InvoiceRow";
import { InvoiceContext } from "../../context/Invoice/InvoiceContext";
import { PaymentModalForm } from "./PaymentModalForm";
import { PaymentHistoryModal } from "./PaymentHistoryModal";

export const InvoiceList = () => {
  const { invoices = [] } = useContext(InvoiceContext);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  return (
    <>
      <table
        className="table table-bordered"
        id="dataTableInvoices"
        width="100%"
        cellSpacing="0"
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>N° Factura</th>
            <th>Proveedor</th>
            <th>Fecha Emision</th>
            <th>Total</th>
            <th>Saldo</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tfoot>
          <tr>
            <th>ID</th>
            <th>N° Factura</th>
            <th>Proveedor</th>
            <th>Fecha Emision</th>
            <th>Total</th>
            <th>Saldo</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </tfoot>

        <tbody>
          {invoices.map((invoice) => (
            <InvoiceRow
              key={invoice.id}
              invoice={invoice}
              showPaymentForm={
                showPaymentForm && selectedInvoice?.id === invoice.id
              }
              showHistoryModal={
                showHistoryModal && selectedInvoice?.id === invoice.id
              }
              onShowPaymentForm={(invoice) => {
                setSelectedInvoice(invoice);
                setShowPaymentForm(true);
              }}
              onShowHistoryModal={(invoice) => {
                setSelectedInvoice(invoice);
                setShowHistoryModal(true);
              }}
              onClosePaymentForm={() => setShowPaymentForm(false)}
              onCloseHistoryModal={() => setShowHistoryModal(false)}
            />
          ))}
        </tbody>
      </table>
      {showPaymentForm && selectedInvoice && (
        <PaymentModalForm
          invoice={selectedInvoice}
          onClose={() => setShowPaymentForm(false)}
        />
      )}

      {showHistoryModal && selectedInvoice && (
        <PaymentHistoryModal
          invoice={selectedInvoice}
          onClose={() => setShowHistoryModal(false)}
        />
      )}
    </>
  );
};