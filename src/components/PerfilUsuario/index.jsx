import React from 'react'
import "./style.css"
import { useAuthContext } from '../../context/AuthContext'


const PerfilUsuario = () => {
    const {currentUser} = useAuthContext();

    return (
        <div className="PerfilUsuario">
            <h1>Bienvenido {currentUser.email}</h1>
        </div>
    )
}

export default PerfilUsuario;
