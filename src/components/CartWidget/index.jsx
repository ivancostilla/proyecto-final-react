import {NavLink} from 'react-router-dom';
import "./style.css";
import {useCartContext} from '../../context/CartContext';


const CartWidget =()=>{
    const {totalCant} = useCartContext();

    return (
        <li className="products"><NavLink className='a' to='/carrito'><img className='img-carrito' src="images/carrito-de-compras.svg" alt=""/> Carrito <span className='num'>{totalCant}</span></NavLink></li>
    )
};

export default CartWidget;