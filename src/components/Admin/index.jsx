import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
const Admin = () => {

     /* agrego un valor en cada item que es el id de su propio documento para luego poder usarlo al setear el update */
          // itemCollection.doc(element.id).update({
          //   elementID: element.id,
          // });

    return (
        <div className='admin'>
            <Link className="a" to="/agregarProductoNuevo">Agregar Producto Nuevo</Link>
            <Link className="a" to="/ordenesDeCompras">Ver órdenes de compras</Link>
        </div>
    )
}

export default Admin
