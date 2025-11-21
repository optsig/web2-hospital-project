import Footer from "./Footer"
import Main from "./Main"
import Navbar from "./Navbar"

function LandingPage() {
    return (
        <div className="grid grid-cols-12 h-screen grid-rows-12">

            <div className="col-span-12 row-span-1">
                <Navbar />
            </div>

            <div className="col-span-12 row-span-10 mt-4">
                <Main />
            </div>

            {/* <div className="col-span-12 bg-blue-700 text-white row-span-1">
                <Footer />
            </div> */}

        </div>
    )
}

export default LandingPage