import { useCart } from "../context/CartContext"
import { useNavigate } from "react-router-dom"

export default function Cart() {
    const { cart, removeFromCart, updateQuantity, } = useCart()
    const navigate = useNavigate()

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
                <h1 className="text-3xl font-bold text-[#0a0a0a]">Your cart is empty</h1>
                <p className="text-[#666666]">Looks like you haven't added anything yet.</p>
                <button
                    onClick={() => navigate('/products')}
                    className="py-3 px-8 rounded-xl font-semibold text-white bg-[#FF3D5A] hover:bg-[#e0002a] transition-colors duration-200"
                >
                    Browse Products
                </button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white px-6 py-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-[#0a0a0a] mb-8">Your Cart</h1>

                <div className="flex flex-col gap-4">
                    {cart.map((item) => (
                        <div
                            key={item.product}
                            className="flex items-center gap-6 bg-[#f9f9f9] border border-[#e0e0e0] rounded-2xl p-4"
                        >
                            {/* Image */}
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-24 h-24 object-cover rounded-xl"
                            />

                            {/* Details */}
                            <div className="flex-1">
                                <h2 className="text-lg font-semibold text-[#0a0a0a]">{item.name}</h2>
                                <p className="text-[#666666] text-sm mt-1">₹{item.price} each</p>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => updateQuantity(item.product, item.quantity - 1)}
                                    disabled={item.quantity === 1}
                                    className="w-8 h-8 rounded-full border border-[#e0e0e0] text-[#0a0a0a] font-bold hover:bg-[#fff0f2] hover:border-[#FF3D5A] hover:text-[#FF3D5A] transition-colors disabled:opacity-30"
                                >
                                    −
                                </button>
                                <span className="text-[#0a0a0a] font-semibold w-4 text-center">{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.product, item.quantity + 1)}
                                    className="w-8 h-8 rounded-full border border-[#e0e0e0] text-[#0a0a0a] font-bold hover:bg-[#fff0f2] hover:border-[#FF3D5A] hover:text-[#FF3D5A] transition-colors"
                                >
                                    +
                                </button>
                            </div>

                            {/* Item Total */}
                            <p className="text-[#0a0a0a] font-bold text-lg w-20 text-right">
                                ₹{item.price * item.quantity}
                            </p>

                            {/* Remove */}
                            <button
                                onClick={() => removeFromCart(item.product)}
                                className="text-[#999999] hover:text-[#FF3D5A] transition-colors text-xl font-bold"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>

                {/* Total & Checkout */}
                <div className="mt-8 flex items-center justify-between border-t border-[#e0e0e0] pt-6">
                    <div>
                        <p className="text-[#666666] text-sm">Total</p>
                        <p className="text-3xl font-bold text-[#0a0a0a]">₹{total}</p>
                    </div>
                    <button
                        onClick={() => navigate('/checkout')}
                        className="py-3 px-10 rounded-xl font-semibold text-white bg-[#FF3D5A] hover:bg-[#e0002a] transition-colors duration-200"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    )
}