import { createContext } from "react";
import { useInvoices } from "../../hooks/useInvoices";
import { InvoiceContext } from "./InvoiceContext";

export const InvoiceProvider = ({ children }) => {
  const {
    invoices,
    invoiceSelected,
    initialInvoiceForm,
    visibleForm,
    suppliers,
    getInvoicePayments,
    handlerOpenForm,
    handlerCloseForm,
    handlerAddInvoice,
    handlerRemoveInvoice,
    handlerSelectInvoiceForm,
    handlerAddItem,
    handlerRemoveItem,
    handlerAddPayment
  } = useInvoices();

  return (
    <InvoiceContext.Provider
      value={{
        invoices,
        invoiceSelected,
        initialInvoiceForm,
        visibleForm,
        suppliers,
        getInvoicePayments,
        handlerOpenForm,
        handlerCloseForm,
        handlerAddInvoice,
        handlerRemoveInvoice,
        handlerSelectInvoiceForm,
        handlerAddItem,
        handlerRemoveItem,
        handlerAddPayment
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};