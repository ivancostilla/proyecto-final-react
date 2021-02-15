import React from 'react';
import {NavLink} from 'react-router-dom';
import "./style.css";
import CartWidget from "../CartWidget";

const NavBar = ()=> {
return (
    <nav className='navbar'>
        <ul className='ul'>
            <li><NavLink activeClassName='activehome' className='a' to="/">Tienda App</NavLink></li>
            <CartWidget/>
            <li><NavLink activeClassName='active' className="a" to="/category">Productos</NavLink></li>
            <li><NavLink activeClassName='active' className='a' to="/ingresar">Ingresar</NavLink></li>
            <li><NavLink activeClassName='active' className='a' to="/registrarse">Registrarse</NavLink></li>
        </ul>
    </nav>
);
};
export default NavBar;