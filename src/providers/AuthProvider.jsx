
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { createContext } from 'react'
import auth from '../Pages/firebase/firebase.config'


export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    const currentUser = (email, password) =>{
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) =>{
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () =>{
      setLoading(true);
      setUser(null);
     return signOut(auth);
    }


    useEffect(()=>{
      const unsubscribe = onAuthStateChanged(auth,currentUser=>{
        if(currentUser){
          setUser(currentUser);
          console.log("current user",currentUser);
        }else{
          setUser(null);
        }
        setLoading(false);

      })

      return  unsubscribe();

    },[])

    const authInfo ={
        user,
        loading,
        currentUser,
        signIn,
        logOut
    }


  return (
    <AuthContext.Provider value={authInfo}>
        {children}
  </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AuthProvider