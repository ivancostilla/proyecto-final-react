import './style.css';

const ItemCount = ({stock,onAdd,onRemove,alerta,contador }) => {

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
