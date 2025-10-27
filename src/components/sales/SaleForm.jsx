import { useContext, useEffect, useState } from "react";
import { SalesContext } from "../../context/sales/SalesContext";
import { ProductContext } from "../../context/Product/ProductContext";

export const SaleForm = ({ handlerCloseForm, saleSelected }) => {
  const { handlerAddSale, initialSaleForm } = useContext(SalesContext);
  const { products } = useContext(ProductContext);
  const [saleForm, setSaleForm] = useState({
    ...initialSaleForm,
    items: []
  });

  // Para selección temporal de producto
  const [selectedProduct, setSelectedProduct] = useState({
    productId: '',
    quantity: 1
  });

  useEffect(() => {
    if (saleSelected && saleSelected.id) {
      setSaleForm({
        ...saleSelected,
        items: saleSelected.details
          ? saleSelected.details.map(det => ({
            productId: det.product.id,
            quantity: det.quantity,
            name: det.product.name,
            price: det.product.salePrice,
            subtotal: det.product.salePrice * det.quantity
          }))
          : []
      });
    } else {
      setSaleForm({ ...initialSaleForm, items: [] });
    }
  }, [saleSelected, initialSaleForm]);

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
    setSelectedProduct({
      ...selectedProduct,
      [name]: value
    });
  };

  // Agrega un producto a la lista de items
  const addProductToSale = () => {
    if (!selectedProduct.productId || selectedProduct.quantity <= 0) {
      alert("Seleccione un producto y una cantidad válida");
      return;
    }

    const product = products.find(p => p.id === Number(selectedProduct.productId));
    if (!product) return;

    const newItem = {
      productId: product.id,
      name: product.name,
      quantity: Number(selectedProduct.quantity),
      price: product.salePrice,
      subtotal: product.salePrice * Number(selectedProduct.quantity)
    };

    setSaleForm({
      ...saleForm,
      items: [...saleForm.items, newItem]
    });

    // Reset temporal
    setSelectedProduct({ productId: '', quantity: 1 });
  };

  // Elimina un producto de la lista
  const removeProductFromSale = (index) => {
    const updatedItems = [...saleForm.items];
    updatedItems.splice(index, 1);
    setSaleForm({
      ...saleForm,
      items: updatedItems
    });
  };

  const total = saleForm.items.reduce((acc, item) => acc + (item.subtotal || (item.price * item.quantity)), 0);

  const onSubmit = (event) => {
    event.preventDefault();
    if (!saleForm.paymentMethod || saleForm.items.length === 0) {
      alert("Debe completar todos los campos obligatorios y agregar productos");
      return;
    }

    handlerAddSale({
      paymentMethod: saleForm.paymentMethod,
      items: saleForm.items.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      }))
    });

    setSaleForm({ ...initialSaleForm, items: [] });
  };

  const onCloseForm = () => {
    handlerCloseForm();
    setSaleForm({ ...initialSaleForm, items: [] });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-4">
        <h4>Productos de la venta</h4>
        <div className="row">
          <div className="col-md-5">
            <select
              className="form-control"
              name="productId"
              value={selectedProduct.productId}
              onChange={onProductSelectChange}
            >
              <option value="">Seleccione un producto</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name} - ${product.salePrice ? product.salePrice.toLocaleString() : 0}
                </option>

              ))}
            </select>
          </div>
          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              placeholder="Cantidad"
              name="quantity"
              min="1"
              value={selectedProduct.quantity}
              onChange={onProductSelectChange}
            />
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
              {saleForm.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>${Number(item.price).toLocaleString()}</td>
                  <td>${Number(item.subtotal || (item.price * item.quantity)).toLocaleString()}</td>
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
        <h5>Total: ${total.toLocaleString()}</h5>
      </div>

      <div className="mb-3">
        <select
          className="form-control"
          name="paymentMethod"
          value={saleForm.paymentMethod || ''}
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
