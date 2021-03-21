import firebase from "firebase/app";
import React, { useRef,useState } from 'react';
import { Link,useHistory } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext'
import "./style.css"

const Login = () => {
    const emailRef= useRef();
    const passRef= useRef();
    const {login,FacebookProvider,TwitterProvider,GoogleProvider} = useAuthContext();
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
          const handleProvider =async (provider)=>{
        /* por alguna razónellogin congoogle falla alhacer clickenelboton por PRIMERA VEZ, aldarlelasegunda vezingresa correctamente */
            await firebase.auth().signInWithPopup(provider)
            .then(() => {
            setLoading(true)
            setTimeout(() => {
                history.push("/")
            }, 2000);
            })
            .catch(error => {
                console.log(error.message)
            })
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
            <p>Iniciar sesión con:</p>
            <button onClick={()=>{handleProvider(GoogleProvider)}}>Google</button>
            <button onClick={()=>{handleProvider(FacebookProvider)}}>Facebook</button>
            <button onClick={()=>{handleProvider(TwitterProvider)}}>Twitter</button>
            
            <div>
                <p>Necesitas una cuenta? <Link className="a" to="/registrarse">Registrarse</Link></p>
            </div>
            <div>
                <p>Olvidaste tu contraseña? <Link className="a" to="/ReestablecerContraseña">Reestablecer contraseña</Link></p>
            </div>
        </div>
    )
}

export default Login
