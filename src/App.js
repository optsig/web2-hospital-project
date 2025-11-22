import { Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage';
import Main from './components/Main';
import About from './components/About';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<LandingPage />}>
        <Route index element={<Main />} />
        <Route path="about" element={<About />} />
        <Route path="features" element={<Features />} />
        <Route path="reviews" element={<Testimonials />} />
      </Route>
    </Routes>
  )
}

export default App;
