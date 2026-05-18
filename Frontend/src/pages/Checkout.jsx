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
            // Step 1 — create Razorpay order on backend
            const { data } = await api.post("/order/razorpay/create", {
                amount: total
            });

            // Step 2 — open Razorpay popup
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: data.amount,
                currency: "INR",
                name: "ShopFlow",
                description: "Order Payment",
                order_id: data.id,

                // Step 3 — this runs after successful payment
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

                        // payment verified, order saved
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
        <div className="min-h-screen bg-black text-white px-6 py-12">
            <h1
                className="text-3xl mb-10"
                style={{ fontFamily: "Syne, sans-serif" }}
            >
                Checkout
            </h1>

            <div className="flex flex-col lg:flex-row gap-10">
                {/* LEFT — Shipping Form */}
                <div className="flex-1">
                    <h2
                        className="text-xl mb-6"
                        style={{ fontFamily: "Syne, sans-serif" }}
                    >
                        Shipping Details
                    </h2>

                    <div className="flex flex-col gap-4">
                        {[
                            { label: "Full Name", name: "name", type: "text" },
                            { label: "Email", name: "email", type: "email" },
                            { label: "Phone", name: "phone", type: "tel" },
                            { label: "Address", name: "address", type: "text" },
                            { label: "City", name: "city", type: "text" },
                            { label: "Pincode", name: "pincode", type: "text" },
                        ].map(({ label, name, type }) => (
                            <div key={name} className="flex flex-col gap-1">
                                <label
                                    className="text-sm text-gray-400"
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
                                    className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white outline-none focus:border-[#FF3D5A] transition"
                                    style={{ fontFamily: "DM Sans, sans-serif" }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT — Order Summary */}
                <div className="w-full lg:w-[380px]">
                    <h2
                        className="text-xl mb-6"
                        style={{ fontFamily: "Syne, sans-serif" }}
                    >
                        Order Summary
                    </h2>

                    <div className="bg-zinc-900 rounded-2xl p-6 flex flex-col gap-4">
                        {cart.map((item) => (
                            <div key={item.product} className="flex items-center gap-4">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded-lg"
                                />
                                <div className="flex-1" style={{ fontFamily: "DM Sans, sans-serif" }}>
                                    <p className="text-sm font-medium">{item.name}</p>
                                    <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                                </div>
                                <p className="text-sm" style={{ fontFamily: "DM Sans, sans-serif" }}>
                                    ₹{(item.price * item.quantity).toLocaleString()}
                                </p>
                            </div>
                        ))}

                        <hr className="border-zinc-700" />

                        <div
                            className="flex flex-col gap-2 text-sm"
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
                            <div className="flex justify-between text-white font-semibold text-base mt-2">
                                <span>Total</span>
                                <span>₹{total.toLocaleString()}</span>
                            </div>
                        </div>

                        <button
                            onClick={handlePlaceOrder}
                            className="mt-4 w-full py-3 rounded-xl font-semibold text-white transition hover:opacity-90"
                            style={{
                                backgroundColor: "#FF3D5A",
                                fontFamily: "Syne, sans-serif",
                            }}
                        >
                            Place Order
                        </button>

                        {shipping === 0 && (
                            <p
                                className="text-xs text-center text-green-400"
                                style={{ fontFamily: "DM Sans, sans-serif" }}
                            >
                                🎉 You get free shipping!
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;