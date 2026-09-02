import React, { useEffect, useMemo, useState } from "react";
import {
  FaSearch,
  FaFilter,
  FaEye,
  FaEdit,
  FaTrash,
  FaShoppingCart,
  FaClock,
  FaCheckCircle,
  FaTruck,
  FaTimes,
  FaBoxOpen,
  FaSpinner,
} from "react-icons/fa";

import {
  getAllOrdersAPI,
  updateOrderAPI,
  deleteOrderAPI,
} from "../Services/Api";

function AdminOrders() {
  // =====================================================
  // STATES
  // =====================================================

  const [orders, setOrders] = useState([]);

  const [searchKey, setSearchKey] = useState("");

  const [selectedStatus, setSelectedStatus] = useState("All Status");

  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [editOrder, setEditOrder] = useState(null);

  const [deleteLoading, setDeleteLoading] = useState(false);

  const [updateLoading, setUpdateLoading] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  const ordersPerPage = 5;

  // =====================================================
  // FETCH ORDERS
  // =====================================================

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllOrdersAPI();

      // Axios response
      if (response?.data) {
        setOrders(response.data);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error("Fetch Orders Error:", err);

      setError(
        err?.response?.data?.message ||
          "Failed to load orders. Please check JSON Server."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // =====================================================
  // HELPER
  // =====================================================

  const getItemCount = (items = []) => {
    return items.reduce(
      (total, item) => total + Number(item.quantity || 0),
      0
    );
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    return Number(amount || 0).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    });
  };

  const getInitials = (name = "") => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  // =====================================================
  // STATISTICS
  // =====================================================

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.orderStatus === "Pending"
  ).length;

  const processingOrders = orders.filter(
    (order) =>
      order.orderStatus === "Processing" ||
      order.orderStatus === "Shipped"
  ).length;

  const completedOrders = orders.filter(
    (order) => order.orderStatus === "Delivered"
  ).length;

  // =====================================================
  // FILTER ORDERS
  // =====================================================

  const filteredOrders = useMemo(() => {
    let result = [...orders];

    // Search
    if (searchKey.trim()) {
      const search = searchKey.toLowerCase();

      result = result.filter((order) => {
        return (
          String(order.id).toLowerCase().includes(search) ||
          String(order.customerName || "")
            .toLowerCase()
            .includes(search) ||
          String(order.email || "")
            .toLowerCase()
            .includes(search)
        );
      });
    }

    // Status
    if (selectedStatus !== "All Status") {
      result = result.filter(
        (order) => order.orderStatus === selectedStatus
      );
    }

    return result;
  }, [orders, searchKey, selectedStatus]);

  // =====================================================
  // PAGINATION
  // =====================================================

  const totalPages = Math.ceil(
    filteredOrders.length / ordersPerPage
  );

  const indexOfLastOrder = currentPage * ordersPerPage;

  const indexOfFirstOrder =
    indexOfLastOrder - ordersPerPage;

  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  // Reset page when search/filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchKey, selectedStatus]);

  // =====================================================
  // DELETE ORDER
  // =====================================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmDelete) return;

    try {
      setDeleteLoading(true);

      await deleteOrderAPI(id);

      setOrders((prevOrders) =>
        prevOrders.filter(
          (order) => String(order.id) !== String(id)
        )
      );

      setSuccessMessage("Order deleted successfully.");

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (err) {
      console.error("Delete Order Error:", err);

      alert("Failed to delete order.");
    } finally {
      setDeleteLoading(false);
    }
  };

  // =====================================================
  // UPDATE ORDER
  // =====================================================

  const handleUpdateOrder = async (e) => {
    e.preventDefault();

    if (!editOrder) return;

    try {
      setUpdateLoading(true);

      const updatedData = {
        orderStatus: editOrder.orderStatus,
        paymentStatus: editOrder.paymentStatus,
      };

      await updateOrderAPI(editOrder.id, updatedData);

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          String(order.id) === String(editOrder.id)
            ? {
                ...order,
                ...updatedData,
              }
            : order
        )
      );

      setEditOrder(null);

      setSuccessMessage("Order updated successfully.");

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (err) {
      console.error("Update Order Error:", err);

      alert("Failed to update order.");
    } finally {
      setUpdateLoading(false);
    }
  };

  // =====================================================
  // STATUS BADGE
  // =====================================================

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return {
          backgroundColor: "#fff3cd",
          color: "#997404",
        };

      case "Processing":
        return {
          backgroundColor: "#cff4fc",
          color: "#087990",
        };

      case "Shipped":
        return {
          backgroundColor: "#e7f1ff",
          color: "#0d6efd",
        };

      case "Delivered":
        return {
          backgroundColor: "#d1e7dd",
          color: "#146c43",
        };

      case "Cancelled":
        return {
          backgroundColor: "#f8d7da",
          color: "#b02a37",
        };

      default:
        return {
          backgroundColor: "#e9ecef",
          color: "#495057",
        };
    }
  };

  // =====================================================
  // PAYMENT BADGE
  // =====================================================

  const getPaymentStyle = (status) => {
    if (status === "Paid") {
      return {
        backgroundColor: "#d1e7dd",
        color: "#146c43",
      };
    }

    return {
      backgroundColor: "#fff3cd",
      color: "#997404",
    };
  };

  // =====================================================
  // PAGINATION BUTTONS
  // =====================================================

  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <>
      <div
        className="container-fluid min-vh-100 py-4 px-3 px-md-4"
        style={{
          marginLeft: "262px",
          width: "calc(100% - 262px)",
          backgroundColor: "#f8f9fa",
        }}
      >
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
          <div>
            <h2 className="fw-bold mb-1">Orders</h2>

            <p className="text-muted mb-0">
              Manage and track all customer orders
            </p>
          </div>
        </div>

        {/* =====================================================
            SUCCESS MESSAGE
        ===================================================== */}

        {successMessage && (
          <div className="alert alert-success alert-dismissible fade show">
            {successMessage}

            <button
              className="btn-close"
              onClick={() => setSuccessMessage("")}
            ></button>
          </div>
        )}

        {/* =====================================================
            ERROR
        ===================================================== */}

        {error && (
          <div className="alert alert-danger">
            {error}

            <button
              className="btn btn-sm btn-outline-danger ms-3"
              onClick={fetchOrders}
            >
              Retry
            </button>
          </div>
        )}

        {/* =====================================================
            STATISTICS
        ===================================================== */}

        <div className="row g-3 mb-4">
          {/* Total Orders */}

          <div className="col-12 col-sm-6 col-xl-3">
            <div className="bg-white rounded-4 p-4 shadow-sm h-100">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-2">
                    Total Orders
                  </p>

                  <h3 className="fw-bold mb-1">
                    {totalOrders}
                  </h3>

                  <small className="text-primary">
                    All orders
                  </small>
                </div>

                <div
                  className="rounded-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: "#fff1e8",
                    color: "#ff7518",
                  }}
                >
                  <FaShoppingCart size={22} />
                </div>
              </div>
            </div>
          </div>

          {/* Pending */}

          <div className="col-12 col-sm-6 col-xl-3">
            <div className="bg-white rounded-4 p-4 shadow-sm h-100">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-2">
                    Pending
                  </p>

                  <h3 className="fw-bold mb-1">
                    {pendingOrders}
                  </h3>

                  <small className="text-warning">
                    Needs attention
                  </small>
                </div>

                <div
                  className="rounded-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: "#fff8df",
                    color: "#f5b400",
                  }}
                >
                  <FaClock size={22} />
                </div>
              </div>
            </div>
          </div>

          {/* Processing */}

          <div className="col-12 col-sm-6 col-xl-3">
            <div className="bg-white rounded-4 p-4 shadow-sm h-100">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-2">
                    Processing
                  </p>

                  <h3 className="fw-bold mb-1">
                    {processingOrders}
                  </h3>

                  <small className="text-info">
                    Being prepared / shipped
                  </small>
                </div>

                <div
                  className="rounded-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: "#e7f8ff",
                    color: "#0d9dcc",
                  }}
                >
                  <FaTruck size={22} />
                </div>
              </div>
            </div>
          </div>

          {/* Completed */}

          <div className="col-12 col-sm-6 col-xl-3">
            <div className="bg-white rounded-4 p-4 shadow-sm h-100">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-2">
                    Completed
                  </p>

                  <h3 className="fw-bold mb-1">
                    {completedOrders}
                  </h3>

                  <small className="text-success">
                    Successfully delivered
                  </small>
                </div>

                <div
                  className="rounded-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: "#e6f7ef",
                    color: "#198754",
                  }}
                >
                  <FaCheckCircle size={22} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            ORDERS CARD
        ===================================================== */}

        <div className="bg-white rounded-4 shadow-sm overflow-hidden">
          {/* Search / Filter */}

          <div className="p-3 p-md-4 border-bottom">
            <div className="row g-3">
              {/* Search */}

              <div className="col-12 col-lg-6">
                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <FaSearch />
                  </span>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by order ID, customer or email..."
                    value={searchKey}
                    onChange={(e) =>
                      setSearchKey(e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Status */}

              <div className="col-12 col-sm-6 col-lg-3">
                <select
                  className="form-select"
                  value={selectedStatus}
                  onChange={(e) =>
                    setSelectedStatus(e.target.value)
                  }
                >
                  <option>All Status</option>
                  <option>Pending</option>
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </select>
              </div>

              {/* Filter */}

              <div className="col-12 col-sm-6 col-lg-3">
                <button
                  className="btn w-100"
                  style={{
                    backgroundColor: "#212529",
                    color: "#fff",
                  }}
                  onClick={() => {
                    setSearchKey("");
                    setSelectedStatus("All Status");
                  }}
                >
                  <FaFilter className="me-2" />
                  Clear Filter
                </button>
              </div>
            </div>
          </div>

          {/* =====================================================
              TABLE
          ===================================================== */}

          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead style={{ backgroundColor: "#f8f9fa" }}>
                <tr>
                  <th className="px-4 py-3">Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {/* Loading */}

                {loading && (
                  <tr>
                    <td
                      colSpan="8"
                      className="text-center py-5"
                    >
                      <FaSpinner
                        className="fa-spin me-2"
                      />
                      Loading orders...
                    </td>
                  </tr>
                )}

                {/* Empty */}

                {!loading &&
                  currentOrders.length === 0 && (
                    <tr>
                      <td
                        colSpan="8"
                        className="text-center py-5"
                      >
                        <FaBoxOpen
                          size={40}
                          className="text-muted mb-3"
                        />

                        <h5>No orders found</h5>

                        <p className="text-muted mb-0">
                          Try changing your search or filter.
                        </p>
                      </td>
                    </tr>
                  )}

                {/* Orders */}

                {!loading &&
                  currentOrders.map((order) => (
                    <tr key={order.id}>
                      {/* Order ID */}

                      <td className="px-4 fw-semibold">
                        #ORD-{order.id}
                      </td>

                      {/* Customer */}

                      <td>
                        <div className="d-flex align-items-center">
                          <div
                            className="rounded-circle d-flex align-items-center justify-content-center me-2 flex-shrink-0"
                            style={{
                              width: "38px",
                              height: "38px",
                              backgroundColor: "#e9ecef",
                            }}
                          >
                            {getInitials(
                              order.customerName
                            )}
                          </div>

                          <div>
                            <div className="fw-semibold">
                              {order.customerName}
                            </div>

                            <small className="text-muted">
                              {order.email}
                            </small>
                          </div>
                        </div>
                      </td>

                      {/* Date */}

                      <td>
                        {formatDate(order.orderDate)}
                      </td>

                      {/* Items */}

                      <td>
                        {getItemCount(order.items)}{" "}
                        {getItemCount(order.items) === 1
                          ? "item"
                          : "items"}
                      </td>

                      {/* Amount */}

                      <td className="fw-semibold">
                        {formatCurrency(order.totalAmount)}
                      </td>

                      {/* Payment */}

                      <td>
                        <span
                          className="badge rounded-pill px-3 py-2"
                          style={getPaymentStyle(
                            order.paymentStatus
                          )}
                        >
                          {order.paymentStatus}
                        </span>
                      </td>

                      {/* Status */}

                      <td>
                        <span
                          className="badge rounded-pill px-3 py-2"
                          style={getStatusStyle(
                            order.orderStatus
                          )}
                        >
                          {order.orderStatus}
                        </span>
                      </td>

                      {/* Actions */}

                      <td>
                        <div className="d-flex justify-content-center gap-2">
                          {/* View */}

                          <button
                            className="btn btn-light btn-sm"
                            title="View Order"
                            onClick={() =>
                              setSelectedOrder(order)
                            }
                          >
                            <FaEye />
                          </button>

                          {/* Edit */}

                          <button
                            className="btn btn-light btn-sm"
                            title="Edit Order"
                            onClick={() =>
                              setEditOrder({
                                ...order,
                              })
                            }
                          >
                            <FaEdit />
                          </button>

                          {/* Delete */}

                          <button
                            className="btn btn-light btn-sm text-danger"
                            title="Delete Order"
                            disabled={deleteLoading}
                            onClick={() =>
                              handleDelete(order.id)
                            }
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* =====================================================
              PAGINATION
          ===================================================== */}

          {!loading && filteredOrders.length > 0 && (
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center p-3 border-top gap-3">
              <small className="text-muted">
                Showing {indexOfFirstOrder + 1} to{" "}
                {Math.min(
                  indexOfLastOrder,
                  filteredOrders.length
                )}{" "}
                of {filteredOrders.length} orders
              </small>

              <nav>
                <ul className="pagination mb-0">
                  {/* Previous */}

                  <li
                    className={`page-item ${
                      currentPage === 1
                        ? "disabled"
                        : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() =>
                        setCurrentPage((prev) =>
                          Math.max(prev - 1, 1)
                        )
                      }
                    >
                      Previous
                    </button>
                  </li>

                  {/* Pages */}

                  {pageNumbers.map((number) => (
                    <li
                      key={number}
                      className={`page-item ${
                        currentPage === number
                          ? "active"
                          : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        style={
                          currentPage === number
                            ? {
                                backgroundColor:
                                  "#ff7518",
                                borderColor:
                                  "#ff7518",
                              }
                            : {}
                        }
                        onClick={() =>
                          setCurrentPage(number)
                        }
                      >
                        {number}
                      </button>
                    </li>
                  ))}

                  {/* Next */}

                  <li
                    className={`page-item ${
                      currentPage === totalPages
                        ? "disabled"
                        : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() =>
                        setCurrentPage((prev) =>
                          Math.min(
                            prev + 1,
                            totalPages
                          )
                        )
                      }
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>

      {/* =====================================================
          VIEW ORDER MODAL
      ===================================================== */}

      {selectedOrder && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content rounded-4 border-0">
              <div className="modal-header">
                <div>
                  <h5 className="modal-title fw-bold">
                    Order #ORD-{selectedOrder.id}
                  </h5>

                  <small className="text-muted">
                    {formatDate(
                      selectedOrder.orderDate
                    )}
                  </small>
                </div>

                <button
                  className="btn btn-light"
                  onClick={() =>
                    setSelectedOrder(null)
                  }
                >
                  <FaTimes />
                </button>
              </div>

              <div className="modal-body">
                {/* Customer */}

                <div className="card border-0 bg-light rounded-4 mb-3">
                  <div className="card-body">
                    <h6 className="fw-bold mb-3">
                      Customer Information
                    </h6>

                    <div className="row g-3">
                      <div className="col-md-6">
                        <small className="text-muted">
                          Name
                        </small>

                        <div className="fw-semibold">
                          {selectedOrder.customerName}
                        </div>
                      </div>

                      <div className="col-md-6">
                        <small className="text-muted">
                          Email
                        </small>

                        <div className="fw-semibold">
                          {selectedOrder.email}
                        </div>
                      </div>

                      <div className="col-md-6">
                        <small className="text-muted">
                          Phone
                        </small>

                        <div className="fw-semibold">
                          {selectedOrder.phone}
                        </div>
                      </div>

                      <div className="col-md-6">
                        <small className="text-muted">
                          Shipping Address
                        </small>

                        <div className="fw-semibold">
                          {selectedOrder.shippingAddress}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Products */}

                <h6 className="fw-bold mb-3">
                  Order Items
                </h6>

                <div className="table-responsive">
                  <table className="table table-bordered align-middle">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Total</th>
                      </tr>
                    </thead>

                    <tbody>
                      {selectedOrder.items?.map(
                        (item, index) => (
                          <tr key={index}>
                            <td>
                              <div className="fw-semibold">
                                {item.name}
                              </div>

                              <small className="text-muted">
                                Product ID:{" "}
                                {item.productId}
                              </small>
                            </td>

                            <td>
                              {formatCurrency(
                                item.price
                              )}
                            </td>

                            <td>{item.quantity}</td>

                            <td className="fw-semibold">
                              {formatCurrency(
                                item.price *
                                  item.quantity
                              )}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Payment / Total */}

                <div className="row g-3 mt-2">
                  <div className="col-md-6">
                    <div className="border rounded-3 p-3">
                      <small className="text-muted">
                        Payment Method
                      </small>

                      <div className="fw-semibold">
                        {selectedOrder.paymentMethod}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="border rounded-3 p-3">
                      <small className="text-muted">
                        Payment Status
                      </small>

                      <div>
                        <span
                          className="badge rounded-pill mt-1 px-3 py-2"
                          style={getPaymentStyle(
                            selectedOrder.paymentStatus
                          )}
                        >
                          {selectedOrder.paymentStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-end mt-4">
                  <small className="text-muted">
                    Total Amount
                  </small>

                  <h3 className="fw-bold">
                    {formatCurrency(
                      selectedOrder.totalAmount
                    )}
                  </h3>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
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

      {/* =====================================================
          EDIT ORDER MODAL
      ===================================================== */}

      {editOrder && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0">
              <div className="modal-header">
                <div>
                  <h5 className="modal-title fw-bold">
                    Edit Order
                  </h5>

                  <small className="text-muted">
                    #ORD-{editOrder.id}
                  </small>
                </div>

                <button
                  className="btn btn-light"
                  onClick={() => setEditOrder(null)}
                >
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleUpdateOrder}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Customer
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      value={editOrder.customerName}
                      disabled
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Order Status
                    </label>

                    <select
                      className="form-select"
                      value={editOrder.orderStatus}
                      onChange={(e) =>
                        setEditOrder({
                          ...editOrder,
                          orderStatus:
                            e.target.value,
                        })
                      }
                    >
                      <option>Pending</option>
                      <option>Processing</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                      <option>Cancelled</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Payment Status
                    </label>

                    <select
                      className="form-select"
                      value={editOrder.paymentStatus}
                      onChange={(e) =>
                        setEditOrder({
                          ...editOrder,
                          paymentStatus:
                            e.target.value,
                        })
                      }
                    >
                      <option>Pending</option>
                      <option>Paid</option>
                    </select>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() =>
                      setEditOrder(null)
                    }
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn text-white"
                    style={{
                      backgroundColor: "#ff7518",
                    }}
                    disabled={updateLoading}
                  >
                    {updateLoading ? (
                      <>
                        <FaSpinner className="fa-spin me-2" />
                        Updating...
                      </>
                    ) : (
                      "Update Order"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminOrders;