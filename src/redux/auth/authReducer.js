import authType from "./authTypes";

const initialState = {
  isLoading: false,
  registerUser: {},
  loginUser: {},
  forgotPassword: {},
  resetPassword: {},
  changePassword: {},
  verifyUserEmail: {},
  userDetails: {},
  refreshedToken: {},
  testUserModel: {},
  user: {},
  token: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case authType.LOADING_AUTH:
      return {
        ...state,
        isLoading: action.payLoad,
      };

    case authType.REGISTER_USER:
      return {
        ...state,
        registerUser: action.payLoad?.data?.data,
      };

    case authType.LOGIN_USER:
      return {
        ...state,
        loginUser: action.payLoad?.data?.data,
        user: action.payLoad?.data?.data,
        token: action.payLoad?.data?.data?.token,
      };

    case authType.LOGOUT_USER:
      return {
        ...state,
        user: {},
        token: null,
      };

    case authType.FORGOT_PASSWORD:
      return {
        ...state,
        forgotPassword: action.payLoad?.data?.data,
      };

    case authType.RESET_PASSWORD:
      return {
        ...state,
        resetPassword: action.payLoad?.data?.data,
      };

    case authType.CHANGE_PASSWORD:
      return {
        ...state,
        changePassword: action.payLoad?.data?.data,
      };

    case authType.VERIFY_USER_EMAIL:
      return {
        ...state,
        verifyUserEmail: action.payLoad?.data?.data,
      };

    case authType.USER_DETAILS:
      return {
        ...state,
        userDetails: action.payLoad?.data?.data,
      };

    case authType.REFRESHED_TOKEN:
      return {
        ...state,
        refreshedToken: action.payLoad?.data?.data,
      };

    case authType.TEST_USER_MODEL:
      return {
        ...state,
        testUserModel: action.payLoad?.data?.data,
      };

    default:
      return state;
  }
}
