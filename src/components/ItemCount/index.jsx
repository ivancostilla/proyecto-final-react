import './style.css';
import React,{useState} from 'react';

const ItemCount = ({stock}) => {

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
        <>
        <button onClick={()=>{onRemove()}}>-</button>
        <b>{contador}</b>
        {/* para poder pasar parametros tengo que hacer un arrow  function */}
        <button onClick={()=>{onAdd(stock)}}>+</button>
        <div>
            <p>Stock disponible: <b>{stock}</b>u</p>
        </div>
        <div>
            <button onClick={()=>{alerta()}}>Agregar al carrito</button>
        </div>
        </>
    )
};

export default ItemCount;
