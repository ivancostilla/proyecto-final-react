import { createContext, useState } from "react";
export const CartContext = createContext();

export const CartProvider = ({children})=>{
    const [cart, setCart] = useState([{ id: 1, name: 'toto', price: 9999 }])

    console.log(cart)
    return(   
        <CartContext.Provider value={{cart,setCart}}>
            {children}
        </CartContext.Provider>
    )  
}       