import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaCarSide,
  FaTachometerAlt,
  FaBoxOpen,
  FaPlusCircle,
  FaShoppingCart,
  FaCog,
  FaSignOutAlt,
  FaChevronRight,
  FaBars,
} from "react-icons/fa";

function AdminSidebar() {
  // =========================
  // SIDEBAR LINK
  // =========================

  const SidebarLink = ({
    to,
    icon,
    title,
    closeMenu = false,
  }) => {
    return (
      <NavLink
        to={to}
        className="text-decoration-none"
        data-bs-dismiss={closeMenu ? "offcanvas" : undefined}
      >
        {({ isActive }) => (
          <div
            className="d-flex align-items-center justify-content-between px-3 py-3 mb-2 rounded-3"
            style={{
              color: isActive ? "#ffffff" : "#9ca3af",
              backgroundColor: isActive
                ? "#f97316"
                : "transparent",
              transition: "0.2s",
              cursor: "pointer",
            }}
          >
            <div className="d-flex align-items-center gap-3">
              <span
                style={{
                  width: "20px",
                  fontSize: "17px",
                }}
              >
                {icon}
              </span>

              <span className="fw-medium">
                {title}
              </span>
            </div>

            {isActive && (
              <FaChevronRight size={11} />
            )}
          </div>
        )}
      </NavLink>
    );
  };

  return (
    <>
      {/* ================================================= */}
      {/* MOBILE NAVBAR */}
      {/* ================================================= */}

      <nav className="navbar bg-dark d-lg-none px-3 py-3">
        <div className="container-fluid">
          <div className="d-flex align-items-center">

            <button
              className="btn btn-warning me-3"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#mobileSidebar"
            >
              <FaBars />
            </button>

            <div className="text-white">
              <h5 className="fw-bold mb-0">
                Auto
                <span style={{ color: "#f97316" }}>
                  Forge
                </span>
              </h5>

              <small className="text-secondary">
                ADMIN PANEL
              </small>
            </div>

          </div>
        </div>
      </nav>

      {/* ================================================= */}
      {/* DESKTOP SIDEBAR */}
      {/* ================================================= */}

      <aside
        className="d-none d-lg-flex flex-column text-white shadow-lg"
        style={{
          width: "270px",
          height: "100vh",
          backgroundColor: "#111827",
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: 1000,
        }}
      >

        {/* ================= LOGO ================= */}

        <div
          className="px-4 py-4 border-bottom"
          style={{
            borderColor: "#273244",
          }}
        >
          <div className="d-flex align-items-center gap-3">

            <div
              className="d-flex align-items-center justify-content-center rounded-3"
              style={{
                width: "45px",
                height: "45px",
                backgroundColor: "#f97316",
                fontSize: "22px",
              }}
            >
              <FaCarSide />
            </div>

            <div>
              <h5 className="fw-bold mb-0">
                Auto
                <span style={{ color: "#f97316" }}>
                  Forge
                </span>
              </h5>

              <small className="text-secondary">
                ADMIN PANEL
              </small>
            </div>

          </div>
        </div>

        {/* ================= PROFILE ================= */}

        <div className="px-3 py-4">
          <div
            className="d-flex align-items-center gap-3 p-3 rounded-3"
            style={{
              backgroundColor: "#1f2937",
            }}
          >

            <div
              className="rounded-circle d-flex align-items-center justify-content-center fw-bold"
              style={{
                width: "42px",
                height: "42px",
                backgroundColor: "#374151",
                color: "#f97316",
              }}
            >
              A
            </div>

            <div>
              <div className="fw-semibold">
                Admin
              </div>

              <small className="text-secondary">
                Administrator
              </small>
            </div>

          </div>
        </div>

        {/* ================= MANAGEMENT ================= */}

        <div className="px-4 mb-2">
          <small
            className="text-uppercase fw-semibold"
            style={{
              color: "#6b7280",
              fontSize: "11px",
              letterSpacing: "1px",
            }}
          >
            Management
          </small>
        </div>

        {/* ================= DESKTOP LINKS ================= */}

        <nav className="px-3">

          <SidebarLink
            to="/admin"
            icon={<FaTachometerAlt />}
            title="Dashboard"
          />

          <SidebarLink
            to="/admin/products"
            icon={<FaBoxOpen />}
            title="Products"
          />

          

          <SidebarLink
            to="/admin/orders"
            icon={<FaShoppingCart />}
            title="Orders"
          />

        </nav>

        {/* ================= BOTTOM ================= */}

        <div className="mt-auto px-3 pb-4">

          <hr
            style={{
              borderColor: "#273244",
            }}
          />

          <SidebarLink
            to="/admin/settings"
            icon={<FaCog />}
            title="Settings"
          />

          <div
            className="d-flex align-items-center gap-3 px-3 py-3 rounded-3 text-danger"
            style={{
              cursor: "pointer",
            }}
          >
            <FaSignOutAlt />

            <span>
              Logout
            </span>
          </div>

        </div>

      </aside>

      {/* ================================================= */}
      {/* MOBILE OFFCANVAS */}
      {/* ================================================= */}

      <div
        className="offcanvas offcanvas-start text-white"
        tabIndex="-1"
        id="mobileSidebar"
        style={{
          width: "280px",
          backgroundColor: "#111827",
        }}
      >

        {/* ================= HEADER ================= */}

        <div
          className="offcanvas-header border-bottom"
          style={{
            borderColor: "#273244",
          }}
        >

          <div className="d-flex align-items-center gap-3">

            <div
              className="d-flex align-items-center justify-content-center rounded-3"
              style={{
                width: "42px",
                height: "42px",
                backgroundColor: "#f97316",
                fontSize: "20px",
              }}
            >
              <FaCarSide />
            </div>

            <div>

              <h5 className="fw-bold mb-0">
                Auto
                <span style={{ color: "#f97316" }}>
                  Forge
                </span>
              </h5>

              <small className="text-secondary">
                ADMIN PANEL
              </small>

            </div>

          </div>

          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
          ></button>

        </div>

        {/* ================= BODY ================= */}

        <div className="offcanvas-body p-0">

          {/* PROFILE */}

          <div className="px-3 py-4">

            <div
              className="d-flex align-items-center gap-3 p-3 rounded-3"
              style={{
                backgroundColor: "#1f2937",
              }}
            >

              <div
                className="rounded-circle d-flex align-items-center justify-content-center fw-bold"
                style={{
                  width: "42px",
                  height: "42px",
                  backgroundColor: "#374151",
                  color: "#f97316",
                }}
              >
                A
              </div>

              <div>

                <div className="fw-semibold">
                  Admin
                </div>

                <small className="text-secondary">
                  Administrator
                </small>

              </div>

            </div>

          </div>

          {/* MANAGEMENT */}

          <div className="px-4 mb-2">

            <small
              className="text-uppercase fw-semibold"
              style={{
                color: "#6b7280",
                fontSize: "11px",
                letterSpacing: "1px",
              }}
            >
              Management
            </small>

          </div>

          {/* ================= MOBILE LINKS ================= */}

          <nav className="px-3">

            <SidebarLink
              to="/admin"
              icon={<FaTachometerAlt />}
              title="Dashboard"
              closeMenu
            />

            <SidebarLink
              to="/admin/products"
              icon={<FaBoxOpen />}
              title="Products"
              closeMenu
            />

            <SidebarLink
              to="/admin/addproduct"
              icon={<FaPlusCircle />}
              title="Add Product"
              closeMenu
            />

            <SidebarLink
              to="/admin/orders"
              icon={<FaShoppingCart />}
              title="Orders"
              closeMenu
            />

          </nav>

          {/* ================= BOTTOM ================= */}

          <div className="px-3 mt-4">

            <hr
              style={{
                borderColor: "#273244",
              }}
            />

            <SidebarLink
              to="/admin/settings"
              icon={<FaCog />}
              title="Settings"
              closeMenu
            />

            <div
              className="d-flex align-items-center gap-3 px-3 py-3 text-danger"
              style={{
                cursor: "pointer",
              }}
            >
              <FaSignOutAlt />

              <span>
                Logout
              </span>
            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default AdminSidebar;