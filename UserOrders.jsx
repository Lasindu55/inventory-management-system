import { useEffect, useState } from "react";
import axios from "axios";

export default function Products() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");   // ✅ CATEGORY ADDED
    const [image, setImage] = useState(null);

    const [editId, setEditId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [dark, setDark] = useState(false);

    // 🌙 DARK MODE
    useEffect(() => {
        document.body.classList.toggle("dark-mode", dark);
    }, [dark]);

    // LOAD
    const loadProducts = async () => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:8080/api/products");
            setProducts(res.data || []);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    // ADD
    const addProduct = async () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("quantity", quantity);
        formData.append("category", category); // ✅
        if (image) formData.append("image", image);

        await axios.post("http://localhost:8080/api/products", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        clearForm();
        setShowModal(false);
        loadProducts();
    };

    // UPDATE
    const updateProduct = async () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("quantity", quantity);
        formData.append("category", category); // ✅
        if (image) formData.append("image", image);

        await axios.put(
            `http://localhost:8080/api/products/${editId}`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
        );

        setEditId(null);
        clearForm();
        setShowModal(false);
        loadProducts();
    };

    // DELETE
    const deleteProduct = async (id) => {
        if (!window.confirm("Delete this product?")) return;
        await axios.delete(`http://localhost:8080/api/products/${id}`);
        loadProducts();
    };

    // EDIT
    const startEdit = (p) => {
        setEditId(p.id);
        setName(p.name);
        setDescription(p.description);
        setPrice(p.price);
        setQuantity(p.quantity);
        setCategory(p.category || ""); // ✅
        setImage(null);
        setShowModal(true);
    };

    const clearForm = () => {
        setName("");
        setDescription("");
        setPrice("");
        setQuantity("");
        setCategory(""); // ✅
        setImage(null);
    };

    // FILTER
    const filtered = products.filter(p =>
        p.name?.toLowerCase().includes(search.toLowerCase())
    );

    const getBadge = (qty) => {
        if (qty <= 5) return "danger";
        if (qty <= 15) return "warning";
        return "success";
    };

    const getImageUrl = (imageUrl) => {
        if (!imageUrl) return null;
        return `http://localhost:8080/${imageUrl.replace(/\\/g, "/").replace(/^\/+/, "")}`;
    };

    return (
        <div className="page">

            <div className="container py-4">

                {/* HEADER */}
                <div className="header">
                    <h3>📦 Product Management</h3>

                    <div className="actions">

                        <div className="searchBox">
                            <input
                                placeholder="Search products..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <span>🔍</span>
                        </div>

                        <button className="btn btn-dark" onClick={() => setDark(!dark)}>
                            {dark ? "☀ Light" : "🌙 Dark"}
                        </button>

                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                setShowModal(true);
                                setEditId(null);
                                clearForm();
                            }}
                        >
                            + Add
                        </button>

                    </div>
                </div>

                {/* LOADING */}
                {loading ? (
                    <div className="loading">
                        <div className="spinner-border text-primary"></div>
                        <p>Loading...</p>
                    </div>
                ) : (

                    <div className="card table-card">

                        <table>
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Category</th> {/* ✅ NEW */}
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filtered.map(p => (
                                    <tr key={p.id}>

                                        <td>
                                            {p.imageUrl ? (
                                                <img src={getImageUrl(p.imageUrl)} />
                                            ) : "❌"}
                                        </td>

                                        <td>{p.name}</td>

                                        {/* ✅ CATEGORY */}
                                        <td>
                                            <span className="badge bg-info text-dark">
                                                {p.category || "N/A"}
                                            </span>
                                        </td>

                                        <td>Rs. {p.price}</td>

                                        <td>
                                            <span className={`badge bg-${getBadge(p.quantity)}`}>
                                                {p.quantity}
                                            </span>
                                        </td>

                                        <td>
                                            <button className="btn btn-warning btn-sm me-2" onClick={() => startEdit(p)}>Edit</button>
                                            <button className="btn btn-danger btn-sm" onClick={() => deleteProduct(p.id)}>Delete</button>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>

                        </table>

                    </div>
                )}

                {/* MODAL */}
                {showModal && (
                    <div className="modal-bg">
                        <div className="modal-box">

                            <h5>{editId ? "Update Product" : "Add Product"}</h5>

                            <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                            <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                            <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                            <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />

                            {/* ✅ CATEGORY DROPDOWN */}
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Select Category</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Fashion">Fashion</option>
                                <option value="Home">Home</option>
                                <option value="Beauty">Beauty</option>
                            </select>

                            <input type="file" onChange={(e) => setImage(e.target.files[0])} />

                            <div className="modal-actions">
                                <button onClick={() => setShowModal(false)}>Close</button>
                                <button onClick={editId ? updateProduct : addProduct}>Save</button>
                            </div>

                        </div>
                    </div>
                )}

            </div>

            {/* STYLE */}
            <style>{`

                body {
                    margin: 0;
                    font-family: Arial;
                    background: #f4f6fb;
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

                .actions {
                    display: flex;
                    gap: 10px;
                    align-items: center;
                }

                .searchBox {
                    display: flex;
                    align-items: center;
                    background: #fff;
                    padding: 8px 12px;
                    border-radius: 12px;
                    width: 260px;
                }

                .searchBox input {
                    border: none;
                    outline: none;
                    width: 100%;
                    background: transparent;
                }

                .table-card {
                    background: white;
                    padding: 10px;
                    border-radius: 12px;
                }

                body.dark-mode .table-card {
                    background: #1e293b;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                }

                th, td {
                    padding: 10px;
                    text-align: left;
                }

                img {
                    width: 50px;
                    height: 50px;
                    object-fit: cover;
                    border-radius: 8px;
                }

                .modal-bg {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .modal-box {
                    background: white;
                    padding: 20px;
                    border-radius: 12px;
                    width: 400px;
                }

                body.dark-mode .modal-box {
                    background: #1e293b;
                    color: white;
                }

                .modal-box input,
                .modal-box select {
                    width: 100%;
                    margin: 5px 0;
                    padding: 8px;
                }

                .modal-actions {
                    display: flex;
                    justify-content: flex-end;
                    gap: 10px;
                    margin-top: 10px;
                }

            `}</style>

        </div>
    );
}