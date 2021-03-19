import React, { useState } from 'react';
import {NavLink,useHistory} from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext'
import "./style.css";
import CartWidget from "../CartWidget";

const NavBar = ()=> {
    const [error,setError] = useState("")
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
return (
    <nav className='navbar'>
        {error && alert(error)}
        <ul className='ul'>
            <li><NavLink activeClassName='activehome' className='a' to="/">Tienda App</NavLink></li>
            <li><NavLink activeClassName='active' className="a" to="/category">Productos</NavLink></li>
            <li><NavLink activeClassName='active' className='a' to="/ingresar">Ingresar</NavLink></li>
            <li><NavLink activeClassName='active' className='a' to="/registrarse">Registrarse</NavLink></li>
            <CartWidget/>
            {currentUser ? <li title="ir a tu perfil"><NavLink activeClassName='active' className='a' to="PerfilUsuario"><p className="a">Usuario: {currentUser.email}</p></NavLink></li> : null}
            <li><button className="a" onClick={handleLogOut}>Salir</button></li>
        </ul>
    </nav>
);
};
export default NavBar;