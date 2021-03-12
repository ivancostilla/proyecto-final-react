import React,{useEffect} from "react";
import { useCartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import './style.css';

const Carrito = () => {
  const { cart, precioTotal, removeItem, clearCart,setCantidadSeleccionadaPorUsuario} = useCartContext();
  /* useEffect que usopara setear el estado ,en este estado guardo la cantidad delproducto que seleccionó el cliente, yen elcheckout loccomparocon elstock delproducto en firebase, si la cantidad elegida por elusuario esmayor al stock arroja un error,de lo contrario se puede seguir con la compra*/
  useEffect(() => {
    cart.map(prod =>{
      return setCantidadSeleccionadaPorUsuario(prod.cantidad)
    })
  },[cart, setCantidadSeleccionadaPorUsuario])
  return (
    <>
<div className="cart">
      <h1>Carrito</h1>
      {cart.length > 0 ? (
        <div>
          {React.Children.toArray(
            cart.map((prod) => (
              <div>
                <img src={prod.product.image} alt={prod.product.description}></img>
                <h2>{prod.product.name}</h2>
                <p>Cantidad: {prod.cantidad}</p>
                <p>Precio por unidad: ${prod.product.price}</p>
                <p>Precio total: ${prod.product.price * prod.cantidad}</p>
                <button onClick={() =>removeItem(prod.product.id, prod.product.price * prod.cantidad, prod.cantidad)}>Eliminar item</button>
                <hr/>
              </div>
            ))
          )}
          <p>Precio total: <b>${precioTotal}</b></p>
          <button onClick={()=>{clearCart(precioTotal)}}>Eliminar Todo</button>    
        </div>
      ) : (
        <div>
          <p>El carrito está vacío</p>
          <Link className="a" to="/">Volver al inicio</Link>
        </div>
      )}
          {cart.length > 0 && (<button>{<Link className="a" to="/checkout">Finalizar Compra</Link>}</button>)}
      <Link className='a' to="/category">Seguir comprando</Link>
      </div>
  </>
  );
};

export default Carrito;
