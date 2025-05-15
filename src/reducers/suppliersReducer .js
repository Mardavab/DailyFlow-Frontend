export const suppliersReducer = (state = [], action) => {
    switch (action.type) {
      case "loadSuppliers":
        return action.payload;

      case 'addSupplier':
        return [...state, action.payload];
  
      case 'removeSupplier':
        return state.filter(supplier => supplier.id !== action.payload);
  
      case "updateSupplier":
      return state.map((s) =>
        s.id === action.payload.id ? action.payload : s
      );
  
      default:
        return state;
    }
  };