import { getFirestore } from "../../firebase";
import React,{ useEffect, useState} from "react";
import { Link } from 'react-router-dom';
const AdminOrders = () => {
    const [orders,setOrders] = useState([])
    const db = getFirestore();
    const EliminarOrden = ((id)=>{
        if(window.confirm("estas seguro que quieres eliminar esta orden de compra")){
            db.collection("Orders").doc(id).delete()
            setTimeout(() => {
                alert("Orden eliminada con éxito de la base de datos");
                window.location.reload();
            }, 2000);
            
        }
    })
    const ConfirmarCompra = (e)=>{
        e.preventDefault()
    const ordersCollection = db.collection("Orders");
        ordersCollection.get().then(async (value) => {
            await Promise.all(
                value.docs.map(async (element) => {
                    ordersCollection.doc(element.id).update(
                        {confirmed: true}
                        )
                    })
                    );
                });
                setTimeout(() => {
                    alert("orden confirmada éxito");
                    window.location.reload();
                }, 2000);
            }
    useEffect(() => {
        
        const ordersCollection = db.collection("Orders");
        ordersCollection.get().then(async (value) => {
            let auxOrders = await Promise.all(
                value.docs.map(async (element) => {
                    return element.data()
                    })
                );
                setOrders(auxOrders)
            });
    }, [db])

    return (
        <div className='admin'>
            <h1>Ordenes de Compra</h1>
            {React.Children.toArray(
            orders.map(order =>(
                <div>
                    <h2>Orden de compra n°: {order.idOrder}</h2>
                    <h5>Nombre y apellido: {order.buyer.name} {order.buyer.surname}.</h5>
                    <p>Email: {order.buyer.email}</p>
                    <p>Dirección:{order.buyer.address}</p>
                    <p>Teléfono: {order.buyer.phone}</p>
                    <p>total de la orden: ${order.total}</p>
                    <p>Fecha de compra: {order.fecha_de_compra.toDate().toLocaleString()} </p>
                    <div className="itemList">
                    {React.Children.toArray(
                        order.items.map(item =>(
                            <div className="card">
                                <img src={item.product.image} alt=""/>
                                <p>Nombre: {item.product.name}</p>
                                <p>Talle: {item.product.talle}</p>
                                <p>Color: {item.product.color}</p>
                                <p>Categoria: {item.product.categoria}</p>
                                <p>ID del producto: {item.product.id}</p>
                                <p>Cantidad de Productos comprados: {item.cantidad}</p>
                            </div>
                            ))
                    )}
                    </div>
                    {order.confirmed === true ? <i className="confirmada">Orden Confirmada</i>:
                    <i className='edit'onClick={(e)=>{ConfirmarCompra(e)}}>Confirmar Compra</i>}
                    <i className='delete'onClick={()=>{EliminarOrden(order.idOrder)}}>Eliminar Orden</i>
                    <hr/>
                </div>
                ))
            )}
            <div>
                <Link className="a" to="/administrador">Volver</Link>
            </div>
        </div>
    )
}

export default AdminOrders
