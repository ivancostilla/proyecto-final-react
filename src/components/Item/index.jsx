import React from 'react';
import {Link} from 'react-router-dom';
import './style.css';
import ItemCount from '../ItemCount';

const Item = ({product}) => {
    return (
        <div className='card'>
                {/* <Link to={'/itemdetail'} className='style-none'> */}
                <img src={product.image} alt={product.description}></img>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>precio: ${product.price}</p>
                {/* </Link> */}
                {/*  paso por props la funcion onAdd, y el hook tmb lo paso como props*/}
                <ItemCount stock={product.stock}/>    
            </div>
    );
};

export default Item;
