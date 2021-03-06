import React,{ useState } from 'react';
import {Link} from 'react-router-dom';
import ItemCount from '../ItemCount';
import {useCartContext} from '../../context/CartContext';
import './style.css';

const ItemDetail = ({product}) => {   

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
    <>
        <div>
            <ul className='itemList'>
                <div className='detail'>
                    <img src={product.image} alt={product.description}></img>
                    <h3>{product.name}</h3>
                    <p>Descripción: {product.description}</p>
                    <p>Precio: ${product.price}</p>
                    <p>Envios: {product.envio}</p>
                    <p>Talle: {product.talle}</p>
                    <p>Color: {product.color}</p>
                    <p>Diseño de la tela: {product.tela}</p>
                    <p>Marca: {product.marca}</p>
                    <p>Modelo: {product.modelo}</p>
                    <p>Stock disponible: <b>{product.stock}</b>u</p>
                    {showCounter === true ? <ItemCount stock={product.stock} onAdd={handleAddProduct}/> : <Link className='a' to="/carrito">Terminar compra</Link>}
                    <Link className='a' to="/category">Seguir comprando</Link>
                </div>
            </ul>
        </div>
    </>
    )
};

export default ItemDetail;
