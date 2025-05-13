export const salesReducer = (state = [], action) => {

  switch (action.type) {
    case "addSale":
      return [
        ...state,
        {
          ...action.payload,
          id: new Date().getTime(),
        },
      ];

    case "removeSale":
      return state.filter((sale) => sale.id !== action.payload);

    case "updateSale":
      return state.map((s) => {
        if (s.id === action.payload.id) {
          return {
            ...action.payload,
          };
        }
        return s;
      });

    default:
      return state;
  }
};
