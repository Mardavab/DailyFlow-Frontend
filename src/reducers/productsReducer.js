export const productsReducer = (state = [], action) => {
    switch (action.type) {
        case "loadProducts":
            return action.payload;
        case 'addProduct':
            return [...state, action.payload,];
        
        case 'removeProduct':
            return state.filter(product => product.id !== action.payload);
        
        case 'updateProduct':
            return state.map((p) =>
                p.id === action.payload.id ? action.payload : p
            );
        
        case 'clearProducts':
            return [];
        
        default:
            return state;
    }
}