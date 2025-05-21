import { useContext, useEffect, useState } from "react";
import { InvoiceContext } from "../../context/Invoice/InvoiceContext";

export const InvoiceForm = ({ handlerCloseForm, invoiceSelected }) => {
  const { handlerAddInvoice, initialInvoiceForm, suppliers = [] } = useContext(InvoiceContext);

  const [invoiceForm, setInvoiceForm] = useState(initialInvoiceForm);
  const { id, invoiceNumber, supplierId, issueDate, dueDate, items = [] } = invoiceForm;

  useEffect(() => {
    setInvoiceForm({ ...invoiceSelected });
  }, [invoiceSelected]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setInvoiceForm({
      ...invoiceForm,
      [name]: value,
    });
  };

  const onItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setInvoiceForm({
      ...invoiceForm,
      items: updatedItems,
    });
  };

  const addNewItem = () => {
    setInvoiceForm({
      ...invoiceForm,
      items: [
        ...items,
        {
          id: Date.now(),
          description: "",
          quantity: 1,
          price: 0,
        },
      ],
    });
  };

  const removeItem = (itemId) => {
    setInvoiceForm({
      ...invoiceForm,
      items: items.filter((item) => item.id !== itemId),
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!invoiceNumber || !supplierId || !issueDate || items.length === 0) {
      alert("Debe completar todos los campos obligatorios");
      return;
    }
    handlerAddInvoice(invoiceForm);
    setInvoiceForm(initialInvoiceForm);
  };

  const onCloseForm = () => {
    handlerCloseForm();
    setInvoiceForm(initialInvoiceForm);
  };

  return (
    <form onSubmit={onSubmit} className="p-3">
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label>Número de Factura*</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ej: FAC-001"
              name="invoiceNumber"
              value={invoiceNumber || ''}
              onChange={onInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Proveedor*</label>
            <select
              className="form-control"
              name="supplierId"
              value={supplierId || ''}
              onChange={onInputChange}
              required
            >
              <option value="">Seleccione un proveedor</option>
              {suppliers.map((supplier) => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.nombre || supplier.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label>Fecha Emisión*</label>
            <input
              type="date"
              className="form-control"
              name="issueDate"
              value={issueDate || ''}
              onChange={onInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Fecha Vencimiento</label>
            <input
              type="date"
              className="form-control"
              name="dueDate"
              value={dueDate || ''}
              onChange={onInputChange}
            />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h5>Ítems de Factura</h5>
        {items.map((item, index) => (
          <div key={item.id} className="row mb-3 border-bottom pb-2">
            <div className="col-md-5">
              <input
                type="text"
                className="form-control"
                placeholder="Descripción"
                value={item.description}
                onChange={(e) => onItemChange(index, "description", e.target.value)}
                required
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                placeholder="Cantidad"
                min="1"
                value={item.quantity}
                onChange={(e) => onItemChange(index, "quantity", parseInt(e.target.value))}
                required
              />
            </div>
            <div className="col-md-3">
              <input
                type="number"
                className="form-control"
                placeholder="Precio Unitario"
                min="0"
                step="0.01"
                value={item.price}
                onChange={(e) => onItemChange(index, "price", parseFloat(e.target.value))}
                required
              />
            </div>
            <div className="col-md-2">
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => removeItem(item.id)}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-secondary btn-sm mt-2"
          onClick={addNewItem}
        >
          <i className="fas fa-plus mr-2"></i>Agregar Ítem
        </button>
      </div>
      <div className="d-flex justify-content-end mt-4">
        <button
          onClick={onCloseForm}
          type="button"
          className="btn btn-secondary mr-2"
        >
          Cancelar
        </button>
        <button className="btn btn-primary" type="submit">
          {id > 0 ? "Actualizar Factura" : "Crear Factura"}
        </button>
      </div>
      <input type="hidden" name="id" value={id} />
    </form>
  );
};
