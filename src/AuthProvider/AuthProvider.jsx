import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import auth from "../firebase/firebase.config";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // set login
    const handleLogin = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    // set create user
    const handleSignUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // set signOut
    const handleLogout = () => {
        return signOut(auth)
    }
    

    // set onAuthChanged
    useEffect(() => {
        const unSubsCribe = onAuthStateChanged(auth, currentUser => {
            console.log('onAuthChanged observe', currentUser)
            setUser(currentUser)
        })
        return unSubsCribe;  // clean up function when component is dismounted
    }, [])

    const authInfo = { user, handleLogin, handleSignUp, handleLogout };
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
}