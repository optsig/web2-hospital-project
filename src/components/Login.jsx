import { Link } from "react-router-dom"

function Login() {

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h1 className="mb-5 text-2xl font-semibold">Login</h1>

            <form className="space-y-4">
                <div>
                    <input
                        name="username"
                        type="text"
                        placeholder="Username"
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>

                <div>
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 border rounded-lg "
                    />
                </div>

                <div>
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Login</button>
                </div>
            </form>

            <p className="mt-4 text-sm text-gray-600">Don't have an account? <Link to={'/register'} className="text-blue-600">Register here</Link></p>
        </div>
    )
}

export default Login