
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { createContext } from 'react'
import auth from '../Pages/firebase/firebase.config'
import { GoogleAuthProvider } from "firebase/auth";
import useAxiosCommon from '../hooks/useAxiosCommon'

const googleProvider = new GoogleAuthProvider();


export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosCommon = useAxiosCommon();

  const currentUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = ()=>{
    setLoading(true)
    return signInWithPopup(auth, googleProvider);
  }

  const logOut = () => {
    setLoading(true);
    setUser(null);
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // onAuthStateChange
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
          // get token and store client
        const userInfo = { email: currentUser?.email }; // Assuming currentUser is defined somewhere

        (async () => {
          try {
            const { data } = await axiosCommon.post("/jwt", userInfo);
            if (data?.token) {
              localStorage.setItem('access-token',data?.token)
            }
          } catch (error) {
            console.error("Error:", error);
            // Handle errors appropriately
          }
        })();

      }else{
        //TODO: remove token(if token stored in the client side)
        localStorage.removeItem("access-token");
      }
      console.log("currentUser: ", currentUser);
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, [axiosCommon]);

  const authInfo = {
    user,
    loading,
    currentUser,
    signIn,
    logOut,
    updateUserProfile,
    googleSignIn,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AuthProvider