import React, { useState,useEffect } from 'react';
import {NavLink,useHistory} from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext'
import { getFirestore } from "../../firebase";
import CartWidget from "../CartWidget";
import "./style.css";

const NavBar = ()=> {
    const [error,setError] = useState("")
    const [adminUser,setAdminUser] = useState("");
    const [currentUseruid,setCurrentUseruid] = useState("");
    const {currentUser, logout} = useAuthContext();
    const history = useHistory()


    const handleLogOut=()=>{
        setError("")
        try{
            logout()
            history.push("/ingresar")
        } catch {
            setError("error al salir")
        }
    }
        const db = getFirestore()
        useEffect(() => {    
        if(currentUser){
            setCurrentUseruid(currentUser.uid)
            /* traigo un documento creadoen USers que contiene eluid para el administrador
            en el html comparo el currentUser.uid y el documento que traigo de firebase
            si coinciden se muestra la pestaña Administrador en el navbar y si no no lo muestra,
            esta fue la unica solución que se me ocurrió para poder usar el adminpanel,
            desconozco cual es lamanera correcta de asignar roles de usuarios usando solo react y firebase */
        const UsersCollection = db.collection("Users")
        UsersCollection.get().then(async (value) => {
             let aux = await Promise.all(
                value.docs.map(async (elem) => {
            return {uid: elem.data().uid}
        })
        );
        setAdminUser(aux[0].uid)
    });
        }
    }, [db,currentUseruid,currentUser])

return (
    <nav className='navbar'>
        {error && alert(error)}
        <ul className='ul'>
            <li><NavLink activeClassName='activehome' className='a' to="/">Tienda App</NavLink></li>
            <li><NavLink activeClassName='active' className="a" to="/category">Productos</NavLink></li>
            <CartWidget/>
            <div className="users">
            {currentUser ? null : <li><NavLink activeClassName='active' className='a' to="/ingresar">Ingresar</NavLink></li>}
            {currentUser ? null : <li><NavLink activeClassName='active' className='a' to="/registrarse">Registrarse</NavLink></li>}
            </div>
            {currentUser ?
            (currentUseruid === adminUser ? 
            <div><NavLink activeClassName='active' className='a' to='administrador'>Administrador</NavLink></div>
             : null
            )
             : null}
            {currentUser ? <div className="perfil"><li title="ir a tu perfil"><NavLink activeClassName='active' className='a' to="PerfilUsuario"><p className="a">Usuario: {currentUser.displayName !== null ? currentUser.displayName : currentUser.email}</p></NavLink>{currentUser.photoURL !== null && <img src={currentUser.photoURL} alt=""className="fotourl"/>}</li></div> : null}
            {currentUser ? <li><button className="a" onClick={handleLogOut}>Salir</button></li> : null}
        </ul>
    </nav>
);
};
export default NavBar;