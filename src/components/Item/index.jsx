import React,{ useState } from 'react';
import {Link} from 'react-router-dom';
import {useCartContext} from '../../context/CartContext';
import './style.css';
import ItemCount from '../ItemCount';

const Item = ({product,id}) => {

    const {addToCart} = useCartContext();
    const [showCounter, setShowCounter] = useState(true);
    const handleAddProduct = (e, cantidad) => {
        e.stopPropagation();
        addToCart({
            /* el objeto es el primer parametro item, el segundo parametro es la cantidad */
            cantidad: cantidad,
            product,
        }, cantidad)

        /* una vez apretado el boton "agregar al carrito, uso el state para ponerlo en false
        y asi muestro el boton que lleva al carrito" */
        setShowCounter(false);
    }
    
    return (
        <div className='card'>
                <img src={`../${product.image}`} alt={product.description}></img>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>precio: ${product.price}</p>
                <Link to={`/item/${id}`} className='detalle'>Ver Detalle</Link>
                {
                    showCounter === true ? <ItemCount stock={product.stock} onAdd={handleAddProduct}/> : <Link to="/carrito">Terminar compra</Link>
                }
            </div>
    );
};

export default Item;
