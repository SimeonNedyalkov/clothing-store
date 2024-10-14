import { useState } from "react";
import logo from "../assets/logo/ModaHub Bulgaria_transparent-(1).png";

export default function Navigation() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="navbarWrapper">
      <div className="navbar">
        <div className="nav-container">
          {/* Logo Section */}
          <div className="logo">
            <a href="#home">
              <img src={logo} width={100} height={100} alt="Logo" />
            </a>
          </div>

          {/* Navigation Links Section */}
          <div className="nav-links">
            <div
              className="category-dropdown"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <a href="#category" className="category-link">
                Category{" "}
                <svg
                  className="icon icon-caret"
                  xmlns="http://www.w3.org/2000/svg"
                  width="7.55"
                  height="4.77"
                  viewBox="0 0 6.257 3.835"
                >
                  <path
                    data-name="Path 12050"
                    d="M659.672,95,656.9,97.775,654.122,95"
                    transform="translate(-653.769 -94.646)"
                    fill="none"
                    stroke="#222"
                    stroke-width="1"
                  ></path>
                </svg>
              </a>
              {isHovered && (
                <div className="dropdown-content">
                  <a href="#category1">Category 1</a>
                  <a href="#category2">Category 2</a>
                  <a href="#category3">Category 3</a>
                </div>
              )}
            </div>
            <a href="#brand">Brand</a>
            <a href="#ranking">Ranking</a>
            <a href="#cart">Cart</a>
            <a href="#about">About</a>
            <a href="#qa">Q&A</a>
          </div>
        </div>
      </div>
    </div>
  );
}
