import { useState, useEffect } from "react";
import logo from "../assets/logo/ModaHub Bulgaria_transparent-(2).png";
import hamburgerMenuIconOpen from "../assets/hamburgerMenu/menu.png";
import hamburgerMenuIconClosed from "../assets/hamburgerMenu/menu3.png";
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
          <div className="logo">
            <a href="#home">
              <img src={logo} width={100} height={100} alt="Logo" />
            </a>
          </div>

          {/* Hamburger Menu Button */}
          {isMenuOpen ? (
            <button
              className="hamburger-menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <img
                src={hamburgerMenuIconOpen}
                alt=""
                className="icon"
                width={40}
                height={40}
              />
            </button>
          ) : (
            <button
              className="hamburger-menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <img
                src={hamburgerMenuIconClosed}
                alt=""
                className="icon"
                width={40}
                height={40}
              />
            </button>
          )}

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
