export const rolesReducer = (state = [], action) => {
    switch (action.type) {
      case "addRole":
        return [
          ...state,
          {
            ...action.payload,
            id: new Date().getTime(), // Generates a unique ID
          },
        ];
  
      case "removeRole":
        return state.filter((role) => role.id !== action.payload);
  
      case "updateRole":
        return state.map((role) => {
          if (role.id === action.payload.id) {
            return {
              ...action.payload,
            };
          }
          return role;
        });
  
      default:
        return state;
    }
  };