import React, {createContext, useState} from 'react';

export const AuthContext = createContext(undefined, undefined)

function AuthProvider({ children }) {
  
    const [auth, setAuth] = useState(localStorage.getItem("email"));

    const value = {auth, setAuth };

    return (
        <AuthContext.Provider value = {value}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
