import { useContext, useEffect, useState } from "react";
import { SupplierContext } from "../../context/Supplier/SupplierContext ";

export const SupplierForm = ({ handlerCloseForm, supplierSelected }) => {
  const { handlerAddSupplier, initialSupplierForm } = useContext(SupplierContext);
  const [supplierForm, setSupplierForm] = useState(initialSupplierForm);
  const { 
    id, 
    name, 
    contactPerson, 
    phone, 
    email, 
    address, 
    tipoProveedor 
  } = supplierForm;

  useEffect(() => {
    setSupplierForm({
      ...supplierSelected,
    });
  }, [supplierSelected]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setSupplierForm({
      ...supplierForm,
      [name]: value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    console.log(supplierForm)
    if (!name || !contactPerson || !phone /**|| !tipoProveedor**/) {
      alert("Debe completar todos los campos obligatorios");
      return;
    }

    handlerAddSupplier(supplierForm);
    setSupplierForm(initialSupplierForm);
  };

  const onCloseForm = () => {
    handlerCloseForm();
    setSupplierForm(initialSupplierForm);
  };

  return (
    <form onSubmit={onSubmit} className="p-3">
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label>Nombre del Proveedor*</label>
            <input
              type="text"
              className="form-control"
              placeholder="Nombre completo"
              name="name"
              value={name || ''}
              onChange={onInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Persona de Contacto*</label>
            <input
              type="text"
              className="form-control"
              placeholder="Nombre del contacto"
              name="contactPerson"
              value={contactPerson || ''}
              onChange={onInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Teléfono*</label>
            <input
              type="tel"
              className="form-control"
              placeholder="Número de teléfono"
              name="phone"
              value={phone || ''}
              onChange={onInputChange}
              required
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Correo electrónico"
              name="email"
              value={email || ''}
              onChange={onInputChange}
            />
          </div>

          <div className="form-group">
            <label>Dirección</label>
            <input
              type="text"
              className="form-control"
              placeholder="Dirección completa"
              name="address"
              value={address || ''}
              onChange={onInputChange}
            />
          </div>

          <div className="form-group">
            <label>Tipo de Proveedor*</label>
            <select
              className="form-control"
              name="tipoProveedor"
              value={tipoProveedor || ''}
              //onChange={onInputChange}
              //required
            >
              <option value="">Seleccione un tipo</option>
              <option value="Materiales">Materiales</option>
              <option value="Servicios">Servicios</option>
              <option value="Equipos">Equipos</option>
              <option value="Logística">Logística</option>
            </select>
          </div>
        </div>
      </div>

      <input type="hidden" name="id" value={id} />

      <div className="d-flex justify-content-end mt-4">
        <button className="btn btn-primary mr-2" type="submit">
          {id > 0 ? "Actualizar Proveedor" : "Registrar Proveedor"}
        </button>
        
        <button
          onClick={onCloseForm}
          type="button"
          className="btn btn-secondary"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};