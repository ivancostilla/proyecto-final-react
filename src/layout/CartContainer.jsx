import React from 'react'
import {useCartContext} from '../context/CartContext';

const Carrito = () => {
    const {cart, removeItem, clearCart} = useCartContext();
    return (
        <div className="carrito">
            <h1>Carrito</h1>
            {React.Children.toArray(
                cart.map(prod => (
                    <div>
                        <img src={`../${prod.product.image}`} alt={prod.product.description}></img>
                        <h2>{prod.product.name}</h2>
                        <p>Cantidad: {prod.cantidad}</p>
                        <p>Precio por unidad: {prod.product.price}</p>
                        <p>Precio total: {prod.product.price * prod.cantidad}</p>
                        <button onClick={() => removeItem(prod.product.id, prod.cantidad)}>Eliminar item</button>
                        <hr/>
                    </div>
                ))
            )}
            {
                cart.length > 0 && <button onClick={clearCart}>Vaciar carrito</button>
            }
        </div>
    )
}

export default Carrito