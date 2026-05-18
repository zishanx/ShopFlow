import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
        <div className="min-h-screen bg-black text-white flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-zinc-800 px-6 py-10 flex flex-col gap-2 fixed h-full">
                <h2 className="text-xl mb-8 text-[#FF3D5A]">Admin Panel</h2>
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

            {/* Main */}
            <main className="ml-64 flex-1 px-10 py-10">
                <h1 className="text-3xl mb-10">Manage Orders</h1>

                {loading ? (
                    <p className="text-gray-500">Loading orders...</p>
                ) : orders.length === 0 ? (
                    <p className="text-gray-500">No orders yet.</p>
                ) : (
                    <div className="flex flex-col gap-6">
                        {orders.map((order) => (
                            <div
                                key={order._id}
                                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
                            >
                                {/* Order Header */}
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
                                            Order ID
                                        </p>
                                        <p className="text-sm font-medium">{order._id}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
                                            Customer
                                        </p>
                                        <p className="text-sm font-medium">{order.user?.name}</p>
                                        <p className="text-xs text-gray-400">{order.user?.email}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
                                            Total
                                        </p>
                                        <p className="text-sm font-semibold text-white">
                                            ₹{order.totalPrice?.toLocaleString()}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
                                            Status
                                        </p>
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                            disabled={updatingId === order._id}
                                            className={`bg-transparent border rounded-lg px-3 py-1 text-xs outline-none cursor-pointer transition ${statusColors[order.status] || "text-gray-400 border-zinc-600"
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

                                {/* Order Items */}
                                <div className="border-t border-zinc-800 pt-4 flex flex-col gap-3">
                                    {order.items.map((item, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <img
                                                src={item.product?.image}
                                                alt={item.product?.name}
                                                className="w-12 h-12 object-cover rounded-lg"
                                            />
                                            <div className="flex-1">
                                                <p className="text-sm font-medium">{item.product?.name}</p>
                                                <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                                            </div>
                                            <p className="text-sm">₹{item.price?.toLocaleString()}</p>
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