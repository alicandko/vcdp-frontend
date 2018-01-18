import React from 'react';
import VcdpAPI from './VcdpAPI';


const LoginAPI = {
  username: "",
  password: "",
  token: localStorage.getItem('token') != null ? localStorage.getItem('token') : "",

  init() {
    this.username = "";
    this.password = "";
    this.token = "";
  },

  updateUsername(username) {
    this.username = username;
  },

  updatePassword(password) {
    this.password = password;
  },

  login(username, password) {
    var userAuthDetails = {
      username: username,
      password: password
    };
    VcdpAPI.getToken(userAuthDetails);
  },

  saveTokenInLocalStorage() {
    localStorage.setItem('token', this.token);
  },

  logout() {
    this.username = "";
    this.password = "";
    this.token = "";
    localStorage.removeItem('token');
  },

  isLoggedIn() {
    var loggedIn = localStorage.getItem('token') != null ? true : false;
    return loggedIn;
  }
}

export default LoginAPI;
