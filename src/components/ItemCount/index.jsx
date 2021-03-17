import React,{useState} from 'react';
import './style.css';
// import {useCartContext} from '../../context/CartContext';

const ItemCount = ({stock,onAdd}) => {
    //hooks:
    const [contador, setContador] = useState(1);

    //funcion que aumenta la cantidad:
/* hacer esto es buena practica: es para comentar lo que hacen las funciones */
    /**
    *
    * @param {*name} name esta funcion es para incrementar el contador
    */
    const incrementar = (stoc)=> {
        if (contador < stoc){
            setContador(contador + 1);
        }
    };
    //funcion que disminuye la cantidad
    const decrementar= ()=>{
        if(contador > 1){
            setContador(contador - 1)
        }
    };
    return (
        <>
        <button onClick={()=>{decrementar()}}>-</button>
        <b>{contador}</b>
        {/* para poder pasar parametros tengo que hacer un arrow  function */}
        <button onClick={()=>{incrementar(stock)}}>+</button>
        <div>
            <button onClick={(e) => {onAdd(e, contador)}}>Agregar al carrito</button>
        </div>
        </>
    )
};

export default ItemCount;
