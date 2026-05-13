export default function Home() {
    return (
        <>
            <div className="hero bg-[#ffffff] p-30 grid grid-cols-2  ">
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
            </div>
        </>
    )
}