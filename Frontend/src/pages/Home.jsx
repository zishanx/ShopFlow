export default function Home() {

    const products = [
        { id: 1, name: 'Air Runners Pro', category: 'Footwear', price: 129, img: 'https://picsum.photos/id/2/300/300' },
        { id: 2, name: 'Pro Headset X', category: 'Electronics', price: 249, img: 'https://picsum.photos/id/20/300/300' },
        { id: 3, name: 'Smart Watch S3', category: 'Wearables', price: 199, img: 'https://picsum.photos/id/21/300/300' },
        { id: 4, name: 'Urban Backpack', category: 'Accessories', price: 89, img: 'https://picsum.photos/id/22/300/300' },
    ]


    return (
        <>
            <section className="hero bg-[#ffffff] p-30 grid grid-cols-2  ">
                <div className="disc flex
                flex-col gap-7">
                    <p className="p-2 bg-[#fff0f2] text-[#FF3D5A] rounded-xl w-fit">New arrivals every week</p>
                    <h1 className="font-extrabold font-[Syne] text-6xl ">Shop <br />Smarter, <br />Live <br /><span className="text-[#FF3D5A]">Better.</span></h1>
                    <p className="text-[#666666] w-2/3">Discover curated products across every category. From everyday essentials to premium finds -- all in one place</p>
                    <div className="buttons flex gap-3">
                        <button className="bg-[#FF3D5A] text-white p-3 rounded-xl hover:bg-[#e0002a]">Shop now</button>
                        <button className="bg-[#fff0f2] border border-[#e0e0e0]  text-[#0a0a0a] p-3 rounded-xl">Browse Categories</button>
                    </div>
                </div>
                <div className="hero-img flex gap-5 items-center justify-center">
                    <div className="card p-4 bg-[#f9f9f9] rounded-md">

                        <img src="https://picsum.photos/id/26/300/300" alt="" />
                        <p>Air Runners</p>
                        <p className="text-[#FF3D5A] font-bold">$129</p>
                    </div>
                    <div className="card p-4 bg-[#f9f9f9] relative top-10 rounded-md">

                        <img src="https://picsum.photos/id/27/300/300" alt="" />
                        <p>Pro Headset</p>
                        <p className="text-[#FF3D5A] font-bold  rounded-md">$249</p>
                    </div>

                </div>
            </section>

            <section className="featured p-30 flex flex-col gap-10">

                <div className="flex justify-between">
                    <h1 className="font-bold text-4xl">Featured Products</h1>
                    <p className="text-[#FF3D5A]"><a href="">View all</a></p>
                </div>

                <div className="cards flex flex-cols gap-5">
                    {products.map(product => (
                        <Link to="/products" key={product.id}>
                            <div className="card rounded-md bg-[#f9f9f9]" >
                                <img src={product.img} alt={product.name} className="rounded-md" />
                                <div className="desc p-4">
                                    <h3>{product.name}</h3>
                                    <p className="text-[#666666]">{product.category}</p>
                                    <div className="flex gap-5 items-center">
                                        <p className="font-bold">${product.price}</p>
                                        <button className="bg-[#fff0f2] p-3 rounded-md hover:bg-[#FF3D5A] hover:font-bold hover:text-white">Add to Cart</button>
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