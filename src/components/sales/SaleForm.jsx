import { useContext, useEffect, useState } from "react";
import { SalesContext } from "../../context/sales/SalesContext";
import { ProductContext } from "../../context/Product/ProductContext";

export const SaleForm = ({ handlerCloseForm, saleSelected }) => {
  const { handlerAddSale, initialSaleForm } = useContext(SalesContext);
  const { products } = useContext(ProductContext);
  const [saleForm, setSaleForm] = useState({
    ...initialSaleForm,
    productos: []
  });
  
  // Estado para manejar la selección temporal de productos
  const [selectedProduct, setSelectedProduct] = useState({
    productoId: '',
    cantidad: 1,
    precioUnitario: 0
  });

  useEffect(() => {
    if (saleSelected) {
      setSaleForm({
        ...saleSelected,
        productos: saleSelected.productos || []
      });
    }
  }, [saleSelected]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setSaleForm({
      ...saleForm,
      [name]: value,
    });
  };

  // Maneja cambios en la selección temporal de productos
  const onProductSelectChange = ({ target }) => {
    const { name, value } = target;
    const productId = name === 'productoId' ? value : selectedProduct.productoId;
    const product = products.find(p => p.id === Number(productId));
    
    setSelectedProduct({
      ...selectedProduct,
      [name]: value,
      precioUnitario: name === 'productoId' ? (product ? product.precio : 0) : selectedProduct.precioUnitario
    });
  };

  // Agrega un producto a la lista de productos de la venta
  const addProductToSale = () => {
    if (!selectedProduct.productoId || selectedProduct.cantidad <= 0) {
      alert("Seleccione un producto y una cantidad válida");
      return;
    }

    const product = products.find(p => p.id === Number(selectedProduct.productoId));
    if (!product) return;

    const newProductItem = {
      productoId: product.id,
      nombre: product.nombre,
      cantidad: Number(selectedProduct.cantidad),
      precioUnitario: product.precio,
      subtotal: product.precio * Number(selectedProduct.cantidad)
    };

    setSaleForm({
      ...saleForm,
      productos: [...saleForm.productos, newProductItem],
      monto: (saleForm.monto || 0) + newProductItem.subtotal
    });

    // Resetear selección temporal
    setSelectedProduct({
      productoId: '',
      cantidad: 1,
      precioUnitario: 0
    });
  };

  // Elimina un producto de la lista
  const removeProductFromSale = (index) => {
    const updatedProducts = [...saleForm.productos];
    const removedProduct = updatedProducts.splice(index, 1)[0];
    
    setSaleForm({
      ...saleForm,
      productos: updatedProducts,
      monto: (saleForm.monto || 0) - removedProduct.subtotal
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!saleForm.monto || !saleForm.metodoPago || !saleForm.fecha || !saleForm.hora) {
      alert("Debe completar todos los campos obligatorios");
      return;
    }

    if (saleForm.productos.length === 0) {
      alert("Debe agregar al menos un producto a la venta");
      return;
    }

    handlerAddSale(saleForm);
    setSaleForm({
      ...initialSaleForm,
      productos: []
    });
  };

  const onCloseForm = () => {
    handlerCloseForm();
    setSaleForm({
      ...initialSaleForm,
      productos: []
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-4">
        <h4>Productos de la venta</h4>
        <div className="row">
          <div className="col-md-5">
            <select
              className="form-control"
              name="productoId"
              value={selectedProduct.productoId}
              onChange={onProductSelectChange}
            >
              <option value="">Seleccione un producto</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  {product.nombre} - ${product.precio.toFixed(2)}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              placeholder="Cantidad"
              name="cantidad"
              min="1"
              value={selectedProduct.cantidad}
              onChange={onProductSelectChange}
            />
          </div>
          <div className="col-md-2">
            <span>${selectedProduct.precioUnitario * selectedProduct.cantidad}</span>
          </div>
          <div className="col-md-2">
            <button 
              type="button" 
              className="btn btn-sm btn-primary"
              onClick={addProductToSale}
            >
              Agregar
            </button>
          </div>
        </div>

        <div className="mt-3">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Subtotal</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {saleForm.productos.map((item, index) => (
                <tr key={index}>
                  <td>{item.nombre}</td>
                  <td>{item.cantidad}</td>
                  <td>${item.precioUnitario.toFixed(2)}</td>
                  <td>${item.subtotal.toFixed(2)}</td>
                  <td>
                    <button 
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={() => removeProductFromSale(index)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-3">
        <h5>Total: ${saleForm.monto?.toFixed(2) || '0.00'}</h5>
      </div>

      <div className="mb-3">
        <select
          className="form-control"
          name="metodoPago"
          value={saleForm.metodoPago || ''}
          onChange={onInputChange}
          required
        >
          <option value="">Seleccione método de pago</option>
          <option value="Efectivo">Efectivo</option>
          <option value="Tarjeta de crédito">Tarjeta de crédito</option>
          <option value="Transferencia bancaria">Transferencia bancaria</option>
          <option value="Otro">Otro</option>
        </select>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="date"
            className="form-control"
            name="fecha"
            value={saleForm.fecha || ''}
            onChange={onInputChange}
            required
          />
        </div>
        <div className="col-md-6">
          <input
            type="time"
            className="form-control"
            name="hora"
            value={saleForm.hora || ''}
            onChange={onInputChange}
            required
          />
        </div>
      </div>

      <input type="hidden" name="id" value={saleForm.id} />

      <div className="d-flex justify-content-end">
        <button className="btn btn-primary me-2" type="submit">
          {saleForm.id > 0 ? "Actualizar" : "Registrar"}
        </button>

        {handlerCloseForm && (
          <button
            onClick={onCloseForm}
            type="button"
            className="btn btn-secondary"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};