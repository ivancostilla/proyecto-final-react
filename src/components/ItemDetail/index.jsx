import React,{ useState } from 'react';
import {Link} from 'react-router-dom';
import ItemCount from '../ItemCount';
import './style.css';

const ItemDetail = ({product}) => {   
    const [irAlCarrito,setIrAlCarrito] = useState(false)
    //alrta que aparce al hacer click en el boton 'agregar al carrito'
    const onAdd =(contador)=>{
        if(contador > 1){
            alert(`agregaste ${contador} unidades del producto`);
        } else{
            alert(`agregaste ${contador} unidad del producto`);
        }
        setIrAlCarrito(true)
        }; 
return (
    <>
         <div>
            <ul className='itemList'>
                    <div className='detail'>
                        <img src={`../${product.image}`} alt={product.description}></img>
                        <h3>{product.name}</h3>
                        <p>Descripción: {product.description}</p>
                        <p>Precio: ${product.price}</p>
                        <p>Envios: {product.envio}</p>
                        <p>Talle: {product.talle}</p>
                        <p>Color: {product.color}</p>
                        <p>Diseño de la tela: {product.tela}</p>
                        <p>Marca: {product.marca}</p>
                        <p>Modelo: {product.modelo}</p>
                        {irAlCarrito ? <Link to='/carrito'>Treminar mi compra</Link> : <ItemCount stock={product.stock} onAdd={onAdd}/>}
                    </div>
            </ul>
        </div>
    </>
    )
};

export default ItemDetail;
