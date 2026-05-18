import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
    const { user } = useAuth()

    if (!user) return <Navigate to='/login'>
    </Navigate>

    if (user.role !== "admin") return <Navigate to='/'></Navigate>

    return children
}