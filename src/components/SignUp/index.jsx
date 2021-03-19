import React, { useRef,useState } from 'react';
import { Link,useHistory } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext'
import "./style.css"

const SignUp = () => {
    const emailRef= useRef();
    const passRef= useRef();
    const confirmPassRef= useRef();
    const {signUp} = useAuthContext();
    const [error,setError]= useState("")
    const [loading,setLoading]= useState(false)
    const history = useHistory()


    const handleSubmit = (e)=>{
        e.preventDefault();
        if(passRef.current.value !== confirmPassRef.current.value){
            return setError("las contraseñas no coinciden")
        }   
        try {
            setError("")
            setLoading(true)
            signUp(emailRef.current.value, passRef.current.value)
            alert("cuenta creada correctamente")
            history.push("/")
        } catch {
            setError("Error al crear tu cuenta")
        }
        setLoading(false)
        }
    return (
        <div className="login-container">
            <h1>Registrate</h1>
            {error && alert(error)}
            <form onSubmit={handleSubmit}className="login">
                <input type="email" ref={emailRef} placeholder="Email"/>
                <input type="password" ref={passRef} placeholder="Contraseña"/>
                <input type="password" ref={confirmPassRef} placeholder="Confirmar contraseña"/>

                <input disabled={loading} type="submit" value="Registrarse"/>
            </form>
            <div>
                <p>Ya tienes una cuenta? <Link className="a" to="/ingresar">Ingresar</Link></p>
            </div>
        </div>
    )
}

export default SignUp
