import firebase from "firebase/app";
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
    const resetPassword = async (email)=>{
        return await auth.sendPasswordResetEmail(email)
    }
    const updateEmail = async (email)=>{
        return await currentUser.updateEmail(email)
    }
    const updatePassword = async (password)=>{
        return await currentUser.updatePassword(password)
    }
        const TwitterProvider = new firebase.auth.TwitterAuthProvider()
        const FacebookProvider = new firebase.auth.FacebookAuthProvider()
        const GoogleProvider = new firebase.auth.GoogleAuthProvider();
        
    useEffect(() => {    
        const unsuscribe = auth.onAuthStateChanged(user =>{
            setCurrentUSer(user)
            setLoading(false)
        })
        return unsuscribe
    }, [auth])
    const value = {
        currentUser,
        updateEmail,
        updatePassword,
        resetPassword,
        logout,
        login,
        signUp,
        TwitterProvider,
        FacebookProvider,
        GoogleProvider
    }
    return (
        <AuthContext.Provider value={value}>
          {!loading && children}
        </AuthContext.Provider>
      );
}