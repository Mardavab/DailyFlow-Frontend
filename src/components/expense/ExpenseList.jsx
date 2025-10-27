
import { useContext } from "react";
import { ExpenseContext } from "../../context/expense/ExpenseContext";
import { ExpenseRow } from "./ExpenseRow";

export const ExpenseList = () => {
  const { expenses = [] } = useContext(ExpenseContext);
  
  return (
    <>
      <table
        className="table table-bordered"
        id="dataTableExpenses"
        width="100%"
        cellSpacing="0"
      >
        <thead>
          <tr>
            <th>Monto</th>
            <th>Descripción</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tfoot>
          <tr>
            <th>Monto</th>
            <th>Descripción</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Acciones</th>
          </tr>
        </tfoot>

        <tbody>
          {expenses.map((expense) => (
            <ExpenseRow key={expense.id} expense={expense}/>
          ))}
        </tbody>
      </table>
    </>
  );
};