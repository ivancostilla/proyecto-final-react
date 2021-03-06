import React from 'react'
import { Link } from 'react-router-dom';
import './style.css'
const NotFound = () => {
    return (
        <div className='notFound'>
            <p>Producto no encontrado</p>
            <Link className='a' to='/'>Volver al inicio</Link>
        </div>
    )
}

export default NotFound
