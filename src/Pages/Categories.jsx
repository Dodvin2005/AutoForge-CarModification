import React, { useEffect, useState } from "react";
import {
  FaTachometerAlt,
  FaCar,
  FaCircle,
  FaLightbulb,
  FaFire,
  FaVolumeUp,
  FaTools,
} from "react-icons/fa";
import { getAllCategoriesAPI } from "../Services/Api";

const Categories = () => {
 

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // FETCH CATEGORIES

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllCategoriesAPI();

      console.log("Categories API Response:", response);

      // Axios response -> response.data
      setCategories(response.data || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Failed to load categories. Please try again.");
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    fetchCategories();
  }, []);

  // ICON FUNCTION

  const getCategoryIcon = (name) => {
    const categoryName = name?.toLowerCase() || "";

    if (
      categoryName.includes("engine") ||
      categoryName.includes("performance")
    ) {
      return <FaTachometerAlt />;
    }

    if (categoryName.includes("exterior")) {
      return <FaCar />;
    }

    if (
      categoryName.includes("wheel") ||
      categoryName.includes("tyre") ||
      categoryName.includes("tire")
    ) {
      return <FaCircle />;
    }

    if (categoryName.includes("light")) {
      return <FaLightbulb />;
    }

    if (categoryName.includes("exhaust")) {
      return <FaFire />;
    }

    if (
      categoryName.includes("audio") ||
      categoryName.includes("infotainment") ||
      categoryName.includes("speaker")
    ) {
      return <FaVolumeUp />;
    }

    return <FaTools />;
  };

  // LOADING

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center py-5">
          <div
            className="spinner-border text-danger"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>

          <p className="text-muted mt-3">
            Loading categories...
          </p>
        </div>
      </div>
    );
  }

  // ERROR

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger text-center">
          {error}

          <div className="mt-3">
            <button
              className="btn btn-danger rounded-pill px-4"
              onClick={fetchCategories}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // UI

  return (
    <div className="container py-5">

      {/* Heading */}
      <div className="text-center mb-5">
        <h2 className="fw-bold">
          Explore <span className="text-danger">Categories</span>
        </h2>

        <p className="text-muted">
          Choose the right upgrades for your car
        </p>
      </div>

      {/* No Categories */}
      {categories.length === 0 ? (
        <div className="text-center py-5">
          <FaTools
            size={50}
            className="text-muted mb-3"
          />

          <h5 className="fw-bold">
            No categories available
          </h5>

          <p className="text-muted">
            Categories will appear here once they are added.
          </p>
        </div>
      ) : (
        /* Cards */
        <div className="row g-4">

          {categories.map((category) => (
            <div
              className="col-12 col-sm-6 col-lg-4"
              key={category.id}
            >
              <div
                className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden"
                style={{
                  transition: "0.3s",
                }}
              >

                {/* Category Image */}
                {category.image && (
                  <div
                    style={{
                      height: "180px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-100 h-100"
                      style={{
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}

                <div className="card-body p-4 text-center">

                  {/* Icon */}
                  <div
                    className="mx-auto mb-4 d-flex align-items-center justify-content-center bg-danger text-white rounded-circle"
                    style={{
                      width: "70px",
                      height: "70px",
                      fontSize: "28px",
                    }}
                  >
                    {getCategoryIcon(category.name)}
                  </div>

                  {/* Category Name */}
                  <h4 className="fw-bold">
                    {category.name}
                  </h4>

                  {/* Description */}
                  <p className="text-muted">
                    {category.description}
                  </p>

                  {/* Explore Button */}
                  <button
                    className="btn btn-outline-danger rounded-pill px-4"
                  >
                    Explore
                  </button>

                </div>
              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default Categories;