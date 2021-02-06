import './style.css';

//hay que aplicar esto luego en las cards
const ItemCount = ({stock,onAdd,contador,onRemove,alerta}) => {
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
