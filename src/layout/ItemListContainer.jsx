import React, { useEffect, useState } from "react";
import "./style.css";
import ItemList from "../components/ItemList";
import { useParams } from "react-router-dom";
import { getFirestore } from "../firebase";
/* to do:pasarela de pagos ml */
const ItemListContainer = () => {
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
  const [loading, setLoading] = useState(true);
  /* useState: lo uso para guardar los productos traidos con useEffect */
  const [productos, setProductos] = useState([]);
  /* estados para separar los items por categorias */
  const [remera, setRemera] = useState([]);
  const [pantalon, setPantalon] = useState([]);
  const [zapatillas, setZapatillas] = useState([]);
  const [gorra, setGorra] = useState([]);
  const [medias, setMedias] = useState([]);

  // /* estado para mostrar los items ordenados en la home, o dividirlos por categorias:*/
  const [ruta, setRuta] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    /* antes de que cargen los productos coloco un loading: */
    setLoading(true);

    // conexion a la bd
    const baseDeDatos = getFirestore(); // Guardamos la referencia de la coleccion que queremos tomar
    const itemCollection = baseDeDatos.collection("Items"); // Tomando los datos de la collecion items
    itemCollection.get().then(async (value) => {
      let aux = await Promise.all(
        value.docs.map(async (element) => {
          // llamar otra vez a la bd tomando la categoriaID del element
          const CategoriasCollection = baseDeDatos.collection("Categorias");
          let auxCategorias = await CategoriasCollection.doc(element.data().categoryID).get();
          return { ...element.data(), categoria: auxCategorias.data().nombre };
        })
      );
      setLoading(false);
      if (id) {
        /* filtro los productos por categoria */
        setProductos(aux.filter((product) => product.categoria === id));
        setRuta(true);
      } else {
        setRuta(false);
        setProductos(aux);
        /* se guardan los productos de cada categoria en distintos states */
        setRemera(aux.filter((product) => product.categoria === "remeras"));
        setPantalon(aux.filter((product) => product.categoria === "pantalones"));
        setZapatillas(aux.filter((product) => product.categoria === "zapatillas"));
        setGorra(aux.filter((product) => product.categoria === "gorras"));
        setMedias(aux.filter((product) => product.categoria === "medias"));
      }
    });
  }, [id]);

  /* cuando la funcion del loading es verdadera mostramos ste msj: */
  if (loading) {
    return <h1 className="h1">Cargando productos...</h1>;
  }

  return (
    <>
      {ruta === true ? (
        <div className="ItemListContainer">
          <h2>Productos</h2>
          <ItemList products={productos} />
        </div>
      ) : (
        <div className="ItemListContainer">
          <h2>Productos</h2>
          <h2>Remeras: </h2>
          <ItemList products={remera} />
          <p>------------------------------</p>
          <h2>Pantalones:</h2>
          <ItemList products={pantalon} />
          <p>------------------------------</p>
          <h2>Zapatillas:</h2>
          <ItemList products={zapatillas} />
          <p>------------------------------</p>
          <h2>Gorras:</h2>
          <ItemList products={gorra} />
          <p>------------------------------</p>
          <h2>Medias:</h2>
          <ItemList products={medias} />
        </div>
      )}
    </>
  );
};

export default ItemListContainer;
