import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../utils/api"
import { useNavigate } from "react-router-dom"

export default function Home() {
    const [products, setProducts] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get("/products")
                setProducts(res.data.slice(0, 4)) // first 4 only
            } catch (err) {
                console.error(err)
            }
        }
        fetchProducts()
    }, [])

    return (
        <>
            <section className="hero bg-[#ffffff] p-30 grid grid-cols-2">
                <div className="disc flex flex-col gap-7">
                    <p className="p-2 bg-[#fff0f2] text-[#FF3D5A] rounded-xl w-fit">New arrivals every week</p>
                    <h1 className="font-extrabold font-[Syne] text-6xl">Shop <br />Smarter, <br />Live <br /><span className="text-[#FF3D5A]">Better.</span></h1>
                    <p className="text-[#666666] w-2/3">Discover curated products across every category. From everyday essentials to premium finds -- all in one place</p>
                    <div className="buttons flex gap-3">
                        <Link to="/products">
                            <button className="bg-[#FF3D5A] text-white p-3 rounded-xl hover:bg-[#e0002a]">Shop now</button>
                        </Link>
                        <Link to="/products">
                            <button className="bg-[#fff0f2] border border-[#e0e0e0] text-[#0a0a0a] p-3 rounded-xl"
                            onClick={()=>navigate('/products')}
                            >Browse Categories</button>
                        </Link>
                    </div>
                </div>
                <div className="hero-img flex gap-5 items-center justify-center">
                    {products.slice(0, 2).map((product, i) => (
                        <div
                            key={product._id}
                            className={`card p-4 bg-[#f9f9f9] rounded-md ${i === 1 ? "relative top-10" : ""}`}
                        >
                            <img src={product.image} alt={product.name} className="w-[200px] h-[200px] object-cover rounded-md" />
                            <p className="mt-2">{product.name}</p>
                            <p className="text-[#FF3D5A] font-bold">₹{product.price}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="featured p-30 flex flex-col gap-10">
                <div className="flex justify-between">
                    <h1 className="font-bold text-4xl">Featured Products</h1>
                    <Link to="/products" className="text-[#FF3D5A]">View all</Link>
                </div>

                <div className="cards flex gap-5">
                    {products.map(product => (
                        <Link to={`/products/${product._id}`} key={product._id} className="flex-1">
                            <div className="card rounded-md bg-[#f9f9f9]">
                                <img src={product.image} alt={product.name} className="rounded-md w-full h-[200px] object-cover" />
                                <div className="desc p-4">
                                    <h3>{product.name}</h3>
                                    <p className="text-[#666666]">{product.category}</p>
                                    <div className="flex gap-5 items-center mt-2">
                                        <p className="font-bold">₹{product.price}</p>
                                        <button className="bg-[#fff0f2] p-3 rounded-md hover:bg-[#FF3D5A] hover:font-bold hover:text-white">View Product</button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="stats grid grid-cols-3 gap-5 p-30">
                <div className="stat-card bg-[#fff0f2] rounded-xl p-8 text-center">
                    <p className="font-[Syne] text-4xl font-extrabold text-[#FF3D5A]">10k+</p>
                    <p className="text-[#666666] mt-2">Happy Customers</p>
                </div>
                <div className="stat-card bg-[#fff0f2] rounded-xl p-8 text-center">
                    <p className="font-[Syne] text-4xl font-extrabold text-[#FF3D5A]">500+</p>
                    <p className="text-[#666666] mt-2">Products Available</p>
                </div>
                <div className="stat-card bg-[#fff0f2] rounded-xl p-8 text-center">
                    <p className="font-[Syne] text-4xl font-extrabold text-[#FF3D5A]">98%</p>
                    <p className="text-[#666666] mt-2">Satisfaction Rate</p>
                </div>
            </section>
        </>
    )
}