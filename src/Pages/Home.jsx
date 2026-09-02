import React from "react";
import { Link } from "react-router-dom";

import {
  FaCarSide,
  FaGaugeHigh,
  FaBolt,
  FaCircle,
  FaArrowRight,
  FaHeart,
  FaStar,
  FaShieldHalved,
  FaTruckFast,
  FaHeadset,
  FaWrench,
  FaPalette,
  FaCheck,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa6";

import { FaShoppingCart } from "react-icons/fa";

const Home = () => {
  const categories = [
    {
      title: "Exterior",
      icon: <FaCarSide />,
      image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80",
      description: "Body kits, spoilers, bumpers & more",
      link: "/exterior",
    },
    {
      title: "Performance",
      icon: <FaGaugeHigh />,
      image:
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80",
      description: "Exhausts, turbo kits & performance parts",
      link: "/performance",
    },
    {
      title: "Wheels & Tyres",
      icon: <FaCircle />,
      image:
        "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=900&q=80",
      description: "Premium wheels & performance tyres",
      link: "/wheels",
    },
    {
      title: "Lighting",
      icon: <FaBolt />,
      image:
        "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80",
      description: "LED headlights, DRLs & ambient lighting",
      link: "/lighting",
    },
  ];

  const products = [
    {
      name: "Carbon Fiber Front Splitter",
      category: "Exterior",
      price: "₹8,999",
      oldPrice: "₹11,999",
      rating: "4.8",
      image:
        "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=800&q=80",
      badge: "BEST SELLER",
    },
    {
      name: "Performance Alloy Wheels",
      category: "Wheels",
      price: "₹32,499",
      oldPrice: "₹38,999",
      rating: "4.9",
      image:
        "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=800&q=80",
      badge: "POPULAR",
    },
    {
      name: "LED Projector Headlights",
      category: "Lighting",
      price: "₹14,999",
      oldPrice: "₹18,499",
      rating: "4.7",
      image:
        "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=800&q=80",
      badge: "NEW",
    },
    {
      name: "Performance Exhaust",
      category: "Performance",
      price: "₹24,999",
      oldPrice: "₹29,999",
      rating: "4.8",
      image:
        "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=800&q=80",
      badge: "HOT",
    },
  ];

  const services = [
    {
      icon: <FaWrench />,
      title: "Professional Installation",
      description:
        "Expert installation by experienced automotive technicians.",
    },
    {
      icon: <FaGaugeHigh />,
      title: "Performance Tuning",
      description:
        "Improve power, handling and overall driving performance.",
    },
    {
      icon: <FaPalette />,
      title: "Custom Styling",
      description:
        "Create a unique look that represents your personality.",
    },
    {
      icon: <FaCarSide />,
      title: "Complete Modification",
      description:
        "Everything you need to build your dream machine.",
    },
  ];

  return (
    <div>

      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <section
        className="min-vh-100 d-flex align-items-center text-white mx-3"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(0,0,0,.95), rgba(0,0,0,.65), rgba(0,0,0,.2)), url('https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=2000&q=90')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

        <div className="container ">

          <div className="row ">

            <div className="col-lg-7">

              <span className="badge bg-danger rounded-pill px-3 py-2 mb-4">
                Dream it. Build it. Drive it.
              </span>

              <h1 className="display-1 fw-bold lh-1">
                BUILD YOUR
                <br />
                <span className="text-danger">
                  DREAM MACHINE.
                </span>
              </h1>

              <p className="lead text-white-50 mt-4 mb-4">
                Premium aftermarket parts, performance upgrades and
                professional modification solutions for automotive
                enthusiasts.
              </p>

              <div className="d-flex flex-wrap gap-3">

                <Link
                  to="/products"
                  className="btn btn-danger btn-lg px-4 py-3 fw-bold"
                >
                  Explore Products
                  <FaArrowRight className="ms-2" />
                </Link>

                <Link
                  to="/categories"
                  className="btn btn-outline-light btn-lg px-4 py-3"
                >
                  Explore Categories
                </Link>

              </div>

              {/* HERO STATS */}

              <div className="row border-top border-secondary mt-5 pt-4">

                <div className="col-4">

                  <h3 className="fw-bold">
                    5K+
                  </h3>

                  <small className="text-white-50">
                    Happy Customers
                  </small>

                </div>

                <div className="col-4">

                  <h3 className="fw-bold">
                    500+
                  </h3>

                  <small className="text-white-50">
                    Products
                  </small>

                </div>

                <div className="col-4">

                  <h3 className="fw-bold">
                    4.9/5
                  </h3>

                  <small className="text-white-50">
                    Customer Rating
                  </small>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* FEATURES */}
      {/* ================================================= */}

      <section className="border-bottom bg-white py-4">

        <div className="container">

          <div className="row g-4">

            <div className="col-6 col-lg-3">

              <div className="d-flex align-items-center gap-3">

                <div className="bg-danger bg-opacity-10 text-danger rounded-3 p-3">
                  <FaTruckFast size={22} />
                </div>

                <div>
                  <h6 className="fw-bold mb-1">
                    Fast Delivery
                  </h6>

                  <small className="text-muted">
                    Across India
                  </small>
                </div>

              </div>

            </div>


            <div className="col-6 col-lg-3">

              <div className="d-flex align-items-center gap-3">

                <div className="bg-danger bg-opacity-10 text-danger rounded-3 p-3">
                  <FaShieldHalved size={22} />
                </div>

                <div>
                  <h6 className="fw-bold mb-1">
                    Secure Payment
                  </h6>

                  <small className="text-muted">
                    100% Protected
                  </small>
                </div>

              </div>

            </div>


            <div className="col-6 col-lg-3">

              <div className="d-flex align-items-center gap-3">

                <div className="bg-danger bg-opacity-10 text-danger rounded-3 p-3">
                  <FaCheck size={22} />
                </div>

                <div>
                  <h6 className="fw-bold mb-1">
                    Premium Quality
                  </h6>

                  <small className="text-muted">
                    Tested Products
                  </small>
                </div>

              </div>

            </div>


            <div className="col-6 col-lg-3">

              <div className="d-flex align-items-center gap-3">

                <div className="bg-danger bg-opacity-10 text-danger rounded-3 p-3">
                  <FaHeadset size={22} />
                </div>

                <div>
                  <h6 className="fw-bold mb-1">
                    Expert Support
                  </h6>

                  <small className="text-muted">
                    Always Available
                  </small>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* CATEGORIES */}
      {/* ================================================= */}

      <section className="py-5 bg-light">

        <div className="container py-lg-4">

          <div className="text-center mb-5">

            <span className="text-danger fw-bold small">
              EXPLORE OUR COLLECTION
            </span>

            <h2 className="display-6 fw-bold mt-2">
              Shop By Category
            </h2>

            <p className="text-muted">
              Everything you need to transform your vehicle.
            </p>

          </div>


          <div className="row g-4">

            {categories.map((category, index) => (

              <div
                className="col-12 col-sm-6 col-lg-3"
                key={index}
              >

                <Link
                  to={category.link}
                  className="text-decoration-none"
                >

                  <div
                    className="card border-0 shadow-sm overflow-hidden text-white"
                    style={{ height: "380px" }}
                  >

                    <img
                      src={category.image}
                      className="card-img h-100 object-fit-cover"
                      alt={category.title}
                    />

                    <div className="card-img-overlay d-flex flex-column justify-content-end p-4 bg-dark bg-opacity-50">

                      <div className="text-danger fs-3 mb-2">
                        {category.icon}
                      </div>

                      <h4 className="fw-bold">
                        {category.title}
                      </h4>

                      <p className="small text-white-50">
                        {category.description}
                      </p>

                      <span className="fw-semibold">
                        Shop Now
                        <FaArrowRight className="ms-2" />
                      </span>

                    </div>

                  </div>

                </Link>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* PRODUCTS */}
      {/* ================================================= */}

      <section className="py-5">

        <div className="container py-lg-4">

          <div className="d-flex justify-content-between align-items-end mb-5">

            <div>

              <span className="text-danger fw-bold small">
                HANDPICKED FOR YOU
              </span>

              <h2 className="display-6 fw-bold mt-2 mb-0">
                Featured Products
              </h2>

            </div>

            <Link
              to="/products"
              className="btn btn-outline-dark d-none d-md-block"
            >
              View All
              <FaArrowRight className="ms-2" />
            </Link>

          </div>


          <div className="row g-4">

            {products.map((product, index) => (

              <div
                className="col-12 col-sm-6 col-lg-3"
                key={index}
              >

                <div className="card h-100 border-0 shadow-sm">

                  <div className="position-relative">

                    <img
                      src={product.image}
                      className="card-img-top"
                      style={{
                        height: "250px",
                        objectFit: "cover",
                      }}
                      alt={product.name}
                    />

                    <span className="badge bg-danger position-absolute top-0 start-0 m-3">
                      {product.badge}
                    </span>

                    <button className="btn btn-light rounded-circle position-absolute top-0 end-0 m-3 shadow-sm">
                      <FaHeart />
                    </button>

                  </div>


                  <div className="card-body p-4">

                    <small className="text-danger fw-semibold">
                      {product.category}
                    </small>

                    <h5 className="fw-bold mt-2">
                      {product.name}
                    </h5>


                    <div className="d-flex align-items-center gap-1 mb-3">

                      {[1, 2, 3, 4, 5].map((star) => (

                        <FaStar
                          key={star}
                          className="text-warning"
                          size={13}
                        />

                      ))}

                      <small className="text-muted ms-1">
                        {product.rating}
                      </small>

                    </div>


                    <div className="d-flex justify-content-between align-items-center">

                      <div>

                        <span className="fw-bold fs-5">
                          {product.price}
                        </span>

                        <del className="text-muted small ms-2">
                          {product.oldPrice}
                        </del>

                      </div>

                      <button className="btn btn-dark rounded-circle">
                        <FaShoppingCart />
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>


          <div className="text-center mt-4 d-md-none">

            <Link
              to="/products"
              className="btn btn-dark px-4"
            >
              View All Products
            </Link>

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* PROMOTION */}
      {/* ================================================= */}

      <section className="py-5">

        <div className="container">

          <div
            className="rounded-4 overflow-hidden text-white"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(0,0,0,.95), rgba(0,0,0,.55)), url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1800&q=85')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >

            <div className="p-4 p-md-5">

              <div className="row">

                <div className="col-lg-7">

                  <span className="text-danger fw-bold">
                    AUTOFORGE PERFORMANCE
                  </span>

                  <h2 className="display-5 fw-bold mt-2">
                    UNLEASH THE
                    <br />
                    BEAST WITHIN.
                  </h2>

                  <p className="text-white-50">
                    Upgrade your vehicle with performance-focused
                    components engineered for better power, handling
                    and driving experience.
                  </p>

                  <Link
                    to="/performance"
                    className="btn btn-danger px-4 py-3 mt-2"
                  >
                    Upgrade Performance
                    <FaArrowRight className="ms-2" />
                  </Link>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* SERVICES */}
      {/* ================================================= */}

      <section className="py-5 bg-dark text-white">

        <div className="container py-lg-4">

          <div className="text-center mb-5">

            <span className="text-danger fw-bold small">
              MORE THAN JUST PARTS
            </span>

            <h2 className="display-6 fw-bold mt-2">
              Complete Modification Services
            </h2>

            <p className="text-white-50">
              Professional solutions for your dream build.
            </p>

          </div>


          <div className="row g-4">

            {services.map((service, index) => (

              <div
                className="col-12 col-sm-6 col-lg-3"
                key={index}
              >

                <div className="border border-secondary rounded-4 p-4 h-100">

                  <div className="text-danger fs-2 mb-4">
                    {service.icon}
                  </div>

                  <h5 className="fw-bold">
                    {service.title}
                  </h5>

                  <p className="text-white-50 mb-0">
                    {service.description}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* ABOUT */}
      {/* ================================================= */}

      <section className="py-5">

        <div className="container py-lg-5">

          <div className="row align-items-center g-5">

            <div className="col-lg-6">

              <img
                src="https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=1200&q=85"
                alt="Modified car"
                className="img-fluid rounded-4 shadow"
              />

            </div>


            <div className="col-lg-6">

              <span className="text-danger fw-bold small">
                WHY AUTOFORGE
              </span>

              <h2 className="display-6 fw-bold mt-3">
                Your Car.
                <br />
                <span className="text-danger">
                  Your Identity.
                </span>
              </h2>

              <p className="text-muted mt-4">
                AutoForge is built for automotive enthusiasts who believe
                their car should be more than just transportation.
              </p>

              <p className="text-muted">
                Discover premium aftermarket products, trusted brands
                and expert modification solutions under one roof.
              </p>


              <div className="row g-3 mt-3">

                {[
                  "Genuine Products",
                  "Expert Guidance",
                  "Secure Shopping",
                  "Nationwide Delivery",
                ].map((item, index) => (

                  <div className="col-md-6" key={index}>

                    <div className="d-flex gap-2">

                      <FaCheck className="text-danger mt-1" />

                      <span className="fw-semibold">
                        {item}
                      </span>

                    </div>

                  </div>

                ))}

              </div>


              <Link
                to="/about"
                className="btn btn-dark px-4 py-3 mt-4"
              >
                Discover AutoForge
                <FaArrowRight className="ms-2" />
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* BRANDS */}
      {/* ================================================= */}

      <section className="py-5 bg-light border-top border-bottom">

        <div className="container">

          <div className="text-center mb-4">

            <small className="text-muted fw-bold">
              PREMIUM BRANDS
            </small>

          </div>

          <div className="row text-center align-items-center g-4">

            {[
              "BREMBO",
              "BILSTEIN",
              "OZ RACING",
              "HKS",
              "KW",
              "AKRAPOVIC",
            ].map((brand, index) => (

              <div className="col-6 col-md-4 col-lg-2" key={index}>

                <h5 className="fw-bold text-secondary">
                  {brand}
                </h5>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* STATS */}
      {/* ================================================= */}

      <section className="py-5">

        <div className="container">

          <div className="row text-center g-4">

            <div className="col-6 col-lg-3">

              <FaCarSide
                className="text-danger"
                size={30}
              />

              <h2 className="fw-bold mt-3">
                5,000+
              </h2>

              <p className="text-muted">
                Cars Modified
              </p>

            </div>


            <div className="col-6 col-lg-3">

              <FaCircle
                className="text-danger"
                size={30}
              />

              <h2 className="fw-bold mt-3">
                500+
              </h2>

              <p className="text-muted">
                Premium Products
              </p>

            </div>


            <div className="col-6 col-lg-3">

              <FaWrench
                className="text-danger"
                size={30}
              />

              <h2 className="fw-bold mt-3">
                50+
              </h2>

              <p className="text-muted">
                Modification Experts
              </p>

            </div>


            <div className="col-6 col-lg-3">

              <FaStar
                className="text-danger"
                size={30}
              />

              <h2 className="fw-bold mt-3">
                4.9/5
              </h2>

              <p className="text-muted">
                Customer Rating
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* CTA */}
      {/* ================================================= */}

      <section className="py-5">

        <div className="container">

          <div className="bg-light border rounded-4 text-center p-4 p-md-5">

            <span className="text-danger fw-bold">
              READY TO BUILD?
            </span>

            <h2 className="display-6 fw-bold mt-2">
              Turn Your Car Into Something Extraordinary.
            </h2>

            <p className="text-muted mx-auto">
              Explore premium automotive parts and start building
              the car you've always wanted.
            </p>

            <div className="d-flex justify-content-center flex-wrap gap-3 mt-4">

              <Link
                to="/products"
                className="btn btn-dark btn-lg px-4"
              >
                Start Shopping
                <FaShoppingCart className="ms-2" />
              </Link>

              <Link
                to="/contact"
                className="btn btn-outline-dark btn-lg px-4"
              >
                Talk To An Expert
                <FaHeadset className="ms-2" />
              </Link>

            </div>

          </div>

        </div>

      </section>


      

    </div>
  );
};

export default Home;