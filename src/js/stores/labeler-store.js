import {dispatch, register} from '../dispatchers/app-dispatcher';
import AppConstants from '../constants/app-constants';
import { EventEmitter } from 'events';
import LabelerAPI from '../api/LabelerAPI';
import PlayerAPI from '../api/PlayerAPI';
import PlayerStore from './player-store';


const CHANGE_EVENT = 'change';

const LabelerStore = Object.assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  },

  getLabel() {
    return LabelerAPI.label;
  },

  dispatcherIndex: register(function(action) {
    switch(action.actionType) {
      case AppConstants.UPDATE_LABEL:
        LabelerAPI.updateLabel(action.label);
        LabelerStore.emitChange();
        break;

      case AppConstants.LABEL_VIDEO:
        LabelerAPI.labelVideo(action.label, action.datasetId);
        LabelerStore.emitChange();
        PlayerAPI.increaseVideoIndex();
        PlayerStore.emitChange();
        break;

      case AppConstants.LABEL_ALL_VIDEOS:
        LabelerAPI.labelAllVideos(action.label, action.datasetId);
        LabelerStore.emitChange();
        break;
    }
  })
});

export default LabelerStore;
