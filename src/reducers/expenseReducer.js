export const expenseReducer = (state = [], action) => {
    switch (action.type) {
      case "addExpense":
        return [
          ...state,
          {
            ...action.payload,
            id: new Date().getTime(), // Generates a unique ID
          },
        ];
  
      case "removeExpense":
        return state.filter((expense) => expense.id !== action.payload);
  
      case "updateExpense":
        return state.map((exp) => {
          if (exp.id === action.payload.id) {
            return {
              ...action.payload,
            };
          }
          return exp;
        });
  
      default:
        return state;
    }
  };