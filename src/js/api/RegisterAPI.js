import React from 'react';
import VcdpAPI from './VcdpAPI';


const RegisterAPI = {
  username: "",
  password: "",

  init() {
    this.username = "";
    this.password = "";
  },

  updateUsername(username) {
    this.username = username;
  },

  updatePassword(password) {
    this.password = password;
  },

  register(username, password) {
    var user = {
      username: username,
      password: password,
      datasets: []
    }
    VcdpAPI.postUser(user);
  }
}

export default RegisterAPI;
