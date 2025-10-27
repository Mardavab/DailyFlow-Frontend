import { useContext, useEffect } from "react";
import { ProductContext } from "../../context/product/ProductContext";

export const ProductList = () => {
  const { products, handlerRemoveProduct, handlerSelectProductm, fetchProducts } = useContext(ProductContext);

   useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover" id="dataTable" width="100%" cellSpacing="0">
        <thead >
          <tr>
            <th>Código</th>
            <th>Marca</th>
            <th>Nombre</th>
            <th>Tamaño</th>
            <th>Precio Compra</th>
            <th>Precio Venta</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center text-muted">
                No hay productos registrados.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.code || "—"}</td>
                <td>{product.brand || "—"}</td>
                <td>{product.name || "—"}</td>
                <td>{product.size || "—"}</td>
                <td>${product.purchasePrice ? product.purchasePrice.toLocaleString() : "0"}</td>
                <td>${product.salePrice ? product.salePrice.toLocaleString() : "0"}</td>
                <td>{product.stock ?? 0}</td>
                <td>
                  <button onClick={() => handlerSelectProduct(product)} className="btn btn-primary btn-circle mr-2" > <i className="fas fa-pen"></i> </button> <button onClick={() => handlerRemoveProduct(product.id)} className="btn btn-danger btn-circle" > <i className="fas fa-trash"></i> </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
