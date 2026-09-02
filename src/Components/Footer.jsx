import React from 'react'
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
    {/* ================================================= */}
      {/* FOOTER */}
      {/* ================================================= */}

      <footer className="bg-black text-white">

        <div className="container py-5">

          <div className="row g-5">

            {/* BRAND */}

            <div className="col-lg-4">

              <h3 className="fw-bold">
                AUTO
                <span className="text-danger">
                  FORGE
                </span>
              </h3>

              <p className="text-white-50 mt-3">
                Premium automotive modifications, aftermarket parts
                and performance upgrades for automotive enthusiasts.
              </p>

              <div className="d-flex gap-2 mt-4">

                <a
                  href="#"
                  className="btn btn-outline-secondary rounded-circle"
                >
                  <FaInstagram />
                </a>

                <a
                  href="#"
                  className="btn btn-outline-secondary rounded-circle"
                >
                  <FaFacebookF />
                </a>

                <a
                  href="#"
                  className="btn btn-outline-secondary rounded-circle"
                >
                  <FaYoutube />
                </a>

              </div>

            </div>


            {/* SHOP */}

            <div className="col-6 col-lg-2">

              <h6 className="fw-bold mb-4">
                SHOP
              </h6>

              <div className="d-flex flex-column gap-3">

                <Link
                  to="/products"
                  className="text-white-50 text-decoration-none"
                >
                  All Products
                </Link>

                <Link
                  to="/exterior"
                  className="text-white-50 text-decoration-none"
                >
                  Exterior
                </Link>

                <Link
                  to="/exterior"
                  className="text-white-50 text-decoration-none"
                >
                  Interior
                </Link>

                <Link
                  to="/performance"
                  className="text-white-50 text-decoration-none"
                >
                  Performance
                </Link>

                <Link
                  to="/wheels"
                  className="text-white-50 text-decoration-none"
                >
                  Wheels
                </Link>

                <Link
                  to="/lighting"
                  className="text-white-50 text-decoration-none"
                >
                  Lighting
                </Link>

              </div>

            </div>


            {/* COMPANY */}

            <div className="col-6 col-lg-2">

              <h6 className="fw-bold mb-4">
                COMPANY
              </h6>

              <div className="d-flex flex-column gap-3">

                <Link
                  to="/about"
                  className="text-white-50 text-decoration-none"
                >
                  About Us
                </Link>

                <Link
                  to="/services"
                  className="text-white-50 text-decoration-none"
                >
                  Services
                </Link>

                <Link
                  to="/contact"
                  className="text-white-50 text-decoration-none"
                >
                  Contact
                </Link>

                <Link
                  to="/faq"
                  className="text-white-50 text-decoration-none"
                >
                  FAQ
                </Link>

              </div>

            </div>


            {/* NEWSLETTER */}

            <div className="col-lg-4">

              <h6 className="fw-bold mb-4">
                STAY IN THE GARAGE
              </h6>

              <p className="text-white-50">
                Subscribe for new products, modification inspiration
                and exclusive offers.
              </p>

              <div className="input-group">

                <input
                  type="email"
                  className="form-control bg-dark text-white border-secondary"
                  placeholder="Email address"
                />

                <button className="btn btn-danger">
                  Subscribe
                </button>

              </div>

            </div>

          </div>


          <hr className="border-secondary my-5" />


          <div className="d-flex flex-column flex-md-row justify-content-between text-white-50">

            <small>
              © 2026 AutoForge. All Rights Reserved.
            </small>

            <small>
              Built for Automotive Enthusiasts.
            </small>

          </div>

        </div>

      </footer></>
  )
}

export default Footer