import { useState, useEffect } from "react";
import hamburgerMenuIconOpen from "../assets/hamburgerMenu/menu4.png";
import hamburgerMenuIconClosed from "../assets/hamburgerMenu/menu-burger.png";
import Cloth from "../types/Cloth";

export default function Navigation(props: { allClothes: Cloth[] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    if (Array.isArray(props.allClothes)) {
      const uniqueCategories = new Set<string>();

      props.allClothes.forEach((item) => {
        uniqueCategories.add(item.category);
      });

      setCategories(Array.from(uniqueCategories));
    }
  }, [props.allClothes]);
  return (
    <div className="navbarWrapper">
      <div className="navbar">
        <div className="nav-container">
          {/* Logo Section */}

          <div className="box-container">
            <div className="pointed-box">
              <div className="logo">
                <span className="logo-part fancy">Le</span>
                <span className="logo-part normal">ni</span>
                <span className="logo-part faded">on</span>
              </div>
            </div>
          </div>

          {/* Hamburger Menu Button */}
          <button
            className="hambButton"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div
              id="hamburger"
              className={`${isMenuOpen ? "" : "hamburgerAnimation"}`}
            >
              <div className="topleft"></div>
              <div className="topright"></div>
              <div className="bottomright"></div>
              <div className="bottomleft"></div>
            </div>
          </button>

          {/* Navigation Links Section */}
          <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
            <div className="category-dropdown">
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
                    strokeWidth="1"
                  ></path>
                </svg>
              </a>
              <div className="dropdown-content">
                {categories.map((category, index) => (
                  <a href={`#${category}`} key={index}>
                    {category}
                  </a>
                ))}
              </div>
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
