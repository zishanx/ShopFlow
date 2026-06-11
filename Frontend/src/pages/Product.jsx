import { useState, useEffect } from "react"
import api from '../utils/api.js'
import { useNavigate } from "react-router-dom"

export default function Product() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get('/products')
                setProducts(res.data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])

    return (
        <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-[#0a0a0a]">
                    All Products
                </h1>

                {loading ? (
                    <div className="flex items-center justify-center min-h-[300px]">
                        <p className="text-gray-500 animate-pulse font-medium">Loading items...</p>
                    </div>
                ) : products.length === 0 ? (
                    <p className="text-gray-500 text-center py-12">No products available.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                        {products.map((item) => (
                            <div
                                key={item._id}
                                className="flex flex-col justify-between rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl border border-[#e0e0e0] bg-[#f9f9f9]"
                            >
                                <div>
                                    <div className="w-full h-48 sm:h-52 overflow-hidden bg-gray-100">
                                        <img 
                                            src={item.image} 
                                            alt={item.name} 
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                                        />
                                    </div>
                                    
                                    <div className="p-4">
                                        <span className="inline-block text-[10px] sm:text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full bg-[#fff0f2] text-[#FF3D5A]">
                                            {item.category}
                                        </span>
                                        <h2 className="font-semibold text-base sm:text-lg mt-2 text-[#0a0a0a] truncate">
                                            {item.name}
                                        </h2>
                                        {item.rating && (
                                            <p className="text-xs sm:text-sm mt-1 text-[#666666]">
                                                ⭐ {item.rating}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="p-4 pt-0">
                                    <p className="font-bold text-lg sm:text-xl text-[#0a0a0a]">
                                        ₹{item.price?.toLocaleString()}
                                    </p>
                                    <button
                                        onClick={() => navigate(`/products/${item._id}`)}
                                        className="mt-3 w-full py-2.5 rounded-xl font-semibold bg-[#FF3D5A] text-white hover:bg-[#e0002a] active:scale-[0.98] transition-all duration-200 text-sm sm:text-base"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}