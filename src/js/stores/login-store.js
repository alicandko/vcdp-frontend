import {dispatch, register} from '../dispatchers/app-dispatcher';
import AppConstants from '../constants/app-constants';
import AppActions from '../actions/app-actions';
import {EventEmitter} from 'events';
import LoginAPI from '../api/LoginAPI';
import {hashHistory} from 'react-router'

const CHANGE_EVENT = 'change';

const LoginStore = Object.assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  },

  getToken() {
    return LoginAPI.token;
  },

  getUsername() {
    return LoginAPI.username;
  },

  getPassword() {
    return LoginAPI.password;
  },

  isLoggedIn() {
    return LoginAPI.isLoggedIn();
  },

  dispatcherIndex: register(function(action) {
    switch(action.actionType) {
      case AppConstants.UPDATE_LOGIN_USERNAME:
        LoginAPI.updateUsername(action.username);
        LoginStore.emitChange();
        break;

      case AppConstants.UPDATE_LOGIN_PASSWORD:
        LoginAPI.updatePassword(action.password);
        LoginStore.emitChange();
        break;

      case AppConstants.GET_TOKEN:
        LoginAPI.login(action.username, action.password);
        LoginStore.emitChange();
        break;

      case AppConstants.GET_TOKEN_SUCCESS:
        LoginAPI.token = action.token.token;
        LoginAPI.saveTokenInLocalStorage();
        LoginStore.emitChange();
        hashHistory.push("/");
        break;

      case AppConstants.LOGOUT:
        LoginAPI.logout();
        LoginStore.emitChange();
        hashHistory.push("/");
        break;
    }
  })
});

export default LoginStore;
