import { useState, useEffect } from "react";
import Cloth from "../types/Cloth";
import Hamburger from "./NavMenus/Hamburger";
import BlobBtn from "./NavMenus/BlobBtn";

export default function Navigation(props: { allClothes: Cloth[] }) {
  const [isShown, setIsShown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(true);
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsShown(true);
    }, 2100);
  });

  return (
    <>
      <div className="navbarWrapper">
        <div className="navbar">
          <div className="nav-container">
            <div className="secondMenuWrapper">
              <BlobBtn label="Men" />
              <BlobBtn label="Women" />
              <BlobBtn label="Kids" />
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
            <Hamburger allClothes={props.allClothes} />
          </div>
        </div>
      </div>
    </>
  );
}
