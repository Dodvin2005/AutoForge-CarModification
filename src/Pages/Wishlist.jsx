import React, { useEffect, useState } from "react";
import {
  FaHeart,
  FaShoppingCart,
  FaTrash,
  FaArrowLeft,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { getAllWishlistAPI } from "../Services/Api";

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // GET WISHLIST
  // =====================================================

  const getWishlist = async () => {
    try {
      setLoading(true);

      const response = await getAllWishlistAPI();

      console.log("Wishlist Response:", response);

      setWishlistItems(response.data);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setWishlistItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  // =====================================================
  // DELETE ITEM - UI ONLY
  // =====================================================

  const removeFromWishlist = (id) => {
    setWishlistItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  return (
    <div className="bg-light min-vh-100">

      {/* ================= HERO ================= */}

      <section
        className="py-5"
        style={{
          background:
            "linear-gradient(135deg, #003f49, #005461, #018790)",
        }}
      >
        <div className="container py-4">
          <div className="row align-items-center">

            <div className="col-md-8">

              <span
                className="fw-bold text-uppercase"
                style={{
                  color: "#80e5e0",
                  letterSpacing: "2px",
                  fontSize: "13px",
                }}
              >
                <FaHeart className="me-2" />
                My Collection
              </span>

              <h1 className="display-4 fw-bold text-white mt-2 mb-3">
                Your{" "}
                <span style={{ color: "#72e1dc" }}>
                  Wishlist
                </span>
              </h1>

              <p className="text-white-50 fs-6 mb-0">
                Save your favorite automotive products and come
                back to them whenever you're ready to shop.
              </p>

            </div>

            <div className="col-md-4 text-md-end text-center mt-4 mt-md-0">

              <div
                className="d-inline-flex align-items-center justify-content-center rounded-4"
                style={{
                  width: "120px",
                  height: "120px",
                  background: "rgba(255,255,255,.1)",
                  border: "1px solid rgba(255,255,255,.15)",
                }}
              >
                <FaHeart
                  size={50}
                  style={{ color: "#72e1dc" }}
                />
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ================= MAIN ================= */}

      <section className="py-5">
        <div className="container">

          {/* HEADER */}

          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">

            <div>
              <h2 className="fw-bold mb-1">
                Saved Items
              </h2>

              <p className="text-secondary mb-0">
                {wishlistItems.length} products in your wishlist
              </p>
            </div>

            <Link
              to="/products"
              className="btn btn-outline-dark mt-3 mt-md-0"
            >
              <FaArrowLeft className="me-2" />
              Continue Shopping
            </Link>

          </div>

          {/* ================= LOADING ================= */}

          {loading && (
            <div className="text-center py-5">

              <div
                className="spinner-border"
                style={{ color: "#005461" }}
                role="status"
              ></div>

              <p className="text-secondary mt-3">
                Loading your wishlist...
              </p>

            </div>
          )}

          {/* ================= EMPTY ================= */}

          {!loading && wishlistItems.length === 0 && (
            <div className="text-center py-5">

              <div
                className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4"
                style={{
                  width: "100px",
                  height: "100px",
                  background: "#e4f7f5",
                }}
              >
                <FaHeart
                  size={40}
                  style={{ color: "#005461" }}
                />
              </div>

              <h3 className="fw-bold">
                Your Wishlist is Empty
              </h3>

              <p className="text-secondary">
                You haven't saved any products yet.
              </p>

              <Link
                to="/products"
                className="btn text-white px-4 py-2"
                style={{
                  background: "#005461",
                }}
              >
                Browse Products
              </Link>

            </div>
          )}

          {/* ================= PRODUCT GRID ================= */}

          {!loading && wishlistItems.length > 0 && (
            <div className="row g-4">

              {wishlistItems.map((item) => (

                <div
                  className="col-lg-4 col-md-6"
                  key={item.id}
                >

                  <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">

                    {/* IMAGE */}

                    <div
                      className="position-relative"
                      style={{
                        height: "250px",
                        background: "#eef3f4",
                      }}
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-100 h-100"
                        style={{
                          objectFit: "cover",
                        }}
                      />

                      {/* SAVED BADGE */}

                      <span
                        className="position-absolute top-0 start-0 m-3 badge rounded-pill px-3 py-2"
                        style={{
                          background: "#005461",
                        }}
                      >
                        <FaHeart className="me-1" />
                        SAVED
                      </span>

                      {/* DELETE */}

                      <button
                        onClick={() =>
                          removeFromWishlist(item.id)
                        }
                        className="btn btn-light position-absolute top-0 end-0 m-3 rounded-circle shadow-sm"
                        style={{
                          width: "40px",
                          height: "40px",
                        }}
                      >
                        <FaTrash
                          size={13}
                          className="text-danger"
                        />
                      </button>

                    </div>

                    {/* CARD BODY */}

                    <div className="card-body p-4">

                      <small
                        className="fw-bold text-uppercase"
                        style={{
                          color: "#018790",
                          letterSpacing: "1px",
                        }}
                      >
                        Automotive Product
                      </small>

                      <h5 className="fw-bold mt-2 mb-3">
                        {item.name}
                      </h5>

                      {/* PRICE */}

                      <div className="d-flex justify-content-between align-items-center mb-4">

                        <span
                          className="fs-4 fw-bold"
                          style={{
                            color: "#005461",
                          }}
                        >
                          ₹{Number(item.price).toLocaleString()}
                        </span>

                      </div>

                      {/* CART BUTTON */}

                      <button
                        className="btn w-100 text-white fw-semibold py-2"
                        style={{
                          background: "#005461",
                        }}
                      >
                        <FaShoppingCart className="me-2" />
                        Add to Cart
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>
          )}

          {/* ================= BOTTOM INFO ================= */}

          {!loading && wishlistItems.length > 0 && (
            <div
              className="mt-5 p-4 rounded-4"
              style={{
                background: "#eaf7f6",
                border: "1px solid #d4ecea",
              }}
            >

              <div className="row align-items-center">

                <div className="col-md-1 text-center mb-3 mb-md-0">

                  <div
                    className="rounded-3 d-inline-flex align-items-center justify-content-center"
                    style={{
                      width: "55px",
                      height: "55px",
                      background: "#005461",
                    }}
                  >
                    <FaHeart
                      className="text-white"
                      size={22}
                    />
                  </div>

                </div>

                <div className="col-md-8">

                  <h5 className="fw-bold mb-1">
                    Love something? Don't lose it.
                  </h5>

                  <p className="text-secondary mb-0 small">
                    Your wishlist makes it easy to keep track
                    of products you want to buy later.
                  </p>

                </div>

                <div className="col-md-3 text-md-end mt-3 mt-md-0">

                  <Link
                    to="/products"
                    className="btn text-white fw-semibold px-4"
                    style={{
                      background: "#005461",
                    }}
                  >
                    Browse Products
                  </Link>

                </div>

              </div>

            </div>
          )}

        </div>
      </section>

    </div>
  );
}

export default Wishlist;