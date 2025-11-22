import About from "./About"
import Footer from "./Footer"
import Main from "./Main"
import Navbar from "./Navbar"
import Features from './Features';

function LandingPage() {
    return (
        <div className="bg-slate-50">
            <div className="grid grid-cols-12 h-screen grid-rows-12 ">

                <div className="col-span-12 row-span-1">
                    <Navbar />
                </div>

                <div className="col-span-12 row-span-1 my-5 ">
                    <Main />
                </div>



                {/* <div className="col-span-12 text-blue-600 row-span-1 flex justify-center pt-4 border-t-2">
                <Footer />
            </div> */}

            </div>

            <div className="grid grid-cols-12">
                <div className="col-span-12 mt-5 pt-5">
                    <About />
                </div>

                <div>
                    <Features />
                </div>
            </div>

        </div>
    )
}

export default LandingPage