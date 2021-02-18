import React,{useContext} from 'react';
import Item from '../Item';
import './style.css';
import { CartContext } from '../../context/CartContext';

const ItemList = ({products}) => {
    /* context: */
    const {cart,setCart} = useContext(CartContext)
    console.log(cart)
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
            <button onClick={() => { setCart([...cart, {items:{ id: 2323, name: 'toto' }, quantity:2}]) }}>agregar un producto</button>
        </div>
        </>
    );
};

export default ItemList;
