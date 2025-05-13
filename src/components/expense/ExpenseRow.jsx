import { useContext } from "react";
import { ExpenseContext } from "../../context/expense/ExpenseContext";

export const ExpenseRow = ({ expense }) => {
  const { handlerSelectExpenseForm, handlerRemoveExpense } =
    useContext(ExpenseContext);

  return (
    <tr key={expense.id}>
      <td>{expense.id}</td>
      <td>${expense.amount}</td>
      <td>{expense.category}</td>
      <td>{expense.description}</td>
      <td>{expense.date}</td>
      <td>{expense.time}</td>
      <td>
        <div style={{ display: "inline-block" }}>
          <button
            type="button"
            className="btn btn-info btn-circle"
            onClick={() => {
              handlerSelectExpenseForm(expense);
              console.log(expense);
            }}
          >
            <i className="fas fa-edit"></i>
          </button>
        </div>
        <div style={{ display: "inline-block", marginLeft: "5px" }}>
          <button
            type="button"
            className="btn btn-danger btn-circle"
            onClick={() => handlerRemoveExpense(expense.id)}
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  );
};
