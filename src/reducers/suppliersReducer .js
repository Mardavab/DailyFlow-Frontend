export const suppliersReducer = (state = [], action) => {
    switch (action.type) {
      case 'addSupplier':
        return [
          ...state,
          {
            ...action.payload,
            id: new Date().getTime(), // Generates unique ID
            fechaRegistro: new Date().toISOString().split('T')[0] // Auto-set registration date
          }
        ];
  
      case 'removeSupplier':
        return state.filter(supplier => supplier.id !== action.payload);
  
      case 'updateSupplier':
        return state.map(s => {
          if (s.id === action.payload.id) {
            return {
              ...s,                // Keep existing supplier data
              ...action.payload,   // Apply updates
              // Preserve original registration date
              fechaRegistro: s.fechaRegistro || action.payload.fechaRegistro
            };
          }
          return s;
        });
  
      default:
        return state;
    }
  };