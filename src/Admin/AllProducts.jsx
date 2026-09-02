import React, { useEffect, useMemo, useState } from "react";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaEye,
  FaFilter,
  FaRedo,
  FaSave,
  FaBox,
  FaStar,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import {
  getAllProductsAPI,
  addProductAPI,
  deleteProductAPI,
  updateProductAPI,
} from "../Services/Api";

function AllProducts() {
  // =====================================================
  // STATES
  // =====================================================

  const [allProducts, setAllProducts] = useState([]);

  const [searchKey, setSearchKey] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("All Categories");

  const [selectedStatus, setSelectedStatus] =
    useState("All Status");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // =====================================================
  // PAGINATION
  // =====================================================

  const [currentPage, setCurrentPage] = useState(1);

  const [itemsPerPage, setItemsPerPage] = useState(5);

  // =====================================================
  // ADD PRODUCT MODAL
  // =====================================================

  const [showAddModal, setShowAddModal] = useState(false);

  const [addLoading, setAddLoading] = useState(false);

  const [addProduct, setAddProduct] = useState({
    name: "",
    category: "",
    brand: "",
    price: "",
    stock: "",
    rating: "",
    image: "",
    description: "",
  });

  // =====================================================
  // VIEW MODAL
  // =====================================================

  const [showViewModal, setShowViewModal] = useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  // =====================================================
  // DELETE MODAL
  // =====================================================

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [productToDelete, setProductToDelete] =
    useState(null);

  const [deleteLoading, setDeleteLoading] =
    useState(false);

  // =====================================================
  // EDIT MODAL
  // =====================================================

  const [showEditModal, setShowEditModal] = useState(false);

  const [editLoading, setEditLoading] = useState(false);

  const [editProduct, setEditProduct] = useState({
    id: "",
    name: "",
    category: "",
    brand: "",
    price: "",
    stock: "",
    rating: "",
    image: "",
    description: "",
  });

  // =====================================================
  // GET ALL PRODUCTS
  // =====================================================

  const getProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllProductsAPI();

      console.log("Products API Response:", response);

      const products =
        response?.data?.products ||
        response?.data ||
        response?.products ||
        response ||
        [];

      setAllProducts(
        Array.isArray(products) ? products : []
      );
    } catch (err) {
      console.error("Error fetching products:", err);

      setError(
        "Failed to load products. Please check your JSON Server."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // =====================================================
  // CATEGORIES
  // =====================================================

  const categories = useMemo(() => {
    const categoryList = allProducts
      .map((product) => product.category)
      .filter(Boolean);

    return [
      "All Categories",
      ...new Set(categoryList),
    ];
  }, [allProducts]);

  // =====================================================
  // STOCK
  // =====================================================

  const getStock = (product) => {
    return Number(product?.stock || 0);
  };

  // =====================================================
  // STATUS
  // =====================================================

  const getStatus = (product) => {
    const stock = getStock(product);

    if (stock === 0) {
      return "Out of Stock";
    }

    if (stock <= 10) {
      return "Low Stock";
    }

    return "In Stock";
  };

  // =====================================================
  // STATUS BADGE
  // =====================================================

  const getStatusBadge = (status) => {
    if (status === "In Stock") {
      return (
        <span className="badge bg-success-subtle text-success px-3 py-2">
          In Stock
        </span>
      );
    }

    if (status === "Low Stock") {
      return (
        <span className="badge bg-warning-subtle text-warning-emphasis px-3 py-2">
          Low Stock
        </span>
      );
    }

    return (
      <span className="badge bg-danger-subtle text-danger px-3 py-2">
        Out of Stock
      </span>
    );
  };

  // =====================================================
  // FILTER PRODUCTS
  // =====================================================

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const name =
        product.name?.toLowerCase() || "";

      const category =
        product.category?.toLowerCase() || "";

      const brand =
        product.brand?.toLowerCase() || "";

      const search =
        searchKey.toLowerCase().trim();

      const matchesSearch =
        name.includes(search) ||
        category.includes(search) ||
        brand.includes(search) ||
        String(product.id).includes(search);

      const matchesCategory =
        selectedCategory === "All Categories" ||
        product.category === selectedCategory;

      const status = getStatus(product);

      const matchesStatus =
        selectedStatus === "All Status" ||
        status === selectedStatus;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    });
  }, [
    allProducts,
    searchKey,
    selectedCategory,
    selectedStatus,
  ]);

  // =====================================================
  // RESET PAGE
  // =====================================================

  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchKey,
    selectedCategory,
    selectedStatus,
    itemsPerPage,
  ]);

  // =====================================================
  // PAGINATION
  // =====================================================

  const totalPages = Math.ceil(
    filteredProducts.length / itemsPerPage
  );

  const indexOfLastProduct =
    currentPage * itemsPerPage;

  const indexOfFirstProduct =
    indexOfLastProduct - itemsPerPage;

  const currentProducts =
    filteredProducts.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );

  useEffect(() => {
    if (
      totalPages > 0 &&
      currentPage > totalPages
    ) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  // =====================================================
  // ADD PRODUCT
  // =====================================================

  const handleOpenAddModal = () => {
    setAddProduct({
      name: "",
      category: "",
      brand: "",
      price: "",
      stock: "",
      rating: "",
      image: "",
      description: "",
    });

    setShowAddModal(true);
  };

  // =====================================================
  // ADD INPUT CHANGE
  // =====================================================

  const handleAddChange = (e) => {
    const { name, value } = e.target;

    setAddProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // ADD PRODUCT SUBMIT
  // =====================================================

  const handleAddProduct = async (e) => {
    e.preventDefault();

    // Validation
    if (!addProduct.name.trim()) {
      alert("Product name is required.");
      return;
    }

    if (!addProduct.category.trim()) {
      alert("Category is required.");
      return;
    }

    if (
      addProduct.price === "" ||
      Number(addProduct.price) < 0
    ) {
      alert("Please enter a valid price.");
      return;
    }

    if (
      addProduct.stock === "" ||
      Number(addProduct.stock) < 0
    ) {
      alert("Please enter a valid stock.");
      return;
    }

    if (
      addProduct.rating !== "" &&
      (Number(addProduct.rating) < 0 ||
        Number(addProduct.rating) > 5)
    ) {
      alert("Rating must be between 0 and 5.");
      return;
    }

    try {
      setAddLoading(true);

      const stock = Number(addProduct.stock);

      const newProduct = {
        name: addProduct.name.trim(),
        category: addProduct.category.trim(),
        brand: addProduct.brand.trim(),
        price: Number(addProduct.price),
        stock: stock,
        rating: Number(addProduct.rating || 0),
        image: addProduct.image.trim(),
        description: addProduct.description.trim(),

        status:
          stock === 0
            ? "Out of Stock"
            : stock <= 10
            ? "Low Stock"
            : "In Stock",
      };

      console.log(
        "Adding Product:",
        newProduct
      );

      const response =
        await addProductAPI(newProduct);

      console.log(
        "Add Product Response:",
        response
      );

      /*
       * JSON Server normally returns the newly
       * created product in response.data
       */
      const createdProduct =
        response?.data || newProduct;

      setAllProducts((prevProducts) => [
        ...prevProducts,
        createdProduct,
      ]);

      setShowAddModal(false);

      setCurrentPage(
        Math.ceil(
          (allProducts.length + 1) /
            itemsPerPage
        )
      );

      setAddProduct({
        name: "",
        category: "",
        brand: "",
        price: "",
        stock: "",
        rating: "",
        image: "",
        description: "",
      });

      alert("Product added successfully!");
    } catch (err) {
      console.error(
        "Add Product Error:",
        err
      );

      alert(
        "Failed to add product. Please check your JSON Server."
      );
    } finally {
      setAddLoading(false);
    }
  };

  // =====================================================
  // VIEW PRODUCT
  // =====================================================

  const handleView = (product) => {
    setSelectedProduct(product);
    setShowViewModal(true);
  };

  // =====================================================
  // EDIT PRODUCT
  // =====================================================

  const handleEdit = (product) => {
    setEditProduct({
      id: product.id || "",
      name: product.name || "",
      category: product.category || "",
      brand: product.brand || "",
      price: product.price || "",
      stock: product.stock || "",
      rating: product.rating || "",
      image: product.image || "",
      description: product.description || "",
    });

    setShowEditModal(true);
  };

  // =====================================================
  // EDIT INPUT CHANGE
  // =====================================================

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // UPDATE PRODUCT
  // =====================================================

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    if (!editProduct.name.trim()) {
      alert("Product name is required.");
      return;
    }

    if (!editProduct.category.trim()) {
      alert("Category is required.");
      return;
    }

    if (
      editProduct.price === "" ||
      Number(editProduct.price) < 0
    ) {
      alert("Please enter a valid price.");
      return;
    }

    if (
      editProduct.stock === "" ||
      Number(editProduct.stock) < 0
    ) {
      alert("Please enter a valid stock.");
      return;
    }

    try {
      setEditLoading(true);

      const stock = Number(editProduct.stock);

      const updatedProduct = {
        id: editProduct.id,
        name: editProduct.name.trim(),
        category: editProduct.category.trim(),
        brand: editProduct.brand.trim(),
        price: Number(editProduct.price),
        stock: stock,
        rating: Number(editProduct.rating || 0),
        image: editProduct.image.trim(),
        description: editProduct.description.trim(),

        status:
          stock === 0
            ? "Out of Stock"
            : stock <= 10
            ? "Low Stock"
            : "In Stock",
      };

      console.log(
        "Updating Product:",
        updatedProduct
      );

      const response = await updateProductAPI(
        editProduct.id,
        updatedProduct
      );

      console.log(
        "Update Product Response:",
        response
      );

      setAllProducts((prevProducts) =>
        prevProducts.map((product) =>
          String(product.id) ===
          String(editProduct.id)
            ? updatedProduct
            : product
        )
      );

      setShowEditModal(false);

      alert("Product updated successfully!");
    } catch (err) {
      console.error(
        "Update Product Error:",
        err
      );

      alert(
        "Failed to update product. Please check your JSON Server."
      );
    } finally {
      setEditLoading(false);
    }
  };

  // =====================================================
  // DELETE PRODUCT
  // =====================================================

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;

    try {
      setDeleteLoading(true);

      await deleteProductAPI(
        productToDelete.id
      );

      setAllProducts((prevProducts) =>
        prevProducts.filter(
          (product) =>
            String(product.id) !==
            String(productToDelete.id)
        )
      );

      setShowDeleteModal(false);
      setProductToDelete(null);

      alert("Product deleted successfully!");
    } catch (err) {
      console.error(
        "Delete Product Error:",
        err
      );

      alert(
        "Failed to delete product. Please check your JSON Server."
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  // =====================================================
  // RESET FILTERS
  // =====================================================

  const handleReset = () => {
    setSearchKey("");
    setSelectedCategory("All Categories");
    setSelectedStatus("All Status");
    setCurrentPage(1);
  };

  // =====================================================
  // STATISTICS
  // =====================================================

  const totalProducts =
    allProducts.length;

  const inStockProducts =
    allProducts.filter(
      (product) => getStock(product) > 10
    ).length;

  const lowStockProducts =
    allProducts.filter(
      (product) =>
        getStock(product) > 0 &&
        getStock(product) <= 10
    ).length;

  const outOfStockProducts =
    allProducts.filter(
      (product) => getStock(product) === 0
    ).length;

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div
        className="bg-light min-vh-100 d-flex justify-content-center align-items-center"
        style={{
          marginLeft: "262px",
        }}
      >
        <div className="text-center">
          <div
            className="spinner-border text-dark mb-3"
            style={{
              width: "3rem",
              height: "3rem",
            }}
          ></div>

          <h5>Loading products...</h5>

          <p className="text-muted">
            Please wait while products are loading.
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <div
      className="bg-light min-vh-100 py-4 px-3 px-md-4"
      style={{
        marginLeft: "262px",
      }}
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1">
            All Products
          </h2>

          <p className="text-muted mb-0">
            Manage all AutoForge products
          </p>
        </div>

        {/* ADD PRODUCT BUTTON */}

        <button
          className="btn btn-dark px-4 py-2"
          onClick={handleOpenAddModal}
        >
          <FaPlus className="me-2" />
          Add Product
        </button>
      </div>

      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div className="alert alert-danger d-flex justify-content-between align-items-center">
          <span>{error}</span>

          <button
            className="btn btn-sm btn-danger"
            onClick={getProducts}
          >
            <FaRedo className="me-1" />
            Retry
          </button>
        </div>
      )}

      {/* =================================================
          STATISTICS
      ================================================= */}

      <div className="row g-3 mb-4">
        {/* TOTAL */}

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted mb-2">
                    Total Products
                  </p>

                  <h3 className="fw-bold mb-1">
                    {totalProducts}
                  </h3>

                  <small className="text-muted">
                    All products
                  </small>
                </div>

                <div className="bg-dark text-white rounded-3 p-3">
                  <FaBox />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* IN STOCK */}

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body p-4">
              <p className="text-muted mb-2">
                In Stock
              </p>

              <h3 className="fw-bold mb-1">
                {inStockProducts}
              </h3>

              <small className="text-success">
                Available
              </small>
            </div>
          </div>
        </div>

        {/* LOW STOCK */}

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body p-4">
              <p className="text-muted mb-2">
                Low Stock
              </p>

              <h3 className="fw-bold mb-1">
                {lowStockProducts}
              </h3>

              <small className="text-warning">
                Needs attention
              </small>
            </div>
          </div>
        </div>

        {/* OUT OF STOCK */}

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body p-4">
              <p className="text-muted mb-2">
                Out of Stock
              </p>

              <h3 className="fw-bold mb-1">
                {outOfStockProducts}
              </h3>

              <small className="text-danger">
                Unavailable
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* =================================================
          PRODUCTS CARD
      ================================================= */}

      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        {/* SEARCH / FILTER */}

        <div className="card-header bg-white border-0 p-3 p-md-4">
          <div className="row g-3">

            {/* SEARCH */}

            <div className="col-12 col-lg-5">
              <div className="input-group">
                <span className="input-group-text bg-light border-0">
                  <FaSearch className="text-muted" />
                </span>

                <input
                  type="text"
                  className="form-control bg-light border-0"
                  placeholder="Search name, category, brand or ID..."
                  value={searchKey}
                  onChange={(e) =>
                    setSearchKey(e.target.value)
                  }
                />
              </div>
            </div>

            {/* CATEGORY */}

            <div className="col-12 col-md-6 col-lg-3">
              <select
                className="form-select"
                value={selectedCategory}
                onChange={(e) =>
                  setSelectedCategory(
                    e.target.value
                  )
                }
              >
                {categories.map(
                  (category, index) => (
                    <option
                      key={index}
                      value={category}
                    >
                      {category}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* STATUS */}

            <div className="col-12 col-md-6 col-lg-2">
              <select
                className="form-select"
                value={selectedStatus}
                onChange={(e) =>
                  setSelectedStatus(
                    e.target.value
                  )
                }
              >
                <option>All Status</option>
                <option>In Stock</option>
                <option>Low Stock</option>
                <option>Out of Stock</option>
              </select>
            </div>

            {/* RESET */}

            <div className="col-12 col-lg-2">
              <button
                className="btn btn-outline-dark w-100"
                onClick={handleReset}
              >
                <FaFilter className="me-2" />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* =================================================
            TABLE
        ================================================= */}

        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="px-3 px-md-4">
                  Product
                </th>

                <th>Category</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>

                <th className="text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => {
                  const stock =
                    getStock(product);

                  const status =
                    getStatus(product);

                  return (
                    <tr key={product.id}>

                      {/* PRODUCT */}

                      <td className="px-3 px-md-4">
                        <div className="d-flex align-items-center">
                          <img
                            src={
                              product.image ||
                              "https://via.placeholder.com/60"
                            }
                            alt={product.name}
                            className="rounded-3 me-3"
                            width="60"
                            height="60"
                            style={{
                              objectFit: "cover",
                            }}
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://via.placeholder.com/60";
                            }}
                          />

                          <div>
                            <h6 className="fw-bold mb-1">
                              {product.name ||
                                "Unnamed Product"}
                            </h6>

                            <small className="text-muted">
                              ID: {product.id}
                            </small>
                          </div>
                        </div>
                      </td>

                      {/* CATEGORY */}

                      <td>
                        <span className="badge bg-primary-subtle text-primary">
                          {product.category ||
                            "N/A"}
                        </span>
                      </td>

                      {/* BRAND */}

                      <td>
                        {product.brand || "N/A"}
                      </td>

                      {/* PRICE */}

                      <td className="fw-bold">
                        ₹
                        {Number(
                          product.price || 0
                        ).toLocaleString("en-IN")}
                      </td>

                      {/* STOCK */}

                      <td>
                        {stock} units
                      </td>

                      {/* STATUS */}

                      <td>
                        {getStatusBadge(status)}
                      </td>

                      {/* ACTIONS */}

                      <td className="text-center">
                        <div className="d-flex justify-content-center gap-1">

                          {/* VIEW */}

                          <button
                            className="btn btn-sm btn-light"
                            title="View Product"
                            onClick={() =>
                              handleView(product)
                            }
                          >
                            <FaEye />
                          </button>

                          {/* EDIT */}

                          <button
                            className="btn btn-sm btn-light"
                            title="Edit Product"
                            onClick={() =>
                              handleEdit(product)
                            }
                          >
                            <FaEdit />
                          </button>

                          {/* DELETE */}

                          <button
                            className="btn btn-sm btn-light text-danger"
                            title="Delete Product"
                            onClick={() =>
                              handleDeleteClick(
                                product
                              )
                            }
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-5"
                  >
                    <div className="text-muted">
                      <FaSearch
                        size={35}
                        className="mb-3"
                      />

                      <h5>
                        No products found
                      </h5>

                      <p className="mb-0">
                        Try changing your
                        search or filters.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* =================================================
            PAGINATION
        ================================================= */}

        {filteredProducts.length > 0 && (
          <div className="card-body bg-white border-top">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">

              <div className="text-muted small">
                Showing{" "}
                <strong>
                  {indexOfFirstProduct + 1}
                </strong>{" "}
                -{" "}
                <strong>
                  {Math.min(
                    indexOfLastProduct,
                    filteredProducts.length
                  )}
                </strong>{" "}
                of{" "}
                <strong>
                  {filteredProducts.length}
                </strong>{" "}
                products
              </div>

              <div className="d-flex align-items-center gap-2">
                <small className="text-muted">
                  Show:
                </small>

                <select
                  className="form-select form-select-sm"
                  style={{
                    width: "80px",
                  }}
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(
                      Number(e.target.value)
                    );

                    setCurrentPage(1);
                  }}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                </select>

                <small className="text-muted">
                  items
                </small>
              </div>
            </div>

            {totalPages > 1 && (
              <div className="d-flex justify-content-center mt-4">
                <nav>
                  <ul className="pagination mb-0">

                    {/* PREVIOUS */}

                    <li
                      className={`page-item ${
                        currentPage === 1
                          ? "disabled"
                          : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => {
                          if (
                            currentPage > 1
                          ) {
                            setCurrentPage(
                              currentPage - 1
                            );
                          }
                        }}
                      >
                        Previous
                      </button>
                    </li>

                    {/* PAGE NUMBERS */}

                    {Array.from(
                      {
                        length: totalPages,
                      },
                      (_, index) => {
                        const pageNumber =
                          index + 1;

                        return (
                          <li
                            key={pageNumber}
                            className={`page-item ${
                              currentPage ===
                              pageNumber
                                ? "active"
                                : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() =>
                                setCurrentPage(
                                  pageNumber
                                )
                              }
                            >
                              {pageNumber}
                            </button>
                          </li>
                        );
                      }
                    )}

                    {/* NEXT */}

                    <li
                      className={`page-item ${
                        currentPage ===
                        totalPages
                          ? "disabled"
                          : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => {
                          if (
                            currentPage <
                            totalPages
                          ) {
                            setCurrentPage(
                              currentPage + 1
                            );
                          }
                        }}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </div>
        )}
      </div>

      {/* =====================================================
          ADD PRODUCT MODAL
      ===================================================== */}

      {showAddModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{
            backgroundColor: "rgba(0,0,0,0.65)",
            zIndex: 1055,
          }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content border-0 rounded-4 shadow">

              {/* HEADER */}

              <div className="modal-header border-0 px-4 pt-4">
                <div>
                  <h4 className="modal-title fw-bold">
                    Add New Product
                  </h4>

                  <p className="text-muted mb-0">
                    Add a new product to your inventory
                  </p>
                </div>

                <button
                  type="button"
                  className="btn btn-light rounded-circle"
                  onClick={() =>
                    setShowAddModal(false)
                  }
                  disabled={addLoading}
                >
                  <FaTimes />
                </button>
              </div>

              {/* FORM */}

              <form onSubmit={handleAddProduct}>
                <div className="modal-body px-4 py-4">

                  <div className="row g-3">

                    {/* PRODUCT NAME */}

                    <div className="col-md-8">
                      <label className="form-label fw-semibold">
                        Product Name
                        <span className="text-danger">
                          {" "}*
                        </span>
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Enter product name"
                        value={addProduct.name}
                        onChange={handleAddChange}
                        required
                      />
                    </div>

                    {/* CATEGORY */}

                    <div className="col-md-4">
                      <label className="form-label fw-semibold">
                        Category
                        <span className="text-danger">
                          {" "}*
                        </span>
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        name="category"
                        placeholder="e.g. Laptop"
                        value={addProduct.category}
                        onChange={handleAddChange}
                        required
                      />
                    </div>

                    {/* BRAND */}

                    <div className="col-md-4">
                      <label className="form-label fw-semibold">
                        Brand
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        name="brand"
                        placeholder="e.g. ASUS"
                        value={addProduct.brand}
                        onChange={handleAddChange}
                      />
                    </div>

                    {/* PRICE */}

                    <div className="col-md-4">
                      <label className="form-label fw-semibold">
                        Price
                        <span className="text-danger">
                          {" "}*
                        </span>
                      </label>

                      <div className="input-group">
                        <span className="input-group-text">
                          ₹
                        </span>

                        <input
                          type="number"
                          className="form-control"
                          name="price"
                          min="0"
                          placeholder="0"
                          value={addProduct.price}
                          onChange={handleAddChange}
                          required
                        />
                      </div>
                    </div>

                    {/* STOCK */}

                    <div className="col-md-4">
                      <label className="form-label fw-semibold">
                        Stock
                        <span className="text-danger">
                          {" "}*
                        </span>
                      </label>

                      <input
                        type="number"
                        className="form-control"
                        name="stock"
                        min="0"
                        placeholder="0"
                        value={addProduct.stock}
                        onChange={handleAddChange}
                        required
                      />
                    </div>

                    {/* RATING */}

                    <div className="col-md-4">
                      <label className="form-label fw-semibold">
                        Rating
                      </label>

                      <div className="input-group">
                        <span className="input-group-text">
                          <FaStar className="text-warning" />
                        </span>

                        <input
                          type="number"
                          className="form-control"
                          name="rating"
                          min="0"
                          max="5"
                          step="0.1"
                          placeholder="0 - 5"
                          value={addProduct.rating}
                          onChange={handleAddChange}
                        />
                      </div>
                    </div>

                    {/* IMAGE URL */}

                    <div className="col-md-8">
                      <label className="form-label fw-semibold">
                        Image URL
                      </label>

                      <input
                        type="url"
                        className="form-control"
                        name="image"
                        placeholder="https://example.com/product.jpg"
                        value={addProduct.image}
                        onChange={handleAddChange}
                      />
                    </div>

                    {/* IMAGE PREVIEW */}

                    {addProduct.image && (
                      <div className="col-12">
                        <div className="bg-light rounded-3 p-3">

                          <small className="text-muted d-block mb-2">
                            Image Preview
                          </small>

                          <img
                            src={addProduct.image}
                            alt="Product Preview"
                            className="rounded-3 border"
                            style={{
                              width: "150px",
                              height: "110px",
                              objectFit: "cover",
                            }}
                            onError={(e) => {
                              e.currentTarget.style.display =
                                "none";
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {/* DESCRIPTION */}

                    <div className="col-12">
                      <label className="form-label fw-semibold">
                        Description
                      </label>

                      <textarea
                        className="form-control"
                        name="description"
                        rows="4"
                        placeholder="Enter product description..."
                        value={
                          addProduct.description
                        }
                        onChange={handleAddChange}
                      ></textarea>
                    </div>

                  </div>
                </div>

                {/* FOOTER */}

                <div className="modal-footer border-0 px-4 pb-4">

                  <button
                    type="button"
                    className="btn btn-outline-secondary px-4"
                    onClick={() =>
                      setShowAddModal(false)
                    }
                    disabled={addLoading}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn btn-dark px-4"
                    disabled={addLoading}
                  >
                    {addLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Adding Product...
                      </>
                    ) : (
                      <>
                        <FaPlus className="me-2" />
                        Add Product
                      </>
                    )}
                  </button>

                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          VIEW PRODUCT MODAL
      ===================================================== */}

      {showViewModal && selectedProduct && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{
            backgroundColor: "rgba(0,0,0,0.6)",
            zIndex: 1050,
          }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content border-0 rounded-4 shadow">

              <div className="modal-header border-0">
                <div>
                  <h5 className="modal-title fw-bold">
                    Product Details
                  </h5>

                  <small className="text-muted">
                    Product ID:{" "}
                    {selectedProduct.id}
                  </small>
                </div>

                <button
                  className="btn-close"
                  onClick={() =>
                    setShowViewModal(false)
                  }
                ></button>
              </div>

              <div className="modal-body p-4">
                <div className="row g-4">

                  <div className="col-md-5">
                    <div className="bg-light rounded-4 p-3">
                      <img
                        src={
                          selectedProduct.image ||
                          "https://via.placeholder.com/500"
                        }
                        alt={selectedProduct.name}
                        className="img-fluid rounded-3 w-100"
                        style={{
                          height: "300px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-md-7">

                    <h3 className="fw-bold mb-2">
                      {selectedProduct.name}
                    </h3>

                    <div className="mb-3">
                      {getStatusBadge(
                        getStatus(
                          selectedProduct
                        )
                      )}
                    </div>

                    <div className="row g-3 mb-3">

                      <div className="col-6">
                        <div className="bg-light rounded-3 p-3">
                          <small className="text-muted d-block">
                            Category
                          </small>

                          <strong>
                            {
                              selectedProduct.category
                            }
                          </strong>
                        </div>
                      </div>

                      <div className="col-6">
                        <div className="bg-light rounded-3 p-3">
                          <small className="text-muted d-block">
                            Brand
                          </small>

                          <strong>
                            {
                              selectedProduct.brand ||
                              "N/A"
                            }
                          </strong>
                        </div>
                      </div>

                      <div className="col-6">
                        <div className="bg-light rounded-3 p-3">
                          <small className="text-muted d-block">
                            Price
                          </small>

                          <strong className="text-success">
                            ₹
                            {Number(
                              selectedProduct.price ||
                                0
                            ).toLocaleString(
                              "en-IN"
                            )}
                          </strong>
                        </div>
                      </div>

                      <div className="col-6">
                        <div className="bg-light rounded-3 p-3">
                          <small className="text-muted d-block">
                            Stock
                          </small>

                          <strong>
                            {
                              selectedProduct.stock
                            }{" "}
                            units
                          </strong>
                        </div>
                      </div>

                    </div>

                    {/* RATING */}

                    <div className="mb-3">
                      <small className="text-muted d-block mb-1">
                        Rating
                      </small>

                      <div className="d-flex align-items-center gap-2">
                        <FaStar className="text-warning" />

                        <strong>
                          {selectedProduct.rating ||
                            0}
                        </strong>

                        <span className="text-muted">
                          / 5
                        </span>
                      </div>
                    </div>

                    {/* DESCRIPTION */}

                    <div>
                      <small className="text-muted d-block mb-1">
                        Description
                      </small>

                      <p className="mb-0 text-secondary">
                        {selectedProduct.description ||
                          "No description available."}
                      </p>
                    </div>

                  </div>
                </div>
              </div>

              <div className="modal-footer border-0">

                <button
                  className="btn btn-outline-secondary"
                  onClick={() =>
                    setShowViewModal(false)
                  }
                >
                  Close
                </button>

                <button
                  className="btn btn-dark"
                  onClick={() => {
                    setShowViewModal(false);
                    handleEdit(
                      selectedProduct
                    );
                  }}
                >
                  <FaEdit className="me-2" />
                  Edit Product
                </button>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          EDIT PRODUCT MODAL
      ===================================================== */}

      {showEditModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{
            backgroundColor: "rgba(0,0,0,0.6)",
            zIndex: 1050,
          }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content border-0 rounded-4 shadow">

              <div className="modal-header border-0">

                <div>
                  <h5 className="modal-title fw-bold">
                    Edit Product
                  </h5>

                  <small className="text-muted">
                    ID: {editProduct.id}
                  </small>
                </div>

                <button
                  className="btn-close"
                  onClick={() =>
                    setShowEditModal(false)
                  }
                  disabled={editLoading}
                ></button>
              </div>

              <form
                onSubmit={handleUpdateProduct}
              >
                <div className="modal-body px-4">

                  <div className="row g-3">

                    {/* NAME */}

                    <div className="col-md-8">
                      <label className="form-label fw-semibold">
                        Product Name
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={editProduct.name}
                        onChange={
                          handleEditChange
                        }
                        required
                      />
                    </div>

                    {/* CATEGORY */}

                    <div className="col-md-4">
                      <label className="form-label fw-semibold">
                        Category
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        name="category"
                        value={
                          editProduct.category
                        }
                        onChange={
                          handleEditChange
                        }
                        required
                      />
                    </div>

                    {/* BRAND */}

                    <div className="col-md-4">
                      <label className="form-label fw-semibold">
                        Brand
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        name="brand"
                        value={editProduct.brand}
                        onChange={
                          handleEditChange
                        }
                      />
                    </div>

                    {/* PRICE */}

                    <div className="col-md-4">
                      <label className="form-label fw-semibold">
                        Price
                      </label>

                      <div className="input-group">
                        <span className="input-group-text">
                          ₹
                        </span>

                        <input
                          type="number"
                          className="form-control"
                          name="price"
                          min="0"
                          value={
                            editProduct.price
                          }
                          onChange={
                            handleEditChange
                          }
                          required
                        />
                      </div>
                    </div>

                    {/* STOCK */}

                    <div className="col-md-4">
                      <label className="form-label fw-semibold">
                        Stock
                      </label>

                      <input
                        type="number"
                        className="form-control"
                        name="stock"
                        min="0"
                        value={
                          editProduct.stock
                        }
                        onChange={
                          handleEditChange
                        }
                        required
                      />
                    </div>

                    {/* RATING */}

                    <div className="col-md-4">
                      <label className="form-label fw-semibold">
                        Rating
                      </label>

                      <input
                        type="number"
                        className="form-control"
                        name="rating"
                        min="0"
                        max="5"
                        step="0.1"
                        value={
                          editProduct.rating
                        }
                        onChange={
                          handleEditChange
                        }
                      />
                    </div>

                    {/* IMAGE */}

                    <div className="col-md-8">
                      <label className="form-label fw-semibold">
                        Image URL
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        name="image"
                        value={
                          editProduct.image
                        }
                        onChange={
                          handleEditChange
                        }
                        placeholder="https://..."
                      />
                    </div>

                    {/* IMAGE PREVIEW */}

                    {editProduct.image && (
                      <div className="col-12">
                        <div className="bg-light rounded-3 p-3">

                          <small className="text-muted d-block mb-2">
                            Image Preview
                          </small>

                          <img
                            src={
                              editProduct.image
                            }
                            alt="Preview"
                            style={{
                              width: "120px",
                              height: "90px",
                              objectFit: "cover",
                            }}
                            className="rounded-3"
                            onError={(e) => {
                              e.currentTarget.style.display =
                                "none";
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {/* DESCRIPTION */}

                    <div className="col-12">
                      <label className="form-label fw-semibold">
                        Description
                      </label>

                      <textarea
                        className="form-control"
                        name="description"
                        rows="4"
                        value={
                          editProduct.description
                        }
                        onChange={
                          handleEditChange
                        }
                      ></textarea>
                    </div>

                  </div>
                </div>

                <div className="modal-footer border-0">

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() =>
                      setShowEditModal(false)
                    }
                    disabled={editLoading}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn btn-dark px-4"
                    disabled={editLoading}
                  >
                    {editLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Updating...
                      </>
                    ) : (
                      <>
                        <FaSave className="me-2" />
                        Save Changes
                      </>
                    )}
                  </button>

                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          DELETE MODAL
      ===================================================== */}

      {showDeleteModal &&
        productToDelete && (
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            style={{
              backgroundColor: "rgba(0,0,0,0.6)",
              zIndex: 1050,
            }}
          >
            <div className="modal-dialog modal-dialog-centered">

              <div className="modal-content border-0 rounded-4 shadow">

                <div className="modal-header border-0">

                  <h5 className="modal-title fw-bold text-danger">
                    Delete Product
                  </h5>

                  <button
                    className="btn-close"
                    onClick={() =>
                      setShowDeleteModal(false)
                    }
                    disabled={deleteLoading}
                  ></button>

                </div>

                <div className="modal-body text-center px-4">

                  <div
                    className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle bg-danger-subtle text-danger"
                    style={{
                      width: "70px",
                      height: "70px",
                    }}
                  >
                    <FaTrash size={28} />
                  </div>

                  <h5 className="fw-bold">
                    Are you sure?
                  </h5>

                  <p className="text-muted mb-2">
                    You are about to delete:
                  </p>

                  <h6 className="fw-bold">
                    {productToDelete.name}
                  </h6>

                  <p className="text-muted small">
                    This action cannot be undone.
                  </p>

                </div>

                <div className="modal-footer border-0 justify-content-center pb-4">

                  <button
                    className="btn btn-outline-secondary px-4"
                    onClick={() =>
                      setShowDeleteModal(false)
                    }
                    disabled={deleteLoading}
                  >
                    Cancel
                  </button>

                  <button
                    className="btn btn-danger px-4"
                    onClick={
                      handleConfirmDelete
                    }
                    disabled={deleteLoading}
                  >
                    {deleteLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Deleting...
                      </>
                    ) : (
                      <>
                        <FaTrash className="me-2" />
                        Delete Product
                      </>
                    )}
                  </button>

                </div>

              </div>
            </div>
          </div>
        )}

      {/* =====================================================
          MODAL BACKDROP
      ===================================================== */}

      {(showAddModal ||
        showViewModal ||
        showEditModal ||
        showDeleteModal) && (
        <div
          className="modal-backdrop fade show"
          style={{
            zIndex: 1040,
          }}
        ></div>
      )}
    </div>
  );
}

export default AllProducts;