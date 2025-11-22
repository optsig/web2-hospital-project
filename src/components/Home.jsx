import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Main from './Main';
import About from './About';
import Features from './Features';
import Testimonials from './Testimonials';

function Home() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/about" element={<About />} />
                <Route path="/features" element={<Features />} />
                <Route path="/reviews" element={<Testimonials />} />
            </Routes>
        </div>
    )
}

export default Home