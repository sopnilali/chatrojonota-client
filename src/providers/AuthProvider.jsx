
import React, { createContext, useEffect, useState } from 'react';
import auth from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import axios from 'axios';

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();
const GithubProvider = new GithubAuthProvider();

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // social login section

    const googleSignIn = ()=> {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }
    const GithubSignIn = ()=> {
        setLoading(true);
        return signInWithPopup(auth, GithubProvider);
    }

    // User section
    const userSignIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    

    const UserSignup = (email, password)=> {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    // User section
    const logoutUser = ()=>{
        setLoading(true);
        return signOut(auth)
    }

    const userInfo = {
        loading,
        user,
        googleSignIn,
        GithubSignIn,
        userSignIn,
        UserSignup,
        logoutUser

    }

    useEffect(()=> {
        const unSubscribe =  onAuthStateChanged(auth, currentUser =>{ 
            const userEmail = currentUser?.email || user?.email;
            setUser(currentUser);
            setLoading(false);
            // if user exists then issue a taken
            if(currentUser){
                const loggedUser = {email: userEmail }
                axios.post('https://chatrojonota-server.vercel.app/api/jwt', loggedUser, {
                    withCredentials:true })
                    .then(res => {
                        console.log( 'token response',res.data);
                    })
            }           
            else {
                const loggedUser = {email: userEmail }
                axios.post('https://chatrojonota-server.vercel.app/api/logout', loggedUser, 
                { withCredentials:true })
                .then(res => {
                    console.log(res.data);
                })
            }
            
          })


          return () => {
              unSubscribe();
          }
      },[])

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;