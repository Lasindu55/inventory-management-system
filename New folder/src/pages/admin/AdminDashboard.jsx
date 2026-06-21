import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
    BarChart, Bar, PieChart, Pie, Cell
} from "recharts";

import Sidebar from "../../components/admin/Sidebar";
import Navbar from "../../components/admin/Navbar";
import DashboardCard from "../../components/admin/DashboardCard";

export default function AdminDashboard() {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [dark, setDark] = useState(false);

    const [products, setProducts] = useState([]);
    const [sales, setSales] = useState([]);

    const [search, setSearch] = useState("");

    const API = "http://localhost:8080/api";
    const isLoadingRef = useRef(false);

    // BODY DARK MODE
    useEffect(() => {
        document.body.classList.toggle("dark-mode", dark);
    }, [dark]);

    const loadData = async () => {
        if (isLoadingRef.current) return;
        isLoadingRef.current = true;

        try {
            const [pRes, sRes] = await Promise.all([
                axios.get(`${API}/products`),
                axios.get(`${API}/sales`)
            ]);

            setProducts(pRes.data || []);
            setSales(sRes.data || []);

        } catch (err) {
            console.log(err);
        } finally {
            isLoadingRef.current = false;
        }
    };

    useEffect(() => {
        loadData();
        const interval = setInterval(loadData, 10000);
        return () => clearInterval(interval);
    }, []);

    // FILTER PRODUCTS
    const filteredProducts = products.filter(p =>
        p.name?.toLowerCase().includes(search.toLowerCase())
    );

    // STATS
    const stock = products.reduce((a, b) => a + (b.quantity || 0), 0);
    const revenue = sales.reduce((a, b) => a + (b.total || 0), 0);
    const lowStock = products.filter(p => (p.quantity || 0) <= 10).length;
    const profit = revenue * 0.3;

    // CHART DATA
    const chartData = sales.map((s, i) => ({
        name: `S${i + 1}`,
        value: s.total || 0
    }));

    const pieData = [
        { name: "Stock", value: stock },
        { name: "Sold", value: sales.length }
    ];

    const COLORS = ["#3b82f6", "#10b981"];

    return (
        <div className="app">

            {/* SIDEBAR */}
            <div className={`sidebar ${sidebarOpen ? "open" : ""} ${dark ? "sidebarDark" : ""}`}>
                <Sidebar dark={dark} />
            </div>

            {/* MAIN */}
            <div className="main">

                <Navbar
                    toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                    dark={dark}
                    setDark={setDark}
                />

                <div className="content">

                    {/* HEADER */}
                    <div className="header">
                        <h2>🔥 Admin Dashboard </h2>
                        <p>Smart Inventory & Sales Analytics</p>
                    </div>

                    {/* SEARCH */}
                    <input
                        className="search"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    {/* CARDS */}
                    <div className="grid">

                        <DashboardCard title="Products" value={products.length} color="primary" />
                        <DashboardCard title="Stock" value={stock} color="success" />
                        <DashboardCard title="Revenue" value={`Rs. ${revenue}`} color="danger" />
                        <DashboardCard title="Profit" value={`Rs. ${profit}`} color="warning" />

                    </div>

                    {/* ALERT */}
                    {lowStock > 0 && (
                        <div className="alert">
                            ⚠ {lowStock} products are low in stock!
                        </div>
                    )}

                    {/* CHARTS */}
                    <div className="charts">

                        {/* LINE CHART */}
                        <div className="chartBox">
                            <h4>Sales Trend</h4>
                            <ResponsiveContainer width="100%" height={250}>
                                <LineChart data={chartData}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="value" stroke="#3b82f6" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        {/* PIE CHART */}
                        <div className="chartBox">
                            <h4>Stock Overview</h4>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie data={pieData} dataKey="value" outerRadius={80}>
                                        {pieData.map((entry, index) => (
                                            <Cell key={index} fill={COLORS[index]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                    </div>

                    {/* PRODUCTS */}
                    <div className="panel">
                        <h3>Products</h3>

                        {filteredProducts.map(p => (
                            <div className="row" key={p.id}>
                                <span>{p.name}</span>
                                <b>Rs. {p.price}</b>
                            </div>
                        ))}
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
                    color: white;
                }

                .app {
                    display: flex;
                    min-height: 100vh;
                }

                .sidebar {
                    width: 250px;
                    height: 100vh;
                    position: fixed;
                    left: 0;
                    top: 0;
                    background: white;
                }

                .sidebarDark {
                    background: #0f172a;
                }

                .main {
                    margin-left: 250px;
                    width: 100%;
                }

                .content {
                    padding: 25px;
                }

                .header {
                    font-style:bold;
                    color:blue;
                    background: white;
                    padding: 20px;
                    border-radius: 12px;
                    margin-bottom: 15px;
                }

                body.dark-mode .header {
                
                    background: #1e293b;
                    
                }

                .search {
                    width: 100%;
                    padding: 10px;
                    margin-bottom: 15px;
                    border-radius: 8px;
                    border: 1px solid #ccc;
                }

                .grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 15px;
                }

                .charts {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 15px;
                    margin-top: 20px;
                }

                .chartBox {
                    background: white;
                    padding: 15px;
                    border-radius: 12px;
                }

                body.dark-mode .chartBox {
                    background: #1e293b;
                }

                .panel {
                    background: white;
                    padding: 20px;
                    border-radius: 12px;
                    margin-top: 20px;
                }

                body.dark-mode .panel {
                    background: #1e293b;
                }

                .row {
                    display: flex;
                    justify-content: space-between;
                    padding: 8px 0;
                    border-bottom: 1px solid #eee;
                }

                body.dark-mode .row {
                    border-bottom: 1px solid #334155;
                }

                .alert {
                    background: #facc15;
                    padding: 10px;
                    border-radius: 8px;
                    margin-top: 10px;
                }

                @media(max-width:768px) {
                    .main { margin-left: 0; }
                    .grid { grid-template-columns: 1fr 1fr; }
                    .charts { grid-template-columns: 1fr; }
                }

            `}</style>

        </div>
    );
}