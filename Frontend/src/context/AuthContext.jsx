import { createContext } from "react";
import { useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('user')) || null
        } catch {
            return null
        }
    })

    const [token, setToken] = useState((localStorage.getItem('token')) || null)

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