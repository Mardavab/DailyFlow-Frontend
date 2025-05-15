export const expenseReducer = (state = [], action) => {
    switch (action.type) {
      case "loadExpenses":
        return action.payload;
      case "addExpense":
        return [...state, action.payload,];
  
      case "removeExpense":
        return state.filter((expense) => expense.id !== action.payload);
  
      case "updateExpense":
        return state.map((exp) => 
          exp.id === action.payload.id ? action.payload : exp
        );
  
      default:
        return state;
    }
  };