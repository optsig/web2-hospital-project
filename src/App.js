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
import AdminPage from './components/AdminPage';
import DoctorPage from './components/DoctorPage';
import PatientPage from './components/PatientPage';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify'

function App() {


  return (
    <>
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
        <Route path="/admin" element={<ProtectedRoute requiredRole={1}><AdminPage /></ProtectedRoute>} />
        <Route path="/doctor" element={<ProtectedRoute requiredRole={2}><DoctorPage /></ProtectedRoute>} />
        <Route path="/patient" element={<ProtectedRoute requiredRole={3}><PatientPage /></ProtectedRoute>} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App;
