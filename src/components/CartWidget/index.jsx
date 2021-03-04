import React, {useState} from 'react'
import {NavLink} from 'react-router-dom';
import "./style.css";
import {useCartContext} from '../../context/CartContext';


const CartWidget =()=>{
    const { cart, totalCant, removeItem, precioTotal } = useCartContext();
    const [show, setShow] = useState(false);

    return (
        
        <div>
            <div className='productCarrito' onClick={() => setShow(true)}>
                <li className="a"><img className='img-carrito' src="images/carrito-de-compras.svg" alt=""/> Carrito <span className='num'>{totalCant}</span></li>
            </div>
        {
        show &&
        <div className="carritoOpen">
            {React.Children.toArray(
                cart.map(prod => (
                    <div className='prodWidget'>
                        <img src={prod.product.image} alt={prod.product.description}></img>
                        <h3>{prod.product.name}</h3>
                        <p>Cantidad: {prod.cantidad}</p>
                        <p>Precio por unidad: {prod.product.price}</p>
                        <p>Precio total: {prod.product.price * prod.cantidad}</p>
                        <button onClick={() => removeItem(prod.product.id, prod.product.price * prod.cantidad, prod.cantidad)}>Eliminar item</button>
                        <hr/>
                    </div>
                ))
            )}
                <p>Precio total de tu compra: {precioTotal}</p>
                <NavLink className='a' to='/carrito' onClick={() => setShow(false)}>Terminar Compra</NavLink>
                <button onClick={() => setShow(false)}>Cerrar</button>
        </div> 
        }
        </div>
        
        )
};

export default CartWidget;