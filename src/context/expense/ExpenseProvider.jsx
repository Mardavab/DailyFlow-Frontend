import { useExpense } from "../../hooks/useExpense";
import { ExpenseContext } from "./ExpenseContext";

export const ExpenseProvider = ({ children }) => {
  const {
    expenses,
    expenseSelected,
    initialExpenseForm,
    visibleForm,

    handlerOpenForm,
    handlerCloseForm,
    handlerAddExpense,
    handlerRemoveExpense,
    handlerSelectExpenseForm,
  } = useExpense();

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        expenseSelected,
        initialExpenseForm,
        visibleForm,

        handlerOpenForm,
        handlerCloseForm,
        handlerAddExpense,
        handlerRemoveExpense,
        handlerSelectExpenseForm,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};