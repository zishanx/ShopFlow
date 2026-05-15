import { useState, useEffect } from "react"
import api from '../utils/api.js'
import { useNavigate } from "react-router-dom"

export default function Product() {
    const [products, setProducts] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await api.get('/products')
            setProducts(res.data)
        }
        fetchProducts()
    }, [])

    return (
        <div className="min-h-screen px-6 py-10" style={{ backgroundColor: '#ffffff' }}>
            <h1 className="text-3xl font-bold mb-8" style={{ color: '#0a0a0a' }}>All Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((item) => (
                    <div
                        key={item._id}
                        className="rounded-2xl overflow-hidden transition-shadow duration-300 hover:shadow-lg border"
                        style={{ backgroundColor: '#f9f9f9', borderColor: '#e0e0e0' }}
                    >
                        <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <span
                                className="text-xs font-semibold uppercase tracking-wide px-2 py-1 rounded-full"
                                style={{ backgroundColor: '#fff0f2', color: '#FF3D5A' }}
                            >
                                {item.category}
                            </span>
                            <h2 className="font-semibold text-lg mt-2 truncate" style={{ color: '#0a0a0a' }}>{item.name}</h2>
                            <p className="text-sm mt-1" style={{ color: '#666666' }}>⭐ {item.rating}</p>
                            <p className="font-bold text-xl mt-2" style={{ color: '#0a0a0a' }}>₹{item.price}</p>
                            <button
                                onClick={() => navigate(`/products/${item._id}`)}
                                className="mt-4 w-full py-2 rounded-xl font-semibold transition-colors duration-200"
                                style={{ backgroundColor: '#FF3D5A', color: '#ffffff' }}
                                onMouseEnter={e => e.target.style.backgroundColor = '#e0002a'}
                                onMouseLeave={e => e.target.style.backgroundColor = '#FF3D5A'}
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}