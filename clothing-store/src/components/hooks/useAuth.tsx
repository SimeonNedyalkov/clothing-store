import { useState } from "react";
import axios from "axios";
import usersAPI from "../../services/usersAPI";

export default function useAuth() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  const login = async (email: string, password: string) => {
    try {
      const resp = await usersAPI.login(email, password);
      console.log(resp);
      setResponse(resp.data);
      setError("");
      return resp.data;
    } catch (err) {
      setError("Warning: incorrect email or password");
      setResponse(null);
    }
  };

  return { response, error, login };
}
