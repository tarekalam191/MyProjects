//-------------- Cart --------------//
export const INITIAL_VALUE = {
    lang: "en",
    cart_Of_P: [],
}

export function CartReducer(state = INITIAL_VALUE, action){
    switch(action.type){
        case "ADD_TO_CART":
            return {
                ...state,
                cart_Of_P: [...state.cart_Of_P ,action.payload],
            }
            
        case "REMOVE_FROM_CART":
            return {
                ...state,
                cart_Of_P: state.cart_Of_P.filter(itemId => itemId !== action.payload)
            }
        default:
            return state;
    }
}

//-------------- Wish List -------------------//
export const WISH_INITIAL_VALUE = {
    Wish_Of_P: [],
}

export function WishReducer(state = WISH_INITIAL_VALUE, action){
    switch(action.type){
        case "ADD_TO_WishList":
            return {
                ...state,
                Wish_Of_P: [...state.Wish_Of_P ,action.payload],
            }
            
        case "REMOVE_FROM_WishList":
            return {
                ...state,
                Wish_Of_P: state.Wish_Of_P.filter(itemId => itemId !== action.payload)
            }
        default:
            return state;
    }
}

//--------------- Favorites -----------------//
export const FAVO_INITIAL_VALUE = {
    Favo_Of_P: [],
}

export function FavoReducer(state = FAVO_INITIAL_VALUE, action){
    switch(action.type){
        case "ADD_TO_Favorites":
            return {
                ...state,
                Favo_Of_P: [...state.Favo_Of_P ,action.payload],
            }
            
        case "REMOVE_FROM_Favorites":
            return {
                ...state,
                Favo_Of_P: state.Favo_Of_P.filter(itemId => itemId !== action.payload)
            }
        default:
            return state;
    }
}
