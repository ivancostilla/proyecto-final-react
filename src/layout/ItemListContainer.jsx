import React,{ useEffect, useState} from 'react';
import './style.css';
import ItemList from '../components/ItemList';
import productList from '../mocks/productList';
import { useParams } from 'react-router-dom';

/* todo: agregar localstorage y reactmemo */
const ItemListContainer = ()=>{
/* https://api.mercadolibre.com/products/search?status=active&site_id=MLA&q=Samsung&limit=5000
 */
/* consumiendo apis clase 7: */
/* useEffect(()=>{
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
},[]) */
/* fin clase 7 */


/* loading */
const [loading, setLoading] = useState(false)
/* useState: lo uso para guardar los productos traidos con useEffect */
const [products, setProducts] = useState([])
const [remera,setRemera] =useState([])
const [pantalon,setPantalon] =useState([])
const [zapatillas,setZapatillas] =useState([])
const [gorra,setGorra] =useState([])
const [ruta,setRuta]= useState(true)
const {id} = useParams()

/* simulo pedido a una api: */
useEffect(() => {
    /* antes de que cargen los productos coloco un loading: */
    setLoading(true);
    /* esta promesa trae los productos: */
    let promesa = new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(productList);
        },2000);
    });  
       promesa.then(result=>{
           setLoading(false);
            if(id){
                setProducts(result.filter(product=>product.category===id))
                setRuta(true)
            }else{
                setRuta(false)
                setProducts(result);
                setRemera(result.filter(product=>product.category === "001"))
                setPantalon(result.filter(product=>product.category === "002"))
                setZapatillas(result.filter(product=>product.category === "003"))
                setGorra(result.filter(product=>product.category === "005")) 
            }
        })
        .catch(reject=>{
            console.log(reject)
        })
    },[id])
/* cuando la funcion del loading es verdadera mostramos ste msj: */
if(loading){return <h1 className='h1'>Cargando productos...</h1>}

    return (
        <>
          { ruta === true ? <div className='ItemListContainer'>
                <h2>Productos</h2>
                <ItemList products={products}/>
            </div> : 
            <div className='ItemListContainer'>
                    <h2>Productos</h2>
                    <h2>Remeras: </h2>
                    <ItemList products={remera}/>
                    <h1>------------------------------</h1>
                    <h2>Pantalones:</h2>
                    <ItemList products={pantalon}/>
                    <h1>------------------------------</h1>
                    <h2>Zapatillas:</h2>
                    <ItemList products={zapatillas}/>
                    <h1>------------------------------</h1>
                    <h2>Gorras:</h2>
                    <ItemList products={gorra}/> 
                </div>}
        </>
    )
};

export default ItemListContainer;