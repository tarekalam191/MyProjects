import { useContext } from "react";
import { Children, createContext, useState } from "react";

const ShoppingCartContext= createContext({})

const ShoppingCartProvider = ({Children}) => {
    const [cartItems, setCartItems] = useState([]);
    return <ShoppingCartContext.Provider value={{ cartItems }}>
        {Children}
    </ShoppingCartContext.Provider>
}

export default ShoppingCartProvider;

export const useShoppingCart = ()=>{
    return useContext(ShoppingCartContext)
}