import { Routes, Route, useNavigate } from 'react-router-dom';
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

function App() {

  const users = [
    {
      id: 1,
      type: "admin",
      username: "admin",
      password: "123"
    },
    {
      id: 2,
      type: "doctor",
      username: "doctor",
      password: "123",
      availability: []
    },
    {
      id: 3,
      type: "patient",
      username: "patient",
      password: "123",
      appointments: []
    }
  ];

  const nav = useNavigate()
  function handleRegister() {
    nav('/login')
  }

  return (

    <Routes>

      <Route path="/" element={<LandingPage />}>
        <Route index element={<Main />} />
        <Route path="about" element={<About />} />
        <Route path="features" element={<Features />} />
        <Route path="reviews" element={<Testimonials />} />
      </Route>
      <Route path="/login" element={<Auth />}>
        <Route index element={<Login data={users}/>} />
      </Route>
      <Route path="/register" element={<Auth />}>
        <Route index element={<Register handleRegister={handleRegister} />} />
      </Route>
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/doctor" element={<DoctorPage />} />
      <Route path="/patient" element={<PatientPage />} />
    </Routes>
  )
}

export default App;
