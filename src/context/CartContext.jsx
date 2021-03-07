import { useContext, useState, createContext, useEffect } from "react";

export const CartContext = createContext();
export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  
  /* estado para ir guardando los productos que se agregan al carrito: */
  const [cart, setCart] = useState([]);
  /* estado para guardar la cantidad de elementos agregados eal carrito:*/
  const [totalCant, setTotalCant] = useState(0);
  /* estadoparaelprecio totaldelcarrito */
  const [precioTotal, setPrecioTotal] = useState(0);

    // Local Storage Get
    useEffect(() => {
      if (localStorage.getItem('Cart') !== null) {
          setCart(JSON.parse(localStorage.getItem('Cart')));
      }
      if (localStorage.getItem('Precio-Total') !== null) {
          setPrecioTotal(JSON.parse(localStorage.getItem('Precio-Total')));
      }
      if (localStorage.getItem('Cantidad-Total') !== null) {
          setTotalCant(JSON.parse(localStorage.getItem('Cantidad-Total')));
      }
  }, []);

  // Local Storage Set
  useEffect(() => {
      localStorage.setItem('Cart', JSON.stringify(cart));
      localStorage.setItem('Precio-Total', JSON.stringify(precioTotal));
      localStorage.setItem('Cantidad-Total', JSON.stringify(totalCant));
  }, [cart,precioTotal,totalCant]);


  /* funcion que agrega los productos al carrito: */
  const addToCart = (item, cantidad) => {
    /* comparola id de los productos agregados al cart con los que ya fueron agregados y los guardo en una variable*/
    const repetido = 
    cart.findIndex((prod) => prod.product.id === item.product.id);
    /* seteo la cantidad de elementos agregados con los que ya se habian agregado: */
    setTotalCant(totalCant + cantidad);
console.log(repetido)
    /* si el elemento agregado esta repetido creo un array donde guardo el cart + el valor recibido en el parametro item*/
    if (repetido !== -1) {
      const newArray = Array.from(cart);
      cart[repetido].cantidad += item.cantidad;
      setCart(newArray);
    } else {
      setCart([...cart, item]);
      setPrecioTotal(precioTotal + item.product.price * item.cantidad);
    }
  };

  /* funcion para eliminar items */
  const removeItem = (id, precio, cantidad) => {
    setCart(cart.filter((prod) => prod.product.id !== id));
    setPrecioTotal(precioTotal - precio);
    /* recibo la cantidad y se la resto a la cantidad que ya estaba en el carrito */
    setTotalCant(totalCant - cantidad);
  };

  const clearCart = (precio) => {
    setCart([]);
    setTotalCant(0);
    setPrecioTotal(precioTotal - precio);

  };
  return (
    <CartContext.Provider
      value={{ cart, totalCant, precioTotal, addToCart, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
