import React from 'react'
import {Route,Redirect} from "react-router-dom"
import { useAuthContext } from '../../context/AuthContext'

const PrivateRoute = ({component: Component,...rest}) => {
    const {currentUser} = useAuthContext();

    return (
        <Route {...rest} render={props=>{
            return currentUser ? <Component {...props}/> : <Redirect to="/ingresar"/>
        }}></Route>
    )
}

export default PrivateRoute;
