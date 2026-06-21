import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../../components/user/UserNavbar";

export default function UserProducts() {

    const [dark, setDark] = useState(
        JSON.parse(localStorage.getItem("darkMode")) || false
    );

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        loadProducts();

        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);
    }, []);

    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(dark));
    }, [dark]);

    const loadProducts = async () => {
        setLoading(true);

        try {
            const res = await axios.get("http://localhost:8080/api/products");
            setProducts(res.data);
        } catch (err) {
            console.log(err);
        }

        setTimeout(() => setLoading(false), 500);
    };

    const getImageUrl = (imageUrl) =>
        imageUrl
            ? `http://localhost:8080/${imageUrl.replace(/\\/g, "/").replace(/^\/+/, "")}`
            : null;

    const addToCart = (p) => {

        const exist = cart.find(i => i.id === p.id);

        let updated;

        if (exist) {
            updated = cart.map(i =>
                i.id === p.id ? { ...i, qty: i.qty + 1 } : i
            );
        } else {
            updated = [...cart, { ...p, qty: 1 }];
        }

        setCart(updated);
        localStorage.setItem("cart", JSON.stringify(updated));

        setToast("🛒 Added to cart!");
        setTimeout(() => setToast(""), 1500);

        navigate("/user-cart");
    };

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className={dark ? "bg-dark text-white min-vh-100" : "bg-light text-dark min-vh-100"}>

            <UserNavbar dark={dark} setDark={setDark} />

            <div className="container py-4">

                {/* TOAST */}
                {toast && <div className="toast-box">{toast}</div>}

                {/* HEADER */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="fw-bold">🛍 Products</h2>

                    <span className="badge bg-primary p-2">
                        🛒 Cart: {cart.reduce((sum, i) => sum + i.qty, 0)}
                    </span>
                </div>

                {/* SEARCH */}
                <div className="card p-3 mb-4 shadow-sm border-0 rounded-4">
                    <input
                        className="form-control"
                        placeholder="🔍 Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* PRODUCTS */}
                <div className="row g-4">

                    {loading ? (
                        [...Array(6)].map((_, i) => (
                            <div className="col-md-4" key={i}>
                                <div className="skeleton-card"></div>
                            </div>
                        ))
                    ) : filtered.length === 0 ? (
                        <div className="text-center text-muted">
                            No products found 😢
                        </div>
                    ) : (

                        filtered.map((p) => (

                            <div className="col-md-4" key={p.id}>

                                <div className={`card product-card h-100 shadow-lg border-0 ${dark ? "bg-secondary text-white" : ""}`}>

                                    {p.imageUrl && (
                                        <img
                                            src={getImageUrl(p.imageUrl)}
                                            className="card-img-top"
                                            style={{ height: 200, objectFit: "cover" }}
                                        />
                                    )}

                                    <div className="card-body">

                                        <h5>📦 {p.name}</h5>

                                        <p className={dark ? "text-light" : "text-muted"}>
                                            {p.description}
                                        </p>

                                        <h4 className="text-primary fw-bold">
                                            Rs. {p.price}
                                        </h4>

                                        {p.quantity > 0 ? (
                                            <span className="badge bg-success mb-2">
                                                In Stock ({p.quantity})
                                            </span>
                                        ) : (
                                            <span className="badge bg-danger mb-2">
                                                Out of Stock
                                            </span>
                                        )}

                                        <button
                                            className="btn btn-primary w-100 fw-bold"
                                            onClick={() => addToCart(p)}
                                            disabled={p.quantity === 0}
                                        >
                                            🛒 Add to Cart
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))

                    )}

                </div>

            </div>

            {/* STYLE */}
            <style>{`
                .product-card {
                    transition: 0.3s;
                    border-radius: 15px;
                }

                .product-card:hover {
                    transform: translateY(-6px);
                }

                .toast-box {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #0d6efd;
                    color: white;
                    padding: 10px 18px;
                    border-radius: 8px;
                    z-index: 9999;
                }

                .skeleton-card {
                    height: 320px;
                    border-radius: 15px;
                    background: linear-gradient(90deg,#eee,#ddd,#eee);
                    background-size: 200% 100%;
                    animation: shimmer 1.2s infinite;
                }

                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
            `}</style>

        </div>
    );
}