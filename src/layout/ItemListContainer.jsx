import React,{useEffect,useState} from 'react';
import './style.css';
import ItemCount from '../components/ItemCount';

const ItemListContainer = ()=>{
/* https://api.mercadolibre.com/products/search?status=active&site_id=MLA&q=Samsung&limit=5000
 */
/* consumiendo apis clase 7: */
useEffect(()=>{
fetch("https://api.mercadolibre.com/products/search?status=active&site_id=MLA&q=Samsung&limit=5000")
.then(result => {
    return result.json()
}).then(value => {
    //Guardamos en un state
    console.log(value);
}).catch(error => {
    console.log(error);
})
return () => {}
},[])
//hooks:
    const [contador, setContador] = useState(1);

    //funcion que aumenta la cantidad:
    const onAdd = (stock)=> {
        if (contador < stock){
            setContador(contador + 1);
        };
    };
    //funion qu isminuy la cantidad
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
        <div className='ItemListContainer'>
            {/*  paso por props la funcion onAdd, y el hook tmb lo paso como props*/}
            <ItemCount stock={12} onAdd={onAdd} onRemove={onRemove} contador={contador} alerta={alerta}/>
        </div>
        </>
    )
};

export default ItemListContainer;