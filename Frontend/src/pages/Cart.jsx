import { useCart } from "../context/CartContext"
import { useNavigate } from "react-router-dom"

export default function Cart() {
    const { cart, removeFromCart, updateQuantity } = useCart()
    const navigate = useNavigate()

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4 px-4 text-center">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#0a0a0a]">Your cart is empty</h1>
                <p className="text-[#666666] text-sm sm:text-base">Looks like you haven't added anything yet.</p>
                <button
                    onClick={() => navigate('/products')}
                    className="w-full sm:w-auto py-3 px-8 rounded-xl font-semibold text-white bg-[#FF3D5A] hover:bg-[#e0002a] transition-colors duration-200"
                >
                    Browse Products
                </button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white px-4 sm:px-6 py-8 sm:py-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#0a0a0a] mb-6 sm:mb-8">Your Cart</h1>

                <div className="flex flex-col gap-4">
                    {cart.map((item) => (
                        <div
                            key={item.product}
                            className="relative flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 bg-[#f9f9f9] border border-[#e0e0e0] rounded-2xl p-4"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl self-start sm:self-auto"
                            />

                            <div className="flex-1 min-w-0 pr-8 sm:pr-0">
                                <h2 className="text-base sm:text-lg font-semibold text-[#0a0a0a] truncate">{item.name}</h2>
                                <p className="text-[#666666] text-xs sm:text-sm mt-0.5">₹{item.price} each</p>
                            </div>

                            <div className="flex items-center justify-between sm:justify-end gap-6 border-t border-gray-100 pt-3 sm:pt-0 sm:border-none">
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => updateQuantity(item.product, item.quantity - 1)}
                                        disabled={item.quantity === 1}
                                        className="w-8 h-8 rounded-full border border-[#e0e0e0] text-[#0a0a0a] font-bold hover:bg-[#fff0f2] hover:border-[#FF3D5A] hover:text-[#FF3D5A] transition-colors disabled:opacity-30"
                                    >
                                        −
                                    </button>
                                    <span className="text-[#0a0a0a] font-semibold w-4 text-center text-sm sm:text-base">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.product, item.quantity + 1)}
                                        className="w-8 h-8 rounded-full border border-[#e0e0e0] text-[#0a0a0a] font-bold hover:bg-[#fff0f2] hover:border-[#FF3D5A] hover:text-[#FF3D5A] transition-colors"
                                    >
                                        +
                                    </button>
                                </div>

                                <p className="text-[#0a0a0a] font-bold text-base sm:text-lg sm:w-20 sm:text-right">
                                    ₹{item.price * item.quantity}
                                </p>
                            </div>

                            <button
                                onClick={() => removeFromCart(item.product)}
                                className="absolute top-4 right-4 text-[#999999] hover:text-[#FF3D5A] transition-colors text-lg font-bold sm:static sm:p-2"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between border-t border-[#e0e0e0] pt-6">
                    <div className="text-center sm:text-left">
                        <p className="text-[#666666] text-xs sm:text-sm">Total</p>
                        <p className="text-2xl sm:text-3xl font-bold text-[#0a0a0a]">₹{total}</p>
                    </div>
                    <button
                        onClick={() => navigate('/checkout')}
                        className="py-3 px-10 rounded-xl font-semibold text-white bg-[#FF3D5A] hover:bg-[#e0002a] transition-colors duration-200 text-center"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    )
}