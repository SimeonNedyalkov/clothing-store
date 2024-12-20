import { useState } from "react";
import { toggleChatBot, useTypedSelector } from "../reduxstore/store"; // Adjust the path as needed
import { useDispatch } from "react-redux";

const scenes = [
  {
    path: "Gloves",
    mainColor: "#f9c0ff",
    name: "Gloves",
    description: "Futuristic Gloves",
    price: 120,
    gender: "Male",
    quantity: 4,
  },
  {
    path: "Hoodie",
    mainColor: "#c0ffe1",
    name: "Hoodie",
    description: "Futuristic Hoodie",
    price: 120,
    gender: "Male",
    quantity: 0,
  },
  {
    path: "Shoes",
    mainColor: "#ffdec0",
    name: "Shoes",
    description: "Futuristic Shoes",
    price: 120,
    gender: "Male",
    quantity: 2,
  },
];
const orders = {
  orderId: "12345",
  status: "Shipped",
  estimatedDelivery: "2024-12-25",
  items: [
    { name: "Gloves", quantity: 1 },
    { name: "Shoes", quantity: 2 },
  ],
};
export default function ChatBot() {
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hi! How can I assist you today?" },
  ]);
  const [userInput, setUserInput] = useState("");

  const isChatBotOpen = useTypedSelector((state) => state.cart.isChatBotOpen);
  const dispatch = useDispatch(); // Use dispatch to update the Redux store

  const handleSendMessage = () => {
    if (!userInput) return;

    setMessages([...messages, { type: "user", text: userInput }]);

    const lowerCaseInput = userInput.toLowerCase();
    let botResponse = "Sorry, I didn't understand that.";

    if (
      lowerCaseInput.includes("products") ||
      lowerCaseInput.includes("items")
    ) {
      botResponse =
        "We have the following products: Gloves, Hoodie, and Shoes.";
    } else if (lowerCaseInput.includes("gloves")) {
      botResponse = `The Gloves cost $120. Description: Futuristic Gloves. Stock: 4 available.`;
    } else if (lowerCaseInput.includes("hoodie")) {
      botResponse = `The Hoodie costs $120. Description: Futuristic Hoodie. Stock: ${
        scenes.find((product) => product.name === "Hoodie")?.quantity
      } available.`;
    } else if (lowerCaseInput.includes("shoes")) {
      botResponse = `The Shoes cost $120. Description: Futuristic Shoes. Stock: 2 available.`;
    } else if (lowerCaseInput.includes("stock")) {
      const product = scenes.find((p) =>
        lowerCaseInput.includes(p.name.toLowerCase())
      );
      if (product) {
        botResponse = `${product.name} is ${
          product.quantity > 0 ? "in stock" : "out of stock"
        }`;
      }
    }
    if (lowerCaseInput.includes("order")) {
      const match = lowerCaseInput.match(/order (\d+)/);
      if (match) {
        const orderId = match[1];
        if (orderId === orders.orderId) {
          botResponse = `Order with order number: ${orders.orderId} is with a ${orders.status} status and with estimated delivery on ${orders.estimatedDelivery}.`;
        } else {
          botResponse = `Please provide me with a correct order number.`;
        }
      } else {
        botResponse = `To check an order you need to provide me with an order number.`;
      }
    }

    setMessages([
      ...messages,
      { type: "user", text: userInput },
      { type: "bot", text: botResponse },
    ]);

    setUserInput("");
  };

  return (
    <>
      {isChatBotOpen ? (
        <div className="chatbot-container">
          <div className="chatbot-window">
            {/* Close Button */}
            <button
              className="close-button"
              onClick={() => dispatch(toggleChatBot())}
            >
              ×
            </button>
            <div className="messages">
              {messages.map((msg, index) => (
                <div key={index} className={msg.type}>
                  <p>{msg.text}</p>
                </div>
              ))}
            </div>

            <div className="input-box">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ask me about the products..."
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
