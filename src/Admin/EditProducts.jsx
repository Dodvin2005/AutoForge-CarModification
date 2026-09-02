import React, { useState } from "react";
import {
  FaArrowLeft,
  FaImage,
  FaSave,
  FaTimes,
  FaBoxOpen,
  FaTag,
  FaRupeeSign,
  FaWarehouse,
  FaStar,
  FaCar,
  FaTools,
  FaAlignLeft,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function EditProducts() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "Forged Alloy Wheels 18 Inch",
    category: "Wheels & Tyres",
    brand: "AutoForge",
    price: "45999",
    stock: "12",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d",
    description:
      "Premium forged alloy wheels designed to provide superior performance, durability and an aggressive appearance.",
  });

  const [preview, setPreview] = useState(product.image);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "image") {
      setPreview(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Updated Product:", product);

    // Add your update API here

    navigate("/admin/products");
  };

  return (
    <div
      className="bg-light min-vh-100 py-4 px-3 px-md-4"
      style={{
        marginLeft: "262px",
      }}
    >
      {/* ================= HEADER ================= */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <div>
          <div className="d-flex align-items-center gap-3 mb-2">
            <Link
              to="/admin/products"
              className="text-decoration-none text-dark"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              <FaArrowLeft />
            </Link>

            <div>
              <h2 className="fw-bold mb-1">Edit Product</h2>
              <p className="text-muted mb-0">
                Update your product information
              </p>
            </div>
          </div>
        </div>

        <div className="d-flex gap-2">
          <Link
            to="/admin/products"
            className="btn btn-light border px-4 py-2 fw-semibold"
          >
            <FaTimes className="me-2" />
            Cancel
          </Link>

          <button
            type="submit"
            form="editProductForm"
            className="btn px-4 py-2 fw-semibold text-white"
            style={{
              background: "#0d6efd",
              borderRadius: "8px",
            }}
          >
            <FaSave className="me-2" />
            Save Changes
          </button>
        </div>
      </div>

      {/* ================= FORM ================= */}
      <form id="editProductForm" onSubmit={handleSubmit}>
        <div className="row g-4">
          {/* ================= LEFT SIDE ================= */}
          <div className="col-lg-8">
            {/* Product Information */}
            <div
              className="bg-white p-4 rounded-4 mb-4"
              style={{
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              }}
            >
              <div className="d-flex align-items-center gap-3 mb-4">
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: "45px",
                    height: "45px",
                    background: "#eaf2ff",
                    color: "#0d6efd",
                    borderRadius: "12px",
                  }}
                >
                  <FaBoxOpen />
                </div>

                <div>
                  <h5 className="fw-bold mb-1">Product Information</h5>
                  <small className="text-muted">
                    Basic information about your product
                  </small>
                </div>
              </div>

              {/* Product Name */}
              <div className="mb-4">
                <label className="form-label fw-semibold">
                  Product Name
                </label>

                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <FaBoxOpen className="text-muted" />
                  </span>

                  <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter product name"
                    required
                  />
                </div>
              </div>

              {/* Category + Brand */}
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Category
                  </label>

                  <div className="input-group">
                    <span className="input-group-text bg-white">
                      <FaTools className="text-muted" />
                    </span>

                    <select
                      name="category"
                      value={product.category}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option>Wheels & Tyres</option>
                      <option>Engine Parts</option>
                      <option>Lighting</option>
                      <option>Exhaust Systems</option>
                      <option>Interior Accessories</option>
                      <option>Exterior Accessories</option>
                      <option>Performance Parts</option>
                    </select>
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Brand
                  </label>

                  <div className="input-group">
                    <span className="input-group-text bg-white">
                      <FaTag className="text-muted" />
                    </span>

                    <input
                      type="text"
                      name="brand"
                      value={product.brand}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter brand"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing & Inventory */}
            <div
              className="bg-white p-4 rounded-4 mb-4"
              style={{
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              }}
            >
              <div className="d-flex align-items-center gap-3 mb-4">
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: "45px",
                    height: "45px",
                    background: "#eaf7ef",
                    color: "#198754",
                    borderRadius: "12px",
                  }}
                >
                  <FaRupeeSign />
                </div>

                <div>
                  <h5 className="fw-bold mb-1">
                    Pricing & Inventory
                  </h5>

                  <small className="text-muted">
                    Manage price and stock information
                  </small>
                </div>
              </div>

              <div className="row g-3">
                {/* Price */}
                <div className="col-md-4">
                  <label className="form-label fw-semibold">
                    Price
                  </label>

                  <div className="input-group">
                    <span className="input-group-text bg-white">
                      <FaRupeeSign className="text-success" />
                    </span>

                    <input
                      type="number"
                      name="price"
                      value={product.price}
                      onChange={handleChange}
                      className="form-control"
                      min="0"
                      required
                    />
                  </div>
                </div>

                {/* Stock */}
                <div className="col-md-4">
                  <label className="form-label fw-semibold">
                    Stock Quantity
                  </label>

                  <div className="input-group">
                    <span className="input-group-text bg-white">
                      <FaWarehouse className="text-warning" />
                    </span>

                    <input
                      type="number"
                      name="stock"
                      value={product.stock}
                      onChange={handleChange}
                      className="form-control"
                      min="0"
                      required
                    />
                  </div>
                </div>

                {/* Rating */}
                <div className="col-md-4">
                  <label className="form-label fw-semibold">
                    Rating
                  </label>

                  <div className="input-group">
                    <span className="input-group-text bg-white">
                      <FaStar className="text-warning" />
                    </span>

                    <input
                      type="number"
                      name="rating"
                      value={product.rating}
                      onChange={handleChange}
                      className="form-control"
                      min="0"
                      max="5"
                      step="0.1"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div
              className="bg-white p-4 rounded-4"
              style={{
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              }}
            >
              <div className="d-flex align-items-center gap-3 mb-4">
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: "45px",
                    height: "45px",
                    background: "#f1edff",
                    color: "#6f42c1",
                    borderRadius: "12px",
                  }}
                >
                  <FaAlignLeft />
                </div>

                <div>
                  <h5 className="fw-bold mb-1">Description</h5>
                  <small className="text-muted">
                    Describe your product
                  </small>
                </div>
              </div>

              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                className="form-control"
                rows="6"
                placeholder="Enter product description..."
              />
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="col-lg-4">
            {/* Product Image */}
            <div
              className="bg-white p-4 rounded-4 mb-4"
              style={{
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              }}
            >
              <div className="d-flex align-items-center gap-3 mb-4">
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: "45px",
                    height: "45px",
                    background: "#fff2e8",
                    color: "#fd7e14",
                    borderRadius: "12px",
                  }}
                >
                  <FaImage />
                </div>

                <div>
                  <h5 className="fw-bold mb-1">
                    Product Image
                  </h5>

                  <small className="text-muted">
                    Update product image
                  </small>
                </div>
              </div>

              {/* Image Preview */}
              <div
                className="rounded-4 overflow-hidden mb-3"
                style={{
                  height: "250px",
                  background: "#f8f9fa",
                  border: "2px dashed #dee2e6",
                }}
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Product Preview"
                    className="w-100 h-100"
                    style={{
                      objectFit: "cover",
                    }}
                    onError={() => setPreview("")}
                  />
                ) : (
                  <div
                    className="h-100 d-flex flex-column justify-content-center align-items-center text-muted"
                  >
                    <FaImage size={40} className="mb-2" />
                    <span>No image available</span>
                  </div>
                )}
              </div>

              {/* Image URL */}
              <label className="form-label fw-semibold">
                Image URL
              </label>

              <input
                type="url"
                name="image"
                value={product.image}
                onChange={handleChange}
                className="form-control mb-2"
                placeholder="https://example.com/image.jpg"
              />

              <small className="text-muted">
                Enter a valid image URL to update the product image.
              </small>
            </div>

            {/* Product Preview */}
            <div
              className="bg-white rounded-4 overflow-hidden"
              style={{
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              }}
            >
              <div className="p-4 border-bottom">
                <h5 className="fw-bold mb-1">
                  <FaCar className="me-2 text-primary" />
                  Product Preview
                </h5>

                <small className="text-muted">
                  How the product will appear
                </small>
              </div>

              <div className="p-3">
                <div className="border rounded-4 overflow-hidden">
                  {preview && (
                    <img
                      src={preview}
                      alt={product.name}
                      className="w-100"
                      style={{
                        height: "180px",
                        objectFit: "cover",
                      }}
                    />
                  )}

                  <div className="p-3">
                    <span className="badge bg-light text-primary mb-2">
                      {product.category}
                    </span>

                    <h6 className="fw-bold mb-1">
                      {product.name}
                    </h6>

                    <p className="text-muted small mb-2">
                      {product.brand}
                    </p>

                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="fw-bold text-success mb-0">
                        ₹{Number(product.price || 0).toLocaleString(
                          "en-IN"
                        )}
                      </h5>

                      <span className="small text-muted">
                        <FaWarehouse className="me-1" />
                        {product.stock} in stock
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM ACTIONS ================= */}
        <div className="d-flex justify-content-end gap-2 mt-4">
          <Link
            to="/admin/products"
            className="btn btn-light border px-4 py-2"
          >
            <FaTimes className="me-2" />
            Cancel
          </Link>

          <button
            type="submit"
            className="btn btn-primary px-4 py-2"
          >
            <FaSave className="me-2" />
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProducts;