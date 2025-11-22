import Navbar from "./Navbar"
import Home from "./Home";

function LandingPage() {
    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="grid grid-cols-12 pt-1 grid-rows-[auto_1fr]">

                <div className="col-span-12 mb-12">
                    <Navbar />
                </div>

            </div>

            <div>
                <Home/>
            </div>
            
        </div>
    )
}

export default LandingPage