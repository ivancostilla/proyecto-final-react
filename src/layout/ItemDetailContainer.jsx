import React,{useEffect,useState} from 'react';
import './style.css';
import ItemDetail from '../components/ItemDetail';
import productListDetail from '../mocks/product';

const ItemDetailContainer = ()=>{
 /* loading */
const [loadingA, setLoadingA] = useState(false);
const [productsA, setProductsA] = useState([]);

useEffect(() => {
        setLoadingA(true);
        const PromesaA = new Promise((resolve,reject)=>{
            setTimeout(()=>{
                resolve(productListDetail);
            },2000);
        });
        PromesaA.then((result)=>{
            setProductsA(result);
            setLoadingA(false);
        });
},[]);
if(loadingA){return <h1>Cargando productos...</h1>}

return (
        <>
            <div>
                <ItemDetail productA={productsA}/>
            </div>
        </>
)
};

export default ItemDetailContainer;