function Main() {

    return (
        <div className="grid grid-cols-12 h-full">
            <div className="h-full col-span-12 md:col-span-7 flex flex-col justify-center">
                <h1 className="text-blue-600 text-4xl md:text-5xl font-serif font-extrabold ps-5">We Got You</h1>
                <h3 className="text-lg md:text-2xl pt-3 max-w-lg ps-5">We Strive To Accomplish The Impossible For Our Patients</h3>
            </div>

            <div className="h-full col-span-12 md:col-span-5 flex items-center justify-center px-6">
                <img
                  className="w-full max-w-xs md:max-w-sm lg:max-w-md rounded-3xl shadow-md object-contain"
                  src="/assets/doctor-placeholder.jpg"
                  alt="doctor placeholder"
                />
            </div>
        </div>
    )
}

export default Main