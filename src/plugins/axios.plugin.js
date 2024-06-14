import axios from "axios";
import nprogress from "nprogress";
import {
  getToken,
  isAuthenticatedUser,
  getTeamFromCookies,
} from "../utils/Auth";
import errorHandler from "../handlers/errorHandler";
import Cookies from "js-cookie";

const baseURL = process.env.REACT_APP_API_URL;
// const baseURL = "http://localhost:3000";

// console.log("baseURL", baseURL);

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  channel: "web",
};

const axiosInstance = axios.create({
  baseURL,
  headers,
});

if (isAuthenticatedUser()) {
  axiosInstance.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${getToken()}`;
  axiosInstance.defaults.headers.common["Team"] = `${getTeamFromCookies()}`;
}
console.log("isAuthenticatedUser", isAuthenticatedUser());

export const logoutUserLocallyAction = () => {
  Cookies.remove("token");
  Cookies.remove("user");
  Cookies.remove("team");
  Cookies.remove("outlet");
  localStorage.removeItem("undefined_reducer");
  window.location.reload(false);
};

axiosInstance.interceptors.request.use((config) => {
  nprogress.start();
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    nprogress.done();
    return response.data;
  },
  async function (error) {
    nprogress.done();
    if (axios.isAxiosError(error) && error.response) {
      const { status } = error.response;
      if (status === 401) {
        //log user out and send error message
        logoutUserLocallyAction();
        errorHandler(error, true);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
