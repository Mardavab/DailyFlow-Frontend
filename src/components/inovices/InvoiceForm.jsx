import { useContext, useEffect, useState } from "react";
import { InvoiceContext } from "../../context/Invoice/InvoiceContext";

export const InvoiceForm = ({ handlerCloseForm, invoiceSelected }) => {
  const { handlerAddInvoice, initialInvoiceForm, suppliers } = useContext(InvoiceContext);
  const [invoiceForm, setInvoiceForm] = useState(initialInvoiceForm);
  const { id, numeroFactura, proveedorId, fechaEmision, fechaVencimiento, estado, items } = invoiceForm;

  useEffect(() => {
    setInvoiceForm({
      ...invoiceSelected,
    });
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
    
    // Calculate total
    const total = updatedItems.reduce((sum, item) => 
      sum + (item.cantidad * item.precioUnitario), 0);

    setInvoiceForm({
      ...invoiceForm,
      items: updatedItems,
      total
    });
  };

  const addNewItem = () => {
    setInvoiceForm({
      ...invoiceForm,
      items: [
        ...items,
        {
          id: Date.now(),
          descripcion: '',
          cantidad: 1,
          precioUnitario: 0
        }
      ]
    });
  };

  const removeItem = (itemId) => {
    setInvoiceForm({
      ...invoiceForm,
      items: items.filter(item => item.id !== itemId)
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!numeroFactura || !proveedorId || !fechaEmision || items.length === 0) {
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
              name="numeroFactura"
              value={numeroFactura || ''}
              onChange={onInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Proveedor*</label>
            <select
              className="form-control"
              name="proveedorId"
              value={proveedorId || ''}
              onChange={onInputChange}
              required
            >
              <option value="">Seleccione un proveedor</option>
              {suppliers.map(supplier => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.nombre}
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
              name="fechaEmision"
              value={fechaEmision || ''}
              onChange={onInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Fecha Vencimiento</label>
            <input
              type="date"
              className="form-control"
              name="fechaVencimiento"
              value={fechaVencimiento || ''}
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
                value={item.descripcion}
                onChange={(e) => onItemChange(index, 'descripcion', e.target.value)}
                required
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                placeholder="Cantidad"
                min="1"
                value={item.cantidad}
                onChange={(e) => onItemChange(index, 'cantidad', parseInt(e.target.value))}
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
                value={item.precioUnitario}
                onChange={(e) => onItemChange(index, 'precioUnitario', parseFloat(e.target.value))}
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