import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import api from "../utils/api"

export default function Register() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: "",
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
            await api.post('/auth/register', {
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
        <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-900 p-6 sm:p-8 rounded-2xl w-full max-w-md shadow-xl border border-gray-800">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 font-syne text-center sm:text-left">
                    Create Account
                </h2>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-xl mb-4" role="alert">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-800 text-white px-4 py-3 text-sm sm:text-base rounded-xl outline-none border border-transparent focus:border-[#FF3D5A] transition duration-200"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-800 text-white px-4 py-3 text-sm sm:text-base rounded-xl outline-none border border-transparent focus:border-[#FF3D5A] transition duration-200"
                        />
                    </div>
                    
                    <div className="flex flex-col gap-1.5">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-800 text-white px-4 py-3 text-sm sm:text-base rounded-xl outline-none border border-transparent focus:border-[#FF3D5A] transition duration-200"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#FF3D5A] text-white py-3 text-sm sm:text-base rounded-xl font-semibold hover:opacity-90 active:scale-[0.99] transition disabled:opacity-50 disabled:pointer-events-none mt-2"
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>

                <p className="text-gray-400 text-sm mt-6 text-center sm:text-left">
                    Have an account?{" "}
                    <Link to="/login" className="text-[#FF3D5A] hover:underline font-medium ml-1">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
}