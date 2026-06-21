import { useEffect, useState } from "react";
import UserNavbar from "../../components/user/UserNavbar";

export default function UserPayment() {

    const [dark, setDark] = useState(() =>
        JSON.parse(localStorage.getItem("darkMode")) || false
    );

    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);
    }, []);

    const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

    const handleCardPayment = () => {
        alert("💳 Payment Gateway will be added later!");
    };

    const handleCOD = () => {
        alert("📦 Cash on Delivery selected!");
        localStorage.removeItem("cart");
        window.location.href = "/user-products";
    };

    return (
        <div className={dark ? "bg-dark text-white min-vh-100" : "bg-light text-dark min-vh-100"}>

            <UserNavbar dark={dark} setDark={setDark} />

            <div className="container py-5">

                <div className="text-center mb-4">
                    <h2 className="fw-bold">💳 Secure Checkout</h2>
                    <p className="text-muted">Fast & safe payment experience</p>
                </div>

                {cart.length === 0 ? (
                    <div className="text-center mt-5">
                        <h4>🛒 No items to pay</h4>
                    </div>
                ) : (
                    <div className="row g-4 justify-content-center">

                        {/* ORDER SUMMARY */}
                        <div className="col-lg-6">
                            <div className="card shadow-lg p-4 rounded-4">

                                <h5>🧾 Order Summary</h5>

                                {cart.map((i) => (
                                    <div
                                        key={i.id}
                                        className="d-flex justify-content-between py-2 border-bottom"
                                    >
                                        <span>{i.name} × {i.qty}</span>
                                        <span className="text-primary fw-bold">
                                            Rs. {(i.price * i.qty).toFixed(2)}
                                        </span>
                                    </div>
                                ))}

                                <hr />

                                <h4 className="text-success text-end">
                                    Total: Rs. {total.toFixed(2)}
                                </h4>

                            </div>
                        </div>

                        {/* PAYMENT */}
                        <div className="col-lg-4">
                            <div className="card shadow-lg p-4 rounded-4">

                                <h5>💳 Payment Methods</h5>

                                <button
                                    className="btn btn-primary w-100 mb-2"
                                    onClick={handleCardPayment}
                                >
                                    Pay with Card
                                </button>

                                <button
                                    className="btn btn-success w-100"
                                    onClick={handleCOD}
                                >
                                    Cash on Delivery
                                </button>

                            </div>
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
}