import { useContext } from "react";
import { InvoiceList } from "./InvoiceList";
import { InvoiceContext } from "../../context/Invoice/InvoiceContext";
import { InvoiceModalForm } from "./InvoiceModalForm";
import {StatCard} from "./InvoiceStatCard";
import { PaymentModalForm } from "./PaymentModalForm";

export const InvoicesContent = () => {
  const {
    invoices,
    visibleForm,
    handlerOpenForm,
    handlerRemoveInvoice,
    handlerSelectInvoiceForm,
    suppliers,
    getInvoicePayments,
    invoiceSelected
  } = useContext(InvoiceContext);

  const stats ={
    total: invoices.length,
    paid: invoices.filter(i => i.estado === 'pagado').length,
    pending: invoices.filter(i => i.estado === 'pendiente').length,
    partial: invoices.filter(i => i.estado === 'parcial').length,
    totalAmount: invoices.reduce((sum, inv) => sum + inv.total, 0),
    pendingAmount: invoices.reduce((sum, inv) => sum + inv.saldoPendiente, 0)
  };
  
  return (
    <>
      <PaymentModalForm/>

      {visibleForm && <InvoiceModalForm />}
      
      <div className="container-fluid">
        {/* Header */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
          <div className="d-flex flex-wrap gap-3">
            <StatCard 
              icon="file-invoice" 
              value={stats.total}
              label="Total Facturas"
              color="primary"
            />
            
            <StatCard 
              icon="check-circle" 
              value={stats.paid }
              label="Pagadas"
              color="success"
            />
            
            <StatCard 
              icon="clock" 
              value={stats.pending} 
              label="Pendientes"
              color="warning"
            />

            <StatCard 
              icon="money-bill-wave" 
              value={stats.partial}
              label="Parciales"
              color="info"
            />
          </div>
          {/** 
          <div className="d-flex gap-2">
            <button 
              onClick={() => {
                // agregar  reporte aquí
              }}
              className="btn btn-secondary"
              disabled={invoices.length === 0}
            >
              <i className="fas fa-file-export mr-2"></i>
              Exportar
            </button>
          </div>*/}
        </div>

        {/* Invoices Table */}
        <div className="card shadow mb-4">
          <div className="card-header py-3 d-sm-flex align-items-center justify-content-between">
            <h1 className="h3 m-0 font-weight-bold text-primary">
              Gestión de Facturas
            </h1>
            <button 
              onClick={handlerOpenForm} 
              className="btn btn-success btn-circle"
              title="Nueva factura"
              disabled={suppliers.length === 0}
            >
               <i className="fas fa-file-invoice-dollar"></i>
            </button>
          </div>

          <div className="card-body">
            <div className="table-responsive">
              {invoices.length === 0 ? (
                <div className={`alert ${suppliers.length === 0 ? 'alert-danger' : 'alert-warning'}`}>
                  {suppliers.length === 0 
                    ? "No hay proveedores registrados. Debe registrar al menos un proveedor antes de crear facturas." 
                    : "No hay facturas registradas en el sistema"}
                </div>
              ) : (
                <InvoiceList />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};