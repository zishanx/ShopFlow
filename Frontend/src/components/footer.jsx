import { Link } from "react-router-dom";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-200 text-gray-500 font-sans w-full">
            <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
                
                {/* Left Side: Brand & Copyright */}
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
                    <Link to='/' className="text-xl font-bold tracking-tight text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>
                        Shop<span className="text-[#FF3D5A]">Flow</span>
                    </Link>
                    <span className="hidden sm:inline text-gray-300">|</span>
                    <p className="text-xs text-gray-400">
                        © {currentYear} All rights reserved.
                    </p>
                </div>

                {/* Right Side: Simple Links */}
                <div className="flex items-center gap-6 text-xs sm:text-sm font-medium">
                    <Link to="/" className="hover:text-[#FF3D5A] transition-colors">Home</Link>
                    <Link to="/products" className="hover:text-[#FF3D5A] transition-colors">Products</Link>
                    <a href="mailto:support@shopflow.com" className="hover:text-[#FF3D5A] transition-colors">Contact</a>
                </div>

            </div>
        </footer>
    );
}