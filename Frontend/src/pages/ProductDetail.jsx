import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import api from "../utils/api.js"

export default function ProductDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState({})
    const [related, setRelated] = useState([])

    useEffect(() => {
        const fetchProduct = async () => {
            const res = await api.get(`/products/${id}`)
            setProduct(res.data)

            const all = await api.get('/products')
            const filtered = all.data.filter(p => p.category === res.data.category && p._id !== id)
            setRelated(filtered)
        }
        fetchProduct()
    }, [id])

    return (
        <div className="min-h-screen bg-white px-6 py-12">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12">

                {/* Image */}
                <div className="md:w-1/2">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-96 object-cover rounded-2xl border border-[#e0e0e0]"
                    />
                </div>

                {/* Details */}
                <div className="md:w-1/2 flex flex-col justify-center gap-4">
                    <span className="text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full w-fit bg-[#fff0f2] text-[#FF3D5A]">
                        {product.category}
                    </span>
                    <h1 className="text-4xl font-bold text-[#0a0a0a]">
                        {product.name}
                    </h1>
                    <p className="text-sm text-[#666666]">⭐ {product.rating} rating</p>
                    <p className="text-lg text-[#666666]">{product.description}</p>
                    <p className="text-3xl font-bold text-[#0a0a0a]">₹{product.price}</p>
                    <p className={`text-sm ${product.stock > 0 ? 'text-[#666666]' : 'text-[#FF3D5A]'}`}>
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </p>
                    <button className="mt-2 py-3 px-8 rounded-xl font-semibold text-white bg-[#FF3D5A] hover:bg-[#e0002a] transition-colors duration-200 w-fit">
                        Add to Cart
                    </button>
                </div>
            </div>

            {/* You might also like */}
            {related.length > 0 && (
                <div className="max-w-5xl mx-auto mt-16">
                    <h2 className="text-2xl font-bold text-[#0a0a0a] mb-6">You might also like</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {related.map((item) => (
                            <div
                                key={item._id}
                                className="bg-[#f9f9f9] rounded-2xl border border-[#e0e0e0] overflow-hidden hover:shadow-lg transition-shadow duration-300"
                            >
                                <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <span className="text-xs font-semibold uppercase tracking-wide px-2 py-1 rounded-full bg-[#fff0f2] text-[#FF3D5A]">
                                        {item.category}
                                    </span>
                                    <h3 className="font-semibold text-lg mt-2 text-[#0a0a0a] truncate">{item.name}</h3>
                                    <p className="text-sm text-[#666666] mt-1">⭐ {item.rating}</p>
                                    <p className="font-bold text-xl mt-2 text-[#0a0a0a]">₹{item.price}</p>
                                    <button
                                        onClick={() => navigate(`/products/${item._id}`)}
                                        className="mt-4 w-full py-2 rounded-xl font-semibold text-white bg-[#FF3D5A] hover:bg-[#e0002a] transition-colors duration-200"
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