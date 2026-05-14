import { useState } from "react"
import { useNavigate } from "react-router-dom"
// import { useAuth } from "../contextAuthContext"
import api from "../utils/api"



export default function Register() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        setError("")

        try {
            const res = await api.post('/auth/register', {
                email: formData.email,
                name: formData.name,
                password: formData.password
            })
            navigate('/login')
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed")
        } finally {
            setLoading(false)
        }

    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-950">
                <div className="bg-gray-900 p-8 rounded-2xl w-full max-w-md">
                    <h2 className="text-3xl font-bold text-white mb-6 font-syne">Register</h2>

                    {error && (
                        <p className="text-red-400 text-sm mb-4">{error}</p>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="bg-gray-800 text-white px-4 py-3 rounded-xl outline-none"
                        />
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="bg-gray-800 text-white px-4 py-3 rounded-xl outline-none"
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="bg-gray-800 text-white px-4 py-3 rounded-xl outline-none"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-[#FF3D5A] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50"
                        >
                            {loading ? "Registering..." : "Register"}
                        </button>
                    </form>

                    <p className="text-gray-400 text-sm mt-4">
                        Have an account?{" "}
                        <a href="/login" className="text-[#FF3D5A] hover:underline">Login</a>
                    </p>
                </div>
            </div>
        </>
    )
}