export default function Home(){
    return (
        <>
            <div className="hero p-30 grid grid-cols-2">
                <div className="disc">
                <p>New arrivals every week</p>
                <h1>Shop <br />Smarter, <br />Live <br />Better.</h1>
                <p>Discover curated products across every category. From everyday essentials to premium finds -- all in one place</p>
                </div>
                <div className="hero-img flex gap-5 items-center justify-center">
                    <img src="https://picsum.photos/id/26/300/300" alt="" />
                    <img src="https://picsum.photos/id/27/300/300" alt="" />

                </div>
            </div>
        </>
    )
}