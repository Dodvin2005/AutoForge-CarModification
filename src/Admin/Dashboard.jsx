import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCar,
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaRupeeSign,
  FaArrowUp,
  FaArrowDown,
  FaPlus,
  FaChartLine,
  FaRedo,
} from "react-icons/fa";

import {
  getAllProductsAPI,
  getAllOrdersAPI,
} from "../Services/Api";

function Dashboard() {
  // =====================================================
  // STATES
  // =====================================================

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [salesPeriod, setSalesPeriod] = useState("This Month");

  // =====================================================
  // LOAD DASHBOARD DATA
  // =====================================================

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const [productsResponse, ordersResponse] = await Promise.all([
        getAllProductsAPI(),
        getAllOrdersAPI(),
      ]);

      // -------------------------------------------------
      // Handle different ApiService response structures
      // -------------------------------------------------

      const productsData =
        productsResponse?.data ||
        productsResponse ||
        [];

      const ordersData =
        ordersResponse?.data ||
        ordersResponse ||
        [];

      setProducts(
        Array.isArray(productsData)
          ? productsData
          : []
      );

      setOrders(
        Array.isArray(ordersData)
          ? ordersData
          : []
      );
    } catch (err) {
      console.error("Dashboard API Error:", err);

      setError(
        "Unable to load dashboard data. Please make sure JSON Server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // USE EFFECT
  // =====================================================

  useEffect(() => {
    loadDashboardData();
  }, []);

  // =====================================================
  // HELPER FUNCTIONS
  // =====================================================

  const getNumber = (value) => {
    const number = Number(value);

    return Number.isFinite(number)
      ? number
      : 0;
  };

  const getOrderAmount = (order) => {
    // Different possible field names
    if (order?.totalAmount !== undefined) {
      return getNumber(order.totalAmount);
    }

    if (order?.total !== undefined) {
      return getNumber(order.total);
    }

    if (order?.amount !== undefined) {
      return getNumber(order.amount);
    }

    if (order?.price !== undefined) {
      return (
        getNumber(order.price) *
        getNumber(order.quantity || 1)
      );
    }

    // If order has products/items array
    if (Array.isArray(order?.items)) {
      return order.items.reduce((total, item) => {
        return (
          total +
          getNumber(item.price) *
            getNumber(item.quantity || 1)
        );
      }, 0);
    }

    if (Array.isArray(order?.products)) {
      return order.products.reduce((total, item) => {
        return (
          total +
          getNumber(item.price) *
            getNumber(item.quantity || 1)
        );
      }, 0);
    }

    return 0;
  };

  const getCustomerName = (order) => {
    return (
      order?.customerName ||
      order?.customer ||
      order?.userName ||
      order?.name ||
      "Unknown Customer"
    );
  };

  const getProductName = (order) => {
    if (order?.productName) {
      return order.productName;
    }

    if (order?.product) {
      if (typeof order.product === "string") {
        return order.product;
      }

      if (typeof order.product === "object") {
        return (
          order.product.name ||
          order.product.title ||
          "Product"
        );
      }
    }

    if (Array.isArray(order?.items)) {
      return (
        order.items[0]?.name ||
        order.items[0]?.productName ||
        "Multiple Products"
      );
    }

    if (Array.isArray(order?.products)) {
      return (
        order.products[0]?.name ||
        order.products[0]?.productName ||
        "Multiple Products"
      );
    }

    return "Product";
  };

  const getOrderDate = (order) => {
    return (
      order?.createdAt ||
      order?.date ||
      order?.orderDate ||
      null
    );
  };

  const formatCurrency = (amount) => {
    return `₹${getNumber(amount).toLocaleString("en-IN")}`;
  };

  // =====================================================
  // TOTAL REVENUE
  // =====================================================

  const totalRevenue = useMemo(() => {
    return orders.reduce((total, order) => {
      return total + getOrderAmount(order);
    }, 0);
  }, [orders]);

  // =====================================================
  // TOTAL ORDERS
  // =====================================================

  const totalOrders = orders.length;

  // =====================================================
  // TOTAL PRODUCTS
  // =====================================================

  const totalProducts = products.length;

  // =====================================================
  // TOTAL CUSTOMERS
  // =====================================================

  const totalCustomers = useMemo(() => {
    const customers = new Set();

    orders.forEach((order) => {
      const customer =
        order?.customerId ||
        order?.userId ||
        order?.email ||
        order?.customerEmail ||
        getCustomerName(order);

      if (customer) {
        customers.add(String(customer));
      }
    });

    return customers.size;
  }, [orders]);

  // =====================================================
  // RECENT ORDERS
  // =====================================================

  const recentOrders = useMemo(() => {
    return [...orders]
      .sort((a, b) => {
        const dateA = new Date(
          getOrderDate(a) || 0
        ).getTime();

        const dateB = new Date(
          getOrderDate(b) || 0
        ).getTime();

        return dateB - dateA;
      })
      .slice(0, 5);
  }, [orders]);

  // =====================================================
  // TOP PRODUCTS
  // =====================================================

  const topProducts = useMemo(() => {
    const productMap = {};

    orders.forEach((order) => {
      // -----------------------------------------------
      // Orders with items array
      // -----------------------------------------------

      if (Array.isArray(order?.items)) {
        order.items.forEach((item) => {
          const name =
            item?.name ||
            item?.productName ||
            "Unknown Product";

          const quantity = getNumber(
            item?.quantity || 1
          );

          const revenue =
            getNumber(item?.price) * quantity;

          if (!productMap[name]) {
            productMap[name] = {
              name,
              category:
                item?.category || "Automotive",
              sold: 0,
              revenue: 0,
            };
          }

          productMap[name].sold += quantity;
          productMap[name].revenue += revenue;
        });

        return;
      }

      // -----------------------------------------------
      // Orders with products array
      // -----------------------------------------------

      if (Array.isArray(order?.products)) {
        order.products.forEach((item) => {
          const name =
            item?.name ||
            item?.productName ||
            "Unknown Product";

          const quantity = getNumber(
            item?.quantity || 1
          );

          const revenue =
            getNumber(item?.price) * quantity;

          if (!productMap[name]) {
            productMap[name] = {
              name,
              category:
                item?.category || "Automotive",
              sold: 0,
              revenue: 0,
            };
          }

          productMap[name].sold += quantity;
          productMap[name].revenue += revenue;
        });

        return;
      }

      // -----------------------------------------------
      // Single product order
      // -----------------------------------------------

      const name = getProductName(order);

      const quantity = getNumber(
        order?.quantity || 1
      );

      const revenue = getOrderAmount(order);

      if (!productMap[name]) {
        productMap[name] = {
          name,
          category:
            order?.category || "Automotive",
          sold: 0,
          revenue: 0,
        };
      }

      productMap[name].sold += quantity;
      productMap[name].revenue += revenue;
    });

    return Object.values(productMap)
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 5);
  }, [orders]);

  // =====================================================
  // SALES DATA
  // =====================================================

  const salesData = useMemo(() => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthlySales = months.map((month) => ({
      month,
      amount: 0,
    }));

    orders.forEach((order) => {
      const date = getOrderDate(order);

      if (!date) return;

      const parsedDate = new Date(date);

      if (Number.isNaN(parsedDate.getTime())) {
        return;
      }

      const monthIndex =
        parsedDate.getMonth();

      monthlySales[monthIndex].amount +=
        getOrderAmount(order);
    });

    return monthlySales;
  }, [orders]);

  // =====================================================
  // MAX SALES FOR CHART
  // =====================================================

  const maxSales = Math.max(
    ...salesData.map((item) => item.amount),
    1
  );

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div
        className="bg-light min-vh-100 d-flex align-items-center justify-content-center"
        style={{
          marginLeft: "250px",
        }}
      >
        <div className="text-center">
          <div
            className="spinner-border text-warning mb-3"
            role="status"
          ></div>

          <h5 className="fw-semibold">
            Loading Dashboard...
          </h5>

          <p className="text-muted mb-0">
            Fetching your store data
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // MAIN DASHBOARD
  // =====================================================

  return (
    <div className="bg-light min-vh-100">
      <main
        className="min-vh-100"
        style={{
          marginLeft: "250px",
        }}
      >
        <div className="container-fluid px-3 px-md-4 py-4">

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 px-3">
            <div>
              <h3 className="fw-bold mb-1">
                Welcome, Dodvin 👋
              </h3>

              <p className="text-muted mb-0">
                Here's what's happening with your
                automotive store today.
              </p>
            </div>

            <button
              className="btn btn-dark mt-3 mt-md-0"
              onClick={loadDashboardData}
            >
              <FaRedo className="me-2" />
              Refresh
            </button>
          </div>

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <div
              className="alert alert-danger d-flex justify-content-between align-items-center"
              role="alert"
            >
              <span>{error}</span>

              <button
                className="btn btn-sm btn-danger"
                onClick={loadDashboardData}
              >
                Retry
              </button>
            </div>
          )}

          {/* =================================================
              STAT CARDS
          ================================================= */}

          <div className="row g-3 g-xl-4 mb-4">

            {/* REVENUE */}

            <div className="col-12 col-sm-6 col-xl-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between">
                    <div>
                      <small className="text-muted">
                        Total Revenue
                      </small>

                      <h3 className="fw-bold mt-2 mb-2">
                        {formatCurrency(totalRevenue)}
                      </h3>

                      <small className="text-success fw-semibold">
                        <FaArrowUp className="me-1" />
                        Live
                      </small>

                      <small className="text-muted ms-2">
                        from orders
                      </small>
                    </div>

                    <div
                      className="bg-dark text-warning rounded-3 d-flex align-items-center justify-content-center"
                      style={{
                        width: "48px",
                        height: "48px",
                      }}
                    >
                      <FaRupeeSign />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ORDERS */}

            <div className="col-12 col-sm-6 col-xl-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between">
                    <div>
                      <small className="text-muted">
                        Total Orders
                      </small>

                      <h3 className="fw-bold mt-2 mb-2">
                        {totalOrders.toLocaleString(
                          "en-IN"
                        )}
                      </h3>

                      <small className="text-success fw-semibold">
                        <FaArrowUp className="me-1" />
                        Live
                      </small>

                      <small className="text-muted ms-2">
                        from JSON Server
                      </small>
                    </div>

                    <div
                      className="bg-dark text-warning rounded-3 d-flex align-items-center justify-content-center"
                      style={{
                        width: "48px",
                        height: "48px",
                      }}
                    >
                      <FaShoppingCart />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* PRODUCTS */}

            <div className="col-12 col-sm-6 col-xl-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between">
                    <div>
                      <small className="text-muted">
                        Total Products
                      </small>

                      <h3 className="fw-bold mt-2 mb-2">
                        {totalProducts.toLocaleString(
                          "en-IN"
                        )}
                      </h3>

                      <small className="text-success fw-semibold">
                        <FaArrowUp className="me-1" />
                        Live
                      </small>

                      <small className="text-muted ms-2">
                        in inventory
                      </small>
                    </div>

                    <div
                      className="bg-dark text-warning rounded-3 d-flex align-items-center justify-content-center"
                      style={{
                        width: "48px",
                        height: "48px",
                      }}
                    >
                      <FaBoxOpen />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CUSTOMERS */}

            <div className="col-12 col-sm-6 col-xl-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between">
                    <div>
                      <small className="text-muted">
                        Customers
                      </small>

                      <h3 className="fw-bold mt-2 mb-2">
                        {totalCustomers.toLocaleString(
                          "en-IN"
                        )}
                      </h3>

                      <small className="text-success fw-semibold">
                        <FaArrowUp className="me-1" />
                        Live
                      </small>

                      <small className="text-muted ms-2">
                        unique customers
                      </small>
                    </div>

                    <div
                      className="bg-dark text-warning rounded-3 d-flex align-items-center justify-content-center"
                      style={{
                        width: "48px",
                        height: "48px",
                      }}
                    >
                      <FaUsers />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              SALES + QUICK ACTIONS
          ================================================= */}

          <div className="row g-4 mb-4">

            {/* SALES */}

            <div className="col-12 col-xl-8">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                      <h5 className="fw-bold mb-1">
                        Sales Overview
                      </h5>

                      <small className="text-muted">
                        Revenue performance
                      </small>
                    </div>

                    <select
                      className="form-select form-select-sm w-auto"
                      value={salesPeriod}
                      onChange={(e) =>
                        setSalesPeriod(e.target.value)
                      }
                    >
                      <option>
                        This Month
                      </option>

                      <option>
                        Last Month
                      </option>

                      <option>
                        This Year
                      </option>
                    </select>
                  </div>

                  {/* SALES SUMMARY */}

                  <div className="mb-4">
                    <h3 className="fw-bold mb-1">
                      {formatCurrency(totalRevenue)}
                    </h3>

                    <p className="text-muted mb-0">
                      Total revenue generated
                    </p>
                  </div>

                  {/* SIMPLE BAR CHART */}

                  <div
                    className="bg-light rounded-4 p-3"
                    style={{
                      minHeight: "260px",
                    }}
                  >
                    <div
                      className="d-flex align-items-end justify-content-between gap-2"
                      style={{
                        height: "210px",
                      }}
                    >
                      {salesData.map(
                        (item, index) => {
                          const height =
                            item.amount > 0
                              ? Math.max(
                                  (item.amount /
                                    maxSales) *
                                    180,
                                  8
                                )
                              : 5;

                          return (
                            <div
                              key={index}
                              className="d-flex flex-column align-items-center justify-content-end flex-grow-1 h-100"
                            >
                              <div
                                className="bg-dark rounded-top"
                                title={`${item.month}: ${formatCurrency(
                                  item.amount
                                )}`}
                                style={{
                                  width: "70%",
                                  maxWidth: "35px",
                                  height: `${height}px`,
                                }}
                              ></div>

                              <small className="text-muted mt-2">
                                {item.month}
                              </small>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* QUICK ACTIONS */}

            <div className="col-12 col-xl-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">

                  <h5 className="fw-bold mb-1">
                    Quick Actions
                  </h5>

                  <p className="text-muted small mb-4">
                    Manage your store quickly
                  </p>

                  <div className="d-grid gap-3">

                    <Link
                      to="/admin/add-product"
                      className="btn btn-dark text-start p-3"
                    >
                      <FaPlus className="text-warning me-3" />
                      Add New Product
                    </Link>

                    <Link
                      to="/admin/products"
                      className="btn btn-light border text-start p-3"
                    >
                      <FaBoxOpen className="text-primary me-3" />
                      Manage Products
                    </Link>

                    <Link
                      to="/admin/orders"
                      className="btn btn-light border text-start p-3"
                    >
                      <FaShoppingCart className="text-success me-3" />
                      View Orders
                    </Link>

                    <button
                      type="button"
                      className="btn btn-light border text-start p-3"
                      onClick={() => {
                        alert(
                          `Total Customers: ${totalCustomers}`
                        );
                      }}
                    >
                      <FaUsers className="text-danger me-3" />
                      Manage Customers
                    </button>

                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              RECENT ORDERS
          ================================================= */}

          <div className="row g-4">

            <div className="col-12 col-xl-8">
              <div className="card border-0 shadow-sm">

                <div className="card-body p-4">

                  <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>
                      <h5 className="fw-bold mb-1">
                        Recent Orders
                      </h5>

                      <small className="text-muted">
                        Latest customer purchases
                      </small>
                    </div>

                    <Link
                      to="/admin/orders"
                      className="btn btn-sm btn-outline-dark"
                    >
                      View All
                    </Link>
                  </div>

                  {recentOrders.length === 0 ? (
                    <div className="text-center py-5">
                      <FaShoppingCart
                        size={40}
                        className="text-muted mb-3"
                      />

                      <h6 className="fw-semibold">
                        No orders found
                      </h6>

                      <p className="text-muted mb-0">
                        Orders will appear here once
                        customers place them.
                      </p>
                    </div>
                  ) : (
                    <div className="table-responsive">

                      <table className="table align-middle">

                        <thead>
                          <tr className="text-muted small">
                            <th>ORDER</th>
                            <th>CUSTOMER</th>
                            <th>PRODUCT</th>
                            <th>AMOUNT</th>
                            <th>STATUS</th>
                          </tr>
                        </thead>

                        <tbody>
                          {recentOrders.map(
                            (order, index) => {

                              const status =
                                order?.status ||
                                "Pending";

                              const normalizedStatus =
                                String(status)
                                  .toLowerCase();

                              let badgeClass =
                                "bg-warning-subtle text-warning";

                              if (
                                normalizedStatus ===
                                  "delivered" ||
                                normalizedStatus ===
                                  "completed"
                              ) {
                                badgeClass =
                                  "bg-success-subtle text-success";
                              } else if (
                                normalizedStatus ===
                                  "shipped"
                              ) {
                                badgeClass =
                                  "bg-primary-subtle text-primary";
                              } else if (
                                normalizedStatus ===
                                  "cancelled" ||
                                normalizedStatus ===
                                  "canceled"
                              ) {
                                badgeClass =
                                  "bg-danger-subtle text-danger";
                              }

                              return (
                                <tr
                                  key={
                                    order?.id ||
                                    index
                                  }
                                >
                                  <td className="fw-semibold">
                                    #
                                    {order?.id ||
                                      `AF${1000 + index}`}
                                  </td>

                                  <td>
                                    {getCustomerName(
                                      order
                                    )}
                                  </td>

                                  <td className="text-muted">
                                    {getProductName(
                                      order
                                    )}
                                  </td>

                                  <td className="fw-semibold">
                                    {formatCurrency(
                                      getOrderAmount(
                                        order
                                      )
                                    )}
                                  </td>

                                  <td>
                                    <span
                                      className={`badge ${badgeClass} px-3 py-2`}
                                    >
                                      {status}
                                    </span>
                                  </td>
                                </tr>
                              );
                            }
                          )}
                        </tbody>

                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* =================================================
                TOP PRODUCTS
            ================================================= */}

            <div className="col-12 col-xl-4">

              <div className="card border-0 shadow-sm h-100">

                <div className="card-body p-4">

                  <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>
                      <h5 className="fw-bold mb-1">
                        Top Products
                      </h5>

                      <small className="text-muted">
                        Best selling products
                      </small>
                    </div>

                    <FaChartLine className="text-warning" />
                  </div>

                  {topProducts.length === 0 ? (
                    <div className="text-center py-4">
                      <FaBoxOpen
                        size={40}
                        className="text-muted mb-3"
                      />

                      <p className="text-muted mb-0">
                        No sales data available.
                      </p>
                    </div>
                  ) : (
                    <>
                      {topProducts.map(
                        (product, index) => (
                          <div
                            className="d-flex align-items-center mb-4"
                            key={`${product.name}-${index}`}
                          >
                            <div
                              className="bg-dark text-warning rounded-3 d-flex align-items-center justify-content-center me-3"
                              style={{
                                width: "45px",
                                height: "45px",
                                flexShrink: 0,
                              }}
                            >
                              <FaCar />
                            </div>

                            <div className="flex-grow-1 overflow-hidden">

                              <h6
                                className="fw-semibold mb-1 text-truncate"
                                title={
                                  product.name
                                }
                              >
                                {product.name}
                              </h6>

                              <small className="text-muted">
                                {product.category} •{" "}
                                {product.sold} sold
                              </small>
                            </div>

                            <span className="fw-bold small ms-2">
                              {formatCurrency(
                                product.revenue
                              )}
                            </span>
                          </div>
                        )
                      )}

                      <Link
                        to="/admin/products"
                        className="btn btn-outline-dark w-100"
                      >
                        View All Products
                      </Link>
                    </>
                  )}

                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              FOOTER
          ================================================= */}

          <div className="text-center text-muted small py-4">
            AutoForge Admin Panel • Automotive
            Performance & Modification Store
          </div>

        </div>
      </main>
    </div>
  );
}

export default Dashboard;