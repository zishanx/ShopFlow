import { useEffect, useState } from "react";
import api from "../utils/api";

const statusColors = {
    pending: "text-yellow-400 border-yellow-400",
    processing: "text-blue-400 border-blue-400",
    shipped: "text-purple-400 border-purple-400",
    delivered: "text-green-400 border-green-400",
    cancelled: "text-red-400 border-red-400",
};

export default function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await api.get("/order/get/order");
                setOrders(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    return (
        <div className="min-h-screen bg-black overflow-y-auto text-white px-6 py-12">
            <h1 className="text-3xl mb-2">My Orders</h1>
            <p className="text-gray-400 text-sm mb-10">
                Track all your ShopFlow orders here.
            </p>

            {loading ? (
                <p className="text-gray-500">Loading orders...</p>
            ) : orders.length === 0 ? (
                <p className="text-gray-500">You haven't placed any orders yet.</p>
            ) : (
                <div className="flex flex-col gap-6">
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
                        >
                            {/* Order Header */}
                            <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
                                        Order ID
                                    </p>
                                    <p className="text-sm font-medium">{order._id}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
                                        Total
                                    </p>
                                    <p className="text-sm font-semibold">
                                        ₹{order.totalPrice?.toLocaleString()}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
                                        Date
                                    </p>
                                    <p className="text-sm text-gray-300">
                                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
                                        Status
                                    </p>
                                    <span
                                        className={`text-xs border rounded-lg px-3 py-1 ${statusColors[order.status] || "text-gray-400 border-zinc-600"
                                            }`}
                                    >
                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                    </span>
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
        </div>
    );
}