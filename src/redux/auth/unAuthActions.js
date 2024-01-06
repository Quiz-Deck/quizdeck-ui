import Cookies from "js-cookie";
// import {
//   destroyLastLogin,
//   updatePersistedLastLogin,
// } from "../../helpers/session";
import authType from "./authTypes";

export const logoutUserLocallyAction = () => {
  return (dispatch) => {
    dispatch({ type: authType["LOGOUT_USER"], payLoad: {} });
    // destroyLastLogin();
    Cookies.remove("token");
    Cookies.remove("user");
    Cookies.remove("team");
    Cookies.remove("outlet");
    localStorage.removeItem("undefined_reducer");
    window.location.reload(false);
  };
};

// export const refreshUserTokenLocallyAction = (payLoad) => {
//   return (dispatch) => {
//     updatePersistedLastLogin(payLoad);
//     dispatch({ type: REFRESHED_TOKEN, payLoad: payLoad });
//   };
// };
