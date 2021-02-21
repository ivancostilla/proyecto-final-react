import {useContext, useState, createContext} from 'react';

export const CartContext = createContext();
export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({children}) => {
    /* estado para ir guardando los productos que se agregan al carrito: */
    const [cart, setCart] = useState([]);
    /* estado para guardar la cantidad de elementos agregados eal carrito:*/
    const [totalCant, setTotalCant] = useState(0);

    /* funcion que agrega los productos al carrito: */
    const addToCart = (item, cantidad) => {

        /* comparola id de los productos agregados al cart con los que ya fueron agregados y los guardo en una variable*/
        const repetido = cart.findIndex(prod => prod.product.id === item.product.id);
        
        /* seteo la cantidad de elementos agregados con los que ya se habian agregado: */
        setTotalCant(totalCant + cantidad);
        
        /* si el elemento agregado esta repetido creo un array donde guardo el cart + el valor recibido en el parametro item*/
        if(repetido !== -1) {
            const newArray = Array.from(cart);
            cart[repetido].cantidad += item.cantidad;
            setCart(newArray); 
        } else {
            setCart([...cart, item]);
        }
    }

    /* funcion para eliminar items */
    const removeItem = (id, cantidad) => {
        setCart(cart.filter(prod => prod.product.id !== id));
        /* recibo la cantidad y se la resto a la cantidad que ya estaba en el carrito */
        setTotalCant(totalCant - cantidad);

        /* alert provisorios: */
        alert('productos eliminados del carrito con exito');
    }

    const clearCart = () => {
        setCart([]);
        setTotalCant(0);
        alert('compra realizada con exito');
    }
    return (
        <CartContext.Provider value={{cart, totalCant, addToCart, removeItem, clearCart}}>
            {children}
        </CartContext.Provider>
    )
}