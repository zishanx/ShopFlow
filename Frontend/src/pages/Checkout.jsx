import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const Checkout = () => {
    const { cart, setCart } = useCart();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        pincode: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const subtotal = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );
    const shipping = subtotal > 999 ? 0 : 99;
    const total = subtotal + shipping;

    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        try {
            const { data } = await api.post("/order/razorpay/create", {
                amount: total
            });

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: data.amount,
                currency: "INR",
                name: "ShopFlow",
                description: "Order Payment",
                order_id: data.id,
                handler: async function (response) {
                    try {
                        await api.post("/order/razorpay/verify", {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            items: cart.map((item) => ({
                                product: item.product,
                                quantity: item.quantity,
                                price: item.price,
                            })),
                            totalPrice: total,
                        });

                        setCart([]);
                        navigate("/my-orders");
                    } catch (err) {
                        console.error("Verification failed", err);
                    }
                },
                prefill: {
                    name: form.name,
                    email: form.email,
                    contact: form.phone,
                },
                theme: {
                    color: "#FF3D5A",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white px-4 sm:px-6 md:px-12 lg:px-24 py-8 md:py-12">
            <div className="max-w-7xl mx-auto">
                <h1
                    className="text-2xl sm:text-3xl mb-6 md:mb-10 font-bold"
                    style={{ fontFamily: "Syne, sans-serif" }}
                >
                    Checkout
                </h1>

                <form onSubmit={handlePlaceOrder} className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                    <div className="w-full flex-1">
                        <h2
                            className="text-lg sm:text-xl mb-6"
                            style={{ fontFamily: "Syne, sans-serif" }}
                        >
                            Shipping Details
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { label: "Full Name", name: "name", type: "text", className: "sm:col-span-2" },
                                { label: "Email", name: "email", type: "email", className: "sm:col-span-1" },
                                { label: "Phone", name: "phone", type: "tel", className: "sm:col-span-1" },
                                { label: "Address", name: "address", type: "text", className: "sm:col-span-2" },
                                { label: "City", name: "city", type: "text", className: "sm:col-span-1" },
                                { label: "Pincode", name: "pincode", type: "text", className: "sm:col-span-1" },
                            ].map(({ label, name, type, className }) => (
                                <div key={name} className={`flex flex-col gap-1.5 ${className}`}>
                                    <label
                                        className="text-xs sm:text-sm text-gray-400 font-medium"
                                        style={{ fontFamily: "DM Sans, sans-serif" }}
                                    >
                                        {label}
                                    </label>
                                    <input
                                        type={type}
                                        name={name}
                                        value={form[name]}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-sm sm:text-base text-white outline-none focus:border-[#FF3D5A] transition"
                                        style={{ fontFamily: "DM Sans, sans-serif" }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full lg:w-[380px] lg:sticky lg:top-6">
                        <h2
                            className="text-lg sm:text-xl mb-6"
                            style={{ fontFamily: "Syne, sans-serif" }}
                        >
                            Order Summary
                        </h2>

                        <div className="bg-zinc-900 rounded-2xl p-4 sm:p-6 flex flex-col gap-4 shadow-xl">
                            <div className="max-h-[240px] overflow-y-auto pr-1 flex flex-col gap-4">
                                {cart.map((item) => (
                                    <div key={item.product} className="flex items-center gap-4">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg flex-shrink-0"
                                        />
                                        <div className="flex-1 min-w-0" style={{ fontFamily: "DM Sans, sans-serif" }}>
                                            <p className="text-xs sm:text-sm font-medium truncate">{item.name}</p>
                                            <p className="text-xs text-gray-400 mt-0.5">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="text-xs sm:text-sm font-medium flex-shrink-0" style={{ fontFamily: "DM Sans, sans-serif" }}>
                                            ₹{(item.price * item.quantity).toLocaleString()}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <hr className="border-zinc-700" />

                            <div
                                className="flex flex-col gap-2.5 text-xs sm:text-sm"
                                style={{ fontFamily: "DM Sans, sans-serif" }}
                            >
                                <div className="flex justify-between text-gray-400">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Shipping</span>
                                    <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                                </div>
                                <div className="flex justify-between text-white font-semibold text-sm sm:text-base mt-1">
                                    <span>Total</span>
                                    <span>₹{total.toLocaleString()}</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="mt-2 w-full py-3 rounded-xl font-semibold text-sm sm:text-base text-white transition hover:opacity-90 active:scale-[0.98]"
                                style={{
                                    backgroundColor: "#FF3D5A",
                                    fontFamily: "Syne, sans-serif",
                                }}
                            >
                                Place Order
                            </button>

                            {shipping === 0 && (
                                <p
                                    className="text-xs text-center text-green-400 font-medium"
                                    style={{ fontFamily: "DM Sans, sans-serif" }}
                                >
                                    🎉 You get free shipping!
                                </p>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Checkout;