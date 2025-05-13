import { useSuppliers } from "../../hooks/useSuppliers";
import { SupplierContext } from "./SupplierContext ";

export const SupplierProvider = ({ children }) => {
  const {
    suppliers,
    supplierSelected,
    initialSupplierForm,
    visibleForm,
    handlerOpenForm,
    handlerCloseForm,
    handlerAddSupplier,
    handlerRemoveSupplier,
    handlerSelectSupplierForm,
  } = useSuppliers();

  return (
    <SupplierContext.Provider
      value={{
        suppliers,
        supplierSelected,
        initialSupplierForm,
        visibleForm,
        handlerOpenForm,
        handlerCloseForm,
        handlerAddSupplier,
        handlerRemoveSupplier,
        handlerSelectSupplierForm,
      }}
    >
      {children}
    </SupplierContext.Provider>
  );
};