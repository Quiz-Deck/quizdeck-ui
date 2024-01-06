import axios from "../plugins/axios.plugin";

class AuthService {


  emailRegistration(payload) {
    return axios.post(`/register`, payload);
  }

  emailLogin(payload) {
    return axios.post(`/login`, payload);
  }

  forgotPassword(payload) {
    return axios.post(`/forgot`, payload);
  }

  resetPassword(payload) {
    return axios.post(`/reset`, payload);
  }

  changePassword(payload) {
    return axios.post(`/change`, payload);
  }
}

export const authService = new AuthService();
