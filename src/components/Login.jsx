import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { GlobalContext } from "./GlobalContext"
import axios from "axios"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Login() {

    var UserO = {
        username: "",
        password: ""
    }

    const [user, setUser] = useState(UserO)

    const {setUsername, setUserRole, setIsAuthenticated, setUserId} = useContext(GlobalContext)

    // const [userRole, setUserRole] = useState()

    const nav = useNavigate()
    
    const handleLogin = async (e) => {
        e.preventDefault()
        console.log(user)
        try {
            const response = await axios.post("http://localhost:5000/verifyuser", user)

            if (response.status === 200) {
                console.log("success");
                console.log("data: ", response.data);
                
                setUsername(response.data.name)
                
                const userRole = response.data.role_id
                setUserRole(userRole)
                setUserId(response.data.user_id)
                setIsAuthenticated(true)
                if (userRole === 3)
                    nav('/patient')
                else if (userRole === 2)
                    nav('/doctor')
                else if (userRole === 1)
                    nav('/admin')
            }

        }
        catch (error) {
            console.log("ERROR:", error.response);


            if (error.response) {
                const status = error.response.status
                const err = error.response.data.error
                if (status === 400) {
                    console.log("ERROR2:", err);
                    const errors = error.response.data.error
                    for (const i of errors) {
                        toast.error(i)
                    }
                }
                else if(status === 404){
                    console.log("ERROR2:", err);
                    toast.error("incorrect username")
                    
                }                
                else if(status === 401){
                    toast.error("incorrect password")
                }

            }
        }
        
    }

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    return (

        <div className="bg-white shadow-md rounded-lg p-6">
            <h1 className="mb-5 text-2xl font-semibold">Login</h1>

            <form className="space-y-4" onSubmit={handleLogin}>
                <div>
                    <input
                        name="username"
                        value={user.username}
                        type="text"
                        placeholder="Username"
                        className="w-full px-4 py-2 border rounded-lg"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <input
                        name="password"
                        value={user.password}
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 border rounded-lg "
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <button type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                        Login
                    </button>
                </div>
            </form>

            <p className="mt-4 text-sm text-gray-600">
                Don't have an account?
                <Link to={'/register'} className="text-blue-600 ps-1">
                    Register here
                </Link>
            </p>

        </div>
    )
}

export default Login