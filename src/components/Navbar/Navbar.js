import React from "react";
import "./Navbar.css";
import { ReactComponent as BookIcon } from "../../assets/icons/book-logo.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/search-icon.svg";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../provider/AppProvider";
import { Nav, NavDropdown } from "react-bootstrap";

const Navbar = () => {
  const { user, setUser } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top custom-navbar">
      <div className="container-fluid px-4">
        {/* Logo */}
        <a
          style={{
            paddingLeft: "100px",
          }}
          className="navbar-brand d-flex align-items-center"
          href="/"
        >
          <BookIcon className="book-icon me-2" />
          <span className="logo-text fw-bold">VcunBooks</span>
        </a>

        {/* Toggle button for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Content */}
        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Navigation Menu */}
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link custom-nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Categories" className="nav-link custom-nav-link">
                Books
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Orders" className="nav-link custom-nav-link">
                Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Contact" className="nav-link custom-nav-link">
                Contact
              </Link>
            </li>
          </ul>

          {/* Search and Login */}
          <div
            style={{
              paddingRight: "100px",
            }}
            className="d-flex align-items-center gap-2"
          >
            <div className="search-box d-flex align-items-center">
              <input
                type="text"
                placeholder="Search books..."
                className="form-control search-input"
              />
              <button className="btn search-btn">
                <SearchIcon className="search-icon" />
              </button>
            </div>
            {!user ? (
              <button className="btn login-btn">
                <Link
                  style={{
                    textDecoration: "none",
                    color: "white",
                  }}
                  to="/login"
                >
                  Login
                </Link>
              </button>
            ) : (
              <NavDropdown
                className="fw-bold"
                title={`Hello, ${user.username}`}
              >
                {user.role === "admin" && (
                  <NavDropdown.Item href="/Admin">
                    <i
                      style={{ marginRight: "10px" }}
                      class="bi bi-speedometer2"
                    ></i>{" "}
                    Admin Dashboard
                  </NavDropdown.Item>
                )}
                <NavDropdown.Item onClick={() => handleLogout()}>
                  <i
                    style={{ marginRight: "10px" }}
                    class="bi bi-box-arrow-right"
                  ></i>{" "}
                  Logout
                </NavDropdown.Item>
                <NavDropdown.Item href="/Cart">
                  <i style={{ marginRight: "10px" }} class="bi bi-cart2"></i>{" "}
                  Cart
                </NavDropdown.Item>
                {user.role === "admin" && <NavDropdown.Item href="/Admin" />}
              </NavDropdown>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
