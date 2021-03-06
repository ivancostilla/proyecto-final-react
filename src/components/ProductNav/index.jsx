import React from 'react';
import {NavLink} from 'react-router-dom';
import './style.css';

function ProductNav() {
    return (
        <div className='productnav'>
            <ul className='ulp'>
                <li><NavLink activeClassName='activehomep' className="a" to="/category">Todos los productos</NavLink></li>
                <li><NavLink activeClassName='active' className="a" to="/category/remeras">Remeras</NavLink></li>
                <li><NavLink activeClassName='active' className="a" to="/category/pantalones">Pantalones</NavLink></li>
                <li><NavLink activeClassName='active' className="a" to="/category/zapatillas">Zapatillas</NavLink></li>
                <li><NavLink activeClassName='active' className="a" to="/category/gorras">Gorras</NavLink></li>
                <li><NavLink activeClassName='active' className="a" to="/category/medias">Medias</NavLink></li>
            </ul>
        </div>
    )
};

export default ProductNav;
