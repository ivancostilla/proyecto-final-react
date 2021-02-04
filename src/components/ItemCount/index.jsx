import './style.css';

//hay que aplicar esto luego en las cards
const ItemCount = ({stock,onAdd,contador,onRemove}) => {
    return (
        <>
        <button onClick={onRemove}>-</button>
        <b>{contador}</b>
        {/* para poder pasar parametros tengo que hacer un arrow  function */}
        <button onClick={()=>{onAdd(stock)}}>+</button>
        <div>
            <button>Comprar</button>
        </div>
        </>
    )
};

export default ItemCount;
