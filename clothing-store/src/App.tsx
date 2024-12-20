import { useEffect, useState } from "react";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import "swiper/swiper-bundle.css";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import Cart from "./components/Cart";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import ChatBot from "./components/Q&A/Chatbot";
const baseUrl = "http://localhost:3000";

function App() {
  const [allClothes, setAllClothes] = useState([]);
  const [isWebsiteVisible, setIsWebsiteVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsWebsiteVisible(false);
      setIsWebsiteVisible(true);
    }, 2000);
  }, []);
  useEffect(() => {
    const fetchClothes = async () => {
      try {
        const allClothes = await axios.get(`${baseUrl}/clothes`);
        setAllClothes(allClothes.data);
        return allClothes;
      } catch (error) {
        console.log(error);
      }
    };
    fetchClothes();
  }, []);

  return (
    <>
      <Loader></Loader>
      <div
        className={`background-overlay ${isWebsiteVisible ? "visible" : ""}`}
      ></div>
      <Navigation allClothes={allClothes} />
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        {/* User */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/qanda" element={<ChatBot />} />
      </Routes>
      <Cart></Cart>
      <ChatBot />
    </>
  );
}

export default App;
