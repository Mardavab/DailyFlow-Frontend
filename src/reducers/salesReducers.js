// src/reducers/salesReducer.js

export const salesReducer = (state = [], action) => {
  switch (action.type) {
    case "loadSales":
      // Sobrescribe la lista completa de ventas
      return action.payload;

    case "addSale":
      // Agrega la venta recién creada
      return [...state, action.payload];

    case "updateSale":
      // Actualiza la venta modificada
      return state.map((sale) =>
        sale.id === action.payload.id ? action.payload : sale
      );

    case "removeSale":
      // Elimina la venta con el id dado
      return state.filter((sale) => sale.id !== action.payload);

    default:
      return state;
  }
};
