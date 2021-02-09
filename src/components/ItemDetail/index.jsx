import React from 'react';
import ItemCount from '../ItemCount';
import './style.css';

const ItemDetail = ({productA}) => {    

return (
    <>
         <div>
            <ul className='itemList'>
          {productA.map((product)=>{
              return (
                    <div key={product.id} className='detail'>
                        <img src={product.image} alt={product.description}></img>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>Precio: ${product.price}</p>
                        <p>Envios: {product.envio}</p>
                        <p>Talle: {product.talle}</p>
                        <p>Color: {product.color}</p>
                        <p>Diseño de la tela: {product.tela}</p>
                        <p>Marca: {product.marca}</p>
                        <p>Modelo: {product.modelo}</p>
                        <ItemCount stock={product.stock}/>
                    </div>
                )
            })}
            </ul>
        </div>
    </>
    )
};

export default ItemDetail;
