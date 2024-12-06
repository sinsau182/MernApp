import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const styles = {
    navbar: {
      backgroundColor: "#333",
      padding: "0.5rem",
    },
    brand: {
      fontSize: "1.5rem",
      color: "#fff",
      fontWeight: "bold",
    },
    toggler: {
      border: "none",
    },
    togglerIcon: {
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 30 30'%3E%3Cpath stroke='rgba(255,255,255,0.7)' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E")`,
    },
    navLink: {
      color: "#ccc",
      marginRight: "1rem",
      textDecoration: "none",
      transition: "color 0.3s",
    },
    navLinkHover: {
      color: "#fff",
    },
    activeLink: {
      color: "#fff",
      fontWeight: "bold",
    },
  };

  return (
    <nav className="navbar navbar-expand-lg" style={styles.navbar}>
      <div className="container-fluid">
        <Link to='/' className="navbar-brand" style={styles.brand}>
          MERN
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={styles.toggler}
        >
          <span className="navbar-toggler-icon" style={styles.togglerIcon}></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                to="/"
                className="nav-link active"
                style={{ ...styles.navLink, ...styles.activeLink }}
              >
                New Post
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/all"
                className="nav-link"
                style={styles.navLink}
                onMouseEnter={(e) => (e.target.style.color = "#fff")}
                onMouseLeave={(e) => (e.target.style.color = "#ccc")}
              >
                All Post
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
