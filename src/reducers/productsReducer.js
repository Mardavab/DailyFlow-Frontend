export const productsReducer = (state = [], action) => {
    switch (action.type) {
        case 'addProduct':
            return [
                ...state,
                {
                    ...action.payload,
                    id: action.payload.id || new Date().getTime(), // Permite ID personalizado o genera uno
                    createdAt: new Date().toISOString() // Agrega fecha de creación
                }
            ];
        
        case 'removeProduct':
            return state.filter(product => product.id !== action.payload);
        
        case 'updateProduct':
            return state.map(product => 
                product.id === action.payload.id 
                    ? { ...product, ...action.payload, updatedAt: new Date().toISOString() }
                    : product
            );
        
        case 'clearProducts':
            return [];
        
        default:
            return state;
    }
}