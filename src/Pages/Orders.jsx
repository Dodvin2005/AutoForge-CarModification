import React, { useEffect, useState } from "react";
import {
  FaBoxOpen,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaCreditCard,
  FaEye,
  FaMapMarkerAlt,
  FaPhone,
  FaReceipt,
  FaShoppingBag,
  FaSpinner,
  FaTrash,
  FaTruck,
  FaUser,
  FaTimesCircle,
} from "react-icons/fa";

import {
  getAllOrdersAPI,
  deleteOrderAPI,
} from "../Services/Api";

function Orders() {
  // =====================================================
  // STATES
  // =====================================================

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedStatus, setSelectedStatus] = useState("All");

  const [selectedOrder, setSelectedOrder] = useState(null);

  // =====================================================
  // GET ORDERS
  // =====================================================

  const getOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllOrdersAPI();

      console.log("Orders API Response:", response);

      if (response?.status === 200) {
        const orderData = response.data || [];

        // Newest orders first
        const sortedOrders = [...orderData].sort(
          (a, b) =>
            new Date(b.orderDate) -
            new Date(a.orderDate)
        );

        setOrders(sortedOrders);
      } else {
        setError("Unable to load orders.");
      }
    } catch (err) {
      console.error("Error fetching orders:", err);

      setError(
        "Failed to load orders. Please check your JSON Server."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  // =====================================================
  // DELETE ORDER
  // =====================================================

  const handleDeleteOrder = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteOrderAPI(id);

      setOrders((prevOrders) =>
        prevOrders.filter(
          (order) => String(order.id) !== String(id)
        )
      );

      alert("Order deleted successfully.");
    } catch (error) {
      console.error(
        "Error deleting order:",
        error
      );

      alert("Failed to delete order.");
    }
  };

  // =====================================================
  // STATUS FILTER
  // =====================================================

  const filteredOrders =
    selectedStatus === "All"
      ? orders
      : orders.filter(
          (order) =>
            String(order.orderStatus).toLowerCase() ===
            selectedStatus.toLowerCase()
        );

  // =====================================================
  // STATUS COUNT
  // =====================================================

  const getStatusCount = (status) => {
    if (status === "All") {
      return orders.length;
    }

    return orders.filter(
      (order) =>
        String(order.orderStatus).toLowerCase() ===
        status.toLowerCase()
    ).length;
  };

  // =====================================================
  // STATUS BADGE
  // =====================================================

  const getStatusBadge = (status) => {
    switch (
      String(status || "").toLowerCase()
    ) {
      case "pending":
        return (
          <span className="badge bg-warning-subtle text-warning px-3 py-2 rounded-pill">
            <FaClock className="me-1" />
            Pending
          </span>
        );

      case "processing":
        return (
          <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill">
            <FaSpinner className="me-1" />
            Processing
          </span>
        );

      case "shipped":
        return (
          <span className="badge bg-info-subtle text-info px-3 py-2 rounded-pill">
            <FaTruck className="me-1" />
            Shipped
          </span>
        );

      case "delivered":
        return (
          <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill">
            <FaCheckCircle className="me-1" />
            Delivered
          </span>
        );

      case "cancelled":
        return (
          <span className="badge bg-danger-subtle text-danger px-3 py-2 rounded-pill">
            <FaTimesCircle className="me-1" />
            Cancelled
          </span>
        );

      default:
        return (
          <span className="badge bg-secondary-subtle text-secondary px-3 py-2 rounded-pill">
            {status || "Unknown"}
          </span>
        );
    }
  };

  // =====================================================
  // PAYMENT STATUS BADGE
  // =====================================================

  const getPaymentStatusBadge = (status) => {
    if (
      String(status || "").toLowerCase() ===
      "paid"
    ) {
      return (
        <span className="badge bg-success-subtle text-success">
          <FaCheckCircle className="me-1" />
          Paid
        </span>
      );
    }

    if (
      String(status || "").toLowerCase() ===
      "pending"
    ) {
      return (
        <span className="badge bg-warning-subtle text-warning">
          <FaClock className="me-1" />
          Pending
        </span>
      );
    }

    return (
      <span className="badge bg-secondary-subtle text-secondary">
        {status || "Unknown"}
      </span>
    );
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return "N/A";
    }

    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =====================================================
  // TOTAL ITEMS
  // =====================================================

  const getTotalItems = (items) => {
    if (!Array.isArray(items)) {
      return 0;
    }

    return items.reduce(
      (total, item) =>
        total + Number(item.quantity || 0),
      0
    );
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div
        className="bg-light min-vh-100 d-flex align-items-center justify-content-center"
      >
        <div className="text-center">
          <div
            className="spinner-border text-primary"
            style={{
              width: "3rem",
              height: "3rem",
            }}
          ></div>

          <p className="text-muted mt-3 mb-0">
            Loading your orders...
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <div className="bg-light min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <FaBoxOpen
            size={60}
            className="text-danger mb-3"
          />

          <h4 className="fw-bold">
            Unable to Load Orders
          </h4>

          <p className="text-muted">
            {error}
          </p>

          <button
            className="btn btn-primary px-4"
            onClick={getOrders}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // =====================================================
  // EMPTY ORDERS
  // =====================================================

  if (orders.length === 0) {
    return (
      <div className="bg-light min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div
            className="bg-white shadow-sm rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
            style={{
              width: "110px",
              height: "110px",
            }}
          >
            <FaShoppingBag
              size={45}
              className="text-muted"
            />
          </div>

          <h3 className="fw-bold">
            No Orders Yet
          </h3>

          <p className="text-muted mb-4">
            You haven't placed any orders yet.
          </p>

          <a
            href="/products"
            className="btn btn-primary px-4 py-2"
          >
            Start Shopping
          </a>
        </div>
      </div>
    );
  }

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <div className="bg-light min-vh-100 py-5">

      <div className="container">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">

          <div>
            <h2 className="fw-bold mb-1">
              <FaShoppingBag className="text-primary me-2" />
              My Orders
            </h2>

            <p className="text-muted mb-0">
              Track and manage all your orders
            </p>
          </div>

          <div className="mt-3 mt-md-0">
            <span className="badge bg-primary rounded-pill px-4 py-2">
              {orders.length} Orders
            </span>
          </div>

        </div>

        {/* =================================================
            SUMMARY CARDS
        ================================================= */}

        <div className="row g-3 mb-4">

          {/* TOTAL */}

          <div className="col-6 col-lg-3">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-3">

                <div className="d-flex align-items-center">

                  <div className="bg-primary-subtle rounded-circle p-3 me-3">
                    <FaShoppingBag className="text-primary" />
                  </div>

                  <div>
                    <small className="text-muted">
                      Total Orders
                    </small>

                    <h4 className="fw-bold mb-0">
                      {orders.length}
                    </h4>
                  </div>

                </div>

              </div>
            </div>
          </div>

          {/* PENDING */}

          <div className="col-6 col-lg-3">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-3">

                <div className="d-flex align-items-center">

                  <div className="bg-warning-subtle rounded-circle p-3 me-3">
                    <FaClock className="text-warning" />
                  </div>

                  <div>
                    <small className="text-muted">
                      Pending
                    </small>

                    <h4 className="fw-bold mb-0">
                      {getStatusCount("Pending")}
                    </h4>
                  </div>

                </div>

              </div>
            </div>
          </div>

          {/* SHIPPED */}

          <div className="col-6 col-lg-3">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-3">

                <div className="d-flex align-items-center">

                  <div className="bg-info-subtle rounded-circle p-3 me-3">
                    <FaTruck className="text-info" />
                  </div>

                  <div>
                    <small className="text-muted">
                      Shipped
                    </small>

                    <h4 className="fw-bold mb-0">
                      {getStatusCount("Shipped")}
                    </h4>
                  </div>

                </div>

              </div>
            </div>
          </div>

          {/* DELIVERED */}

          <div className="col-6 col-lg-3">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-3">

                <div className="d-flex align-items-center">

                  <div className="bg-success-subtle rounded-circle p-3 me-3">
                    <FaCheckCircle className="text-success" />
                  </div>

                  <div>
                    <small className="text-muted">
                      Delivered
                    </small>

                    <h4 className="fw-bold mb-0">
                      {getStatusCount("Delivered")}
                    </h4>
                  </div>

                </div>

              </div>
            </div>
          </div>

        </div>

        {/* =================================================
            FILTERS
        ================================================= */}

        <div className="card border-0 shadow-sm rounded-4 mb-4">

          <div className="card-body p-3">

            <div className="d-flex flex-wrap gap-2">

              {[
                "All",
                "Pending",
                "Processing",
                "Shipped",
                "Delivered",
                "Cancelled",
              ].map((status) => (

                <button
                  key={status}
                  className={`btn rounded-pill px-4 ${
                    selectedStatus === status
                      ? "btn-primary"
                      : "btn-outline-secondary"
                  }`}
                  onClick={() =>
                    setSelectedStatus(status)
                  }
                >
                  {status}

                  <span
                    className={`badge ms-2 ${
                      selectedStatus === status
                        ? "bg-white text-primary"
                        : "bg-secondary"
                    }`}
                  >
                    {getStatusCount(status)}
                  </span>
                </button>

              ))}

            </div>

          </div>

        </div>

        {/* =================================================
            NO FILTER RESULTS
        ================================================= */}

        {filteredOrders.length === 0 && (
          <div className="card border-0 shadow-sm rounded-4">

            <div className="card-body text-center py-5">

              <FaBoxOpen
                size={50}
                className="text-muted mb-3"
              />

              <h5 className="fw-bold">
                No {selectedStatus} Orders
              </h5>

              <p className="text-muted mb-0">
                There are no orders with this status.
              </p>

            </div>

          </div>
        )}

        {/* =================================================
            ORDERS
        ================================================= */}

        <div className="row g-4">

          {filteredOrders.map((order) => (

            <div
              className="col-12"
              key={order.id}
            >

              <div className="card border-0 shadow-sm rounded-4">

                {/* =================================================
                    ORDER HEADER
                ================================================= */}

                <div className="card-header bg-white border-0 p-4">

                  <div className="row align-items-center g-3">

                    {/* ORDER ID */}

                    <div className="col-md-3">

                      <small className="text-muted d-block">
                        Order ID
                      </small>

                      <h6 className="fw-bold mb-0">
                        #{order.id}
                      </h6>

                    </div>

                    {/* DATE */}

                    <div className="col-md-3">

                      <small className="text-muted d-block">
                        <FaCalendarAlt className="me-1" />
                        Order Date
                      </small>

                      <span className="fw-semibold">
                        {formatDate(
                          order.orderDate
                        )}
                      </span>

                    </div>

                    {/* ITEMS */}

                    <div className="col-md-2">

                      <small className="text-muted d-block">
                        Items
                      </small>

                      <span className="fw-semibold">
                        {getTotalItems(
                          order.items
                        )}
                      </span>

                    </div>

                    {/* STATUS */}

                    <div className="col-md-2">

                      <small className="text-muted d-block mb-1">
                        Status
                      </small>

                      {getStatusBadge(
                        order.orderStatus
                      )}

                    </div>

                    {/* VIEW */}

                    <div className="col-md-2 text-md-end">

                      <button
                        className="btn btn-outline-primary rounded-3"
                        onClick={() =>
                          setSelectedOrder(order)
                        }
                      >
                        <FaEye className="me-1" />
                        View
                      </button>

                    </div>

                  </div>

                </div>

                {/* =================================================
                    ORDER BODY
                ================================================= */}

                <div className="card-body p-4 border-top">

                  <div className="row g-4">

                    {/* =================================================
                        PRODUCTS
                    ================================================= */}

                    <div className="col-lg-7">

                      <h6 className="fw-bold mb-3">
                        <FaBoxOpen className="text-primary me-2" />
                        Ordered Products
                      </h6>

                      {Array.isArray(
                        order.items
                      ) &&
                        order.items.map(
                          (item, index) => (

                            <div
                              key={index}
                              className="d-flex align-items-center border rounded-3 p-3 mb-2"
                            >

                              {/* PRODUCT IMAGE */}

                              <div
                                className="bg-light rounded-3 overflow-hidden me-3 flex-shrink-0"
                                style={{
                                  width: "75px",
                                  height: "75px",
                                }}
                              >

                                {item.image ? (
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-100 h-100"
                                    style={{
                                      objectFit:
                                        "cover",
                                    }}
                                  />
                                ) : (
                                  <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                                    <FaBoxOpen className="text-muted fs-4" />
                                  </div>
                                )}

                              </div>

                              {/* PRODUCT INFO */}

                              <div className="flex-grow-1">

                                <h6 className="fw-bold mb-1">
                                  {item.name}
                                </h6>

                                <small className="text-muted d-block">
                                  Product ID:{" "}
                                  {item.productId}
                                </small>

                                <small className="text-muted">
                                  ₹
                                  {Number(
                                    item.price || 0
                                  ).toLocaleString(
                                    "en-IN"
                                  )}{" "}
                                  ×{" "}
                                  {item.quantity}
                                </small>

                              </div>

                              {/* ITEM TOTAL */}

                              <div className="text-end">

                                <small className="text-muted d-block">
                                  Total
                                </small>

                                <strong>
                                  ₹
                                  {(
                                    Number(
                                      item.price || 0
                                    ) *
                                    Number(
                                      item.quantity ||
                                        0
                                    )
                                  ).toLocaleString(
                                    "en-IN"
                                  )}
                                </strong>

                              </div>

                            </div>

                          )
                        )}

                    </div>

                    {/* =================================================
                        CUSTOMER DETAILS
                    ================================================= */}

                    <div className="col-lg-5">

                      <h6 className="fw-bold mb-3">
                        <FaUser className="text-primary me-2" />
                        Customer Details
                      </h6>

                      <div className="bg-light rounded-3 p-3">

                        <div className="d-flex mb-2">

                          <FaUser className="text-muted me-3 mt-1" />

                          <div>
                            <small className="text-muted d-block">
                              Customer
                            </small>

                            <span className="fw-semibold">
                              {
                                order.customerName
                              }
                            </span>
                          </div>

                        </div>

                        <div className="d-flex mb-2">

                          <FaCreditCard className="text-muted me-3 mt-1" />

                          <div>
                            <small className="text-muted d-block">
                              Email
                            </small>

                            <span>
                              {order.email}
                            </span>
                          </div>

                        </div>

                        <div className="d-flex mb-2">

                          <FaPhone className="text-muted me-3 mt-1" />

                          <div>
                            <small className="text-muted d-block">
                              Phone
                            </small>

                            <span>
                              {order.phone}
                            </span>
                          </div>

                        </div>

                        <div className="d-flex">

                          <FaMapMarkerAlt className="text-muted me-3 mt-1" />

                          <div>
                            <small className="text-muted d-block">
                              Shipping Address
                            </small>

                            <span>
                              {
                                order.shippingAddress
                              }
                            </span>
                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                  <hr className="my-4" />

                  {/* =================================================
                      ORDER FOOTER
                  ================================================= */}

                  <div className="row align-items-center g-3">

                    {/* PAYMENT */}

                    <div className="col-md-4">

                      <small className="text-muted d-block mb-1">
                        Payment Method
                      </small>

                      <div className="fw-semibold">
                        <FaCreditCard className="text-primary me-2" />

                        {order.paymentMethod ||
                          "N/A"}

                      </div>

                      <div className="mt-1">
                        {getPaymentStatusBadge(
                          order.paymentStatus
                        )}
                      </div>

                    </div>

                    {/* TOTAL */}

                    <div className="col-md-4">

                      <small className="text-muted d-block">
                        Total Amount
                      </small>

                      <h5 className="fw-bold text-primary mb-0">
                        ₹
                        {Number(
                          order.totalAmount || 0
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </h5>

                    </div>

                    {/* ACTIONS */}

                    <div className="col-md-4 text-md-end">

                      <button
                        className="btn btn-outline-primary rounded-3 me-2"
                        onClick={() =>
                          setSelectedOrder(order)
                        }
                      >
                        <FaReceipt className="me-1" />
                        Details
                      </button>

                      <button
                        className="btn btn-outline-danger rounded-3"
                        onClick={() =>
                          handleDeleteOrder(
                            order.id
                          )
                        }
                      >
                        <FaTrash />
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* =====================================================
          ORDER DETAILS MODAL
      ===================================================== */}

      {selectedOrder && (

        <div
          className="modal fade show d-block"
          style={{
            backgroundColor:
              "rgba(0,0,0,0.5)",
          }}
          tabIndex="-1"
        >

          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">

            <div className="modal-content border-0 rounded-4">

              {/* MODAL HEADER */}

              <div className="modal-header">

                <div>
                  <h5 className="modal-title fw-bold">
                    Order Details
                  </h5>

                  <small className="text-muted">
                    Order #{selectedOrder.id}
                  </small>
                </div>

                <button
                  type="button"
                  className="btn-close"
                  onClick={() =>
                    setSelectedOrder(null)
                  }
                ></button>

              </div>

              {/* MODAL BODY */}

              <div className="modal-body p-4">

                {/* STATUS */}

                <div className="d-flex justify-content-between align-items-center mb-4">

                  <div>
                    <small className="text-muted">
                      Order Status
                    </small>

                    <div className="mt-1">
                      {getStatusBadge(
                        selectedOrder.orderStatus
                      )}
                    </div>
                  </div>

                  <div className="text-end">

                    <small className="text-muted d-block">
                      Order Date
                    </small>

                    <strong>
                      {formatDate(
                        selectedOrder.orderDate
                      )}
                    </strong>

                  </div>

                </div>

                {/* CUSTOMER */}

                <div className="card bg-light border-0 rounded-3 mb-4">

                  <div className="card-body">

                    <h6 className="fw-bold mb-3">
                      Customer Information
                    </h6>

                    <div className="row g-3">

                      <div className="col-md-6">
                        <small className="text-muted d-block">
                          Name
                        </small>

                        <strong>
                          {
                            selectedOrder.customerName
                          }
                        </strong>
                      </div>

                      <div className="col-md-6">
                        <small className="text-muted d-block">
                          Phone
                        </small>

                        <strong>
                          {
                            selectedOrder.phone
                          }
                        </strong>
                      </div>

                      <div className="col-md-6">
                        <small className="text-muted d-block">
                          Email
                        </small>

                        <strong>
                          {
                            selectedOrder.email
                          }
                        </strong>
                      </div>

                      <div className="col-md-6">
                        <small className="text-muted d-block">
                          Address
                        </small>

                        <strong>
                          {
                            selectedOrder.shippingAddress
                          }
                        </strong>
                      </div>

                    </div>

                  </div>

                </div>

                {/* PRODUCTS */}

                <h6 className="fw-bold mb-3">
                  Ordered Products
                </h6>

                {selectedOrder.items?.map(
                  (item, index) => (

                    <div
                      key={index}
                      className="d-flex align-items-center border rounded-3 p-3 mb-2"
                    >

                      <div
                        className="bg-light rounded-3 overflow-hidden me-3"
                        style={{
                          width: "65px",
                          height: "65px",
                        }}
                      >

                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-100 h-100"
                            style={{
                              objectFit:
                                "cover",
                            }}
                          />
                        ) : (
                          <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                            <FaBoxOpen className="text-muted" />
                          </div>
                        )}

                      </div>

                      <div className="flex-grow-1">

                        <h6 className="fw-bold mb-1">
                          {item.name}
                        </h6>

                        <small className="text-muted">
                          ₹
                          {Number(
                            item.price || 0
                          ).toLocaleString(
                            "en-IN"
                          )}{" "}
                          × {item.quantity}
                        </small>

                      </div>

                      <strong>
                        ₹
                        {(
                          Number(
                            item.price || 0
                          ) *
                          Number(
                            item.quantity || 0
                          )
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </strong>

                    </div>

                  )
                )}

                <hr className="my-4" />

                {/* PAYMENT */}

                <div className="row g-3">

                  <div className="col-md-6">

                    <small className="text-muted d-block">
                      Payment Method
                    </small>

                    <strong>
                      {selectedOrder.paymentMethod ||
                        "N/A"}
                    </strong>

                  </div>

                  <div className="col-md-6">

                    <small className="text-muted d-block">
                      Payment Status
                    </small>

                    <div className="mt-1">
                      {getPaymentStatusBadge(
                        selectedOrder.paymentStatus
                      )}
                    </div>

                  </div>

                </div>

                <hr />

                {/* TOTAL */}

                <div className="d-flex justify-content-between align-items-center">

                  <span className="fs-5 fw-bold">
                    Total Amount
                  </span>

                  <span className="fs-4 fw-bold text-primary">
                    ₹
                    {Number(
                      selectedOrder.totalAmount ||
                        0
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </span>

                </div>

              </div>

              {/* MODAL FOOTER */}

              <div className="modal-footer">

                <button
                  className="btn btn-secondary px-4"
                  onClick={() =>
                    setSelectedOrder(null)
                  }
                >
                  Close
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Orders;