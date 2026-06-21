import { Link } from "react-router-dom";

export default function UserNavbar({ dark, setDark }) {

    const userName =
        localStorage.getItem("userName") || "User";

    return (
        <nav
            className={`navbar navbar-expand-lg px-3 shadow-sm ${
                dark ? "navbar-dark bg-dark" : "navbar-light bg-white"
            }`}
        >
            <Link
                className="navbar-brand fw-bold"
                to="/user-dashboard"
            >
                🛒 User Panel
            </Link>

            <div className="ms-auto d-flex align-items-center gap-3">

                <Link
                    className={`nav-link ${
                        dark ? "text-white" : "text-dark"
                    }`}
                    to="/user-dashboard"
                >
                    Home
                </Link>

                <Link
                    className={`nav-link ${
                        dark ? "text-white" : "text-dark"
                    }`}
                    to="/user-products"
                >
                    Products
                </Link>

                <Link
                    className={`nav-link ${
                        dark ? "text-white" : "text-dark"
                    }`}
                    to="/user-cart"
                >
                    Cart
                </Link>

                <Link
                    className={`nav-link ${
                        dark ? "text-white" : "text-dark"
                    }`}
                    to="/user-orders"
                >
                    Orders
                </Link>

                {/* PROFILE */}
                <div
                    className={`d-flex align-items-center px-2 py-1 rounded ${
                        dark
                            ? "bg-secondary text-white"
                            : "bg-light text-dark"
                    }`}
                >
                    <span className="fs-5 me-2">
                        👤
                    </span>

                    <div
                        className="d-flex flex-column"
                        style={{ lineHeight: "1" }}
                    >
                        <small className="fw-bold">
                            {userName}
                        </small>

                        <small
                            className={
                                dark
                                    ? "text-light"
                                    : "text-muted"
                            }
                        >
                            Customer
                        </small>
                    </div>
                </div>

                {/* DARK MODE */}
                <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => setDark(!dark)}
                >
                    {dark ? "☀ Light" : "🌙 Dark"}
                </button>

                {/* LOGOUT */}
                <button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                        localStorage.clear();
                        window.location.href = "/login";
                    }}
                >
                    Logout
                </button>

            </div>
        </nav>
    );
}