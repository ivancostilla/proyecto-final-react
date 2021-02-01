import "./style.css";

const CartWidget =()=>{
    return (
        <li className="products">
            <div>
            <img className='img-carrito' src="images/carrito-de-compras.svg" alt=""/>
            <button className='a'>Carrito</button>
            </div>
        </li>
    )
};

export default CartWidget;