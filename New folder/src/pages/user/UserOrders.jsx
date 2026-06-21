import { useEffect, useState } from "react";
import UserNavbar from "../../components/user/UserNavbar";

export default function UserOrders() {

    const [dark, setDark] = useState(() =>
        JSON.parse(localStorage.getItem("darkMode")) || false
    );

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const savedOrders =
            JSON.parse(localStorage.getItem("orders")) || [];

        setOrders(savedOrders);
    }, []);

    const totalOrders = orders.length;

    return (
        <div className={dark ? "bg-dark text-white min-vh-100" : "bg-light text-dark min-vh-100"}>

            <UserNavbar dark={dark} setDark={setDark} />

            <div className="container py-4">

                {/* HEADER */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2 className="fw-bold">📦 My Orders</h2>
                        <p className="text-muted mb-0">
                            Track your purchase history
                        </p>
                    </div>

                    <span className="badge bg-primary p-2">
                        Total Orders: {totalOrders}
                    </span>
                </div>

                {/* EMPTY STATE */}
                {orders.length === 0 ? (
                    <div className="text-center mt-5">
                        <h4>📦 No orders yet</h4>
                        <p className="text-muted">
                            Your order history will appear after checkout
                        </p>

                        <img
                            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                            width="120"
                            alt="empty"
                            className="mt-3"
                        />
                    </div>
                ) : (
                    <div className="row g-4">

                        {orders.map((order, index) => (

                            <div className="col-12" key={index}>

                                <div className={
                                    "card shadow-sm border-0 p-4 rounded-4 " +
                                    (dark ? "bg-secondary text-white" : "")
                                }>

                                    {/* ORDER HEADER */}
                                    <div className="d-flex justify-content-between align-items-center mb-2">

                                        <h5 className="fw-bold">
                                            📦 Order #{index + 1}
                                        </h5>

                                        <span className="badge bg-success">
                                            Completed
                                        </span>

                                    </div>

                                    {/* ITEMS */}
                                    {order.items?.map((i) => (
                                        <div
                                            key={i.id}
                                            className="d-flex justify-content-between border-bottom py-2"
                                        >
                                            <span>
                                                {i.name} × {i.qty}
                                            </span>

                                            <span className="fw-bold text-primary">
                                                Rs. {(i.price * i.qty).toFixed(2)}
                                            </span>
                                        </div>
                                    ))}

                                    {/* TOTAL */}
                                    <div className="d-flex justify-content-between mt-3">
                                        <h6>Total</h6>
                                        <h5 className="text-success fw-bold">
                                            Rs. {order.total}
                                        </h5>
                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>
                )}

            </div>

        </div>
    );
}