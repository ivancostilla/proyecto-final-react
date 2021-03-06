import React,{ useState } from 'react';
import { getFirestore } from '../../firebase';
import { useCartContext } from '../../context/CartContext';
import firebase from 'firebase/app'
import './style.css'
// import CompraExitosa from '../CompraExitosa'
const Checkout = () => {
    const { precioTotal, cart, clearCart } = useCartContext()
    const [nombre, setNombre] = useState("")
    const [apellido, setApellido] = useState("")
    const [telefono, setTelefono] = useState("")
    const [direccion, setDireccion] = useState("")
    const [email, setEmail] = useState("")
    const [confirmEmail, setConfirmEmail] = useState("")
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
                surname:apellido,
                phone: telefono,
                email: email,
                address:direccion
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
                                        <label htmlFor='nombre'>Nombre:</label>
                                       <input value={nombre} name='nombre' onChange={(e) => { setNombre(e.target.value) }} type="text" pattern="[a-zA-Z ]{2,254}" required/>
                                    </div>
                                    <div>
                                    <label htmlFor='apellido'>Apellido:</label>
                                       <input value={apellido} name='apellido' onChange={(e) => { setApellido(e.target.value) }} type="text" pattern="[a-zA-Z ]{2,254}" required/>
                                    </div>
                                    <div>
                                        <abbr title='Télefonos validos de Argentina'>
                                            <label htmlFor='telefono'>Teléfono:</label>
                                    {/* solo telefonos validos de Argentina */}
                                            <input value={telefono} name='telefono' onChange={(e) => { setTelefono(e.target.value) }} type="tel" pattern="^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}" required/>
                                        </abbr>
                                    </div>
                                    <div>
                                        <label htmlFor='direccion'>Dirección:</label>
                                        <input value={direccion} name='direccion' onChange={(e) => { setDireccion(e.target.value) }} type="tel" required/>
                                    </div>
                                    <div>
                                        <label htmlFor='email'>Correo Electrónico:</label>
                                        <input value={email} name='email' onChange={(e) => { setEmail(e.target.value) }} type="email" pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$" required/>
                                    </div>
                                    <div>
                                        <label htmlFor='confirmEmail'>Confirmar Correo Electrónico:</label>
                                        <input value={confirmEmail} name='confirmEmail' onChange={(e) => { setConfirmEmail(e.target.value) }} type="email" pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$" required/>
                                    </div>
                                    {email === confirmEmail && direccion && telefono && apellido && nombre ? <button type="submit">Comprar</button> : <button type="submit" disabled>Comprar</button>}  
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