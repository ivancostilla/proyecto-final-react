import React,{useState} from 'react';
import './style.css';

const ItemCount = ({stock,onAdd}) => {
    //hooks:
    const [contador, setContador] = useState(1);

    //funcion que aumenta la cantidad:
    const incrementar = (stock)=> {
        if (contador < stock){
            setContador(contador + 1);
        };
    };
    //funcion que disminuye la cantidad
    const decrementar= ()=>{
        if(contador > 1){
            setContador(contador - 1)
        };
    };
   /*  const onAddwrap = ()=>{
        onAdd(contador);
    }; */

    return (
        <>
        <div>
            <p>Stock disponible: <b>{stock}</b>u</p>
        </div>
        <button onClick={()=>{decrementar()}}>-</button>
        <b>{contador}</b>
        {/* para poder pasar parametros tengo que hacer un arrow  function */}
        <button onClick={()=>{incrementar(stock)}}>+</button>
        <div>
            <button onClick={(e) => onAdd(e, contador)}>Agregar al carrito</button>
        </div>
        </>
    )
};

export default ItemCount;
