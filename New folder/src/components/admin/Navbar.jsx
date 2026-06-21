import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ toggleSidebar }) {

    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("theme");

        if (saved === "dark") {
            document.body.classList.add("dark");
            setDarkMode(true);
        } else {
            document.body.classList.remove("dark");
            setDarkMode(false);
        }
    }, []);

    const toggleDarkMode = () => {
        const isDark = document.body.classList.toggle("dark");

        localStorage.setItem("theme", isDark ? "dark" : "light");
        setDarkMode(isDark);
    };

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <nav className="navbar shadow px-3">

            {/* LEFT SIDE */}
            <div className="d-flex align-items-center gap-2">

                {/* ☰ MOBILE MENU BUTTON */}
                <button
                    className="btn btn-dark d-md-none"
                    onClick={toggleSidebar}
                >
                    ☰
                </button>

                <span className="navbar-brand fw-bold text-primary">
                    Admin Panel
                </span>
            </div>

            {/* RIGHT SIDE */}
            <div className="d-flex align-items-center gap-3">

                <input
                    className="form-control d-none d-md-block"
                    placeholder="Search..."
                    style={{ width: "200px" }}
                />

                {/* DARK MODE */}
                <button
                    className="btn btn-outline-dark"
                    onClick={toggleDarkMode}
                >
                    {darkMode ? "☀️ Light" : "🌙 Dark"}
                </button>

                {/* PROFILE */}
                <button className="btn btn-outline-primary">
                    👤
                </button>

                {/* LOGOUT */}
                <button className="btn btn-danger" onClick={logout}>
                    Logout
                </button>

            </div>

        </nav>
    );
}