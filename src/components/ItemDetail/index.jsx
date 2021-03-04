import React,{ useState } from 'react';
import {Link} from 'react-router-dom';
import ItemCount from '../ItemCount';
import {useCartContext} from '../../context/CartContext';
import './style.css';

const ItemDetail = ({product}) => {   
console.log("🚀 ~ file: index.jsx ~ line 8 ~ ItemDetail ~ product", product)

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
                    {
                        showCounter === true ? <ItemCount stock={product.stock} onAdd={handleAddProduct}/> : <Link to="/carrito">Terminar compra</Link>
                    }
                </div>
            </ul>
        </div>
    </>
    )
};

export default ItemDetail;
