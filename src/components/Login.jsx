import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function Login({ data }) {

    const users = data

    var UserO = {
        username: "",
        password: ""
    }

    const [user, setUser] = useState(UserO)

    const [userType, setUserType] = useState("")

    const nav = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        console.log(users)
        users.forEach(element => {
            if(element.username === user.username && element.password === user.password){
                console.log("Success")
                setUserType(user.username)
                if(userType === "patient")
                    nav('/patient')
                else if(userType === "doctor")
                    nav('/doctor')
                else if(userType === "admin")
                    nav('/admin')        
            }
        });
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