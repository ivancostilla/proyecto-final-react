// import { getFirestore } from "../../firebase";
import React from "react";
// import { Link } from 'react-router-dom';
const AdminItems = ({currentID}) => {
//   const [producto,setProducto] = useState({})
//   const db = getFirestore();

//     const getLinkByID = (async (id)=>{
//         const doc = await db.collection("Items").doc(id).get();
//         setProducto(doc.data())
//       })
// useEffect(() => {
//     if(currentID !== ""){
//         getLinkByID(currentID)
//       }
// }, [currentID])
    return (
        <div className='admin'>
            {/*    <h3>Editar producto:</h3>
      <form>
       <img src={producto.image} width="70" height="70" alt=""/>
        <input  type="text" placeholder="Nombre" required/>
        <input type="text" placeholder="Descripción"required/>
        <input  type="number"  placeholder="Precio" required/>
        <input type="text" placeholder="Envío"required/>
        <input  type="text" placeholder="Talle"required/>
        <input  type="text" placeholder="Color" required/>
        <input  type="text" placeholder="Diseño"required/>
        <input type="text" placeholder="Marca"required/>
        <input type="text" placeholder="Modelo"required/>
        <input  type="number" placeholder="Stock" required/>
    <label htmlFor="categoria">Categoría:</label>
    <select name="categoria" required >
  <option defaultValue>{producto.categoria}</option>
  <option value="remeras">Remeras</option>
  <option value="pantalones">Pantalones</option>
  <option value="medias">Medias</option>
  <option value="zapatillas">Zapatillas</option>
  <option value="gorras">Gorras</option>
</select>
<button type="submit">Editar Producto</button>
      </form>
      */}
      </div>
    )
}

export default AdminItems
