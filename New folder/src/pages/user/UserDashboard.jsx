import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UserNavbar from "../../components/user/UserNavbar";

export default function UserDashboard() {

    const [dark, setDark] = useState(
        JSON.parse(localStorage.getItem("darkMode")) || false
    );

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [toast, setToast] = useState("");
    const [loading, setLoading] = useState(true);

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

    // 🛒 ADD TO CART
    const addToCart = (product) => {
        const exist = cart.find(i => i.id === product.id);

        let updated;

        if (exist) {
            updated = cart.map(i =>
                i.id === product.id ? { ...i, qty: i.qty + 1 } : i
            );
        } else {
            updated = [...cart, { ...product, qty: 1 }];
        }

        setCart(updated);
        localStorage.setItem("cart", JSON.stringify(updated));

        setToast("🛒 Added to cart!");
        setTimeout(() => setToast(""), 1500);
    };

    const totalCartItems = cart.reduce((sum, i) => sum + i.qty, 0);

    // FILTER
    const filtered = products
        .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
        .filter(p => category === "All" ? true : p.category === category);

    const categories = ["All", "Electronics", "Fashion", "Home", "Beauty"];

    return (
        <div className={dark ? "bg-dark text-white min-vh-100" : "bg-light text-dark min-vh-100"}>

            <UserNavbar dark={dark} setDark={setDark} />

            <div className="container py-4">

                {/* TOAST */}
                {toast && <div className="toast-box">{toast}</div>}

                {/* HERO */}
                <div className="hero">
                    <div>
                        <h2>🛍 Mega Deals Store</h2>
                        <p>Find best products at best prices 💸</p>

                        <Link to="/user-products" className="btn btn-light btn-sm">
                            Shop Now
                        </Link>
                    </div>

                    <div className="hero-right">
                        <div>🛒 Cart: {totalCartItems}</div>
                        <div>📦 Products: {products.length}</div>
                    </div>
                </div>

                {/* CATEGORY BUTTONS */}
                <div className="d-flex gap-2 flex-wrap mb-3">
                    {categories.map(c => (
                        <button
                            key={c}
                            className={`btn btn-sm ${category === c ? "btn-primary" : "btn-outline-primary"}`}
                            onClick={() => setCategory(c)}
                        >
                            {c}
                        </button>
                    ))}
                </div>

                {/* SEARCH */}
                <input
                    className="form-control mb-4"
                    placeholder="🔍 Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {/* TITLE */}
                <h4 className="mb-3">🔥 Trending Products</h4>

                {/* PRODUCTS */}
                {loading ? (
                    <div className="row g-3">
                        {[1,2,3,4,5,6].map(i => (
                            <div className="col-md-4" key={i}>
                                <div className="skeleton"></div>
                            </div>
                        ))}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center text-muted">
                        No products found 😢
                    </div>
                ) : (
                    <div className="row g-4">

                        {filtered.slice(0, 9).map((p) => (
                            <div className="col-md-4" key={p.id}>

                                <div className={`card product-card ${dark ? "bg-secondary text-white" : ""}`}>

                                    <img
                                        src={getImageUrl(p.imageUrl)}
                                        className="product-img"
                                        alt={p.name}
                                    />

                                    <div className="p-3">

                                        <h5>{p.name}</h5>

                                        <p className={dark ? "text-light" : "text-muted"}>
                                            {p.description}
                                        </p>

                                        <div className="d-flex justify-content-between align-items-center">
                                            <b className="text-primary">Rs. {p.price}</b>

                                            {p.quantity > 0 ? (
                                                <span className="badge bg-success">In Stock</span>
                                            ) : (
                                                <span className="badge bg-danger">Out</span>
                                            )}
                                        </div>

                                        <button
                                            className="btn btn-primary w-100 mt-2"
                                            onClick={() => addToCart(p)}
                                            disabled={p.quantity === 0}
                                        >
                                            🛒 Add to Cart
                                        </button>

                                    </div>
                                </div>

                            </div>
                        ))}

                    </div>
                )}

            </div>

            {/* STYLE */}
            <style>{`
                .hero{
                    background: linear-gradient(135deg,#0d6efd,#6610f2);
                    color:white;
                    padding:25px;
                    border-radius:18px;
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    margin-bottom:20px;
                }

                .hero-right div{
                    font-weight:bold;
                }

                .product-card{
                    border-radius:15px;
                    transition:0.3s;
                    overflow:hidden;
                }

                .product-card:hover{
                    transform:translateY(-8px);
                }

                .product-img{
                    width:100%;
                    height:180px;
                    object-fit:cover;
                }

                .toast-box{
                    position:fixed;
                    top:20px;
                    right:20px;
                    background:#0d6efd;
                    color:white;
                    padding:10px 18px;
                    border-radius:8px;
                    z-index:9999;
                    animation: fadeIn 0.3s;
                }

                .skeleton{
                    height:260px;
                    border-radius:15px;
                    background:linear-gradient(90deg,#eee,#ddd,#eee);
                    background-size:200% 100%;
                    animation: shimmer 1.2s infinite;
                }

                @keyframes shimmer{
                    0%{background-position:-200% 0}
                    100%{background-position:200% 0}
                }

                @keyframes fadeIn{
                    from{opacity:0; transform:translateY(-10px);}
                    to{opacity:1; transform:translateY(0);}
                }
            `}</style>

        </div>
    );
}