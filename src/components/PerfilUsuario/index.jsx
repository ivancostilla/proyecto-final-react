import React, { useRef,useState,useEffect } from 'react';
import { getFirestore } from "../../firebase";
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext'
import "./style.css"

const PerfilUsuario = () => {
    const emailRef= useRef();
    const passRef= useRef();
    const confirmPassRef= useRef();
    const {currentUser,updateEmail,updatePassword,nombre,setNombre,apellido,setApellido,direccion,setDireccion,telefono,setTelefono} = useAuthContext();
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
    /* manejo de datos de usuario */
    const DataUser = (e)=>{
        e.preventDefault()
        const datosUsuario = {
            name: nombre,
            surname: apellido,
            phone: telefono,
            email: emailRef.current.value,
            address: direccion,
           }
        const db = getFirestore();
        const UserCollection = db.collection("Users");
        UserCollection.get().then(async (value) => {
            await Promise.all(
                value.docs.map(async () => {
         /* agrego un valor en cada item que es el id de su propio documento para que no se repitan los ids */
                    UserCollection.doc(currentUser.uid).set(
                        {...datosUsuario},
                        {merge: true}
                    )
                })
            );
        });
        setTimeout(() => {
                    alert("datos guardados correctamente")
                    window.location.reload();
                  }, 2000);
    }
    useEffect(() => {
        /* colcamoslos datos automaticamente enlosinput si el usuario está registrado */
        const db = getFirestore();
        const UserCollection = db.collection("Users");
        UserCollection.get().then(async (value) => {
          let Useraux = await Promise.all(
            value.docs.map(async () => {
              let userdoc = await UserCollection.doc(currentUser.uid).get()
              return {...userdoc.data()}
            })
          )
          Useraux.map((elem)=>{
            setNombre(elem.name)
            setApellido(elem.surname)
            setDireccion(elem.address)
            setTelefono(elem.phone)
            return elem
          })
        });
    
      }, [currentUser,setNombre,setApellido,setDireccion,setTelefono])
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
            <h3>Datos personales</h3>
            <form onSubmit={(e)=>{DataUser(e)}}>
            <div>
                <label htmlFor="nombre">Nombre:</label>
                <input value={nombre} name="nombre" onChange={(e) => {setNombre(e.target.value)}}type="text" pattern="[a-zA-Z ]{2,254}"required/>
              </div>
              <div>
                <label htmlFor="apellido">Apellido:</label>
                <input value={apellido} name="apellido" onChange={(e) => {setApellido(e.target.value)}} type="text" pattern="[a-zA-Z ]{2,254}"required/>
              </div>
              <div>
                <abbr title="Télefonos validos de Argentina">
                  <label htmlFor="telefono">Teléfono:</label>
                  {/* solo telefonos validos de Argentina */}
                  <input value={telefono} name="telefono" onChange={(e) => {setTelefono(e.target.value)}} type="tel" pattern="^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}"required/>
                </abbr>
              </div>
              <div>
                <label htmlFor="direccion">Dirección:</label>
                <input value={direccion} name="direccion" onChange={(e) => {setDireccion(e.target.value)}} type="text"required/>
              </div>
              {direccion && telefono && apellido && nombre ? <button type="submit">Guardar Datos</button> : <button type="submit" disabled>Guardar Datos</button>}
            </form>
             <div>
                <Link className="a" to="/">Cancelar</Link>
            </div>
        </div>
    )
}

export default PerfilUsuario;
