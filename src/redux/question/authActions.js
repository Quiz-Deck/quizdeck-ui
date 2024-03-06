import errorHandler from "../../handlers/errorHandler";
import successHandler from "../../handlers/successHandler";
import { authService } from "../../services/auth.service";
import Cookies from "js-cookie";
import authType from "./authTypes";
import axios from "../../plugins/axios.plugin";

let base_url = window.location.origin;

export const saveUserDetails = (data) => {
  const user = JSON.stringify(data.data);
  console.log(user, 'i am the data in user d')
  const token = data.token;
  Cookies.set("token", token);
  Cookies.set("user", user);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  // let business_id = Object.keys(data?.data?.groups);
  let team = Object.keys(data?.data?.team_roles);
  if (team) {
    axios.defaults.headers.common["Team"] = team;
    Cookies.set("team", team);
  }
};

/**
 * Register a user
 * 
 * @param {object} payLoad {
    name:"black"
    email:"black@gmail.com"
    password:"password"
    password_confirmation:"password"
    phone:"08021415578"
    description:"I am a human being"
    birth_date:"0000-04-17"
    birth_year:"1997"
  }
 * @returns {void}
 */

export const registerUserAction = (payLoad) => async (dispatch) => {
  console.log("payload", payLoad);
  try {
    dispatch({ type: authType["LOADING_AUTH"], payLoad: true });
    const response = await authService.emailRegistration({ ...payLoad });
    dispatch({ type: authType["LOADING_AUTH"], payLoad: false });
    dispatch({ type: authType["REGISTER_USER"], payLoad: response });
    if (response?.status === "success") {
      console.log("tryeeee");
      // let loggedIn = await dispatch(
      //   registerLoginAction({
      //     email: payLoad?.email,
      //     password: payLoad?.password,
      //   })
      // );
      // loggedIn && successHandler(response, true);
    }
    return response;
  } catch (error) {
    dispatch({ type: authType["LOADING_AUTH"], payLoad: false });
    errorHandler(error, true);
    throw new Error("");
  }
};

/**
 * Login a user
 *
 * @param {object} payLoad {
 * "email": "blue@gmail.com",
 * "password": "blueblue"
 * }
 * @returns {void}
 */
export const loginUserAction = (payLoad) => async (dispatch) => {
  try {
    dispatch({ type: authType["LOADING_AUTH"], payLoad: true });
    const response = await authService.emailLogin({ ...payLoad });
    dispatch({ type: authType["LOADING_AUTH"], payLoad: false });
    dispatch({ type: authType["LOGIN_USER"], payLoad: response });
    saveUserDetails(response, dispatch);
    // persistLastLogin(res);
    successHandler(response, true);
    return true;
  } catch (error) {
    dispatch({ type: authType["LOADING_AUTH"], payLoad: false });
    errorHandler(error, true);
  }
};

/**
 * Login a user
 *
 * @param {object} payLoad {
 * "email": "blue@gmail.com",
 * "password": "blueblue"
 * }
 * @returns {void}
 */
export const registerLoginAction = (payLoad) => async (dispatch) => {
  try {
    dispatch({ type: authType["LOADING_AUTH"], payLoad: true });
    const response = await authService.emailLogin({ ...payLoad });
    dispatch({ type: authType["LOADING_AUTH"], payLoad: false });
    dispatch({ type: authType["LOGIN_USER"], payLoad: response });
    saveUserDetails(response, dispatch);
    return true;
  } catch (error) {
    dispatch({ type: authType["LOADING_AUTH"], payLoad: false });
    errorHandler(error, true);
  }
};

/**
 * indicate forgot password
 *
 * @param {object} payLoad {email:"",reset_form_link:""}
 * @returns
 */
export const forgotPasswordAction = (payLoad) => async (dispatch) => {
  try {
    dispatch({ type: authType["LOADING_AUTH"], payLoad: true });
    const response = await authService.forgotPassword({
      ...payLoad,
      reset_form_link: `${base_url}/reset-link`,
    });

    dispatch({ type: authType["FORGOT_PASSWORD"], payLoad: response });
    dispatch({ type: authType["LOADING_AUTH"], payLoad: false });
    successHandler(response, true);
    return true;
  } catch (error) {
    dispatch({ type: authType["LOADING_AUTH"], payLoad: false });
    errorHandler(error, true);
  }
};

/**
 * Reset a user password
 * 
 * @param {object} payLoad {
  email:"blue@gmail.com"
  token:"lQf5xwqSmxSIyT22OVfe"
  new_password:"this-is-a-new-password"
  new_password_confirmation:"this-is-a-new-password"
 }
 * @returns 
 */
export const resetPasswordAction = (payLoad) => async (dispatch) => {
  try {
    dispatch({ type: authType["LOADING_AUTH"], payLoad: true });
    const response = await authService.resetPassword({
      ...payLoad,
    });
    dispatch({ type: authType["LOADING_AUTH"], payLoad: false });
    dispatch({ type: authType["RESET_PASSWORD"], payLoad: response });
    successHandler(response, true);
    return true;
  } catch (error) {
    dispatch({ type: authType["LOADING_AUTH"], payLoad: false });
    errorHandler(error, true);
  }
};
