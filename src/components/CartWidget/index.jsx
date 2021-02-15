import {NavLink} from 'react-router-dom';
import "./style.css";

const CartWidget =()=>{
    return (
        <li className="products"><NavLink className='a' to='/carrito'><img className='img-carrito' src="images/carrito-de-compras.svg" alt=""/> Carrito <span className='num'>0</span></NavLink></li>
    )
};

export default CartWidget;