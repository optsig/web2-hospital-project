import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
// import { GlobalContext } from "./GlobalContext"
import axios from "axios"

function Login() {

    // useEffect(() => {
    //     axios.get("http://localhost:5000/getusers").then((response) => {
    //         console.log("user data: ", response.data);
    //         setUsers(response.data)
    //     }).catch((error) => {
    //         console.log(error);
    //     })
    // }, [])

    // const { users } = useContext(GlobalContext) 

    var UserO = {
        username: "",
        password: ""
    }

    // const [users, setUsers] = useState([])

    const [user, setUser] = useState(UserO)

    // const [userRole, setUserRole] = useState()

    const nav = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        axios.post("http://localhost:5000/verifyuser", user).then((response) => {
            console.log("user: ", user);
            console.log("response: ", response);
            if (response.status === 404) {
                console.log("username or password incorrect");
            }
            else if (response.status === 200){
                console.log("success");
                console.log("data: ", response.data);
                const userRole = response.data[0].role_id
                if(userRole === 3)
                    nav('/patient')
                else if(userRole === 2)
                    nav('/doctor')
                else if(userRole === 1)
                    nav('/admin')      
            }
        }).catch((err) => {
            console.log("Error: ", err);
        })
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