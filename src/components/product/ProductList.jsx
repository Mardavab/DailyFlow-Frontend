import { useContext } from "react";
import { ProductContext } from "../../context/Product/ProductContext";

export const ProductList = () => {
  const { products, handlerRemoveProduct, handlerSelectProduct } = useContext(ProductContext);

  return (
    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Categoría</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>${product.price.toFixed(2)}</td>
            <td>{product.stock}</td>
            <td>{product.categoria}</td>
            <td>
              <button 
                onClick={() => handlerSelectProduct(product)} 
                className="btn btn-primary btn-circle mr-2"
              >
                <i className="fas fa-pen"></i>
              </button>
              <button 
                onClick={() => handlerRemoveProduct(product.id)} 
                className="btn btn-danger btn-circle"
              >
                <i className="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};