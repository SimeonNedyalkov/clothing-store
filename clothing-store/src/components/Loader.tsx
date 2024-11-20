import React, { useState, useEffect } from "react";

const Loader = () => {
  const [text, setText] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [isGlitching, setIsGlitching] = useState(false);
  const [isWebsiteVisible, setIsWebsiteVisible] = useState(false); // New state for website visibility
  const word = "Lenion.";

  useEffect(() => {
    let index = 0;
    let newWord = "";
    const interval = setInterval(() => {
      if (index < word.length) {
        newWord += word[index];
        setText(newWord);
        index++;
      } else {
        // Trigger glitch effect after text display
        setIsGlitching(true);
        setTimeout(() => {
          setIsGlitching(false);
          setTimeout(() => {
            setIsVisible(false); // Hide the loader
            setIsWebsiteVisible(true); // Show the website content
          }, 300);
        }, 100);
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {isVisible && (
        <div className={`loader-container ${isGlitching ? "glitch" : ""}`}>
          <div className="black-screen">
            <div className="text">
              {text.split("").map((char, index) => (
                <span key={index} className={`char char-${index}`}>
                  {char}
                </span>
              ))}
            </div>
          </div>
          {isGlitching && <div className="glitch-overlay"></div>}
        </div>
      )}

      {/* Website Content */}
      <div className={`website-content ${isWebsiteVisible ? "visible" : ""}`}>
        <h1>Welcome to the Website!</h1>
        {/* Add other website content here */}
      </div>
    </>
  );
};

export default Loader;
