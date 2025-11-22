import { Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage';
import Main from './components/Main';
import About from './components/About';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Login from './components/Login';
import Register from './components/Register';
import Auth from './components/Auth';

function App() {
  return (
    <Routes>

      <Route path="/" element={<LandingPage />}>
        <Route index element={<Main />} />
        <Route path="about" element={<About />} />
        <Route path="features" element={<Features />} />
        <Route path="reviews" element={<Testimonials />} />
      </Route>
      <Route path="/login" element={<Auth />}>
        <Route index element={<Login />} />
      </Route>
      <Route path="/register" element={<Auth />}>
        <Route index element={<Register />} />
      </Route>
    </Routes>
  )
}

export default App;
