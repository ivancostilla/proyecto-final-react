import React, { useRef,useState } from 'react';
import { Link,useHistory } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext'
import "./style.css"

const Login = () => {
    const emailRef= useRef();
    const passRef= useRef();
    const {login} = useAuthContext();
    const [error,setError]= useState("")
    const [loading,setLoading]= useState(false)
    const history = useHistory()
    const handleSubmit = (e)=>{
        e.preventDefault();
 
        try {
            setError("")
            setLoading(true)
            login(emailRef.current.value, passRef.current.value)
            alert("iniciaste sesión")
            history.push("/")
        } catch {
            setError("Error al ingresar a tu cuenta")
        }
        setLoading(false)
        }
    return (
        <div className="login-container">
            <h1>Ingresar</h1>
            {error && alert(error)}
            <form onSubmit={handleSubmit}className="login">
                <input type="email" ref={emailRef} placeholder="Email"/>
                <input type="password" ref={passRef} placeholder="Contraseña"/>
                <input disabled={loading} type="submit" value="Iniciar sesión"/>
            </form>
            <div>
                <p>Necesitas una cuenta? <Link className="a" to="/registrarse">Registrarse</Link></p>
            </div>
            <div>
                <p>Olvidaste tu contraseña? <Link className="a" to="/reestablecerpass">Reestablecer contraseña</Link></p>
            </div>
        </div>
    )
}

export default Login
