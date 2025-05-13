import { useSales } from "../../hooks/useSales";
import { SalesContext } from "./SalesContext";

export const SalesProvider = ({ children }) => {
  const {
    sales,
    saleSelected,
    initialSaleForm,
    visibleForm,

    handlerOpenForm,
    handlerCloseForm,
    handlerAddSale,
    handlerRemoveSale,
    handlerSelectSaleForm,
  } = useSales();

  return (
    <SalesContext.Provider
      value={{
        sales,
        saleSelected,
        initialSaleForm,
        visibleForm,

        handlerOpenForm,
        handlerCloseForm,
        handlerAddSale,
        handlerRemoveSale,
        handlerSelectSaleForm,
      }}
    >
      {children}
    </SalesContext.Provider>
  );
};
