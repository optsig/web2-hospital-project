function Login() {

    return (
        <div className="container d-flex vh-100">
            <div className="col-md-6 m-auto">
                <h1 className="mb-5">Login</h1>

                <form>
                    <div className="form-group">
                        <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Username" />
                    </div>
                    <div className="form-group my-3">
                        <input type="password" name="password" className="form-control" id="password" placeholder="Password" />
                    </div>
                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login