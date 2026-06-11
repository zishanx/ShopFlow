import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useCart } from "../context/CartContext.jsx"
import api from "../utils/api.js"

export default function ProductDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState({})
    const [related, setRelated] = useState([])
    const [loading, setLoading] = useState(true)
    const { addToCart } = useCart()

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true)
                const res = await api.get(`/products/${id}`)
                setProduct(res.data)

                const all = await api.get('/products')
                const filtered = all.data.filter(p => p.category === res.data.category && p._id !== id)
                setRelated(filtered)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        window.scrollTo(0, 0)
        fetchProduct()
    }, [id])

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center p-4">
                <p className="text-gray-500 animate-pulse font-medium">Loading details...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white px-4 sm:px-6 md:px-12 lg:px-24 py-6 sm:py-12">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-6 md:gap-12 items-center md:items-start">
                <div className="w-full md:w-1/2">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-2xl border border-[#e0e0e0]"
                    />
                </div>

                <div className="w-full md:w-1/2 flex flex-col gap-3 sm:gap-4 justify-center">
                    <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full w-fit bg-[#fff0f2] text-[#FF3D5A]">
                        {product.category}
                    </span>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0a0a0a] leading-tight">
                        {product.name}
                    </h1>
                    {product.rating && (
                        <p className="text-xs sm:text-sm text-[#666666] flex items-center gap-1">
                            ⭐ <span className="font-medium text-[#0a0a0a]">{product.rating}</span> rating
                        </p>
                    )}
                    <p className="text-sm sm:text-base text-[#666666] leading-relaxed">
                        {product.description}
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-[#0a0a0a]">
                        ₹{product.price?.toLocaleString()}
                    </p>
                    <p className={`text-xs sm:text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-[#FF3D5A]'}`}>
                        {product.stock > 0 ? `✓ ${product.stock} items remaining` : '✕ Out of stock'}
                    </p>
                    <button
                        disabled={!product.stock || product.stock <= 0}
                        className="mt-2 w-full sm:w-fit py-3 px-8 rounded-xl font-semibold text-white bg-[#FF3D5A] hover:bg-[#e0002a] active:scale-[0.98] transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none text-sm sm:text-base text-center"
                        onClick={() => {
                            addToCart({
                                product: product._id,
                                name: product.name,
                                image: product.image,
                                price: product.price,
                                quantity: 1
                            })
                        }}
                    >
                        {product.stock > 0 ? 'Add to Cart' : 'Unavailable'}
                    </button>
                </div>
            </div>

            {related.length > 0 && (
                <div className="max-w-5xl mx-auto mt-12 sm:mt-16">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#0a0a0a] mb-6">
                        You might also like
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                        {related.slice(0, 3).map((item) => (
                            <div
                                key={item._id}
                                className="bg-[#f9f9f9] rounded-2xl border border-[#e0e0e0] overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="w-full h-44 sm:h-48 overflow-hidden bg-gray-100">
                                        <img 
                                            src={item.image} 
                                            alt={item.name} 
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                                        />
                                    </div>
                                    <div className="p-4">
                                        <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full bg-[#fff0f2] text-[#FF3D5A]">
                                            {item.category}
                                        </span>
                                        <h3 className="font-semibold text-base sm:text-lg mt-2 text-[#0a0a0a] truncate">
                                            {item.name}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-[#666666] mt-1">⭐ {item.rating}</p>
                                    </div>
                                </div>
                                <div className="p-4 pt-0">
                                    <p className="font-bold text-lg text-[#0a0a0a]">₹{item.price?.toLocaleString()}</p>
                                    <button
                                        onClick={() => navigate(`/products/${item._id}`)}
                                        className="mt-3 w-full py-2.5 rounded-xl font-semibold text-white bg-[#FF3D5A] hover:bg-[#e0002a] active:scale-[0.98] transition-all duration-200 text-xs sm:text-sm"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}