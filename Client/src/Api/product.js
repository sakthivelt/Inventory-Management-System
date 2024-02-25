import axios from "axios";
import toast from "react-hot-toast";
import { addProduct } from "../Redux/index";

export async function createProduct(data) {
  return axios.post(`${import.meta.env.VITE_API_URL}/products/`, data, {
    headers: { "x-auth-token": localStorage.getItem("token") },
  });
}

export function fetchProducts(dispatch, setLoading) {
  setLoading && setLoading(true);
  axios
    .get(`${import.meta.env.VITE_API_URL}/products/`, {
      headers: { "x-auth-token": localStorage.getItem("token") },
    })
    .then((data) => {
      data;
      setLoading && setLoading(false);
      dispatch(addProduct(data.data.data));
    })
    .catch((error) => {
      setLoading && setLoading(false);
      error;
      toast.error("server error");
    });
}

export function deleteProduct(id, dispatch, setLoading) {
  setLoading && setLoading(true);
  axios
    .delete(`${import.meta.env.VITE_API_URL}/products/${id}`, {
      headers: { "x-auth-token": localStorage.getItem("token") },
    })
    .then((data) => {
      data;
      setLoading && setLoading(false);
      fetchProducts(dispatch);
    })
    .catch((error) => {
      setLoading && setLoading(false);
      error;
      toast.error("server error");
    });
}

export async function updateProduct(id, data) {
  ("edfdfsf");
  return axios.patch(`${import.meta.env.VITE_API_URL}/products/${id}`, data, {
    headers: { "x-auth-token": localStorage.getItem("token") },
  });
}
