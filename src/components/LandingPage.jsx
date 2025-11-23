import Navbar from "./Navbar"
import { Outlet } from "react-router-dom";

function LandingPage() {
    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="grid grid-cols-12 pt-1 grid-rows-[auto_1fr]">
                <div className="col-span-12 mb-12">
                    <Navbar />
                </div>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default LandingPage