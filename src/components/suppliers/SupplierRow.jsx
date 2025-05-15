import { useContext } from "react";
import { SupplierContext } from "../../context/Supplier/SupplierContext ";

export const SupplierRow = ({ supplier }) => {
  const { handlerSelectSupplierForm, handlerRemoveSupplier } = useContext(SupplierContext);

  return (
    <tr key={supplier.id}>
      <td>{supplier.id}</td>
      <td>
        <div className="font-weight-bold">{supplier.name}</div>
        {supplier.email && <div className="small text-muted">{supplier.email}</div>}
      </td>
      <td>
        {supplier.contactPerson}
        {supplier.phone && <div className="small text-muted">{supplier.phone}</div>}
      </td>
      <td>
        <span className={`badge ${
          supplier.tipoProveedor === 'Materiales' ? 'badge-primary' :
          supplier.tipoProveedor === 'Servicios' ? 'badge-success' :
          supplier.tipoProveedor === 'Equipos' ? 'badge-warning' :
          'badge-secondary'
        }`}>
          {supplier.tipoProveedor}
        </span>
      </td>
      <td>
        <div className="d-flex">
          <button
            type="button"
            className="btn btn-info btn-circle"
            onClick={() => handlerSelectSupplierForm(supplier)}
            title="Editar proveedor"
          >
            <i className="fas fa-edit"></i>
          </button>
          <button
            type="button"
            className="btn btn-danger btn-circle"
            onClick={() => handlerRemoveSupplier(supplier.id)}
            title="Eliminar proveedor"
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  );
};