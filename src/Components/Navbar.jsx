import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  FaCarSide,
  FaSearch,
  FaHeart,
  FaShoppingBag,
  FaSun,
  FaMoon,
  FaTimes,
} from "react-icons/fa";

function Navbar() {
  // =====================================================
  // STATES
  // =====================================================

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchKey, setSearchKey] = useState("");

  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();

  // =====================================================
  // APPLY THEME
  // =====================================================

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // =====================================================
  // CHANGE THEME
  // =====================================================

  const changeTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === "light" ? "dark" : "light"
    );
  };

  // =====================================================
  // CLOSE MOBILE MENU
  // =====================================================

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // =====================================================
  // SEARCH
  // =====================================================

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchKey.trim()) return;

    // You can later connect this to your Products page
    window.location.href = `/products?search=${encodeURIComponent(
      searchKey.trim()
    )}`;
  };

  // =====================================================
  // NAV LINK CLASS
  // =====================================================

  const navLinkClass = ({ isActive }) =>
    `nav-link fw-semibold px-3 ${
      isActive ? "text-primary" : ""
    }`;

  // =====================================================
  // UI
  // =====================================================

  return (
    <nav className="navbar navbar-expand-lg bg-body sticky-top border-bottom shadow-sm">
      <div className="container">

        {/* =================================================
            BRAND
        ================================================= */}

        <Link
          to="/"
          className="navbar-brand d-flex align-items-center gap-2"
          onClick={closeMenu}
        >
          <div className="bg-primary text-white rounded-3 p-2">
            <FaCarSide size={32} />
          </div>

          <div>
            <h5 className="mb-0 fw-bold">
              AUTO<span className="text-primary">FORGE</span>
            </h5>

            <small
              className="text-secondary"
              style={{
                fontSize: "10px",
                letterSpacing: "2px",
              }}
            >
              AUTOPHILE MODZZZ
            </small>
          </div>
        </Link>

        {/* =================================================
            MOBILE TOGGLE
        ================================================= */}

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-controls="driveNavbar"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <FaTimes /> : <span className="navbar-toggler-icon" />}
        </button>

        {/* =================================================
            NAVBAR CONTENT
        ================================================= */}

        <div
          className={`collapse navbar-collapse ${
            menuOpen ? "show" : ""
          }`}
          id="driveNavbar"
        >

          {/* =================================================
              NAV LINKS
          ================================================= */}

          <ul className="navbar-nav mx-auto align-items-lg-center">

            {/* HOME */}
            <li className="nav-item">
              <NavLink
                to="/"
                className={navLinkClass}
                onClick={closeMenu}
              >
                Home
              </NavLink>
            </li>

            {/* PRODUCTS */}
            <li className="nav-item">
              <NavLink
                to="/products"
                className={navLinkClass}
                onClick={closeMenu}
              >
                Products
              </NavLink>
            </li>

            {/* CATEGORIES */}
            <li className="nav-item">
              <NavLink
                to="/categories"
                className={navLinkClass}
                onClick={closeMenu}
              >
                Categories
              </NavLink>
            </li>

            {/* DEALS */}
            <li className="nav-item">
              <NavLink
                to="/deals"
                className={navLinkClass}
                onClick={closeMenu}
              >
                Today's Deals
              </NavLink>
            </li>

            {/* ABOUT */}
            <li className="nav-item">
              <NavLink
                to="/about"
                className={navLinkClass}
                onClick={closeMenu}
              >
                About
              </NavLink>
            </li>

          </ul>

          {/* =================================================
              RIGHT SECTION
          ================================================= */}

          <div className="d-flex align-items-center gap-2 gap-lg-3 mt-3 mt-lg-0">

            {/* =================================================
                SEARCH
            ================================================= */}

            {searchOpen ? (
              <form
                onSubmit={handleSearch}
                className="d-flex align-items-center"
              >
                <div className="input-group">

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search products..."
                    value={searchKey}
                    onChange={(e) =>
                      setSearchKey(e.target.value)
                    }
                    autoFocus
                    style={{
                      minWidth: "180px",
                    }}
                  />

                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    <FaSearch size={14} />
                  </button>

                  <button
                    type="button"
                    className="btn btn-light border"
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchKey("");
                    }}
                  >
                    <FaTimes size={13} />
                  </button>

                </div>
              </form>
            ) : (
              <button
                type="button"
                className="btn btn-light border rounded-3"
                title="Search"
                onClick={() => setSearchOpen(true)}
              >
                <FaSearch size={15} />
              </button>
            )}

            {/* =================================================
                WISHLIST
            ================================================= */}

            <Link
              to="/wishlist"
              className="btn btn-light border rounded-3 position-relative"
              onClick={closeMenu}
              title="Wishlist"
            >
              <FaHeart size={15} />

              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                2
              </span>
            </Link>

            {/* =================================================
                CART
            ================================================= */}

            <Link
              to="/cart"
              className="btn btn-light border rounded-3 position-relative"
              onClick={closeMenu}
              title="Cart"
            >
              <FaShoppingBag size={15} />

              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                3
              </span>
            </Link>

            {/* =================================================
                THEME
            ================================================= */}

            <button
              type="button"
              onClick={changeTheme}
              className="btn btn-light border rounded-3"
              title={
                theme === "light"
                  ? "Switch to dark mode"
                  : "Switch to light mode"
              }
            >
              {theme === "light" ? (
                <FaMoon size={15} />
              ) : (
                <FaSun size={15} />
              )}
            </button>

          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;