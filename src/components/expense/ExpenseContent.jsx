import { useContext } from "react";
import { ExpenseModalForm } from "./ExpenseModalForm";
import { ExpenseContext } from "../../context/expense/ExpenseContext";
import { ExpenseList } from "./ExpenseList";

export const ExpenseContent = () => {
  const {
    expenses,
    visibleForm,
    handlerOpenForm,
  } = useContext(ExpenseContext);

  return (
    <>
      {visibleForm && <ExpenseModalForm />}
      
      <div className="container-fluid">
        {/* Header */}
        <div className="d-sm-flex align-items-center justify-content-between mb-4"></div>

        {/* Expenses Table */}
        <div className="card shadow mb-4">
          <div className="card-header py-3 d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 m-0 font-weight-bold text-primary">
              Gestión de Gastos
            </h1>
            <button 
              onClick={handlerOpenForm} 
              className="btn btn-success btn-circle"
              title="Agregar nuevo gasto"
            >
              <i className="fas fa-receipt"></i>
            </button>
          </div>

          <div className="card-body">
            <div className="table-responsive">
              {expenses.length === 0 ? (
                <div className="alert alert-warning">
                  No hay gastos registrados
                </div>
              ) : (
                <ExpenseList />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};