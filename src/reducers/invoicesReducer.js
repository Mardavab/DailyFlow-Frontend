// src/reducers/invoicesReducer.js

export const invoicesReducer = (state = [], action) => {
  switch (action.type) {
    case "loadInvoices":
      return action.payload;

    case "addInvoice":
      return [...state, action.payload];

    case "updateInvoice":
      return state.map(invoice =>
        invoice.id === action.payload.id ? action.payload : invoice
      );

    case "removeInvoice":
      return state.filter(invoice => invoice.id !== action.payload);

    // (Opcional) actualizar pagos de una factura
    case "updatePayments":
      return state.map(invoice =>
        invoice.id === action.payload.id
          ? { ...invoice, payments: action.payload.payments }
          : invoice
      );

    default:
      return state;
  }
};
