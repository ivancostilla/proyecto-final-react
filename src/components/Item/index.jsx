import React from 'react';
import {Link} from 'react-router-dom';
import './style.css';

const Item = ({product,id}) => {

    return (
            <div className='card'>
                <img src={product.image} alt={product.description}></img>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>precio: ${product.price}</p>
                <p>Stock disponible: <b>{product.stock}</b>u</p>
                <Link to={`/item/${id}`} className='detalle'>Ver Detalle</Link>
            </div>
    );
};

export default Item;
