import React, { useRef,useState} from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext'

import "./style.css"


const PerfilUsuario = () => {
    const emailRef= useRef();
    const passRef= useRef();
    const confirmPassRef= useRef();
    const {currentUser,updateEmail,updatePassword} = useAuthContext();
    const [error,setError]= useState("");
    const [loading,setLoading]= useState(false);

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(passRef.current.value !== confirmPassRef.current.value){
            return setError("las contraseñas no coinciden")
        }   
        const promesas=[];
        setLoading(true)
        setError("")

        if(emailRef.current.value !== currentUser.email){
            promesas.push(updateEmail(emailRef.current.value))
        }
        if(passRef.current.value){
            promesas.push(updatePassword(passRef.current.value))
        }
        Promise.all(promesas).then(()=>{
            setTimeout(() => {
                alert("perfil actualizado correctamente")
                window.location.reload();
            }, 2000);
        }).catch(()=>{
            setError("Fallo alactualizar tu Perfil")
        }).finally(()=>{
            setLoading(false)
        })
    }
    return (
        <div className="PerfilUsuario">
            <h1>Bienvenido {currentUser.email}</h1>
            <h4>Actualizar Perfil</h4>
            {error && alert(error)}
            <form onSubmit={handleSubmit}className="login">
                <input type="email" ref={emailRef} placeholder="Email" defaultValue={currentUser.email} required/>
                <input type="password" ref={passRef} placeholder="Contraseña" pattern="^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$"  title="La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.
                NO puede tener otros símbolos."/>
                <input type="password" ref={confirmPassRef} placeholder="Confirmar contraseña"/>
                <input disabled={loading} type="submit" value="Actualizar Perfil"/>
            </form>
            <div>
                <Link className="a" to="/">Cancelar</Link>
            </div>
        </div>
    )
}

export default PerfilUsuario;
