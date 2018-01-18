import {dispatch, register} from '../dispatchers/app-dispatcher';
import AppConstants from '../constants/app-constants';
import {EventEmitter} from 'events';
import NavigationBarAPI from '../api/NavigationBarAPI';


const CHANGE_EVENT = 'change';

const NavigationBarStore = Object.assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  },

  getIsLoggedIn() {
    return NavigationBarAPI.isLoggedIn;
  },

  dispatcherIndex: register(function(action) {
    switch(action.actionType) {
      case AppConstants.GET_TOKEN_SUCCESS:
        NavigationBarAPI.updateIsLoggedIn(true);
        NavigationBarStore.emitChange();
        break;

      case AppConstants.LOGOUT:
        NavigationBarAPI.updateIsLoggedIn(false);
        NavigationBarStore.emitChange();
        break;
    }
  })
});

export default NavigationBarStore;
