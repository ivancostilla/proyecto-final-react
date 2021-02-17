import React from 'react';
import {Link} from 'react-router-dom';
import './style.css';
import ItemCount from '../ItemCount';

const Item = ({product,id}) => {
        const onAdd =(contador)=>{
        if(contador > 1){
            alert(`agregaste ${contador} unidades del producto`);
        } else{
            alert(`agregaste ${contador} unidad del producto`);
        }
        };
    return (
        <div className='card'>
                <img src={`../${product.image}`} alt={product.description}></img>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>precio: ${product.price}</p>
                <Link to={`/item/${id}`} className='detalle'>Ver Detalle</Link>
                {/*  paso por props la funcion onAdd, y el hook tmb lo paso como props*/}
                <ItemCount stock={product.stock} onAdd={onAdd}/>
            </div>
    );
};

export default Item;
