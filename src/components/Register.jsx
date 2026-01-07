import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function Register() {

  var UserO = {
    username: "",
    password: ""
  }

  const [user, setUser] = useState(UserO)

  const nav = useNavigate()

  function handleRegister() {
    axios.post("https://web2-hospital-backend.onrender.com/adduser", user).then((response) => {
      console.log("user: ", user);
      console.log("response: ", response);
      if (response.status === 201) {
        toast.success("registration successful");
        nav('/login');
      }
    }).catch((err) => {
      console.log("Error: ", err);
      if (err.status === 400) {
        toast.error("please fill out the fields")
      }
      else if (err.status === 418) {
        toast.error("user with that username already exists")
      }
    })
  }

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="mb-5 text-2xl font-semibold">Register</h1>

      <form className="space-y-4"
        onSubmit={(e) => { e.preventDefault() }}>
        <div>
          <input
            name="username"
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleChange}
          />
        </div>

        <div>
          <button type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            onClick={handleRegister}>
            Sign Up
          </button>
        </div>
      </form>
      <p className="mt-4 text-sm text-gray-600">
        Already have an account?
        <Link to={'/login'}
          className="text-blue-600 ps-1">
          Login here
        </Link>
      </p>
    </div>
  )
}

export default Register;
