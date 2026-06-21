import { useEffect, useState } from "react";
import axios from "axios";

import StockChart from "../../components/admin/StockChart";

export default function Stock() {

    const [products, setProducts] = useState([]);
    const [dark, setDark] = useState(false);
    const [loading, setLoading] = useState(true);

    const [qtyMap, setQtyMap] = useState({}); // input control instead of prompt

    // BODY DARK MODE
    useEffect(() => {
        document.body.classList.toggle("dark-mode", dark);
    }, [dark]);

    const loadProducts = async () => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:8080/api/products");
            setProducts(res.data || []);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    // ADD STOCK
    const addStock = async (id) => {
        const qty = qtyMap[id];
        if (!qty) return;

        await axios.put(`http://localhost:8080/api/stock/add/${id}/${qty}`);
        loadProducts();
    };

    // REDUCE STOCK
    const reduceStock = async (id) => {
        const qty = qtyMap[id];
        if (!qty) return;

        await axios.put(`http://localhost:8080/api/stock/reduce/${id}/${qty}`);
        loadProducts();
    };

    const lowStock = products.filter(p => p.quantity <= 10);

    const chartData = products.map(p => ({
        name: p.name,
        stock: p.quantity
    }));

    return (
        <div className="page">

           

            <div className="container py-4">

                {/* HEADER */}
                <div className="header">
                    <h3>📦 Stock Management</h3>

                    <button className="btn btn-dark" onClick={() => setDark(!dark)}>
                        {dark ? "☀ Light" : "🌙 Dark"}
                    </button>
                </div>

                <div className="row g-3">

                    {/* TABLE */}
                    <div className="col-lg-8">

                        <div className="card table-card">

                            <div className="card-header">
                                Product Stock
                            </div>

                            {loading ? (
                                <div className="p-3">Loading...</div>
                            ) : (

                                <table>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Stock</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {products.map(p => (
                                            <tr key={p.id}>

                                                <td>{p.id}</td>
                                                <td>{p.name}</td>
                                                <td>Rs. {p.price}</td>

                                                <td>
                                                    <span className={`badge ${p.quantity <= 10 ? "danger" : "success"}`}>
                                                        {p.quantity}
                                                    </span>
                                                </td>

                                                <td>

                                                    <div className="actionBox">

                                                        <input
                                                            type="number"
                                                            placeholder="Qty"
                                                            value={qtyMap[p.id] || ""}
                                                            onChange={(e) =>
                                                                setQtyMap({ ...qtyMap, [p.id]: e.target.value })
                                                            }
                                                        />

                                                        <button onClick={() => addStock(p.id)}>
                                                            + Add
                                                        </button>

                                                        <button className="reduce" onClick={() => reduceStock(p.id)}>
                                                            - Reduce
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                            )}

                        </div>
                    </div>

                    {/* LOW STOCK */}
                    <div className="col-lg-4">

                        <div className="card alert-card">

                            <div className="card-header danger">
                                ⚠ Low Stock
                            </div>

                            <div className="card-body">

                                {lowStock.length === 0 ? (
                                    <p className="ok">All good 👍</p>
                                ) : (
                                    lowStock.map(p => (
                                        <div key={p.id} className="item">
                                            <b>{p.name}</b>
                                            <small>Stock: {p.quantity}</small>
                                        </div>
                                    ))
                                )}

                            </div>

                        </div>

                    </div>

                    {/* CHART */}
                    <div className="col-12">

                        <div className="card chart-card">
                            <StockChart data={chartData} />
                        </div>

                    </div>

                </div>
            </div>

            {/* STYLE */}
            <style>{`

                body {
                    margin: 0;
                    font-family: Arial;
                    background: #f4f6fb;
                    transition: 0.3s;
                }

                body.dark-mode {
                    background: #0b1220;
                    color: #e5e7eb;
                }

                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 15px;
                }

                /* CARDS */
                .card {
                    background: white;
                    border-radius: 12px;
                    overflow: hidden;
                }

                body.dark-mode .card {
                    background: #1e293b;
                }

                .card-header {
                    padding: 12px;
                    font-weight: bold;
                    background: #f1f5f9;
                }

                body.dark-mode .card-header {
                    background: #0f172a;
                }

                .danger {
                    background: #dc2626 !important;
                    color: white;
                }

                /* TABLE */
                table {
                    width: 100%;
                    border-collapse: collapse;
                }

                th, td {
                    padding: 10px;
                    border-bottom: 1px solid #ddd;
                }

                body.dark-mode th,
                body.dark-mode td {
                    border-bottom: 1px solid #334155;
                }

                /* BADGE */
                .badge {
                    padding: 5px 10px;
                    border-radius: 8px;
                    font-size: 12px;
                }

                .success {
                    background: #16a34a;
                    color: white;
                }

                .danger {
                    background: #dc2626;
                    color: white;
                }

                /* ACTION BOX */
                .actionBox {
                    display: flex;
                    gap: 6px;
                    align-items: center;
                }

                .actionBox input {
                    width: 60px;
                    padding: 4px;
                    border-radius: 6px;
                    border: 1px solid #ccc;
                }

                .actionBox button {
                    padding: 5px 10px;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    background: #2563eb;
                    color: white;
                }

                .actionBox .reduce {
                    background: #f59e0b;
                }

                /* ALERT */
                .item {
                    display: flex;
                    justify-content: space-between;
                    padding: 6px 0;
                    border-bottom: 1px solid #eee;
                }

                .ok {
                    color: #16a34a;
                    font-weight: bold;
                }

                .chart-card {
                    padding: 15px;
                    margin-top: 10px;
                }

            `}</style>

        </div>
    );
}