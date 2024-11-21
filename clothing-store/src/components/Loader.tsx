import React, { useState, useEffect } from "react";

const Loader = () => {
  const [text, setText] = useState("");
  const [isVisible, setIsVisible] = useState(true);
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
        setTimeout(() => {
          setTimeout(() => {
            setIsVisible(false);
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
        <div className={`loader-container`}>
          <div className="black-screen">
            <div className="text">
              {text.split("").map((char, index) => (
                <span key={index} className={`char char-${index}`}>
                  {char}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Loader;
