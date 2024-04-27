
//---------- Cart ------------//
export const AddToCart = (payload) => {
    return{
        type:"ADD_TO_CART",
        payload,
    }
}
export const RemoveFromCart = (payload) => ({
    type: "REMOVE_FROM_CART",
    payload
})

//---------- Wish List ------------//
export const AddToWishList = (payload) => {
    return{
        type:"ADD_TO_WishList",
        payload,
    }
}
export const RemoveFromWishList = (payload) => ({
    type: "REMOVE_FROM_WishList",
    payload
})

//------------ Favorites --------------//
export const AddToFavorites = (payload) => {
    return{
        type:"ADD_TO_Favorites",
        payload,
    }
}
export const RemoveFromFavorites = (payload) => ({
    type: "REMOVE_FROM_Favorites",
    payload
})