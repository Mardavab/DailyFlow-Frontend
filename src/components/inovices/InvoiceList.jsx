import { useContext } from "react";
import { InvoiceRow } from "./InvoiceRow";
import { InvoiceContext } from "../../context/Invoice/InvoiceContext";

export const InvoiceList = ({
  onShowPaymentForm,
  onShowHistoryModal,
}) => {
  const { invoices } = useContext(InvoiceContext);

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>N° Factura</th>
          <th>Proveedor</th>
          <th>Fecha Emisión</th>
          <th>Total</th>
          <th>Pendiente</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((invoice) => (
          <InvoiceRow
            key={invoice.id}
            invoice={invoice}
            onShowPaymentForm={onShowPaymentForm}
            onShowHistoryModal={onShowHistoryModal}
          />
        ))}
      </tbody>
    </table>
  );
};
