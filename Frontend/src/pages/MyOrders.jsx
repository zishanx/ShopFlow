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
        <div className="min-h-screen bg-black text-white px-4 sm:px-6 md:px-12 lg:px-24 py-8 md:py-12">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">My Orders</h1>
                <p className="text-gray-400 text-xs sm:text-sm mb-8 md:mb-10">
                    Track all your ShopFlow orders here.
                </p>

                {loading ? (
                    <p className="text-gray-500 text-sm sm:text-base">Loading orders...</p>
                ) : orders.length === 0 ? (
                    <p className="text-gray-500 text-sm sm:text-base">You haven't placed any orders yet.</p>
                ) : (
                    <div className="flex flex-col gap-6">
                        {orders.map((order) => (
                            <div
                                key={order._id}
                                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 sm:p-6"
                            >
                                <div className="grid grid-cols-2 md:flex md:items-center md:justify-between gap-4 mb-6">
                                    <div className="col-span-2 sm:col-span-1">
                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">
                                            Order ID
                                        </p>
                                        <p className="text-xs sm:text-sm font-medium break-all selection:bg-[#FF3D5A]">
                                            {order._id}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">
                                            Date
                                        </p>
                                        <p className="text-xs sm:text-sm text-gray-300">
                                            {new Date(order.createdAt).toLocaleDateString("en-IN", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">
                                            Total
                                        </p>
                                        <p className="text-xs sm:text-sm font-semibold text-white">
                                            ₹{order.totalPrice?.toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="col-span-2 sm:col-span-1 md:col-span-auto flex flex-col md:items-start">
                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">
                                            Status
                                        </p>
                                        <span
                                            className={`w-fit text-[11px] font-medium border rounded-lg px-3 py-1 mt-0.5 ${
                                                statusColors[order.status] || "text-gray-400 border-zinc-600"
                                            }`}
                                        >
                                            {order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : "Unknown"}
                                        </span>
                                    </div>
                                </div>

                                <div className="border-t border-zinc-800 pt-4 flex flex-col gap-4">
                                    {order.items.map((item, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-zinc-800 rounded-lg flex-shrink-0 overflow-hidden border border-zinc-700">
                                                {item.product?.image ? (
                                                    <img
                                                        src={item.product.image}
                                                        alt={item.product?.name || "Product"}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-zinc-500 text-[10px]">
                                                        No Img
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs sm:text-sm font-medium truncate text-white">
                                                    {item.product?.name || "Archived Product"}
                                                </p>
                                                <p className="text-xs text-gray-400 mt-0.5">Qty: {item.quantity}</p>
                                            </div>
                                            <p className="text-xs sm:text-sm font-medium text-right whitespace-nowrap">
                                                ₹{item.price?.toLocaleString()}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}