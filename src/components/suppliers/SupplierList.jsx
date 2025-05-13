import { useContext } from "react";
import { SupplierRow } from "./SupplierRow";
import { SupplierContext } from "../../context/Supplier/SupplierContext ";

export const SupplierList = () => {
  const { suppliers = [] } = useContext(SupplierContext);
  
  return (
    <div className="table-responsive">
      <table
        className="table table-bordered " 
        id="dataTableSuppliers"
        width="100%"
        cellSpacing="0"
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Proveedor</th>
            <th>Contacto</th>
            <th>Tipo</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {suppliers.length > 0 ? (
            suppliers.map((supplier) => (
              <SupplierRow key={supplier.id} supplier={supplier} />
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center text-muted py-4">
                No hay proveedores registrados
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};