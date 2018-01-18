import {dispatch, register} from '../dispatchers/app-dispatcher';
import AppConstants from '../constants/app-constants';
import AppActions from '../actions/app-actions';
import {EventEmitter} from 'events';
import RegisterAPI from '../api/RegisterAPI';
import {hashHistory} from 'react-router'

const CHANGE_EVENT = 'change';

const RegisterStore = Object.assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  },

  getUsername() {
    return RegisterAPI.username;
  },

  getPassword() {
    return RegisterAPI.password;
  },

  dispatcherIndex: register(function(action) {
    switch(action.actionType) {
      case AppConstants.UPDATE_REGISTER_USERNAME:
        RegisterAPI.updateUsername(action.username);
        RegisterStore.emitChange();
        break;

      case AppConstants.UPDATE_REGISTER_PASSWORD:
        RegisterAPI.updatePassword(action.password);
        RegisterStore.emitChange();
        break;

      case AppConstants.REGISTER:
        RegisterAPI.register(action.username, action.password);
        RegisterStore.emitChange();
        break;

      case AppConstants.REGISTER_SUCCESS:
        hashHistory.push("/login");
        break;
    }
  })
});

export default RegisterStore;
