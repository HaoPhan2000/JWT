import axios from "axios";
import { jwtDecode } from "jwt-decode";
import tokenMethod from "../util/token";
import { refreshTokenApi } from "../util/apis";
// Set config defaults when creating the instance
const instanceRefreshToken = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});
const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});
instanceRefreshToken.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
instanceRefreshToken.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    tokenMethod.remove();
    return Promise.reject(error);
  }
);
// Add a request interceptor
instance.interceptors.request.use(
  async function (config) {
    try {
      let token = tokenMethod.get();
      if (token) {
        const date = new Date();
        const decodeToken = jwtDecode(token);
        if (decodeToken.exp < date.getTime() / 1000) {
          const res = await refreshTokenApi();
          token = res.data?.newAccessToken;
          tokenMethod.set(token);
        }
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      return config;
    }
  },
  function (error) {
    
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    return Promise.reject(error);
  }
);
export { instanceRefreshToken, instance };
