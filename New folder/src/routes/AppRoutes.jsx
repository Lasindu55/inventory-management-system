import { Routes, Route } from "react-router-dom";

// AUTH
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// ADMIN
import AdminDashboard from "../pages/admin/AdminDashboard";
import Products from "../pages/admin/Products";
import Stock from "../pages/admin/Stock";
import Sales from "../pages/admin/Sales";

// USER
import UserDashboard from "../pages/user/UserDashboard";
import UserProducts from "../pages/user/UserProducts";
import UserCart from "../pages/user/UserCart";
import UserOrders from "../pages/user/UserOrders";
import UserPayment from "../pages/user/UserPayment";

export default function AppRoutes() {
    return (
        <Routes>

            {/* AUTH */}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* ADMIN */}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/stock" element={<Stock />} />
            <Route path="/sales" element={<Sales />} />

            {/* USER */}
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/user-products" element={<UserProducts />} />
            <Route path="/user-cart" element={<UserCart />} />
            <Route path="/user-orders" element={<UserOrders />} />
            <Route path="/payment" element={<UserPayment />} />

        </Routes>
    );
}