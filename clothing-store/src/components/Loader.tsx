import React, { useState, useEffect } from "react";

const Loader = () => {
  const [text, setText] = useState("");
  const [isVisible, setIsVisible] = useState(true); // New state to control visibility
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
        setTimeout(() => setIsVisible(false), 1000);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    isVisible && (
      <div className="loader-container">
        <div className="black-screen">
          <div className="text">{text}</div>
        </div>
      </div>
    )
  );
};

export default Loader;
