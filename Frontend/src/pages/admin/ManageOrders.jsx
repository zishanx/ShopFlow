import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../utils/api";

const navLinks = [
    { label: "Dashboard", path: "/admin/dashboard" },
    { label: "Manage Products", path: "/admin/products" },
    { label: "Manage Orders", path: "/admin/orders" },
];

const statusOptions = ["pending", "processing", "shipped", "delivered", "cancelled"];

const statusColors = {
    pending: "text-yellow-400 border-yellow-400",
    processing: "text-blue-400 border-blue-400",
    shipped: "text-purple-400 border-purple-400",
    delivered: "text-green-400 border-green-400",
    cancelled: "text-red-400 border-red-400",
};

export default function ManageOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const fetchOrders = async () => {
        try {
            const res = await api.get("/order");
            setOrders(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId, newStatus) => {
        setUpdatingId(orderId);
        try {
            await api.put(`/order/${orderId}`, { status: newStatus });
            setOrders((prev) =>
                prev.map((order) =>
                    order._id === orderId ? { ...order, status: newStatus } : order
                )
            );
        } catch (err) {
            console.error(err);
        } finally {
            setUpdatingId(null);
        }
    };

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

            {/* Main Content Area */}
            <main className="flex-1 px-4 sm:px-6 md:px-10 py-6 md:py-10 md:ml-64 w-full max-w-7xl mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-10 tracking-tight">
                    Manage Orders
                </h1>

                {loading ? (
                    <div className="flex items-center justify-center min-h-[200px]">
                        <p className="text-zinc-500 text-sm animate-pulse">Loading orders...</p>
                    </div>
                ) : orders.length === 0 ? (
                    <p className="text-zinc-500 text-sm py-8">No orders yet.</p>
                ) : (
                    <div className="flex flex-col gap-6">
                        {orders.map((order) => (
                            <div
                                key={order._id}
                                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 sm:p-6"
                            >
                                {/* Order Header Grid */}
                                <div className="grid grid-cols-2 md:flex md:items-center md:justify-between gap-4 mb-6 pb-4 border-b border-zinc-800/60">
                                    <div className="col-span-2 sm:col-span-1">
                                        <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold mb-1">
                                            Order ID
                                        </p>
                                        <p className="text-xs sm:text-sm font-medium break-all text-zinc-300">
                                            {order._id}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold mb-1">
                                            Customer
                                        </p>
                                        <p className="text-xs sm:text-sm font-medium text-white truncate max-w-[160px]">
                                            {order.user?.name || "Guest"}
                                        </p>
                                        <p className="text-[11px] text-zinc-400 truncate max-w-[160px]">
                                            {order.user?.email || "N/A"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold mb-1">
                                            Total Amount
                                        </p>
                                        <p className="text-xs sm:text-sm font-bold text-white">
                                            ₹{order.totalPrice?.toLocaleString("en-IN")}
                                        </p>
                                    </div>
                                    <div className="col-span-2 sm:col-span-1 md:col-span-auto flex flex-col">
                                        <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold mb-1">
                                            Actions / Status
                                        </p>
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                            disabled={updatingId === order._id}
                                            className={`w-fit bg-zinc-950 border rounded-lg px-2.5 py-1 text-xs outline-none cursor-pointer transition disabled:opacity-40 disabled:cursor-not-allowed ${
                                                statusColors[order.status] || "text-gray-400 border-zinc-600"
                                            }`}
                                        >
                                            {statusOptions.map((s) => (
                                                <option key={s} value={s} className="bg-zinc-900 text-white">
                                                    {s.charAt(0).toUpperCase() + s.slice(1)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Order Items Sub-list */}
                                <div className="flex flex-col gap-4">
                                    {order.items?.map((item, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-zinc-800 rounded-lg flex-shrink-0 overflow-hidden border border-zinc-700">
                                                {item.product?.image ? (
                                                    <img
                                                        src={item.product.image}
                                                        alt={item.product?.name || "Product"}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-zinc-600 text-[10px]">
                                                        No Img
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs sm:text-sm font-medium text-zinc-200 truncate">
                                                    {item.product?.name || "Archived Item"}
                                                </p>
                                                <p className="text-xs text-zinc-500 mt-0.5">
                                                    Qty: {item.quantity}
                                                </p>
                                            </div>
                                            <p className="text-xs sm:text-sm font-semibold text-zinc-300 whitespace-nowrap">
                                                ₹{item.price?.toLocaleString("en-IN")}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}