import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../../components/user/UserNavbar";

export default function UserCart() {

    const [dark, setDark] = useState(() => {
        return JSON.parse(localStorage.getItem("darkMode")) || false;
    });

    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const savedCart =
            JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);
    }, []);

    const updateCart = (updated) => {
        setCart(updated);
        localStorage.setItem("cart", JSON.stringify(updated));
    };

    const increaseQty = (id) => {
        const updated = cart.map((i) =>
            i.id === id ? { ...i, qty: i.qty + 1 } : i
        );
        updateCart(updated);
    };

    const decreaseQty = (id) => {
        const updated = cart
            .map((i) =>
                i.id === id ? { ...i, qty: i.qty - 1 } : i
            )
            .filter((i) => i.qty > 0);

        updateCart(updated);
    };

    const removeItem = (id) => {
        const updated = cart.filter((i) => i.id !== id);
        updateCart(updated);
    };

    const total = cart.reduce(
        (sum, i) => sum + i.price * i.qty,
        0
    );

    const handleCheckout = () => {
        if (cart.length === 0) {
            alert("🛒 Cart is empty!");
            return;
        }

        localStorage.setItem(
            "pendingOrder",
            JSON.stringify(cart)
        );

        navigate("/payment");
    };

    return (
        <div
            className={
                dark
                    ? "bg-dark text-white min-vh-100"
                    : "bg-light text-dark min-vh-100"
            }
        >
            <UserNavbar dark={dark} setDark={setDark} />

            <div className="container py-4">

                {/* HEADER */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bold">🛒 Your Cart</h2>

                    <span className="badge bg-primary p-2">
                        Items: {cart.reduce((sum, i) => sum + i.qty, 0)}
                    </span>
                </div>

                {/* EMPTY CART */}
                {cart.length === 0 ? (
                    <div className="text-center mt-5">
                        <h4>🛒 Your cart is empty</h4>
                        <p className="text-muted">
                            Start shopping to add items
                        </p>

                        <button
                            className="btn btn-primary mt-3"
                            onClick={() => navigate("/user-products")}
                        >
                            🛍 Start Shopping
                        </button>
                    </div>
                ) : (
                    <>
                        {/* CART ITEMS */}
                        <div className="row g-3">

                            {cart.map((i) => (
                                <div className="col-12" key={i.id}>

                                    <div
                                        className={
                                            "card shadow-sm border-0 p-3 d-flex flex-row justify-content-between align-items-center cart-card " +
                                            (dark ? "bg-secondary text-white" : "")
                                        }
                                    >

                                        {/* PRODUCT INFO */}
                                        <div>
                                            <h5 className="mb-1">
                                                📦 {i.name}
                                            </h5>
                                            <small className={dark ? "text-light" : "text-muted"}>
                                                Rs. {i.price} each
                                            </small>
                                        </div>

                                        {/* QTY CONTROLS */}
                                        <div className="d-flex align-items-center gap-2">

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => decreaseQty(i.id)}
                                            >
                                                -
                                            </button>

                                            <span className="fw-bold">
                                                {i.qty}
                                            </span>

                                            <button
                                                className="btn btn-success btn-sm"
                                                onClick={() => increaseQty(i.id)}
                                            >
                                                +
                                            </button>

                                        </div>

                                        {/* TOTAL */}
                                        <div className="fw-bold text-primary">
                                            Rs. {(i.price * i.qty).toFixed(2)}
                                        </div>

                                        {/* REMOVE */}
                                        <button
                                            className="btn btn-outline-danger btn-sm"
                                            onClick={() => removeItem(i.id)}
                                        >
                                            Remove
                                        </button>

                                    </div>

                                </div>
                            ))}

                        </div>

                        {/* TOTAL SECTION */}
                        <div className="card mt-4 p-3 shadow-lg border-0 rounded-4">
                            <h4 className="text-end">
                                Total: <span className="text-success">
                                    Rs. {total.toFixed(2)}
                                </span>
                            </h4>

                            <button
                                className="btn btn-success w-100 mt-3 fw-bold"
                                onClick={handleCheckout}
                            >
                                💳 Checkout → Payment
                            </button>
                        </div>
                    </>
                )}

            </div>

            {/* STYLE */}
            <style>
                {`
                .cart-card {
                    transition: 0.3s;
                    border-radius: 12px;
                }
                .cart-card:hover {
                    transform: scale(1.01);
                    box-shadow: 0px 10px 25px rgba(0,0,0,0.2);
                }
                `}
            </style>
        </div>
    );
}