import { useState, useEffect } from "react";
import Cloth from "../types/Cloth";

export default function Navigation(props: { allClothes: Cloth[] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
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
  function handleClick() {
    setIsMenuOpen(!isMenuOpen);
  }
  useEffect(() => {
    setTimeout(() => {
      setIsShown(true);
    }, 2100);
  });
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    }
  }, []);
  return (
    <>
      <div className="navbarWrapper">
        <div className="navbar">
          <div className="nav-container">
            <div className="firstBar">
              {isMobile ? (
                <>
                  <button
                    className="group"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    {dropdownOpen ? "Menu" : "Close"}
                  </button>
                  {dropdownOpen ? (
                    ""
                  ) : (
                    <div className="mobileDropdown">
                      <button className="group">Men</button>
                      <button className="group">Women</button>
                      <button className="group">Kids</button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <button className="group">Men</button>
                  <button className="group">Women</button>
                  <button className="group">Kids</button>
                </>
              )}
            </div>
            {/* Logo Section */}
            <div className="box-container">
              <div className="pointed-box">
                {isShown ? (
                  <div className="logo">
                    <span className="logo-part fancy">Le</span>
                    <span className="logo-part normal">ni</span>
                    <span className="logo-part faded">on</span>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>

            {/* Hamburger Menu Button */}
            <div className="hamburger-menu">
              <div
                id="hamburger"
                className={`hamburglar ${isMenuOpen ? "is-open" : "is-closed"}`}
                onClick={handleClick}
              >
                <div className="burger-icon">
                  <div className="burger-container">
                    <span className="burger-bun-top"></span>
                    <span className="burger-filling"></span>
                    <span className="burger-bun-bot"></span>
                  </div>
                </div>

                {/* svg ring container */}
                <div className="burger-ring">
                  <svg className="svg-ring">
                    <path
                      className="path"
                      fill="none"
                      stroke="#fff"
                      strokeMiterlimit="10"
                      strokeWidth="4"
                      d="M 34 2 C 16.3 2 2 16.3 2 34 s 14.3 32 32 32 s 32 -14.3 32 -32 S 51.7 2 34 2"
                    />
                  </svg>
                </div>

                {/* The masked path that animates the fill to the ring */}
                <svg width="0" height="0">
                  <mask id="mask">
                    <path
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="#ff0000"
                      strokeMiterlimit="10"
                      strokeWidth="4"
                      d="M 34 2 c 11.6 0 21.8 6.2 27.4 15.5 c 2.9 4.8 5 16.5 -9.4 16.5 h -4"
                    />
                  </mask>
                </svg>

                <div className="path-burger">
                  <div className="animate-path">
                    <div className="path-rotation"></div>
                  </div>
                </div>
              </div>
            </div>

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
    </>
  );
}
