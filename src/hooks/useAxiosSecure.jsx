import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  // REQUEST INTERCEPTOR
  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      console.log(token);
      config.headers.authorization = token;
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  // RESPONSE INTERCEPTOR
  axiosSecure.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const status = err.response.status;
      console.log("status error", status);
      if (status === 401 || status === 403) {
        await logOut();
        navigate("/login");
      }
      return Promise.reject(err);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
