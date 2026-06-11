import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../utils/api"

export default function Home() {
    const [products, setProducts] = useState([])

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
            <section className="hero bg-[#ffffff] p-6 sm:p-12 md:p-20 lg:p-30 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className="disc flex flex-col gap-5 md:gap-7 items-center lg:items-start text-center lg:text-left">
                    <p className="p-2 bg-[#fff0f2] text-[#FF3D5A] rounded-xl w-fit text-sm font-medium">
                        New arrivals every week
                    </p>
                    <h1 className="font-extrabold font-[Syne] text-4xl sm:text-5xl md:text-6xl leading-tight">
                        Shop <br className="hidden lg:inline" />Smarter, <br className="hidden lg:inline" />Live <br />
                        <span className="text-[#FF3D5A]">Better.</span>
                    </h1>
                    <p className="text-[#666666] w-full sm:w-5/6 lg:w-2/3">
                        Discover curated products across every category. From everyday essentials to premium finds -- all in one place
                    </p>
                    <div className="buttons flex flex-wrap gap-3 justify-center lg:justify-start w-full">
                        <Link to="/products" className="w-full sm:w-auto">
                            <button className="w-full sm:w-auto bg-[#FF3D5A] text-white py-3 px-6 rounded-xl hover:bg-[#e0002a] transition-colors">
                                Shop now
                            </button>
                        </Link>
                        <Link to="/products" className="w-full sm:w-auto">
                            <button className="w-full sm:w-auto bg-[#fff0f2] border border-[#e0e0e0] text-[#0a0a0a] py-3 px-6 rounded-xl hover:bg-[#ffe5e9] transition-colors">
                                Browse Categories
                            </button>
                        </Link>
                    </div>
                </div>

               
                <div className="hero-img flex gap-4 sm:gap-5 items-center justify-center mt-6 lg:mt-0">
                    {products.slice(0, 2).map((product, i) => (
                        <div
                            key={product._id}
                            className={`card p-3 sm:p-4 bg-[#f9f9f9] rounded-md shadow-sm w-1/2 sm:w-[220px] ${i === 1 ? "relative top-6 sm:top-10" : ""}`}
                        >
                            <img src={product.image} alt={product.name} className="w-full h-[150px] sm:h-[200px] object-cover rounded-md" />
                            <p className="mt-2 text-sm sm:text-base font-medium truncate">{product.name}</p>
                            <p className="text-[#FF3D5A] font-bold text-sm sm:text-base">₹{product.price}</p>
                        </div>
                    ))}
                </div>
            </section>

            
            <section className="featured p-6 sm:p-12 md:p-20 lg:p-30 flex flex-col gap-6 md:gap-10">
                <div className="flex justify-between items-center">
                    <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl">Featured Products</h1>
                    <Link to="/products" className="text-[#FF3D5A] font-medium hover:underline">View all</Link>
                </div>

                <div className="cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map(product => (
                        <Link to={`/products/${product._id}`} key={product._id} className="flex">
                            <div className="card rounded-md bg-[#f9f9f9] flex flex-col justify-between w-full hover:shadow-md transition-shadow">
                                <img src={product.image} alt={product.name} className="rounded-t-md w-full h-[200px] object-cover" />
                                <div className="desc p-4 flex flex-col flex-grow justify-between">
                                    <div>
                                        <h3 className="font-semibold text-base line-clamp-1">{product.name}</h3>
                                        <p className="text-[#666666] text-sm mb-3">{product.category}</p>
                                    </div>
                                    <div className="flex justify-between items-center mt-auto gap-2">
                                        <p className="font-bold text-lg">₹{product.price}</p>
                                        <button className="bg-[#fff0f2] text-[#FF3D5A] text-sm py-2 px-3 rounded-md hover:bg-[#FF3D5A] hover:font-bold hover:text-white transition-all">
                                            View Product
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="stats grid grid-cols-1 sm:grid-cols-3 gap-5 p-6 sm:p-12 md:p-20 lg:p-30">
                <div className="stat-card bg-[#fff0f2] rounded-xl p-6 md:p-8 text-center">
                    <p className="font-[Syne] text-3xl md:text-4xl font-extrabold text-[#FF3D5A]">10k+</p>
                    <p className="text-[#666666] text-sm md:text-base mt-2">Happy Customers</p>
                </div>
                <div className="stat-card bg-[#fff0f2] rounded-xl p-6 md:p-8 text-center">
                    <p className="font-[Syne] text-3xl md:text-4xl font-extrabold text-[#FF3D5A]">500+</p>
                    <p className="text-[#666666] text-sm md:text-base mt-2">Products Available</p>
                </div>
                <div className="stat-card bg-[#fff0f2] rounded-xl p-6 md:p-8 text-center">
                    <p className="font-[Syne] text-3xl md:text-4xl font-extrabold text-[#FF3D5A]">98%</p>
                    <p className="text-[#666666] text-sm md:text-base mt-2">Satisfaction Rate</p>
                </div>
            </section>
        </>
    )
}