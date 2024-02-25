import axios from "axios";
import toast from "react-hot-toast";

export function login(data) {
  const result = axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
    email: data.email,
    password: data.password,
  });

  toast.promise(result, {
    loading: "loging...",
    success: (res) => {
      localStorage.setItem("token", res.headers["x-auth-token"]);
      res.headers["x-auth-token"];
      history.go("/");
      return "logind successfully";
    },
    error: (error) => {
      error?.response?.data?.error;
      return error?.response?.data?.error || "server error";
    },
  });
}

export function register(data) {
  const result = axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
    name: data.name,
    email: data.email,
    password: data.password,
  });

  toast.promise(result, {
    success: () => {
      return "account created successfully";
    },
    error: (error) => {
      error;
      return "error";
    },
    loading: "sending...",
  });
}
