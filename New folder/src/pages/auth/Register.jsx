import { useState } from "react";
import { registerUser } from "../../services/authService";

export default function Register() {

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        role: "USER"
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleRegister = async () => {
        try {
            await registerUser(user);
            alert("Register Success");
            window.location.href = "/login";
        } catch (err) {
            alert("Register Failed");
        }
    };

    return (
        <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">

            <div className="row shadow-lg rounded overflow-hidden" style={{ width: "850px" }}>

                {/* LEFT SIDE - SAME BLUE AS LOGIN */}
                <div className="col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center bg-primary text-white p-4">
                    <h2>Inventory System</h2>
                    <p className="text-center">
                        Create account and start managing stock 
                    </p>
                </div>

                {/* RIGHT SIDE */}
                <div className="col-md-6 bg-white p-5">

                    <h3 className="text-center mb-4">Register</h3>

                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                            name="name"
                            className="form-control"
                            placeholder="Enter name"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            name="email"
                            className="form-control"
                            placeholder="Enter email"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            name="password"
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Role</label>
                        <select
                            name="role"
                            className="form-select"
                            onChange={handleChange}
                        >
                            <option value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>
                    </div>

                    <button
                        className="btn btn-primary w-100 py-2 fw-bold"
                        onClick={handleRegister}
                    >
                        Register
                    </button>

                    <div className="text-center mt-3">
                        <small>
                            Already have account?{" "}
                            <a href="/login" className="text-primary">
                                Login
                            </a>
                        </small>
                    </div>

                </div>

            </div>

        </div>
    );
}