import { useContext } from "react";
import { ExpenseForm } from "./ExpenseForm";
import { ExpenseContext } from "../../context/expense/ExpenseContext";

export const ExpenseModalForm = () => {
  const { expenseSelected, handlerCloseForm } = useContext(ExpenseContext);
  
  return (
    <div className="abrir-modal animacion fadeIn">
      <div className="modal" style={{ display: "block" }} tabIndex="-1">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {expenseSelected.id > 0 ? "Editar" : "Registrar"} Gasto
              </h5>
            </div>
            <div className="modal-body">
              <ExpenseForm
                expenseSelected={expenseSelected}
                handlerCloseForm={handlerCloseForm}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};