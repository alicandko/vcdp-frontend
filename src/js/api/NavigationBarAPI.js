import React from 'react';
import LoginAPI from './LoginAPI';


const NavigationBarAPI = {
  isLoggedIn: LoginAPI.isLoggedIn() ? true : false,

  updateIsLoggedIn(isLoggedIn) {
    this.isLoggedIn = isLoggedIn;
  }
}

export default NavigationBarAPI;
