import { useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

export default function useAuth() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  const login = async (email: string, password: string) => {
    try {
      const body = { email, password };
      const resp = await axios.post(BASE_URL + "/auth/login", body);
      setResponse(resp.data); // Save the response data
      setError(""); // Clear previous errors
      return resp.data;
    } catch (err) {
      setError("Warning: incorrect email or password");
      setResponse(null);
    }
  };

  return { response, error, login };
}
