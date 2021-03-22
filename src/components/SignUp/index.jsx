import firebase from "firebase/app";
import React, { useRef,useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext'
import "./style.css"

const SignUp = () => {
    const emailRef= useRef();
    const passRef= useRef();
    const confirmPassRef= useRef();
    const {signUp,TwitterProvider,GoogleProvider} = useAuthContext();
    const [error,setError]= useState("")
    const [loading,setLoading]= useState(false)
    const history = useHistory()

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(passRef.current.value !== confirmPassRef.current.value){
            return setError("Las contraseñas no coinciden")
        }   
        try {
            setError("")
            setLoading(true)
            signUp(emailRef.current.value, passRef.current.value)
            alert("Cuenta creada correctamente")
            history.push("/")
        } catch {
            setError("Error al crear tu cuenta")
        }
        setLoading(false)
        }
    const handleProvider =async (provider)=>{
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
            <h1>Registrate</h1>
            {error && alert(error)}
            <form onSubmit={handleSubmit}className="login">
                <input type="email" ref={emailRef} placeholder="Email" required/>
                <input type="password" ref={passRef} placeholder="Contraseña" pattern="^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$" title="La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.
                    NO puede tener otros símbolos." required/>
                <input type="password" ref={confirmPassRef} placeholder="Confirmar contraseña" required/>

                <input disabled={loading} type="submit" value="Registrarse"/>
            </form>
            <p>Registrarse con:</p>
            <button onClick={()=>{handleProvider(GoogleProvider)}}>Google</button>
            <button onClick={()=>{handleProvider(TwitterProvider)}}>Twitter</button>
            <div>
                <p>Ya tienes una cuenta? <Link className="a" to="/ingresar">Ingresar</Link></p>
            </div>
        </div>
    )
}

export default SignUp
