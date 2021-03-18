import React, { useState } from "react";
import {Link} from 'react-router-dom';
import { getFirestore } from "../../firebase";
import { useCartContext } from "../../context/CartContext";
import firebase from "firebase/app";
import "./style.css";
const Checkout = () => {
  const {precioTotal,cart,clearCart,totalCant,cantidadSeleccionadaPorUsuario,stockFirebase} = useCartContext();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [orderId, setOrderId] = useState();
  const [date, setDate] = useState("");
  /* este hook lo uso par aguardar el precioTotal, ya que al darle alboton comprar del formulario, el carrito se vacia, y si pasamos a la pantalla de compra exitosa, el precio me salia 0, al usar este state puedo guardar elprecio y mostrarselo al cliente: */
  const [precioFinal, setPrecioFinal] = useState(0);
  const [cantidadFinal, setCantidadFinal] = useState(0);
  const [cartFinal, setCartFinal] = useState([]);

  const manejarCompra = (e) => {
    e.preventDefault();
    let fecha = new Date();
    setDate(fecha.toLocaleString());
    const datosCompra = {
      buyer: {
        name: nombre,
        surname: apellido,
        phone: telefono,
        email: email,
        address: direccion,
      },
      items: cart,
      fecha_de_compra: firebase.firestore.Timestamp.fromDate(fecha),
      total: precioTotal,
    };
    /* tengo que hacer una comparacion, si el contador decantidad es igual omenor que elstock de firebase habilito la llamada a firebase y si nomuestro un mensaje de error*/
    const db = getFirestore();
    const OrderCollection = db.collection("Orders");
    OrderCollection.get().then(async (value) => {
      await Promise.all(
       value.docs.map(async (element) => {
         /* agrego un valor en cada item que es el id de su propio documento para que no se repitan los ids */
         OrderCollection.doc(element.id).update(
           {idOrder : element.id,}
           )
       })
      );
     });
    OrderCollection.add(datosCompra)
    .then(({ id }) => {
      setOrderId(id);
      /*en el checkout hago un set en el stock para guardarlo, una vez el cliente haya hecho su compra */
        const itemsToUpdate = db.collection('Items').where(firebase.firestore.FieldPath.documentId(), 'in', cart.map((i) => i.product.id));
        const updateStock = async () => {
            const query = await itemsToUpdate.get();
            const batch = db.batch();

            const outOfStock = [];
            query.docs.forEach((docSnapshot, idx) => {
                if (docSnapshot.data().stock >= cart[idx].cantidad) {
                    batch.update(docSnapshot.ref, { stock: docSnapshot.data().stock - cart[idx].cantidad });
                } else {
                  outOfStock.push({ ...docSnapshot.data(), id: docSnapshot.id });
                }
            })
            if (outOfStock.length === 0) {
                batch.commit();
            }
        }
        updateStock()
      })
      .catch((err) => {
        console.log(err);
      });

  };
  return (
    <>
      {cantidadSeleccionadaPorUsuario > stockFirebase ?
      (<div className='compraRealizada'>
        <p>Error, no se puede comprar esta cantidad de productos</p>
        <Link className='a' to='/'>Volver al Inicio</Link>
      </div>)
      :
      (orderId ? (
        <section className="compraRealizada">
          <h2>{nombre} felicidades, tu compra fué realizada con exito!</h2>
          <p>el total de tu compra es: ${precioFinal}</p>
          <p>Tu numero de orden es: <strong>{orderId}</strong></p>
          <p>fecha de compra: {date}</p>
          <p>cantidad de productos comprados: {cantidadFinal}</p>
          <p>Tus productos comprados:</p>
          {React.Children.toArray(
            cartFinal.map((prod) => (
              <div>
                <img
                  src={prod.product.image}
                  alt={prod.product.description}
                ></img>
                <h2>{prod.product.name}</h2>
                <p>{prod.product.description}</p>
                <p>Cantidad: {prod.cantidad}</p>
                <hr />
              </div>
            ))
          )}
        </section>
      ) : (
        <section>
          <div className="compraRealizada">
            <h1>Checkout</h1>
            <form onSubmit={(e) => {
                manejarCompra(e);
                clearCart(precioTotal);
                setPrecioFinal(precioTotal);
                setCartFinal(cart);
                setCantidadFinal(totalCant);
              }}>
              <div>
                <label htmlFor="nombre">Nombre:</label>
                <input value={nombre} name="nombre" onChange={(e) => {setNombre(e.target.value)}}type="text" pattern="[a-zA-Z ]{2,254}"required/>
              </div>
              <div>
                <label htmlFor="apellido">Apellido:</label>
                <input value={apellido} name="apellido" onChange={(e) => {setApellido(e.target.value)}} type="text" pattern="[a-zA-Z ]{2,254}"required/>
              </div>
              <div>
                <abbr title="Télefonos validos de Argentina">
                  <label htmlFor="telefono">Teléfono:</label>
                  {/* solo telefonos validos de Argentina */}
                  <input value={telefono} name="telefono" onChange={(e) => {setTelefono(e.target.value)}} type="tel" pattern="^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}"required/>
                </abbr>
              </div>
              <div>
                <label htmlFor="direccion">Dirección:</label>
                <input value={direccion} name="direccion" onChange={(e) => {setDireccion(e.target.value)}} type="text"required/>
              </div>
              <div>
                <label htmlFor="email">Correo Electrónico:</label>
                <input value={email} name="email" onChange={(e) => {setEmail(e.target.value)}} type="email" pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$"required/>
              </div>
              <div>
                <label htmlFor="confirmEmail">Confirmar Correo Electrónico:</label>
                <input value={confirmEmail} name="confirmEmail" onChange={(e) => {setConfirmEmail(e.target.value)}} type="email" pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$"required/>
              </div>
              {email === confirmEmail && direccion && telefono && apellido && nombre ? <button type="submit">Comprar</button> : <button type="submit" disabled>Comprar</button>}  
            </form>
          </div>
          <p>el total de tu compra es: ${precioTotal}</p>
        </section>
      ))}
    </>
  );
};

export default Checkout;
