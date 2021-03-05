import React,{ useState } from 'react';
import { getFirestore } from '../../firebase';
import { useCartContext } from '../../context/CartContext';
import firebase from 'firebase/app'
import './style.css'
// import CompraExitosa from '../CompraExitosa'
const Checkout = () => {
    const { precioTotal, cart, clearCart } = useCartContext()
    const [nombre, setNombre] = useState("")
    const [telefono, setTelefono] = useState("")
    const [email, setEmail] = useState("")
    const [orderId, setOrderId] = useState();
    const [date,setDate] = useState("")
/* este hook lo uso paragurardar el precioTotal, ya que al darle alboton comprar del formulario, el carrito se vacia, y si pasamos a la pantalla de compra exitosa, el precio me salia 0, al usar este state puedo guardar elprecio y mostrarselo al cliente: */
    const [precioFinal,setPrecioFinal]= useState(0)

    const manejarCompra = (e) => {
        e.preventDefault()
        let fecha = new Date()
        setDate(fecha.toLocaleString());
        const datosCompra = {
            buyer: {
                name: nombre,
                phone: telefono,
                email: email
            },
            items: cart,
            fecha_de_compra: firebase.firestore.Timestamp.fromDate(fecha),
            total: precioTotal
        }
        const db = getFirestore()
        const OrderCollection = db.collection("Orders")
        OrderCollection
            .add(datosCompra)
            .then(({ id }) => {
                setOrderId(id);
            })
            .catch((err) => {
                console.log(err);
            });   
        }

    return (
        <>
            {
                orderId ?
                    <section className="compraRealizada">
                        <h2>{nombre} felicidades, tu compra fué realizada con exito!</h2>
                        <p>el total de tu compra es: ${precioFinal}</p>
                        <p>Tu numero de orden es: <strong>{orderId}</strong> </p>
                        <p>fecha de compra: {date}</p>
                    </section>
                    :
                    <section>
                    {React.Children.toArray(
                    /* hago un map del cart para poder mandar el parametro que necesito a la funcion clearCart */
                        cart.map((prod) => (
                            <div>
                                <h1>Checkout</h1>
                                <form onSubmit={(e)=>{manejarCompra(e);clearCart(prod.product.price * prod.cantidad);setPrecioFinal(precioTotal)}}>
                                    <div>
                                        <p>Nombre y Apellido:</p>
                                       <input value={nombre} onChange={(e) => { setNombre(e.target.value) }} type="text"/>
                                    </div>
                                    <div>
                                        <p>Telefono:</p>
                                        <input value={telefono} onChange={(e) => { setTelefono(e.target.value) }} type="tel"/>
                                    </div>
                                    <div>
                                        <p>Correo Electrónico:</p>
                                        <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="email"/>
                                    </div>
                                    <button type="submit">Comprar</button>
                                </form>
                            </div>
                        ))
                    )}
                    <p>el total de tu compra es: ${precioTotal}</p>
                    </section>
            }
        </>
    )
}

export default Checkout;