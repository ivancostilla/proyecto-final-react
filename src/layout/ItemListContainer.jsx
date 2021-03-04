import React, { useEffect, useState } from "react";
import "./style.css";
import ItemList from "../components/ItemList";
// import productList from "../mocks/productList";
import { useParams } from "react-router-dom";
import { getFirestore } from "../firebase";
/* todo: agregar localstorage y reactmemo */
const ItemListContainer = () => {
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
  const [loading, setLoading] = useState(false);
  /* useState: lo uso para guardar los productos traidos con useEffect */
  // const [products, setProducts] = useState([]);

  /* hook de prueba para firebase */
  const [productos, setProductos] = useState([]);

  /* estados para separar los items por categorias */
  // const [remera, setRemera] = useState([]);
  // const [pantalon, setPantalon] = useState([]);
  // const [zapatillas, setZapatillas] = useState([]);
  // const [gorra, setGorra] = useState([]);
  // /* estado para mostrar los items ordenados en la home, o dividirlos por categorias:*/
  // const [ruta, setRuta] = useState(true);
  const { id } = useParams();

  /* simulo pedido a una api: */
  useEffect(() => {
    /* antes de que cargen los productos coloco un loading: */
    setLoading(false);
    // setRuta(true);
    /* esta promesa trae los productos: */
    // let promesa = new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve(productList);
    //   }, 2000);
    // });
    // promesa
    //   .then((result) => {
    //     setLoading(false);
    //     if (id) {
    //       setProducts(result.filter((product) => product.category === id));
    //       setRuta(true);
    //     } else {
    //       setRuta(false);
    //       setProducts(result);
    //       setRemera(result.filter((product) => product.category === "001"));
    //       setPantalon(result.filter((product) => product.category === "002"));
    //       setZapatillas(result.filter((product) => product.category === "003"));
    //       setGorra(result.filter((product) => product.category === "005"));
    //     }
    //   })
    //   .catch((reject) => {
    //     console.log(reject);
    //   });
    // conexion a la bd
    const baseDeDatos = getFirestore(); // Guardamos la referencia de la coleccion que queremos tomar
    const itemCollection = baseDeDatos.collection("Items"); // Tomando los datos
    itemCollection.get().then((value) => {
      let aux = value.docs.map( async (element) => {
        // llamar otra vez a la bd tomando la categoriaID del element
        const CategoriasCollection = baseDeDatos.collection("Categorias");
        let auxCategorias = await CategoriasCollection.doc(element.data().categoryID).get();
        return { ...element.data(), categoria: auxCategorias.data() };
      });
      setProductos(aux);
    });
  }, [id]);
  /* cuando la funcion del loading es verdadera mostramos ste msj: */
  if (loading) {
    return <h1 className="h1">Cargando productos...</h1>;
  }

  return (
    <>
      <div className="ItemListContainer">
        <h2>Productos</h2>
        <ItemList products={productos} />
      </div>
    </>
  );
};

export default ItemListContainer;
