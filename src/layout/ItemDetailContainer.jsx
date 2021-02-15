import React,{useEffect,useState} from 'react';
import './style.css';
import ItemDetail from '../components/ItemDetail';
import productList from '../mocks/productList';
import { useParams } from 'react-router-dom';

const ItemDetailContainer = ()=>{
 /* loading */
const [loading, setLoading] = useState(false)
/* useState: lo uso para guardar los productos traidos con useEffect */
const [product, setProduct] = useState([])

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
       promesa.then(resolve=>{
           setLoading(false);
            if(id){
                setProduct(resolve.filter(product=>product.id===id)[0])
            }
        })
        .catch(reject=>{
            console.log(reject)
        })
    },[id])
if(loading){return <h1 className='h1'>Cargando producto...</h1>}

return (
        <>
            <div>
                <ItemDetail product={product}/>
            </div>
        </>
)
};

export default ItemDetailContainer;