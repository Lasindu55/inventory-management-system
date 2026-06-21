import { useState } from "react";
import { loginUser } from "../../services/authService";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
const navigate = useNavigate();


const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);

const handleLogin = async () => {
    if (!email || !password) {
        alert("Please enter email and password");
        return;
    }

    try {
        setLoading(true);

        const res = await loginUser({
            email,
            password,
        });

        alert(res.data.message);

        const role = res.data.role?.trim().toUpperCase();

        // SAVE USER DETAILS
        localStorage.setItem(
            "userName",
            res.data.name || "User"
        );

        localStorage.setItem(
            "userEmail",
            res.data.email || email
        );

        localStorage.setItem(
            "userRole",
            role
        );

        if (role === "ADMIN") {
            navigate("/admin-dashboard");
        } else {
            navigate("/user-dashboard");
        }
    } catch (err) {
        alert(
            err.response?.data?.message ||
            "Login Failed"
        );
    } finally {
        setLoading(false);
    }
};

return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">

        <div
            className="row shadow-lg rounded overflow-hidden"
            style={{ width: "850px" }}
        >

            {/* LEFT SIDE */}
            <div className="col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center bg-primary text-white p-4">

                <h2 className="fw-bold">
                    Inventory System
                </h2>

                <p className="text-center">
                    Manage Products, Stock &
                    Sales in one place
                </p>

            </div>

            {/* RIGHT SIDE */}
            <div className="col-md-6 bg-white p-5">

                <h3 className="text-center mb-4">
                    Login
                </h3>

                <div className="mb-3">
                    <label className="form-label">
                        Email
                    </label>

                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        onKeyDown={(e) =>
                            e.key === "Enter" &&
                            handleLogin()
                        }
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label">
                        Password
                    </label>

                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }
                        onKeyDown={(e) =>
                            e.key === "Enter" &&
                            handleLogin()
                        }
                    />
                </div>

                <button
                    className="btn btn-primary w-100 py-2 fw-bold"
                    onClick={handleLogin}
                    disabled={loading}
                >
                    {loading
                        ? "Logging in..."
                        : "Login"}
                </button>

                <div className="text-center mt-3">
                    <small>
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="text-primary text-decoration-none"
                        >
                            Register
                        </Link>
                    </small>
                </div>

            </div>

        </div>
    </div>
);


}
