import React from 'react';
import Item from '../Item';
import './style.css';

const ItemList = ({products}) => {
console.log("🚀 ~ file: index.jsx -~ line 6 ~ ItemList ~ products", products)
    return (
        <>
        <div>
            <ul className='itemList'>
                {/* descubri que esto asigna la key automaticamente: */}
                {React.Children.toArray(
                    products.map((product)=>{
                        return (
                            <Item product={product} id={product.id}/>
                        )
                })
            )}
            </ul>
        </div>
        </>
    );
};

export default ItemList;
