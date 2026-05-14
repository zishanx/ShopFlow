import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"


export default function Login() {
    const navigate = useNavigate()
    const { login } = useAuth()

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            await login(formData.email, formData.password)
            navigate("/")
        } catch (err) {
            setError(err.response?.data?.message || "Login failed")
        } finally {
            setLoading(false)
        }


    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-950">
                <div className="bg-gray-900 p-8 rounded-2xl w-full max-w-md">
                    <h2 className="text-3xl font-bold text-white mb-6 font-syne">Welcome Back</h2>

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
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    <p className="text-gray-400 text-sm mt-4">
                        Don't have an account?{" "}
                        <a href="/register" className="text-[#FF3D5A] hover:underline">Register</a>
                    </p>
                </div>
            </div>
        </>
    )
}

