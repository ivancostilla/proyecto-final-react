import React, { useRef,useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext'
import "./style.css"

const ForgotPassword = () => {
    const emailRef= useRef();
    const {resetPassword} = useAuthContext();
    const [error,setError]= useState("")
    const [msg,setMsg]= useState("")
    const [loading,setLoading]= useState(false)
    const handleSubmit = (e)=>{
        e.preventDefault();

        try {
            setMsg("")
            setError("")
            setLoading(true)
            resetPassword(emailRef.current.value)
            setMsg("Revisa tu correo eléctronico para cambiar la contraseña")
        } catch {
            setError("Error al resetear tu contraseña")
        }
        setLoading(false)
        }
    return (
        <div className="login-container">
            <h1>Reestablece tu contraseña</h1>
            {error && alert(error)}
            {msg && alert(msg)}
            <form onSubmit={handleSubmit}className="login">
                <input type="email" ref={emailRef} placeholder="Email"/>
                <input disabled={loading} type="submit" value="Reestablecer"/>
            </form>
            <div>
                <p>Ya tienes una cuenta? <Link className="a" to="/ingresar">Ingresar</Link></p>
            </div>
            <div>
                <p>Necesitas una cuenta? <Link className="a" to="/registrarse">Registrarse</Link></p>
            </div>
        </div>
    )
}

export default ForgotPassword
