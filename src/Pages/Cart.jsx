import React, { useEffect, useState } from "react";
import {
  FaShoppingCart,
  FaTrash,
  FaMinus,
  FaPlus,
  FaArrowLeft,
  FaShieldAlt,
  FaTruck,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { getAllCartAPI } from "../Services/Api";

function Cart() {
  const navigate = useNavigate();

  // =====================================================
  // STATES
  // =====================================================

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // GET CART ITEMS
  // =====================================================

  const getCartItems = async () => {
    try {
      setLoading(true);

      const response = await getAllCartAPI();

      console.log("Cart API Response:", response);

      setCartItems(response?.data || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  // =====================================================
  // INCREASE QUANTITY
  // =====================================================

  const increaseQuantity = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Number(item.quantity || 1) + 1,
            }
          : item
      )
    );
  };

  // =====================================================
  // DECREASE QUANTITY
  // =====================================================

  const decreaseQuantity = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id && Number(item.quantity) > 1
          ? {
              ...item,
              quantity: Number(item.quantity) - 1,
            }
          : item
      )
    );
  };

  // =====================================================
  // REMOVE ITEM
  // =====================================================

  const removeItem = (id) => {
    const confirmRemove = window.confirm(
      "Are you sure you want to remove this item from your cart?"
    );

    if (!confirmRemove) return;

    setCartItems((items) =>
      items.filter((item) => item.id !== id)
    );
  };

  // =====================================================
  // CLEAR CART
  // =====================================================

  const clearCart = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to remove all items from your cart?"
    );

    if (!confirmClear) return;

    setCartItems([]);
  };

  // =====================================================
  // PRICE CALCULATIONS
  // =====================================================

  const subtotal = cartItems.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        Number(item.quantity || 1),
    0
  );

  // Free delivery above ₹5000
  const delivery = subtotal >= 5000 ? 0 : 99;

  const total = subtotal + delivery;

  // =====================================================
  // PROCEED TO CHECKOUT
  // =====================================================

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    navigate("/checkouts");
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="bg-light min-vh-100 d-flex justify-content-center align-items-center">
        <div className="text-center">
          <div
            className="spinner-border text-primary mb-3"
            role="status"
          >
            <span className="visually-hidden">
              Loading...
            </span>
          </div>

          <h6 className="text-muted">
            Loading your cart...
          </h6>
        </div>
      </div>
    );
  }

  // =====================================================
  // EMPTY CART
  // =====================================================

  if (cartItems.length === 0) {
    return (
      <div className="bg-light min-vh-100 d-flex align-items-center justify-content-center py-5">
        <div className="container">
          <div className="text-center">
            <div
              className="bg-white shadow-sm rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
              style={{
                width: "110px",
                height: "110px",
              }}
            >
              <FaShoppingCart
                size={45}
                className="text-muted"
              />
            </div>

            <h3 className="fw-bold">
              Your cart is empty
            </h3>

            <p className="text-muted mb-4">
              Looks like you haven't added anything
              to your cart yet.
            </p>

            <Link
              to="/products"
              className="btn btn-primary px-4 py-2 rounded-3"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // =====================================================
  // CART PAGE
  // =====================================================

  return (
    <div className="bg-light min-vh-100 py-4 py-md-5">
      <div className="container">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">

          <div>
            <h2 className="fw-bold mb-1">
              <FaShoppingCart className="text-primary me-2" />
              My Cart
            </h2>

            <p className="text-muted mb-0">
              Review your selected automotive products
            </p>
          </div>

          <div className="d-flex align-items-center gap-2 mt-3 mt-md-0">

            <span className="badge bg-primary rounded-pill px-3 py-2">
              {cartItems.length}{" "}
              {cartItems.length === 1
                ? "Item"
                : "Items"}
            </span>

            <button
              type="button"
              className="btn btn-sm btn-outline-danger rounded-3"
              onClick={clearCart}
            >
              <FaTrash
                size={11}
                className="me-1"
              />
              Clear Cart
            </button>

          </div>

        </div>

        {/* =================================================
            MAIN ROW
        ================================================= */}

        <div className="row g-4">

          {/* =================================================
              LEFT - CART ITEMS
          ================================================= */}

          <div className="col-lg-8">

            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">

              {/* CARD HEADER */}

              <div className="card-header bg-white border-0 p-4">

                <div className="d-flex justify-content-between align-items-center">

                  <h5 className="fw-bold mb-0">
                    Cart Items
                  </h5>

                  <small className="text-muted">
                    {cartItems.length} products
                  </small>

                </div>

              </div>

              {/* CART ITEMS */}

              <div className="card-body p-0">

                {cartItems.map((item, index) => {

                  const itemPrice =
                    Number(item.price || 0);

                  const quantity =
                    Number(item.quantity || 1);

                  const itemTotal =
                    itemPrice * quantity;

                  return (
                    <div
                      key={item.id}
                      className={`p-4 ${
                        index !== 0
                          ? "border-top"
                          : ""
                      }`}
                    >

                      <div className="row align-items-center g-3">

                        {/* =================================================
                            PRODUCT IMAGE
                        ================================================= */}

                        <div className="col-4 col-md-2">

                          <div
                            className="bg-light rounded-3 overflow-hidden border"
                            style={{
                              height: "110px",
                            }}
                          >

                            <img
                              src={item.image}
                              alt={item.name}
                              className="img-fluid w-100 h-100"
                              style={{
                                objectFit: "cover",
                              }}
                            />

                          </div>

                        </div>

                        {/* =================================================
                            PRODUCT DETAILS
                        ================================================= */}

                        <div className="col-8 col-md-4">

                          <h6 className="fw-bold mb-1">
                            {item.name}
                          </h6>

                          {item.productId && (
                            <small className="text-muted d-block mb-2">
                              Product ID:{" "}
                              {item.productId}
                            </small>
                          )}

                          {item.category && (
                            <small className="text-secondary d-block mb-2">
                              {item.category}
                            </small>
                          )}

                          <h6 className="text-primary fw-bold mb-0">
                            ₹
                            {itemPrice.toLocaleString(
                              "en-IN"
                            )}
                          </h6>

                        </div>

                        {/* =================================================
                            QUANTITY
                        ================================================= */}

                        <div className="col-7 col-md-3">

                          <label className="small text-muted d-block mb-2">
                            Quantity
                          </label>

                          <div
                            className="btn-group border rounded-3 overflow-hidden"
                            role="group"
                          >

                            {/* MINUS */}

                            <button
                              type="button"
                              className="btn btn-light btn-sm px-3"
                              onClick={() =>
                                decreaseQuantity(
                                  item.id
                                )
                              }
                              disabled={
                                quantity <= 1
                              }
                            >
                              <FaMinus size={10} />
                            </button>

                            {/* QUANTITY */}

                            <span
                              className="btn btn-white btn-sm px-3 fw-bold"
                              style={{
                                minWidth: "45px",
                              }}
                            >
                              {quantity}
                            </span>

                            {/* PLUS */}

                            <button
                              type="button"
                              className="btn btn-light btn-sm px-3"
                              onClick={() =>
                                increaseQuantity(
                                  item.id
                                )
                              }
                            >
                              <FaPlus size={10} />
                            </button>

                          </div>

                        </div>

                        {/* =================================================
                            TOTAL + REMOVE
                        ================================================= */}

                        <div className="col-5 col-md-3 text-md-end">

                          <small className="text-muted d-block">
                            Total
                          </small>

                          <h6 className="fw-bold mb-2">
                            ₹
                            {itemTotal.toLocaleString(
                              "en-IN"
                            )}
                          </h6>

                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger rounded-3"
                            onClick={() =>
                              removeItem(item.id)
                            }
                          >
                            <FaTrash
                              className="me-1"
                              size={11}
                            />
                            Remove
                          </button>

                        </div>

                      </div>

                    </div>
                  );
                })}

              </div>

            </div>

            {/* =================================================
                CONTINUE SHOPPING
            ================================================= */}

            <div className="mt-4">

              <Link
                to="/products"
                className="btn btn-outline-dark rounded-3 px-4"
              >
                <FaArrowLeft className="me-2" />
                Continue Shopping
              </Link>

            </div>

          </div>

          {/* =================================================
              RIGHT - ORDER SUMMARY
          ================================================= */}

          <div className="col-lg-4">

            <div
              className="card border-0 shadow-sm rounded-4 sticky-lg-top"
              style={{
                top: "20px",
              }}
            >

              <div className="card-body p-4">

                {/* TITLE */}

                <h5 className="fw-bold mb-4">
                  Order Summary
                </h5>

                {/* SUBTOTAL */}

                <div className="d-flex justify-content-between mb-3">

                  <span className="text-muted">
                    Subtotal
                  </span>

                  <span className="fw-semibold">
                    ₹
                    {subtotal.toLocaleString(
                      "en-IN"
                    )}
                  </span>

                </div>

                {/* DELIVERY */}

                <div className="d-flex justify-content-between mb-3">

                  <span className="text-muted">
                    Delivery
                  </span>

                  <span className="fw-semibold text-success">

                    {delivery === 0
                      ? "FREE"
                      : `₹${delivery}`}

                  </span>

                </div>

                {/* FREE DELIVERY MESSAGE */}

                {subtotal < 5000 && (
                  <div className="alert alert-info border-0 small py-2">
                    Add ₹
                    {(
                      5000 - subtotal
                    ).toLocaleString(
                      "en-IN"
                    )}{" "}
                    more to get FREE delivery.
                  </div>
                )}

                <hr />

                {/* TOTAL */}

                <div className="d-flex justify-content-between mb-4">

                  <span className="fw-bold fs-5">
                    Total
                  </span>

                  <span className="fw-bold fs-5 text-primary">
                    ₹
                    {total.toLocaleString(
                      "en-IN"
                    )}
                  </span>

                </div>

                {/* COUPON */}

                <div className="input-group mb-4">

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Coupon code"
                  />

                  <button
                    type="button"
                    className="btn btn-dark"
                  >
                    Apply
                  </button>

                </div>

                {/* =================================================
                    PROCEED TO CHECKOUT
                ================================================= */}

                <button
                  type="button"
                  className="btn btn-primary w-100 py-3 rounded-3 fw-bold"
                  onClick={handleProceedToCheckout}
                >
                  Proceed to Checkout
                </button>

                {/* =================================================
                    BENEFITS
                ================================================= */}

                <div className="mt-4">

                  {/* DELIVERY */}

                  <div className="d-flex align-items-center mb-3">

                    <div className="bg-light rounded-circle p-2 me-3">
                      <FaTruck className="text-primary" />
                    </div>

                    <div>
                      <small className="fw-bold d-block">
                        Fast Delivery
                      </small>

                      <small className="text-muted">
                        Delivered to your doorstep
                      </small>
                    </div>

                  </div>

                  {/* SECURITY */}

                  <div className="d-flex align-items-center">

                    <div className="bg-light rounded-circle p-2 me-3">
                      <FaShieldAlt className="text-success" />
                    </div>

                    <div>
                      <small className="fw-bold d-block">
                        Secure Payment
                      </small>

                      <small className="text-muted">
                        100% secure checkout
                      </small>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Cart;