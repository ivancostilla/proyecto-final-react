import {getFirebase} from "../firebase"

import { useContext, useState, createContext, useEffect } from "react";

export const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
    const [currentUser,setCurrentUSer] = useState();
    const [loading,setLoading] = useState(true);

    const auth = getFirebase().auth();
    const signUp = async (email,password)=>{
      return await auth.createUserWithEmailAndPassword(email,password)
    }
    const login = async (email,password)=>{
        return await auth.signInWithEmailAndPassword(email,password)
    }
    const logout = async ()=>{
        return await auth.signOut()
    }
    useEffect(() => {    
        const unsuscribe = auth.onAuthStateChanged(user =>{
            setCurrentUSer(user)
            setLoading(false)
        })
        return unsuscribe
    }, [auth])
    const value = {
        currentUser,
        logout,
        login,
        signUp
    }
    return (
        <AuthContext.Provider value={value}>
          {!loading && children}
        </AuthContext.Provider>
      );
}