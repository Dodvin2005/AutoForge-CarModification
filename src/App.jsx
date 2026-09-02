import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";

import Home from "./Pages/Home";
import Products from "./Pages/Products";
import ProductDetails from "./Pages/ProductDetails";
import Orders from "./Pages/Orders";
import OrderDetails from "./Pages/OrderDetails";
import Categories from "./Pages/Categories";
import Cart from "./Pages/Cart";
import Wishlist from "./Pages/Wishlist";
import Profile from "./Pages/Profile";
import CheckOut from "./Pages/CheckOut";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

import { ToastContainer } from "react-toastify";

import Dashboard from "./Admin/Dashboard";
import AllProducts from "./Admin/AllProducts";

import AdminSidebar from "./Components/AdminSidebar";
import AdminOrders from "./Admin/AdminOrders";
import EditProducts from "./Admin/EditProducts";

function App() {
  const location = useLocation();

  // Check admin pages
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      {/* ================= CUSTOMER NAVBAR ================= */}
      {!isAdmin && <Navbar />}

      {/* ================= ADMIN SIDEBAR ================= */}
      {isAdmin && <AdminSidebar />}

      <Routes>

        {/* ================= CUSTOMER ROUTES ================= */}

        <Route path="/" element={<Home />} />

        <Route path="/categories" element={<Categories />} />

        <Route path="/products" element={<Products />} />

        <Route
          path="/productdetails/:id"
          element={<ProductDetails />}
        />

        

        <Route path="/cart" element={<Cart />} />

        <Route path="/wishlist" element={<Wishlist />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/checkouts" element={<CheckOut />} />

        <Route path="/orders" element={<Orders />} />

        <Route
          path="/orderdetails"
          element={<OrderDetails />}
        />


        {/* ================= ADMIN ROUTES ================= */}

        {/* Dashboard */}
        <Route
          path="/admin"
          element={<Dashboard />}
        />

        {/* Products */}
        <Route
          path="/admin/products"
          element={<AllProducts />}
        />



        {/* Edit Product */}
        <Route
          path="/admin/editproduct"
          element={<EditProducts />}
        />

        {/* Orders */}
        <Route
          path="/admin/orders"
          element={<AdminOrders />}
        />









      </Routes>

      {/* ================= CUSTOMER FOOTER ================= */}
      {!isAdmin && <Footer />}

      {/* ================= TOAST ================= */}
      <ToastContainer
        position="top-right"
        theme="colored"
        autoClose={2000}
      />
    </>
  );
}

export default App;