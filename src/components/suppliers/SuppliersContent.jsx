import { useContext } from "react";
import { SupplierList } from "./SupplierList";
import { SupplierContext } from "../../context/Supplier/SupplierContext ";
import { SupplierModalForm } from "./SupplierModalForm";

export const SuppliersContent = () => {
  const {
    suppliers,
    visibleForm,
    handlerOpenForm,
    handlerRemoveSupplier,
    handlerSelectSupplierForm,
  } = useContext(SupplierContext);

  return (
    <>
      {visibleForm && <SupplierModalForm />}
      
      <div className="container-fluid">
        {/* Header */}
        <div className="d-sm-flex align-items-center justify-content-between mb-4"></div>

        {/* Suppliers Table */}
        <div className="card shadow mb-4">
          <div className="card-header py-3 d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 m-0 font-weight-bold text-primary">
              Gestión de Proveedores
            </h1>
            <button 
              onClick={handlerOpenForm} 
              className="btn btn-success btn-circle"
              title="Agregar nuevo proveedor"
            >
              <i className="fas fa-truck-loading"></i>
            </button>
          </div>

          <div className="card-body">
            <div className="table-responsive">
              {suppliers.length === 0 ? (
                <div className="alert alert-warning">
                  No hay proveedores registrados
                </div>
              ) : (
                <SupplierList />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};