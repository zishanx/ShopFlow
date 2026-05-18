import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

export default function Navbar() {
    const { user, logout } = useContext(AuthContext)
    const navigate = useNavigate()

    function handleLogout() {
        logout()
        navigate('/login')
    }

    return (
        <nav className="bg-white border-b border-gray-200 h-16 px-10 flex items-center justify-between font-sans">

            <Link to='/' className="text-2xl font-bold tracking-tight text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>
                Shop<span className="text-[#FF3D5A]">Flow</span>
            </Link>

            <ul className="flex gap-8 list-none m-0 p-0">
                <li><Link to='/' className="text-[15px] font-medium text-gray-500 hover:text-[#FF3D5A] transition-colors">Home</Link></li>
                <li>{user && (
                    <Link to='/my-orders' className="text-[15px] font-medium text-gray-500 hover:text-[#FF3D5A] transition-colors">
                        My Orders
                    </Link>
                )}</li>
                <li><Link to='/products' className="text-[15px] font-medium text-gray-500 hover:text-[#FF3D5A] transition-colors">Products</Link></li>
            </ul>

            <div className="flex items-center gap-4">
                {user ? (
                    <>

                        <Link to='/cart' className="text-gray-800 hover:text-[#FF3D5A] transition-colors">
                            🛒
                        </Link>
                        <div className="w-px h-6 bg-gray-200" />
                        {user.role === 'admin' && (
                            <Link to='/admin/dashboard' className="text-[15px] font-medium text-gray-500 hover:text-[#FF3D5A] transition-colors">
                                Dashboard
                            </Link>
                        )}
                        <button
                            onClick={handleLogout}
                            className="text-sm font-medium text-gray-900 border border-gray-300 rounded-lg px-4 py-2 hover:border-[#FF3D5A] hover:text-[#FF3D5A] transition-colors cursor-pointer bg-transparent"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to='/login'>
                            <button className="text-sm font-medium text-gray-900 border border-gray-300 rounded-lg px-4 py-2 hover:border-[#FF3D5A] hover:text-[#FF3D5A] transition-colors cursor-pointer bg-transparent">
                                Login
                            </button>
                        </Link>
                        <Link to='/register'>
                            <button className="text-sm font-medium text-white bg-[#FF3D5A] rounded-lg px-5 py-2 hover:bg-[#e0002a] transition-colors cursor-pointer border-none">
                                Register
                            </button>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    )
}