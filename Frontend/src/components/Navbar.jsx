import { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    function handleLogout() {
        logout();
        setIsOpen(false);
        navigate('/login');
    }

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-white border-b border-gray-200 h-16 px-4 sm:px-6 lg:px-10 flex items-center justify-between font-sans sticky top-0 z-50 w-full backdrop-blur-md bg-white/90">
            {/* Logo */}
            <Link to='/' className="text-2xl font-bold tracking-tight text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>
                Shop<span className="text-[#FF3D5A]">Flow</span>
            </Link>

            {/* Desktop Center Links */}
            <ul className="hidden md:flex gap-8 list-none m-0 p-0 items-center">
                <li>
                    <Link to='/' className={`text-[15px] font-medium transition-colors ${isActive('/') ? 'text-[#FF3D5A]' : 'text-gray-500 hover:text-[#FF3D5A]'}`}>
                        Home
                    </Link>
                </li>
                {user && (
                    <li>
                        <Link to='/my-orders' className={`text-[15px] font-medium transition-colors ${isActive('/my-orders') ? 'text-[#FF3D5A]' : 'text-gray-500 hover:text-[#FF3D5A]'}`}>
                            My Orders
                        </Link>
                    </li>
                )}
                <li>
                    <Link to='/products' className={`text-[15px] font-medium transition-colors ${isActive('/products') ? 'text-[#FF3D5A]' : 'text-gray-500 hover:text-[#FF3D5A]'}`}>
                        Products
                    </Link>
                </li>
            </ul>

            {/* Desktop Right Actions */}
            <div className="hidden md:flex items-center gap-4">
                {user ? (
                    <>
                        <Link to='/cart' className={`text-xl transition-colors ${isActive('/cart') ? 'text-[#FF3D5A]' : 'text-gray-800 hover:text-[#FF3D5A]'}`}>
                            🛒
                        </Link>
                        <div className="w-px h-6 bg-gray-200" />
                        {user.role === 'admin' && (
                            <Link to='/admin/dashboard' className={`text-[15px] font-medium transition-colors ${isActive('/admin/dashboard') ? 'text-[#FF3D5A]' : 'text-gray-500 hover:text-[#FF3D5A]'}`}>
                                Dashboard
                            </Link>
                        )}
                        <button
                            onClick={handleLogout}
                            className="text-sm font-medium text-gray-900 border border-gray-300 rounded-lg px-4 py-2 hover:border-red-500 hover:text-red-500 transition-colors cursor-pointer bg-transparent"
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
                            <button className="text-sm font-medium text-white bg-[#FF3D5A] rounded-lg px-5 py-2 hover:bg-[#e0002a] transition-colors cursor-pointer border-none shadow-sm shadow-[#FF3D5A]/10">
                                Register
                            </button>
                        </Link>
                    </>
                )}
            </div>

            {/* Mobile Actions Toolbar & Menu Trigger */}
            <div className="flex md:hidden items-center gap-4">
                {user && (
                    <Link to='/cart' className="text-xl text-gray-800 relative">
                        🛒
                    </Link>
                )}
                
                {/* Hamburger Menu Trigger */}
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-gray-600 hover:text-gray-900 focus:outline-none flex flex-col justify-center items-center w-6 h-6 gap-1.5 z-50 cursor-pointer"
                    aria-label="Toggle navigation menu"
                >
                    <span className={`h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                    <span className={`h-0.5 w-6 bg-current transition duration-200 ease-in-out ${isOpen ? 'opacity-0' : ''}`} />
                    <span className={`h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </button>
            </div>

            {/* Mobile Dropdown Drawer */}
            <div className={`absolute top-16 left-0 w-full bg-white border-b border-gray-200 transition-all duration-300 ease-in-out md:hidden overflow-hidden ${isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                <div className="px-6 py-6 flex flex-col gap-5 bg-white">
                    <Link to='/' onClick={() => setIsOpen(false)} className={`text-base font-medium ${isActive('/') ? 'text-[#FF3D5A]' : 'text-gray-600'}`}>
                        Home
                    </Link>
                    <Link to='/products' onClick={() => setIsOpen(false)} className={`text-base font-medium ${isActive('/products') ? 'text-[#FF3D5A]' : 'text-gray-600'}`}>
                        Products
                    </Link>
                    {user && (
                        <Link to='/my-orders' onClick={() => setIsOpen(false)} className={`text-base font-medium ${isActive('/my-orders') ? 'text-[#FF3D5A]' : 'text-gray-600'}`}>
                            My Orders
                        </Link>
                    )}
                    
                    {user && user.role === 'admin' && (
                        <Link to='/admin/dashboard' onClick={() => setIsOpen(false)} className={`text-base font-medium ${isActive('/admin/dashboard') ? 'text-[#FF3D5A]' : 'text-gray-600'}`}>
                            Admin Dashboard
                        </Link>
                    )}

                    <div className="h-px fill-none bg-gray-200 my-1" />

                    {user ? (
                        <button
                            onClick={handleLogout}
                            className="w-full py-3 text-center text-sm font-semibold text-red-500 bg-red-50 border border-red-200 rounded-lg cursor-pointer"
                        >
                            Logout Account
                        </button>
                    ) : (
                        <div className="flex flex-col gap-3">
                            <Link to='/login' onClick={() => setIsOpen(false)} className="w-full">
                                <button className="w-full py-3 text-center text-sm font-semibold text-gray-900 border border-gray-300 rounded-lg bg-transparent cursor-pointer">
                                    Login
                                </button>
                            </Link>
                            <Link to='/register' onClick={() => setIsOpen(false)} className="w-full">
                                <button className="w-full py-3 text-center text-sm font-semibold text-white bg-[#FF3D5A] rounded-lg border-none cursor-pointer">
                                    Register
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}