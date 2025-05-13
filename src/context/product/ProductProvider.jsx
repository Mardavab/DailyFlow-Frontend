
import { useProducts } from "../../hooks/useProducts";
import { ProductContext } from "./ProductContext";

export const ProductProvider = ({ children }) => {

    const {
        products,
        productSelected,
        initialProductForm,
        visibleForm,
        handlerOpenForm,
        handlerCloseForm,
        handlerAddProduct,
        handlerRemoveProduct,
        handlerSelectProduct,
    } = useProducts();
    
    return (
        <ProductContext.Provider value={
            {
                products,
                productSelected,
                initialProductForm,
                visibleForm,
                handlerOpenForm,
                handlerCloseForm,
                handlerAddProduct,
                handlerRemoveProduct,
                handlerSelectProduct,
            }
        }>
            {children}
        </ProductContext.Provider>
    )
}