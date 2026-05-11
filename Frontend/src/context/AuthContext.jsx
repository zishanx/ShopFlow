import { Children, createContext } from "react";
import { useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null)
    const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')) || null)

    function login(userData, token) {

        setUser(userData);
        setToken(token)
        localStorage.setItem('user', JSON.stringify(userData))
        localStorage.setItem('token', token)

    }

    function logout() {

        setUser(null)
        setToken(null)
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, token }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;