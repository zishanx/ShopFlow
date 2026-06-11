import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../utils/api";

const statCards = [
    { key: "totalOrders", label: "Total Orders", icon: "📦" },
    { key: "totalProducts", label: "Products", icon: "🛍️" },
    { key: "totalUsers", label: "Users", icon: "👥" },
    { key: "totalRevenue", label: "Revenue", icon: "💰", prefix: "₹" },
];

const navLinks = [
    { label: "Dashboard", path: "/admin/dashboard" },
    { label: "Manage Products", path: "/admin/products" },
    { label: "Manage Orders", path: "/admin/orders" },
];

export default function Dashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get("/admin/stats");
                setStats(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-zinc-800 px-4 sm:px-6 py-6 md:py-10 flex flex-col md:fixed md:h-full bg-black z-10">
                <h2 className="text-xl font-bold mb-4 md:mb-8 text-[#FF3D5A] tracking-tight text-center md:text-left">
                    Admin Panel
                </h2>
                <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-x-visible no-scrollbar pb-3 md:pb-0">
                    {navLinks.map((link) => {
                        const isActive = location.pathname === link.path;
                        return (
                            <button
                                key={link.path}
                                onClick={() => navigate(link.path)}
                                className={`text-left px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex-1 md:flex-none ${
                                    isActive 
                                        ? "bg-zinc-800 text-[#FF3D5A]" 
                                        : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                                }`}
                            >
                                {link.label}
                            </button>
                        );
                    })}
                </nav>
            </aside>

            {/* Main Content Content */}
            <main className="flex-1 px-4 sm:px-8 md:px-10 py-6 md:py-10 md:ml-64 w-full max-w-7xl mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold mb-1.5 tracking-tight">
                    Dashboard
                </h1>
                <p className="text-zinc-400 text-xs sm:text-sm mb-6 sm:mb-8 md:mb-10">
                    Welcome back. Here's what's happening with ShopFlow.
                </p>

                {/* Stat Cards */}
                {loading ? (
                    <div className="flex items-center justify-center min-h-[200px]">
                        <p className="text-zinc-500 text-sm animate-pulse">Loading analytics...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 md:mb-12">
                        {statCards.map((card) => (
                            <div
                                key={card.key}
                                className="bg-zinc-900 rounded-2xl p-5 sm:p-6 flex flex-col gap-2.5 sm:gap-3 border border-zinc-800 hover:border-[#FF3D5A]/50 transition duration-300 shadow-md group"
                            >
                                <span className="text-xl sm:text-2xl group-hover:scale-110 transition-transform duration-200 origin-left">
                                    {card.icon}
                                </span>
                                <div>
                                    <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-semibold">
                                        {card.label}
                                    </p>
                                    <p className="text-xl sm:text-2xl font-bold mt-1 tracking-tight text-white">
                                        {card.prefix || ""}
                                        {stats && stats[card.key] ? stats[card.key].toLocaleString("en-IN") : 0}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Quick Actions Actions */}
                <div className="border-t border-zinc-900 pt-6 md:pt-8">
                    <h2 className="text-base sm:text-lg font-bold mb-4 tracking-tight">
                        Quick Actions
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={() => navigate("/admin/products")}
                            className="px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-[#FF3D5A] text-white hover:bg-[#e0002a] active:scale-[0.99] transition duration-200 text-center shadow-lg shadow-[#FF3D5A]/10"
                        >
                            Manage Products
                        </button>
                        <button
                            onClick={() => navigate("/admin/orders")}
                            className="px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white active:scale-[0.99] transition duration-200 text-center bg-zinc-950/40"
                        >
                            Manage Orders
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}