import React, { useState } from "react";
import {
  FaArrowLeft,
  FaLock,
  FaTruck,
  FaShieldAlt,
  FaMoneyBillWave,
  FaMobileAlt,
  FaCreditCard,
  FaCheckCircle,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const CheckOut = () => {
  const navigate = useNavigate();

  // =====================================================
  // SAMPLE CART DATA
  // Replace this with your actual cart data
  // =====================================================

  const [cartItems] = useState([
    {
      id: 16,
      name: "Wireless Car Charger",
      price: 2199,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500",
    },
    {
      id: 19,
      name: "Premium Car Perfume",
      price: 499,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500",
    },
    {
      id: 1,
      name: "Forged Alloy Wheels 18 Inch",
      price: 45999,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1504215680853-026ed2a45def?w=500",
    },
  ]);

  // =====================================================
  // FORM DATA
  // =====================================================

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  // =====================================================
  // PAYMENT
  // =====================================================

  const [paymentMethod, setPaymentMethod] = useState("cod");

  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // =====================================================
  // CALCULATIONS
  // =====================================================

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const delivery = 0;

  const total = subtotal + delivery;

  // =====================================================
  // PLACE ORDER
  // =====================================================

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {
      alert("Please fill all delivery details.");
      return;
    }

    const order = {
      customer: formData,
      items: cartItems,
      subtotal,
      delivery,
      total,
      paymentMethod,
      status: "Pending",
      orderDate: new Date().toISOString(),
    };

    console.log("Order:", order);

    // Later:
    // POST this order to JSON Server

    navigate("/order-success");
  };

  return (
    <div className="bg-light min-vh-100 py-4 py-md-5">

      <div className="container">

        {/* =================================================
            BACK TO CART
        ================================================= */}

        <div className="mb-4">
          <Link
            to="/cart"
            className="text-decoration-none text-primary fw-semibold"
          >
            <FaArrowLeft className="me-2" />
            Back to Cart
          </Link>
        </div>

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">

          <div>
            <h1 className="fw-bold mb-1">
              Checkout
            </h1>

            <p className="text-secondary mb-0">
              Complete your order securely
            </p>
          </div>

          <div className="mt-3 mt-md-0">
            <span className="badge bg-success-subtle text-success px-3 py-2">
              <FaLock className="me-2" />
              Secure Checkout
            </span>
          </div>

        </div>

        <form onSubmit={handlePlaceOrder}>

          <div className="row g-4">

            {/* =================================================
                LEFT COLUMN
            ================================================= */}

            <div className="col-lg-8">

              {/* =================================================
                  DELIVERY INFORMATION
              ================================================= */}

              <div className="card border-0 shadow-sm rounded-4 mb-4">

                <div className="card-body p-4">

                  <div className="d-flex align-items-center mb-4">

                    <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                      style={{
                        width: "40px",
                        height: "40px",
                      }}
                    >
                      1
                    </div>

                    <div>
                      <h4 className="fw-bold mb-1">
                        Delivery Information
                      </h4>

                      <p className="text-secondary mb-0">
                        Where should we deliver your order?
                      </p>
                    </div>

                  </div>

                  <div className="row g-3">

                    {/* FULL NAME */}

                    <div className="col-12">

                      <label className="form-label fw-semibold">
                        Full Name
                      </label>

                      <input
                        type="text"
                        name="fullName"
                        className="form-control form-control-lg"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={handleChange}
                      />

                    </div>

                    {/* EMAIL */}

                    <div className="col-md-6">

                      <label className="form-label fw-semibold">
                        Email Address
                      </label>

                      <input
                        type="email"
                        name="email"
                        className="form-control form-control-lg"
                        placeholder="example@email.com"
                        value={formData.email}
                        onChange={handleChange}
                      />

                    </div>

                    {/* PHONE */}

                    <div className="col-md-6">

                      <label className="form-label fw-semibold">
                        Phone Number
                      </label>

                      <input
                        type="tel"
                        name="phone"
                        className="form-control form-control-lg"
                        placeholder="+91 9876543210"
                        value={formData.phone}
                        onChange={handleChange}
                      />

                    </div>

                    {/* ADDRESS */}

                    <div className="col-12">

                      <label className="form-label fw-semibold">
                        <FaMapMarkerAlt className="me-2 text-primary" />
                        Delivery Address
                      </label>

                      <textarea
                        name="address"
                        rows="3"
                        className="form-control"
                        placeholder="House / Building / Street"
                        value={formData.address}
                        onChange={handleChange}
                      ></textarea>

                    </div>

                    {/* CITY */}

                    <div className="col-md-4">

                      <label className="form-label fw-semibold">
                        City
                      </label>

                      <input
                        type="text"
                        name="city"
                        className="form-control"
                        placeholder="Kochi"
                        value={formData.city}
                        onChange={handleChange}
                      />

                    </div>

                    {/* STATE */}

                    <div className="col-md-4">

                      <label className="form-label fw-semibold">
                        State
                      </label>

                      <input
                        type="text"
                        name="state"
                        className="form-control"
                        placeholder="Kerala"
                        value={formData.state}
                        onChange={handleChange}
                      />

                    </div>

                    {/* PINCODE */}

                    <div className="col-md-4">

                      <label className="form-label fw-semibold">
                        Pincode
                      </label>

                      <input
                        type="text"
                        name="pincode"
                        className="form-control"
                        placeholder="682001"
                        value={formData.pincode}
                        onChange={handleChange}
                      />

                    </div>

                  </div>

                </div>

              </div>

              {/* =================================================
                  PAYMENT METHOD
              ================================================= */}

              <div className="card border-0 shadow-sm rounded-4">

                <div className="card-body p-4">

                  <div className="d-flex align-items-center mb-4">

                    <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                      style={{
                        width: "40px",
                        height: "40px",
                      }}
                    >
                      2
                    </div>

                    <div>
                      <h4 className="fw-bold mb-1">
                        Payment Method
                      </h4>

                      <p className="text-secondary mb-0">
                        Select your preferred payment option
                      </p>
                    </div>

                  </div>

                  {/* COD */}

                  <div
                    className={`border rounded-3 p-3 mb-3 ${
                      paymentMethod === "cod"
                        ? "border-primary bg-primary bg-opacity-10"
                        : ""
                    }`}
                    onClick={() => setPaymentMethod("cod")}
                    style={{ cursor: "pointer" }}
                  >

                    <div className="d-flex align-items-center">

                      <input
                        type="radio"
                        className="form-check-input me-3"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                      />

                      <div className="bg-light rounded-3 p-3 me-3">
                        <FaMoneyBillWave
                          className="text-success fs-4"
                        />
                      </div>

                      <div className="flex-grow-1">

                        <h6 className="fw-bold mb-1">
                          Cash on Delivery
                        </h6>

                        <small className="text-secondary">
                          Pay when your order arrives
                        </small>

                      </div>

                      {paymentMethod === "cod" && (
                        <FaCheckCircle className="text-primary fs-5" />
                      )}

                    </div>

                  </div>

                  {/* UPI */}

                  <div
                    className={`border rounded-3 p-3 mb-3 ${
                      paymentMethod === "upi"
                        ? "border-primary bg-primary bg-opacity-10"
                        : ""
                    }`}
                    onClick={() => setPaymentMethod("upi")}
                    style={{ cursor: "pointer" }}
                  >

                    <div className="d-flex align-items-center">

                      <input
                        type="radio"
                        className="form-check-input me-3"
                        checked={paymentMethod === "upi"}
                        onChange={() => setPaymentMethod("upi")}
                      />

                      <div className="bg-light rounded-3 p-3 me-3">
                        <FaMobileAlt
                          className="text-primary fs-4"
                        />
                      </div>

                      <div className="flex-grow-1">

                        <h6 className="fw-bold mb-1">
                          UPI
                        </h6>

                        <small className="text-secondary">
                          Google Pay, PhonePe, Paytm & more
                        </small>

                      </div>

                      {paymentMethod === "upi" && (
                        <FaCheckCircle className="text-primary fs-5" />
                      )}

                    </div>

                  </div>

                  {/* CARD */}

                  <div
                    className={`border rounded-3 p-3 ${
                      paymentMethod === "card"
                        ? "border-primary bg-primary bg-opacity-10"
                        : ""
                    }`}
                    onClick={() => setPaymentMethod("card")}
                    style={{ cursor: "pointer" }}
                  >

                    <div className="d-flex align-items-center">

                      <input
                        type="radio"
                        className="form-check-input me-3"
                        checked={paymentMethod === "card"}
                        onChange={() => setPaymentMethod("card")}
                      />

                      <div className="bg-light rounded-3 p-3 me-3">
                        <FaCreditCard
                          className="text-primary fs-4"
                        />
                      </div>

                      <div className="flex-grow-1">

                        <h6 className="fw-bold mb-1">
                          Credit / Debit Card
                        </h6>

                        <small className="text-secondary">
                          Visa, Mastercard, RuPay & more
                        </small>

                      </div>

                      {paymentMethod === "card" && (
                        <FaCheckCircle className="text-primary fs-5" />
                      )}

                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* =================================================
                RIGHT COLUMN
            ================================================= */}

            <div className="col-lg-4">

              <div
                className="card border-0 shadow-sm rounded-4"
                style={{
                  position: "sticky",
                  top: "20px",
                }}
              >

                <div className="card-body p-4">

                  <h4 className="fw-bold mb-4">
                    Order Summary
                  </h4>

                  {/* PRODUCTS */}

                  {cartItems.map((item) => (

                    <div
                      key={item.id}
                      className="d-flex align-items-center mb-3"
                    >

                      <div
                        className="position-relative me-3"
                        style={{
                          width: "60px",
                          height: "60px",
                        }}
                      >

                        <img
                          src={item.image}
                          alt={item.name}
                          className="rounded-3 border w-100 h-100 object-fit-cover"
                        />

                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                          {item.quantity}
                        </span>

                      </div>

                      <div className="flex-grow-1">

                        <h6 className="fw-semibold mb-1">
                          {item.name}
                        </h6>

                        <small className="text-secondary">
                          ₹{item.price.toLocaleString("en-IN")}
                          {" "}× {item.quantity}
                        </small>

                      </div>

                      <strong>
                        ₹
                        {(
                          item.price * item.quantity
                        ).toLocaleString("en-IN")}
                      </strong>

                    </div>

                  ))}

                  <hr />

                  {/* SUBTOTAL */}

                  <div className="d-flex justify-content-between mb-3">

                    <span className="text-secondary">
                      Subtotal
                    </span>

                    <strong>
                      ₹{subtotal.toLocaleString("en-IN")}
                    </strong>

                  </div>

                  {/* DELIVERY */}

                  <div className="d-flex justify-content-between mb-3">

                    <span className="text-secondary">
                      Delivery
                    </span>

                    <strong className="text-success">
                      FREE
                    </strong>

                  </div>

                  <hr />

                  {/* TOTAL */}

                  <div className="d-flex justify-content-between align-items-center mb-4">

                    <h5 className="fw-bold mb-0">
                      Total
                    </h5>

                    <h4 className="fw-bold text-primary mb-0">
                      ₹{total.toLocaleString("en-IN")}
                    </h4>

                  </div>

                  {/* PLACE ORDER */}

                  <Link to={"/orders"}>
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg w-100 fw-bold py-3"
                    >
                      <FaLock className="me-2" />
                      Place Order
                    </button>
                  </Link>

                  {/* SECURITY */}

                  <div className="bg-light rounded-3 p-3 mt-3">

                    <div className="d-flex">

                      <FaShieldAlt className="text-success fs-5 me-3 mt-1" />

                      <div>

                        <strong className="d-block">
                          Secure Payment
                        </strong>

                        <small className="text-secondary">
                          Your payment information is
                          protected and encrypted.
                        </small>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

              {/* =================================================
                  BENEFITS
              ================================================= */}

              <div className="card border-0 shadow-sm rounded-4 mt-3">

                <div className="card-body p-3">

                  <div className="d-flex align-items-center mb-3">

                    <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                      <FaTruck className="text-primary" />
                    </div>

                    <div>
                      <strong className="d-block">
                        Fast Delivery
                      </strong>

                      <small className="text-secondary">
                        Delivered to your doorstep
                      </small>
                    </div>

                  </div>

                  <div className="d-flex align-items-center mb-3">

                    <div className="bg-success bg-opacity-10 rounded-circle p-2 me-3">
                      <FaShieldAlt className="text-success" />
                    </div>

                    <div>
                      <strong className="d-block">
                        Secure Checkout
                      </strong>

                      <small className="text-secondary">
                        100% secure shopping
                      </small>
                    </div>

                  </div>

                  <div className="d-flex align-items-center">

                    <div className="bg-warning bg-opacity-10 rounded-circle p-2 me-3">
                      <FaCheckCircle className="text-warning" />
                    </div>

                    <div>
                      <strong className="d-block">
                        Easy Returns
                      </strong>

                      <small className="text-secondary">
                        Hassle-free return policy
                      </small>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </form>

      </div>

    </div>
  );
};

export default CheckOut;