import React, { useEffect, useState } from "react";
import ItemDetail from "../components/ItemDetail";
import NotFound from "../components/NotFound"
// import productList from '../mocks/productList';
import { useParams } from "react-router-dom";
import { getFirestore } from "../firebase";
import "./style.css";

const ItemDetailContainer = () => {
  /* loading */
  const [loading, setLoading] = useState(true);
  /* useState: lo uso para guardar los productos traidos con useEffect */
  const [product, setProduct] = useState([]);
  const { id } = useParams();

  /* simulo pedido a una api: */
  useEffect(() => {
    /* antes de que cargen los productos coloco un loading: */
    // conexion a la bd
    const baseDeDatos = getFirestore(); // Guardamos la referencia de la coleccion que queremos tomar
    const itemCollection = baseDeDatos.collection("Items"); // Tomando los datos
    itemCollection.get().then(async (value) => {
      let aux = await Promise.all(
        value.docs.map(async (element) => {
          // llamar otra vez a la bd tomando la categoriaID del element
          const CategoriasCollection = baseDeDatos.collection("Categorias");
          let auxCategorias = await CategoriasCollection.doc(
            element.data().categoryID
          ).get();
         
          return { ...element.data(), categoria: auxCategorias.data().nombre };
        })
      );
      setProduct(aux.filter((product) => product.id === id)[0]);
      setLoading(false);
    });
  }, [id]);
  return (
    <>
      {loading ? <h1 className="h1">Cargando producto...</h1>
      /* si el producto no existe es undefined, por lo tanto me lleva alcomponente NotFound */
            : !loading && product === undefined ? <NotFound/>
            : 
          <div>
            <ItemDetail product={product} />
          </div>
      }
    </>
  );
};

export default ItemDetailContainer;
