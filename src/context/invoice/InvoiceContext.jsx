import { createContext } from "react";
import { useInvoices } from "../../hooks/useInvoices";
import { useSuppliers } from "../../hooks/useSuppliers";

export const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  // Usa tu hook de invoices (facturas)
  const invoicesHook = useInvoices();

  // Usa tu hook de suppliers (proveedores)
  const { suppliers } = useSuppliers();

  return (
    <InvoiceContext.Provider
      value={{
        ...invoicesHook,
        suppliers: suppliers || [], // <-- así nunca será undefined
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};
