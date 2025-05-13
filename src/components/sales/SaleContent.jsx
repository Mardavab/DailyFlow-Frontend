import { useContext } from "react";
import { SaleList } from "./SaleList";
import { SalesContext } from "../../context/sales/SalesContext";
import { SaleModalForm } from "./SaleModalForm";

export const SaleContent = () => {
  const {
    sales,
    visibleForm,
    handlerOpenForm,
    handlerRemoveSale,
    handlerSelectSaleForm,
  } = useContext(SalesContext);
  
  return (
    <>
      {visibleForm && <SaleModalForm />}
      
      <div className="container-fluid">
        {/* Encabezado */}
        <div className="d-sm-flex align-items-center justify-content-between mb-4"></div>

        {/* Tabla de Ventas */}
        <div className="card shadow mb-4">
          <div className="card-header py-3 d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 m-0 font-weight-bold text-primary">
              Gestión de Ventas
            </h1>
            <button 
              onClick={handlerOpenForm} 
              className="btn btn-success btn-circle"
            >
              <i className="fas fa-cash-register"></i>
            </button>
          </div>

          <div className="card-body">
            <div className="table-responsive">
              {/**sales.length === 0 ? (
                <div className="alert alert-warning">
                  No hay ventas registradas
                </div>
              ) : (
                
              )**/}
              <SaleList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};