import React from "react";
import { useCartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Carrito = () => {
  const { cart, precioTotal, removeItem, clearCart } = useCartContext();

  return (
    <div className="carrito">
      <h1>Carrito</h1>
      {cart.length > 0 ? (
        <div>
          {React.Children.toArray(
            cart.map((prod) => (
              <div>
                <img src={prod.product.image} alt={prod.product.description}></img>
                <h2>{prod.product.name}</h2>
                <p>Cantidad: {prod.cantidad}</p>
                <p>Precio por unidad: {prod.product.price}</p>
                <p>Precio total: {prod.product.price * prod.cantidad}</p>
                <button onClick={() =>removeItem(prod.product.id, prod.product.price * prod.cantidad, prod.cantidad)}>Eliminar item</button>
                <hr/>
              </div>
            ))
          )}
          <p>Precio total: <b>${precioTotal}</b></p>
          {React.Children.toArray(
            cart.map((prod) => (
          cart.length > 0 && (<button onClick={()=>{clearCart(prod.product.price * prod.cantidad)}}>Eliminar Todo</button>)
          ))
          )}

        </div>
      ) : (
        <div>
          <p>El carrito está vacío</p>
          <Link className="a" to="/">Volver al inicio</Link>
        </div>
      )}
      {cart.length > 0 && (<Link className="a" to="/checkout">Finalizar Compra</Link>)}
    </div>
  );
};

export default Carrito;
