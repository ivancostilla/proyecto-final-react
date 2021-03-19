import firebase from "firebase/app";
import { getFirestore } from "../../firebase";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./style.css";
/* compareel value del imput con el campo del documento en categorias, faltacolocar el idcorrecto */
const AddItemsAdmin = () => {
  const [file, setFile] = useState("");
  const [upload, setUpload] = useState(0);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState(0);
  const [envio, setEnvio] = useState("");
  const [talle, setTalle] = useState("");
  const [color, setColor] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [diseño, setDiseño] = useState("");
  const [categoria,setCategoria] = useState("")
  const [stock, setStock] = useState(0);
  const [categoriaID, setCategoriaID] = useState("");
  const [productos,setProductos] = useState([])
  const [select,setSelect] = useState(false)
  const [currentID,setCurrentID]=useState("")
  const [producto,setProducto]= useState([])
  /* id de las categorias en firebase */
  const remeras = "ONF94UzIWzxTKjJUqkK7";
  const medias = "abSKtCUDac3rBJqSjNrl";
  const zapatillas = "fR7DM0V5D5EweMqBdaXb";
  const gorras = "k0PCbzVEeB2d1Ygd8Phd";
  const pantalones = "oIVUW2uEzEi3ITYzeJrF";
  const db = getFirestore();
  const handleImage = (e) => {
    /* función para subir la foto del producto al storage y obtener su url */
    const storageRef = firebase
      .storage()
      .ref(`${e.target.files[0].name}`)
      .put(e.target.files[0]);
    storageRef.on(
      "state_changed",
      (snapshot) => {
        setUpload((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        console.log(error);
      },
      () => {
        setUpload(100);
        firebase
          .storage()
          .ref()
          .child(e.target.files[0].name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            setFile(url);
          });
      }
    );
  };
  const handleUpload = (e) => {
    e.preventDefault();
    /* funcion para subir los datos del producto nuevo a firebase */
    const datosProducto = {
      categoryID: categoriaID,
      categoria: categoria,
      color: color,
      description: descripcion,
      envio: envio,
      image: file,
      marca: marca,
      modelo: modelo,
      name: titulo,
      price: precio,
      stock: stock,
      talle: talle,
      tela: diseño,
    };
    const itemsCollection = db.collection("Items");
    if(currentID !== ""){
      /* editar productos creados previamente */
      itemsCollection.get().then(async (value) => {
        await Promise.all(
         value.docs.map(async () => {
      itemsCollection.doc(currentID).update(datosProducto)
    })
    );
   });
   setCurrentID("")
    }else{
      /* crear producto nuevo */
      itemsCollection.get().then(async (value) => {
        await Promise.all(
         value.docs.map(async (element) => {
           /* agrego un valor en cada item que es el id de su propio documento para que no se repitan los ids */
           itemsCollection.doc(element.id).update(
             {id : element.id,}
             )
         })
        );
       });
     itemsCollection.add(datosProducto);
    }

  /* el timeout es para darle tiempo a laapp a que envie los datos a firebase, cuandolo logra mando un alert y reseteo la pagina */
    setTimeout(() => {
      alert("producto agregado con éxito a la base de datos");
      window.location.reload();
    }, 2000);

  };
const EliminarProducto = ((id)=>{
  if(window.confirm("estas seguro que quieres eliminar este producto?")){
    db.collection("Items").doc(id).delete()
    setTimeout(() => {
      alert("producto eliminado con éxito de la base de datos");
      window.location.reload();
    }, 2000);
    
  }
})
const getLinkByID = useCallback(async (id)=>{
  const doc = await db.collection("Items").doc(id).get();
  setProducto(doc.data())
},[setProducto,db])
  useEffect(() => {
        /* querysnapshot se mantiene a la escucha de cambios,te muestraloscambios en tiemporeal
    en cambio get() solo los muestra una vez hasta que se vuelva a recargar la pagina*/
    db.collection("Items")
    .get().then(async (value) => {
      let aux = await Promise.all(
        value.docs.map(async (element) => {
          const CategoriasCollection = db.collection("Categorias");
          let auxCategorias = await CategoriasCollection.doc(element.data().categoryID).get();
          return { ...element.data(), categoria: auxCategorias.data().nombre };
        })
        );
        setProductos(aux)
      });
      if(currentID !== ""){
        /* cuando aprieto en editar(en la card del producto) se ejecuta la funcion getLinkByID, */
       getLinkByID(currentID)
      }
  }, [db,currentID,getLinkByID])

  return (
    <div className="adminItems">
      <h1>Agregar Producto Nuevo:</h1>
      <form onSubmit={(e) => {
          handleUpload(e);
        }}>
         <img src={currentID !== "" ? producto.image : file} width="90" height="90" alt=""/>
        <label htmlFor="img">Seleccionar Imagen:</label>
        <input type="file" name="img" accept=".webp,.jpg" onChange={handleImage} required/>
        <progress value={upload} max="100"></progress>
        <input type="text" onChange={(e) => {setTitulo(e.target.value);}} placeholder="Nombre" required/>
        <input type="text" onChange={(e) => { setDescripcion(e.target.value);}} placeholder="Descripción"required/>
        <input type="number" onChange={(e) => { setPrecio(e.target.value); }} placeholder="Precio" required/>
        <input type="text" onChange={(e) => { setEnvio(e.target.value);}} placeholder="Envío"required/>
        <input type="text" onChange={(e) => { setTalle(e.target.value);}} placeholder="Talle"required/>
        <input type="text" onChange={(e) => { setColor(e.target.value);}} placeholder="Color" required/>
        <input type="text" onChange={(e) => {setDiseño(e.target.value);}} placeholder="Diseño"required/>
        <input type="text" onChange={(e) => { setMarca(e.target.value);}} placeholder="Marca"required/>
        <input type="text" onChange={(e) => { setModelo(e.target.value);}} placeholder="Modelo"required/>
        <input type="number" onChange={(e) => {setStock(e.target.value);}} placeholder="Stock" required/>
    <label htmlFor="categoria">Categoría:</label>
    <select name="categoria" required onChange={(e) => {
          /* intenté usar esto con state dentro de la funcion handleupload pero recien se guardaba el state alhacer 2 clicks */
    if(e.target.value === "remeras"){
       setCategoriaID(remeras)
       setCategoria("remeras")
       setSelect(true)
    }else if(e.target.value === "medias"){
       setCategoriaID(medias)
       setCategoria("medias")
       setSelect(true)
    }else if(e.target.value === "gorras"){
       setCategoriaID(gorras)
       setCategoria("gorras")
       setSelect(true)
    }else if(e.target.value === "pantalones"){
      setCategoriaID(pantalones)
      setCategoria("pantalones")
      setSelect(true)
    }else if(e.target.value === "zapatillas"){
       setCategoriaID(zapatillas)
       setCategoria("zapatillas")
       setSelect(true)
    }else{
      setSelect(false)
    }}} >
  <option value=" " defaultValue> </option>
  <option value="remeras">Remeras</option>
  <option value="pantalones">Pantalones</option>
  <option value="medias">Medias</option>
  <option value="zapatillas">Zapatillas</option>
  <option value="gorras">Gorras</option>
</select>
{select ? <button type="submit">{currentID === "" ? "Subir Producto" : "Editar Producto"}</button> : <button type="submit" disabled>{currentID === "" ? "Subir Producto" : "Editar Producto"}</button>}
      </form>
      <div>
      </div>
      <div>
        <h2>Tus Productos</h2>
        <div className="itemList">
        {React.Children.toArray(
          productos.map(producto=>(
          <div className="card admincard">
            <img src={producto.image} alt=""/>
            <h3>Nombre: {producto.name}</h3>
            <p>Categoria: {producto.categoria}</p>
            <p>Descripcion: {producto.description}</p>
            <p>ID: {producto.id}</p>
            <p>Color: {producto.color}</p>
            <p>Envio: {producto.envio}</p>
            <p>Marca: {producto.marca}</p>
            <p>Modelo: {producto.modelo}</p>
            <p>Precio: ${producto.price}</p>
            <p>Stock: {producto.stock}</p>
            <p>Talle: {producto.talle}</p>
            <p>Diseño: {producto.tela}</p>
            <i className='edit'onClick={()=>{setCurrentID(producto.id);window.scrollTo(0,0)}}>Editar</i>
            <i className='delete'onClick={()=>{EliminarProducto(producto.id)}}>Eliminar</i>
          </div>
          ))
        )}
        </div>
      </div>
       <div className='admin'>
        <Link className="a" to="/administrador">Volver</Link>
      </div>
  </div>
  );
};

export default AddItemsAdmin;
