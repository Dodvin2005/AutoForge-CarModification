import React, { useEffect, useState } from "react";
import {
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaStar,
  FaRedo,
  FaBolt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { getAllProductsAPI } from "../Services/Api";

const Products = () => {
  // =====================================================
  // STATES
  // =====================================================

  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [searchKey, setSearchKey] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // GET ALL PRODUCTS
  // =====================================================

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllProductsAPI();

      if (response?.status === 200) {
        const products = response.data || [];

        setAllProducts(products);
        setFilteredProducts(products);
      } else {
        setError("Unable to load products.");
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // CATEGORIES
  // =====================================================

  const categories = [
    "All",
    ...new Set(
      allProducts
        .map((product) => product.category)
        .filter((category) => category)
    ),
  ];

  // =====================================================
  // SEARCH + CATEGORY FILTER
  // =====================================================

  useEffect(() => {
    let products = [...allProducts];

    // Category filter
    if (selectedCategory !== "All") {
      products = products.filter(
        (product) =>
          product.category?.toLowerCase() ===
          selectedCategory.toLowerCase()
      );
    }

    // Search filter
    if (searchKey.trim() !== "") {
      const search = searchKey.toLowerCase().trim();

      products = products.filter(
        (product) =>
          product.name?.toLowerCase().includes(search) ||
          product.brand?.toLowerCase().includes(search) ||
          product.category?.toLowerCase().includes(search) ||
          product.description?.toLowerCase().includes(search)
      );
    }

    setFilteredProducts(products);
  }, [searchKey, selectedCategory, allProducts]);

  // =====================================================
  // STAR RATING
  // =====================================================

  const renderStars = (rating) => {
    const numericRating = Number(rating) || 0;

    return (
      <span className="d-inline-flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={
              star <= Math.round(numericRating)
                ? "text-warning"
                : "text-secondary opacity-25"
            }
          />
        ))}
      </span>
    );
  };

  // =====================================================
  // CLEAR FILTERS
  // =====================================================

  const clearFilters = () => {
    setSearchKey("");
    setSelectedCategory("All");
  };

  // =====================================================
  // PRODUCT STOCK STATUS
  // =====================================================

  const getStockBadge = (stock) => {
    const quantity = Number(stock) || 0;

    if (quantity <= 0) {
      return (
        <span className="badge bg-secondary position-absolute top-0 start-0 m-3 px-3 py-2">
          OUT OF STOCK
        </span>
      );
    }

    if (quantity <= 10) {
      return (
        <span className="badge bg-warning text-dark position-absolute top-0 start-0 m-3 px-3 py-2">
          LOW STOCK
        </span>
      );
    }

    return (
      <span className="badge bg-success position-absolute top-0 start-0 m-3 px-3 py-2">
        IN STOCK
      </span>
    );
  };

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <div className="bg-light min-vh-100">

      {/* =================================================
          HEADER
      ================================================= */}

      <section className="bg-dark text-white py-5">
        <div className="container py-4">
          <div className="row align-items-center">
            <div className="col-lg-8">

              <span className="badge bg-danger px-3 py-2 mb-3">
                AUTOFORGE PRODUCTS
              </span>

              <h1 className="display-4 fw-bold">
                Upgrade Your{" "}
                <span className="text-danger">
                  Drive.
                </span>
              </h1>

              <p className="lead text-secondary mb-0">
                Premium automotive parts and accessories built for
                performance, style and individuality.
              </p>

            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          PRODUCTS SECTION
      ================================================= */}

      <section className="py-5">
        <div className="container">

          {/* =================================================
              TOP SECTION
          ================================================= */}

          <div className="row align-items-center mb-4">

            <div className="col-lg-5">

              <h2 className="fw-bold mb-1">
                All{" "}
                <span className="text-danger">
                  Products
                </span>
              </h2>

              <p className="text-muted mb-0">
                Find the perfect upgrade for your vehicle
              </p>

            </div>

            <div className="col-lg-7 mt-4 mt-lg-0">

              <div className="row g-2">

                {/* SEARCH */}

                <div className="col-md-8">

                  <div className="input-group">

                    <span className="input-group-text bg-white border-end-0">
                      <FaSearch className="text-muted" />
                    </span>

                    <input
                      type="text"
                      className="form-control border-start-0 shadow-none"
                      placeholder="Search products..."
                      value={searchKey}
                      onChange={(e) =>
                        setSearchKey(e.target.value)
                      }
                    />

                  </div>

                </div>

                {/* PRODUCT COUNT */}

                <div className="col-md-4">

                  <div className="btn btn-dark w-100 py-2">
                    {filteredProducts.length} Products
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              CATEGORIES
          ================================================= */}

          {!loading && allProducts.length > 0 && (
            <div className="d-flex flex-wrap gap-2 mb-5">

              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    setSelectedCategory(category)
                  }
                  className={`btn rounded-pill px-4 ${
                    selectedCategory === category
                      ? "btn-danger"
                      : "btn-outline-dark"
                  }`}
                >
                  {category}
                </button>
              ))}

            </div>
          )}

          {/* =================================================
              LOADING
          ================================================= */}

          {loading && (
            <div className="text-center py-5">

              <div
                className="spinner-border text-danger"
                style={{
                  width: "3rem",
                  height: "3rem",
                }}
                role="status"
              />

              <p className="text-muted mt-3">
                Loading products...
              </p>

            </div>
          )}

          {/* =================================================
              ERROR
          ================================================= */}

          {!loading && error && (
            <div className="alert alert-danger text-center py-4">

              <h5 className="fw-bold">
                Something went wrong
              </h5>

              <p className="mb-3">
                {error}
              </p>

              <button
                type="button"
                className="btn btn-danger"
                onClick={getAllProducts}
              >
                <FaRedo className="me-2" />
                Try Again
              </button>

            </div>
          )}

          {/* =================================================
              NO PRODUCTS
          ================================================= */}

          {!loading &&
            !error &&
            filteredProducts.length === 0 && (
              <div className="text-center py-5">

                <div
                  className="bg-white rounded-circle shadow-sm d-flex align-items-center justify-content-center mx-auto mb-4"
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                >
                  <FaSearch
                    size={35}
                    className="text-muted"
                  />
                </div>

                <h4 className="fw-bold">
                  No Products Found
                </h4>

                <p className="text-muted">
                  Try searching for another product or category.
                </p>

                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>

              </div>
            )}

          {/* =================================================
              PRODUCT GRID
          ================================================= */}

          {!loading &&
            !error &&
            filteredProducts.length > 0 && (
              <div className="row g-4">

                {filteredProducts.map((product) => {

                  const stock = Number(product.stock) || 0;

                  return (
                    <div
                      className="col-12 col-sm-6 col-lg-4 col-xl-3"
                      key={product.id}
                    >

                      <div className="card border-0 shadow-sm h-100 rounded-4 overflow-hidden">

                        {/* IMAGE */}

                        <div className="position-relative">

                          <img
                            src={
                              product.image ||
                              "https://via.placeholder.com/500x400?text=AutoForge"
                            }
                            className="w-100"
                            alt={product.name || "Product"}
                            style={{
                              height: "240px",
                              objectFit: "cover",
                            }}
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src =
                                "https://via.placeholder.com/500x400?text=AutoForge";
                            }}
                          />

                          {/* STOCK BADGE */}

                          {getStockBadge(stock)}

                          {/* WISHLIST */}

                          <button
                            type="button"
                            className="btn btn-light rounded-circle position-absolute top-0 end-0 m-3 shadow-sm"
                            title="Add to wishlist"
                          >
                            <FaHeart className="text-danger" />
                          </button>

                        </div>

                        {/* BODY */}

                        <div className="card-body p-4 d-flex flex-column">

                          {/* CATEGORY */}

                          <small className="text-danger fw-bold text-uppercase">
                            {product.category || "Automotive"}
                          </small>

                          {/* NAME */}

                          <h5
                            className="fw-bold mt-2 mb-1"
                            style={{
                              minHeight: "48px",
                            }}
                          >
                            {product.name || "Unnamed Product"}
                          </h5>

                          {/* BRAND */}

                          <small className="text-muted mb-2">
                            Brand:{" "}
                            {product.brand || "AutoForge"}
                          </small>

                          {/* RATING */}

                          <div className="mb-3">

                            {renderStars(product.rating)}

                            <small className="text-muted ms-2">
                              {product.rating || 0}
                            </small>

                          </div>

                          {/* DESCRIPTION */}

                          <p
                            className="text-muted small mb-3"
                            style={{
                              minHeight: "42px",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {product.description ||
                              "Premium quality automotive product."}
                          </p>

                          {/* PRICE */}

                          <div className="mb-2">

                            <span className="fs-5 fw-bold">
                              ₹
                              {Number(
                                product.price || 0
                              ).toLocaleString("en-IN")}
                            </span>

                          </div>

                          {/* STOCK */}

                          <small
                            className={
                              stock <= 10
                                ? "text-danger fw-semibold mb-3"
                                : "text-success fw-semibold mb-3"
                            }
                          >
                            {stock > 0
                              ? `${stock} items available`
                              : "Out of Stock"}
                          </small>

                          {/* =================================================
                              BUTTONS
                          ================================================= */}

                          <div className="mt-auto">

                            {/* VIEW + CART */}

                            <div className="d-flex gap-2 mb-2">

                              {/* VIEW */}

                              <Link
                                to={`/productdetails/${product.id}`}
                                className="btn btn-outline-dark w-50 py-2 fw-semibold"
                              >
                                View
                              </Link>

                              {/* CART */}

                              <button
                                type="button"
                                className="btn btn-dark w-50 py-2 fw-semibold"
                                disabled={stock <= 0}
                              >
                                <FaShoppingCart className="me-2" />
                                Cart
                              </button>

                            </div>

                            {/* =================================================
                                BUY NOW
                            ================================================= */}

                            <Link
                              to={
                                stock > 0
                                  ? `/productdetails/${product.id}`
                                  : "#"
                              }
                              className={`btn btn-danger w-100 py-2 fw-semibold ${
                                stock <= 0 ? "disabled" : ""
                              }`}
                              onClick={(e) => {
                                if (stock <= 0) {
                                  e.preventDefault();
                                }
                              }}
                            >
                              <FaBolt className="me-2" />
                              Buy Now
                            </Link>

                          </div>

                        </div>

                      </div>

                    </div>
                  );
                })}

              </div>
            )}

        </div>
      </section>

      {/* =================================================
          BOTTOM BANNER
      ================================================= */}

      <section className="bg-dark text-white py-5 mb-5">

        <div className="container">

          <div className="row align-items-center">

            <div className="col-lg-8">

              <h2 className="fw-bold">
                Build. Modify.{" "}
                <span className="text-danger">
                  Dominate.
                </span>
              </h2>

              <p className="text-secondary mb-0">
                Take your vehicle to the next level
                with AutoForge.
              </p>

            </div>

            <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">

              <Link
                to="/products"
                className="btn btn-danger px-4 py-3 fw-semibold"
              >
                Explore More
              </Link>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Products;