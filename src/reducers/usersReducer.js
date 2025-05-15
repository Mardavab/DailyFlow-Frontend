// src/reducers/usersReducer.js
export const usersReducer = (state = [], action) => {
  switch (action.type) {
    case "loadUsers":
      return action.payload;

    case "addUser":
      return [...state, action.payload];

    case "updateUser":
      return state.map((u) =>
        u.id === action.payload.id ? action.payload : u
      );

    case "removeUser":
      return state.filter((u) => u.id !== action.payload);

    default:
      return state;
  }
};
