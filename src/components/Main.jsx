function Main() {

    return (
        <div className="grid grid-cols-12 h-full">
            <div className="h-full col-span-7 text-center flex flex-col items-baseline justify-center ps-5">
                <h1 className="text-blue-600 text-5xl font-serif">We Got You</h1>
                <h2 className="text-2xl pt-3">We Strive To Accomplish The Impossible For Our Patients</h2>
            </div>

            <div className="h-full col-span-5 flex items-center justify-center">
                <img className="max-w-xs max-h-xs" src="/assets/doctor-placeholder.jpg" alt="doctor placeholder"/>
            </div>
        </div>
    )
}

export default Main