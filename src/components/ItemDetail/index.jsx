import React,{useState} from 'react';
import ItemCount from '../ItemCount';
import './style.css';

const ItemDetail = ({product}) => {   
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
         <div>
            <ul className='itemList'>
                    <div className='detail'>
                        <img src={`../${product.image}`} alt={product.description}></img>
                        <h3>{product.name}</h3>
                        <p>Descripción: {product.description}</p>
                        <p>Precio: ${product.price}</p>
                        <p>Envios: {product.envio}</p>
                        <p>Talle: {product.talle}</p>
                        <p>Color: {product.color}</p>
                        <p>Diseño de la tela: {product.tela}</p>
                        <p>Marca: {product.marca}</p>
                        <p>Modelo: {product.modelo}</p>
                        <ItemCount stock={product.stock} contador={contador} onAdd={onAdd} onRemove={onRemove} alerta={alerta}/>
                    </div>
            </ul>
        </div>
    </>
    )
};

export default ItemDetail;
