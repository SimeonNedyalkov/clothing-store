import { useEffect, useState } from "react";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import "swiper/swiper-bundle.css";
import axios from "axios";
const baseUrl = "http://localhost:3000";

function App() {
  const [allClothes, setAllClothes] = useState([]);
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
  console.log(allClothes);
  return (
    <div>
      <Navigation allClothes={allClothes} />
      <Home />
    </div>
  );
}

export default App;
