import { useState } from "react"
import Footer from "./Footer"
import Main from "./Main"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"

function LandingPage() {
    const [isHidden, setIsHidden] = useState(false);
    return (
        <div className="grid grid-cols-12 h-screen grid-rows-[1fr_13fr_1fr]">
            <div className="col-span-12 bg-blue-700 text-white ">
                <Navbar onHideSidebar={() => {setIsHidden(!isHidden)}}/>
            </div>
            <div className="grid grid-cols-12 gap-9 m-5">
                <div className={`col-span-4 ${isHidden ? "hidden" : "block"}`}>
                    <Sidebar />
                </div>
                <div className="col-span-8">
                    <Main />
                </div>
            </div>
            <div className="col-span-12 bg-blue-700 text-white">
                <Footer />
            </div>
        </div>
    )
}

export default LandingPage