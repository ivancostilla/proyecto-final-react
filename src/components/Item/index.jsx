import React, {useState} from 'react';
import './style.css';
import ItemCount from '../ItemCount';

const Item = ({product}) => {
//hooks:
const [contador, setContador] = useState(1);

//funcion que aumenta la cantidad:
const onAdd = (stock)=> {
    if (contador < stock){
        setContador(contador + 1);
    };
};
//funion que disminuye la cantidad
const onRemove= ()=>{
    if(contador > 1){
        setContador(contador - 1)
    };
};
//alrta que aparce al hacer click en el boton 'agregar al carrito'
const alerta =()=>{
    if(contador > 1){
        alert(`agregaste ${contador} unidades del producto`);
    } else{
        alert(`agregaste ${contador} unidad del producto`);
    }
};
    return (
        <div className='card'>
            <img src={product.image} alt={product.description}></img>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>precio: ${product.price}</p>
            {/*  paso por props la funcion onAdd, y el hook tmb lo paso como props*/}
            <ItemCount stock={product.stock} onAdd={onAdd} onRemove={onRemove} contador={contador} alerta={alerta}/>
        </div>
    );
};

export default Item;
