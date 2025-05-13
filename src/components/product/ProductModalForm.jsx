import { useContext, useState } from "react";
import { ProductContext } from "../../context/Product/ProductContext";
import Swal from "sweetalert2";

export const ProductModalForm = () => {
  const { productSelected, initialProductForm, handlerAddProduct, handlerCloseForm } = useContext(ProductContext);
  
  const [product, setProduct] = useState(productSelected || initialProductForm);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: name === 'precio' || name === 'stock' ? Number(value) : value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (!product.nombre.trim() || product.precio <= 0) {
      Swal.fire({
        title: "Error",
        text: "Nombre y precio válido son requeridos",
        icon: "error"
      });
      return;
    }

    handlerAddProduct(product);
  };

  return (
    <div className=" abrir-modal animacion fadeIn" style={{ display: 'block' }} tabIndex="-1" role="dialog">
      <div className="modal-dialog " role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {product.id === 0 ? "Agregar Producto" : "Editar Producto"}
            </h5>
            <button type="button" className="close" onClick={handlerCloseForm}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form onSubmit={onSubmit}>
            <div className="modal-body">
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  value={product.nombre}
                  onChange={onInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Precio</label>
                <input
                  type="number"
                  className="form-control"
                  name="precio"
                  min="0"
                  step="0.01"
                  value={product.precio}
                  onChange={onInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Stock</label>
                <input
                  type="number"
                  className="form-control"
                  name="stock"
                  min="0"
                  value={product.stock}
                  onChange={onInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Categoría</label>
                <input
                  type="text"
                  className="form-control"
                  name="categoria"
                  value={product.categoria}
                  onChange={onInputChange}
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handlerCloseForm}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};