import React from 'react';
import Item from '../Item';
import './style.css';

const ItemList = ({products}) => {
    return (
        <>
        <div>
            <ul className='itemList'>
          {products.map((product)=>{
              return (
                        <Item key={product.id} product={product}/>
                )
            })}
            </ul>
        </div>
        </>
    );
};

export default ItemList;
