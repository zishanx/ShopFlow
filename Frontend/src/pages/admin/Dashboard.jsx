import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
        <div className="min-h-screen bg-black text-white flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-zinc-800 px-6 py-10 flex flex-col gap-2 fixed h-full">
                <h2
                    className="text-xl mb-8 text-[#FF3D5A]"

                >
                    Admin Panel
                </h2>
                {navLinks.map((link) => (
                    <button
                        key={link.path}
                        onClick={() => navigate(link.path)}
                        className="text-left px-4 py-3 rounded-xl text-sm transition hover:bg-zinc-800 hover:text-[#FF3D5A]"

                    >
                        {link.label}
                    </button>
                ))}
            </aside>

            {/* Main Content */}
            <main className="ml-64 flex-1 px-10 py-10">
                <h1
                    className="text-3xl mb-2"

                >
                    Dashboard
                </h1>
                <p
                    className="text-gray-400 text-sm mb-10"

                >
                    Welcome back. Here's what's happening with ShopFlow.
                </p>

                {/* Stat Cards */}
                {loading ? (
                    <p className="text-gray-500" >
                        Loading stats...
                    </p>
                ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {statCards.map((card) => (
                            <div
                                key={card.key}
                                className="bg-zinc-900 rounded-2xl p-6 flex flex-col gap-3 border border-zinc-800 hover:border-[#FF3D5A] transition"
                            >
                                <span className="text-2xl">{card.icon}</span>
                                <p
                                    className="text-gray-400 text-xs uppercase tracking-widest"

                                >
                                    {card.label}
                                </p>
                                <p
                                    className="text-2xl font-semibold"

                                >
                                    {card.prefix || ""}
                                    {stats[card.key]?.toLocaleString() ?? 0}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Quick Nav */}
                <h2
                    className="text-lg mb-4"
                >
                    Quick Actions
                </h2>
                <div className="flex gap-4">
                    <button
                        onClick={() => navigate("/admin/products")}
                        className="px-6 py-3 rounded-xl text-sm font-semibold bg-[#FF3D5A] text-white hover:opacity-90 transition"
                    >
                        Manage Products
                    </button>
                    <button
                        onClick={() => navigate("/admin/orders")}
                        className="px-6 py-3 rounded-xl text-sm font-semibold border border-zinc-700 hover:border-[#FF3D5A] hover:text-[#FF3D5A] transition"
                    >
                        Manage Orders
                    </button>
                </div>
            </main>
        </div>
    );
}