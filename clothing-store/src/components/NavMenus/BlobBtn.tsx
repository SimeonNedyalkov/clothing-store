import { useEffect, useState } from "react";

export default function BlobBtn({
  label,
  handleClickMobile,
}: {
  label: string;
  handleClickMobile?: () => void;
}) {
  const [shown, setIsShown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    }
  }, []);
  useEffect(() => {
    if (isMobile == false) {
      setTimeout(() => {
        setIsShown(true);
      }, 2700);
    } else if (isMobile == true) {
      setTimeout(() => {
        setIsShown(true);
      }, 2400);
    }
  }, []);

  return (
    <div className="buttons">
      <button className="blob-btn" onClick={handleClickMobile}>
        {label}
        <span className={shown ? "blob-btn__inner" : "blob-btn__inner act"}>
          <span className="blob-btn__blobs">
            <span className="blob-btn__blob"></span>
            <span className="blob-btn__blob"></span>
            <span className="blob-btn__blob"></span>
            <span className="blob-btn__blob"></span>
          </span>
        </span>
      </button>
      <br />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="0"
        height="0"
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 15 -5"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
