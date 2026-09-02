import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaShoppingCart,
  FaHeart,
  FaStar,
  FaTruck,
  FaShieldAlt,
  FaCheckCircle,
  FaBoxOpen,
  FaBolt,
} from "react-icons/fa";

import {
  getProductByIdAPI,
  getCartByUserAPI,
  addCartAPI,
  updateCartAPI,
  getWishlistByUserAPI,
  addWishlistAPI,
} from "../Services/Api";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // =====================================================
  // STATES
  // =====================================================

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Cart states
  const [addingToCart, setAddingToCart] = useState(false);
  const [cartAdded, setCartAdded] = useState(false);

  // Wishlist states
  const [addingToWishlist, setAddingToWishlist] = useState(false);
  const [wishlistAdded, setWishlistAdded] = useState(false);

  // =====================================================
  // CURRENT USER
  // =====================================================

  const userId = "1";

  // =====================================================
  // GET PRODUCT
  // =====================================================

  useEffect(() => {
    getProduct();
  }, [id]);

  const getProduct = async () => {
    try {
      setLoading(true);
      setError("");
      setProduct(null);

      const response = await getProductByIdAPI(id);

      if (response?.status === 200 && response?.data) {
        setProduct(response.data);

        // Check wishlist status
        checkWishlist(response.data);
      } else {
        setError("Product not found.");
      }
    } catch (err) {
      console.error("Error fetching product:", err);
      setError("Product not found.");
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // CHECK WISHLIST
  // =====================================================

  const checkWishlist = async (currentProduct) => {
    try {
      const response = await getWishlistByUserAPI(userId);

      const wishlistItems = response?.data || [];

      const exists = wishlistItems.some(
        (item) =>
          String(item.productId) ===
          String(currentProduct.id)
      );

      setWishlistAdded(exists);
    } catch (error) {
      console.error(
        "Error checking wishlist:",
        error
      );
    }
  };

  // =====================================================
  // STAR RATING
  // =====================================================

  const renderStars = (rating) => {
    const numericRating = Number(rating) || 0;

    return (
      <div className="d-flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            size={18}
            className={
              star <= Math.round(numericRating)
                ? "text-warning"
                : "text-secondary opacity-25"
            }
          />
        ))}
      </div>
    );
  };

  // =====================================================
  // ADD TO CART
  // =====================================================

  const handleAddToCart = async () => {
    if (!product || addingToCart) return;

    const stock = Number(product.stock) || 0;

    if (stock <= 0) {
      alert("Product is out of stock.");
      return;
    }

    try {
      setAddingToCart(true);

      // =================================================
      // GET CURRENT USER'S CART
      // =================================================

      const response = await getCartByUserAPI(userId);

      const cartItems = response?.data || [];

      // =================================================
      // CHECK IF PRODUCT ALREADY EXISTS
      // =================================================

      const existingItem = cartItems.find(
        (item) =>
          String(item.productId) ===
          String(product.id)
      );

      // =================================================
      // PRODUCT ALREADY EXISTS
      // =================================================

      if (existingItem) {
        const currentQuantity =
          Number(existingItem.quantity) || 1;

        if (currentQuantity >= stock) {
          alert(
            "You have already added the maximum available quantity."
          );

          return;
        }

        await updateCartAPI(existingItem.id, {
          userId: userId,
          productId: String(product.id),
          name: product.name,
          price: Number(product.price) || 0,
          quantity: currentQuantity + 1,
          image: product.image || "",
        });

        setCartAdded(true);

        alert("Product quantity updated in cart!");

        setTimeout(() => {
          setCartAdded(false);
        }, 2000);

        return;
      }

      // =================================================
      // PRODUCT DOES NOT EXIST
      // =================================================

      const cartItem = {
        userId: userId,
        productId: String(product.id),
        name: product.name || "Unnamed Product",
        price: Number(product.price) || 0,
        quantity: 1,
        image: product.image || "",
      };

      const addResponse = await addCartAPI(cartItem);

      if (
        addResponse?.status === 200 ||
        addResponse?.status === 201
      ) {
        setCartAdded(true);

        alert("Product added to cart!");

        setTimeout(() => {
          setCartAdded(false);
        }, 2000);
      } else {
        alert("Product added to cart!");
      }
    } catch (error) {
      console.error(
        "Error adding product to cart:",
        error
      );

      alert(
        "Something went wrong while adding the product to the cart."
      );
    } finally {
      setAddingToCart(false);
    }
  };

  // =====================================================
  // ADD TO WISHLIST
  // =====================================================

  const handleAddToWishlist = async () => {
    if (!product || addingToWishlist) return;

    try {
      setAddingToWishlist(true);

      // =================================================
      // GET CURRENT USER'S WISHLIST
      // =================================================

      const response =
        await getWishlistByUserAPI(userId);

      const wishlistItems = response?.data || [];

      // =================================================
      // CHECK IF PRODUCT ALREADY EXISTS
      // =================================================

      const existingItem = wishlistItems.find(
        (item) =>
          String(item.productId) ===
          String(product.id)
      );

      // =================================================
      // ALREADY IN WISHLIST
      // =================================================

      if (existingItem) {
        setWishlistAdded(true);

        alert("Product is already in your wishlist.");

        return;
      }

      // =================================================
      // CREATE WISHLIST ITEM
      // =================================================

      const wishlistItem = {
        userId: userId,
        productId: String(product.id),
        name: product.name || "Unnamed Product",
        price: Number(product.price) || 0,
        image: product.image || "",
      };

      // =================================================
      // ADD TO WISHLIST
      // =================================================

      const addResponse =
        await addWishlistAPI(wishlistItem);

      if (
        addResponse?.status === 200 ||
        addResponse?.status === 201
      ) {
        setWishlistAdded(true);

        alert("Product added to wishlist!");
      } else {
        alert(
          "Product added to wishlist!"
        );

        setWishlistAdded(true);
      }
    } catch (error) {
      console.error(
        "Error adding product to wishlist:",
        error
      );

      alert(
        "Something went wrong while adding the product to wishlist."
      );
    } finally {
      setAddingToWishlist(false);
    }
  };

  // =====================================================
  // BUY NOW
  // =====================================================

  const handleBuyNow = () => {
    if (!product) return;

    const stock = Number(product.stock) || 0;

    if (stock <= 0) {
      alert("Product is out of stock.");
      return;
    }

    navigate(`/orders/${product.id}`);
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="bg-light min-vh-100 d-flex align-items-center">
        <div className="container">
          <div className="text-center py-5">

            <div
              className="spinner-border text-danger"
              style={{
                width: "3.5rem",
                height: "3.5rem",
              }}
              role="status"
            />

            <h5 className="mt-4 fw-bold">
              Loading Product...
            </h5>

            <p className="text-muted">
              Please wait while we fetch the
              product details.
            </p>

          </div>
        </div>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error || !product) {
    return (
      <div className="bg-light min-vh-100">

        <div className="container py-5">

          <div
            className="bg-white shadow-sm rounded-4 text-center p-5 mx-auto"
            style={{
              maxWidth: "600px",
            }}
          >

            <div
              className="rounded-circle bg-danger bg-opacity-10 d-flex align-items-center justify-content-center mx-auto mb-4"
              style={{
                width: "100px",
                height: "100px",
              }}
            >
              <FaBoxOpen
                size={45}
                className="text-danger"
              />
            </div>

            <h2 className="fw-bold">
              Product Not Found
            </h2>

            <p className="text-muted mb-4">
              The product you're looking for does
              not exist or may have been removed.
            </p>

            <Link
              to="/products"
              className="btn btn-dark px-4 py-2 rounded-pill"
            >
              <FaArrowLeft className="me-2" />
              Back to Products
            </Link>

          </div>

        </div>

      </div>
    );
  }

  // =====================================================
  // PRODUCT DATA
  // =====================================================

  const productImage =
    product.image ||
    "https://via.placeholder.com/700x600?text=AutoForge";

  const stock = Number(product.stock) || 0;
  const price = Number(product.price) || 0;
  const rating = Number(product.rating) || 0;

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="bg-light min-vh-100 py-4 py-lg-5">

      <div className="container">

        {/* =================================================
            BACK TO PRODUCTS
        ================================================= */}

        <div className="mb-4">

          <Link
            to="/products"
            className="text-decoration-none text-dark fw-semibold"
          >
            <FaArrowLeft className="me-2" />
            Back to Products
          </Link>

        </div>

        {/* =================================================
            MAIN PRODUCT CARD
        ================================================= */}

        <div className="bg-white rounded-4 shadow-sm overflow-hidden border-0">

          <div className="row g-0">

            {/* =================================================
                PRODUCT IMAGE
            ================================================= */}

            <div className="col-lg-6">

              <div
                className="position-relative bg-white d-flex align-items-center justify-content-center p-4 p-lg-5"
                style={{
                  minHeight: "600px",
                }}
              >

                {/* CATEGORY */}

                <span
                  className="position-absolute top-0 start-0 m-4 badge bg-danger rounded-pill px-3 py-2"
                  style={{
                    zIndex: 2,
                  }}
                >
                  {product.category || "Automotive"}
                </span>

                {/* PRODUCT IMAGE */}

                <img
                  src={productImage}
                  alt={product.name || "Product"}
                  className="img-fluid"
                  style={{
                    width: "100%",
                    height: "520px",
                    objectFit: "contain",
                  }}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "https://via.placeholder.com/700x600?text=AutoForge";
                  }}
                />

              </div>

            </div>

            {/* =================================================
                PRODUCT INFORMATION
            ================================================= */}

            <div className="col-lg-6">

              <div className="p-4 p-lg-5 h-100">

                {/* BRAND */}

                <p className="text-uppercase text-danger fw-bold small mb-2">
                  {product.brand || "AutoForge"}
                </p>

                {/* PRODUCT NAME */}

                <h1 className="display-6 fw-bold mb-3">
                  {product.name || "Unnamed Product"}
                </h1>

                {/* RATING */}

                <div className="d-flex align-items-center gap-3 mb-4">

                  {renderStars(rating)}

                  <span className="fw-semibold">
                    {rating.toFixed(1)}
                  </span>

                  <span className="text-muted">
                    Customer Rating
                  </span>

                </div>

                {/* PRICE */}

                <div className="mb-4">

                  <span className="display-6 fw-bold text-dark">
                    ₹{price.toLocaleString("en-IN")}
                  </span>

                </div>

                <hr />

                {/* DESCRIPTION */}

                <div className="my-4">

                  <h5 className="fw-bold mb-3">
                    Product Description
                  </h5>

                  <p className="text-muted lh-lg mb-0">
                    {product.description ||
                      "Premium quality automotive product designed for excellent performance, reliability and long-lasting use."}
                  </p>

                </div>

                {/* STOCK */}

                <div className="mb-4">

                  {stock > 0 ? (

                    <div className="d-flex align-items-center">

                      <span className="badge bg-success rounded-pill px-3 py-2">
                        <FaCheckCircle className="me-2" />
                        In Stock
                      </span>

                      <span className="text-muted ms-3">
                        {stock} items available
                      </span>

                    </div>

                  ) : (

                    <span className="badge bg-secondary rounded-pill px-3 py-2">
                      Out of Stock
                    </span>

                  )}

                </div>

                {/* =================================================
                    ACTION BUTTONS
                ================================================= */}

                <div className="d-flex gap-3 mb-3">

                  {/* ADD TO CART */}

                  <button
                    type="button"
                    className={`btn btn-lg flex-grow-1 rounded-3 ${
                      cartAdded
                        ? "btn-success"
                        : "btn-dark"
                    }`}
                    disabled={
                      stock <= 0 ||
                      addingToCart
                    }
                    onClick={handleAddToCart}
                  >

                    {addingToCart ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        />

                        Adding...
                      </>
                    ) : cartAdded ? (
                      <>
                        <FaCheckCircle className="me-2" />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <FaShoppingCart className="me-2" />
                        Add to Cart
                      </>
                    )}

                  </button>

                  {/* =================================================
                      WISHLIST BUTTON
                  ================================================= */}

                  <button
                    type="button"
                    className={`btn btn-lg rounded-3 px-4 ${
                      wishlistAdded
                        ? "btn-danger"
                        : "btn-outline-danger"
                    }`}
                    title={
                      wishlistAdded
                        ? "Already in Wishlist"
                        : "Add to Wishlist"
                    }
                    disabled={addingToWishlist}
                    onClick={handleAddToWishlist}
                  >

                    {addingToWishlist ? (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                      />
                    ) : (
                      <FaHeart
                        className={
                          wishlistAdded
                            ? "text-white"
                            : ""
                        }
                      />
                    )}

                  </button>

                </div>

                {/* =================================================
                    WISHLIST STATUS
                ================================================= */}

                {wishlistAdded && (
                  <div className="text-danger small fw-semibold mb-3">
                    <FaCheckCircle className="me-2" />
                    This product is in your wishlist
                  </div>
                )}

                {/* =================================================
                    BUY NOW
                ================================================= */}

                <Link to={"/checkouts"}>
                  <button
                    type="button"
                    className="btn btn-danger btn-lg w-100 rounded-3 fw-bold mb-4"
                    disabled={stock <= 0}
                    onClick={handleBuyNow}
                  >
                    <FaBolt className="me-2" />
  
                    {stock > 0
                      ? "Buy Now"
                      : "Out of Stock"}
  
                  </button>
                </Link>

                {/* =================================================
                    SERVICE FEATURES
                ================================================= */}

                <div className="row g-3">

                  {/* FAST DELIVERY */}

                  <div className="col-md-6">

                    <div className="border rounded-3 p-3 h-100">

                      <FaTruck
                        size={22}
                        className="text-danger mb-3"
                      />

                      <h6 className="fw-bold">
                        Fast Delivery
                      </h6>

                      <p className="small text-muted mb-0">
                        Quick and reliable delivery
                        to your doorstep.
                      </p>

                    </div>

                  </div>

                  {/* QUALITY */}

                  <div className="col-md-6">

                    <div className="border rounded-3 p-3 h-100">

                      <FaShieldAlt
                        size={22}
                        className="text-danger mb-3"
                      />

                      <h6 className="fw-bold">
                        Quality Guaranteed
                      </h6>

                      <p className="small text-muted mb-0">
                        Premium automotive products
                        with guaranteed quality.
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* =====================================================
            ADDITIONAL INFORMATION
        ===================================================== */}

        <div className="row g-4 mt-4">

          {/* PRODUCT INFORMATION */}

          <div className="col-lg-8">

            <div className="bg-white rounded-4 shadow-sm p-4">

              <h4 className="fw-bold mb-4">
                Product Information
              </h4>

              <div className="table-responsive">

                <table className="table table-borderless mb-0">

                  <tbody>

                    <tr className="border-bottom">

                      <th className="py-3 text-muted">
                        Product Name
                      </th>

                      <td className="py-3 fw-semibold">
                        {product.name || "N/A"}
                      </td>

                    </tr>

                    <tr className="border-bottom">

                      <th className="py-3 text-muted">
                        Brand
                      </th>

                      <td className="py-3 fw-semibold">
                        {product.brand || "AutoForge"}
                      </td>

                    </tr>

                    <tr className="border-bottom">

                      <th className="py-3 text-muted">
                        Category
                      </th>

                      <td className="py-3 fw-semibold">
                        {product.category || "Automotive"}
                      </td>

                    </tr>

                    <tr className="border-bottom">

                      <th className="py-3 text-muted">
                        Rating
                      </th>

                      <td className="py-3">
                        {rating} / 5
                      </td>

                    </tr>

                    <tr>

                      <th className="py-3 text-muted">
                        Availability
                      </th>

                      <td className="py-3">

                        {stock > 0 ? (
                          <span className="text-success fw-semibold">
                            In Stock
                          </span>
                        ) : (
                          <span className="text-danger fw-semibold">
                            Out of Stock
                          </span>
                        )}

                      </td>

                    </tr>

                  </tbody>

                </table>

              </div>

            </div>

          </div>

          {/* WHY AUTOFORGE */}

          <div className="col-lg-4">

            <div className="bg-dark text-white rounded-4 shadow-sm p-4 h-100">

              <h4 className="fw-bold mb-4">
                Why AutoForge?
              </h4>

              <div className="mb-4">
                <FaCheckCircle className="text-success me-2" />
                Genuine Automotive Products
              </div>

              <div className="mb-4">
                <FaCheckCircle className="text-success me-2" />
                Competitive Prices
              </div>

              <div className="mb-4">
                <FaCheckCircle className="text-success me-2" />
                Fast & Secure Delivery
              </div>

              <div className="mb-4">
                <FaCheckCircle className="text-success me-2" />
                Quality Guaranteed
              </div>

              <div>
                <FaCheckCircle className="text-success me-2" />
                Customer Support
              </div>

            </div>

          </div>

        </div>

        {/* =====================================================
            BACK BUTTON
        ===================================================== */}

        <div className="text-center mt-5">

          <Link
            to="/products"
            className="btn btn-outline-dark rounded-pill px-4 py-2"
          >
            <FaArrowLeft className="me-2" />
            Continue Shopping
          </Link>

        </div>

      </div>

    </div>
  );
};

export default ProductDetails;