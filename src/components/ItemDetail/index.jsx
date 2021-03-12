import React,{ useState } from 'react';
import {Link} from 'react-router-dom';
import ItemCount from '../ItemCount';
import {useCartContext} from '../../context/CartContext';
import './style.css';

const ItemDetail = ({product}) => {   

    const {addToCart,setStockFirebase} = useCartContext();
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
        setStockFirebase(product.stock);
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
                    { product.stock >= 1 ? <p>Stock disponible: <b>{product.stock}</b>u</p> : <p>No hay stock</p> }
                    {product.stock >= 1 ?
                    (showCounter === true ? <ItemCount stock={product.stock} onAdd={handleAddProduct}/> : <Link className='a' to="/cart">Terminar compra</Link>)
                    : null
                    }
                    <Link className='a' to="/category">Seguir comprando</Link>
                </div>
            </ul>
        </div>
    </>
    )
};

export default ItemDetail;
