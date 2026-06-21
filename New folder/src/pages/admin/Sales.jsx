import { useEffect, useState } from "react";
import axios from "axios";
import SalesChart from "../../components/admin/SalesChart";

export default function Sales() {

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState("");
    const [dark, setDark] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.body.classList.toggle("dark-mode", dark);
    }, [dark]);

    const loadProducts = async () => {
        setLoading(true);
        const res = await axios.get("http://localhost:8080/api/products");
        setProducts(res.data || []);
        setLoading(false);
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const addToCart = (product) => {
        setCart(prev => {
            const found = prev.find(i => i.productId === product.id);

            if (found) {
                return prev.map(i =>
                    i.productId === product.id
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
            }

            return [
                ...prev,
                {
                    productId: product.id,
                    productName: product.name,
                    price: product.price,
                    quantity: 1
                }
            ];
        });
    };

    const updateQty = (id, qty) => {
        setCart(prev =>
            prev.map(i =>
                i.productId === id
                    ? { ...i, quantity: Math.max(1, Number(qty)) }
                    : i
            )
        );
    };

    const removeItem = (id) => {
        setCart(prev => prev.filter(i => i.productId !== id));
    };

    const total = cart.reduce((a, b) => a + b.price * b.quantity, 0);

    const checkout = async () => {
        await axios.post("http://localhost:8080/api/sales", cart);
        alert("✅ Sale Completed!");
        setCart([]);
        loadProducts();
    };

    const filtered = products.filter(p =>
        p.name?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="sales-page">

            {/* HEADER */}
            <div className="topbar shadow-sm">

                <h4>🛒 Smart POS System</h4>

                <div className="actions">

                    <div className="search-box">
                        🔍
                        <input
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <button
                        className="btn btn-dark btn-sm"
                        onClick={() => setDark(!dark)}
                    >
                        {dark ? "☀ Light" : "🌙 Dark"}
                    </button>

                </div>

            </div>

            <div className="container-fluid px-4 py-3">

                {/* CHART */}
                <div className="card shadow-sm mb-3">
                    <div className="card-body">
                        <SalesChart data={[
                            { name: "Mon", sales: 40 },
                            { name: "Tue", sales: 30 },
                            { name: "Wed", sales: 60 },
                            { name: "Thu", sales: 80 },
                            { name: "Fri", sales: 50 }
                        ]} />
                    </div>
                </div>

                <div className="row g-3">

                    {/* PRODUCTS */}
                    <div className="col-lg-7">

                        <div className="card shadow-sm product-card">

                            <div className="card-header bg-primary text-white">
                                Products ({filtered.length})
                            </div>

                            <div className="card-body p-0">

                                {loading ? (
                                    <div className="p-4 text-center">
                                        <div className="spinner-border text-primary"></div>
                                    </div>
                                ) : (

                                    filtered.map(p => (
                                        <div key={p.id} className="product-item">

                                            <div>
                                                <h6>{p.name}</h6>
                                                <small>Rs. {p.price}</small>
                                            </div>

                                            <button
                                                className="btn btn-sm btn-primary"
                                                onClick={() => addToCart(p)}
                                            >
                                                + Add
                                            </button>

                                        </div>
                                    ))

                                )}

                            </div>

                        </div>

                    </div>

                    {/* CART */}
                    <div className="col-lg-5">

                        <div className="card shadow-sm cart-box">

                            <div className="card-header bg-success text-white">
                                Cart Summary
                            </div>

                            <div className="card-body">

                                {cart.length === 0 ? (
                                    <p className="text-muted">Cart is empty</p>
                                ) : (
                                    cart.map(i => (
                                        <div key={i.productId} className="cart-item">

                                            <div>
                                                <b>{i.productName}</b>
                                                <small>Rs. {i.price * i.quantity}</small>
                                            </div>

                                            <input
                                                type="number"
                                                value={i.quantity}
                                                onChange={(e) => updateQty(i.productId, e.target.value)}
                                            />

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => removeItem(i.productId)}
                                            >
                                                X
                                            </button>

                                        </div>
                                    ))
                                )}

                                <div className="total-box">
                                    Total: <span>Rs. {total}</span>
                                </div>

                                <button
                                    className="btn btn-success w-100 mt-2"
                                    disabled={cart.length === 0}
                                    onClick={checkout}
                                >
                                    Checkout
                                </button>

                            </div>

                        </div>

                    </div>

                </div>
            </div>

            {/* STYLE */}
            <style>{`
                body.dark-mode {
                    background: #0b1220;
                    color: #e5e7eb;
                }

                body.dark-mode .card {
                    background: #1e293b;
                    color: white;
                }

                /* TOPBAR */
                .topbar {
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    padding:12px 20px;
                    background:white;
                    position:sticky;
                    top:0;
                    z-index:10;
                }

                body.dark-mode .topbar {
                    background:#1e293b;
                }

                .actions {
                    display:flex;
                    gap:10px;
                    align-items:center;
                }

                .search-box {
                    display:flex;
                    align-items:center;
                    gap:6px;
                    background:#f1f5f9;
                    padding:6px 10px;
                    border-radius:8px;
                }

                .search-box input {
                    border:none;
                    outline:none;
                    background:transparent;
                    width:180px;
                }

                /* PRODUCT */
                .product-item {
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    padding:12px;
                    border-bottom:1px solid #eee;
                    transition:0.2s;
                }

                .product-item:hover {
                    background:#f8fafc;
                    transform:scale(1.01);
                }

                body.dark-mode .product-item {
                    border-bottom:1px solid #334155;
                }

                body.dark-mode .product-item:hover {
                    background:#0f172a;
                }

                /* CART */
                .cart-item {
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    padding:8px 0;
                    border-bottom:1px solid #eee;
                }

                .cart-item input {
                    width:60px;
                    text-align:center;
                }

                .total-box {
                    margin-top:10px;
                    font-size:18px;
                    font-weight:bold;
                    text-align:right;
                }

                .total-box span {
                    color:#16a34a;
                }
            `}</style>

        </div>
    );
}