import {dispatch, register} from '../dispatchers/app-dispatcher';
import AppConstants from '../constants/app-constants';
import {EventEmitter} from 'events';
import PredictAPI from '../api/PredictAPI';


const CHANGE_EVENT = 'change';

const PredictStore = Object.assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  },

  getVpVideoIds() {
    return PredictAPI.vpVideoIds;
  },

  getClfType() {
    return PredictAPI.clfType;
  },

  getPredicted() {
    return PredictAPI.predicted;
  },

  dispatcherIndex: register(function(action) {
    switch(action.actionType) {
      case AppConstants.UPDATE_VP_VIDEO_IDS:
        PredictAPI.updateVpVideoIds(action.vpVideoIds)
        PredictStore.emitChange();
        break;

      case AppConstants.UPDATE_CLF_TYPE:
        PredictAPI.updateClfType(action.clfType);
        PredictStore.emitChange();
        break;

      case AppConstants.PREDICT:
        PredictAPI.predict(action.datasetId, action.clfType, action.vpVideoIds)
        PredictStore.emitChange();
        break;

      case AppConstants.PREDICT_SUCCESS:
        PredictAPI.predicted = action.predicted;
        PredictStore.emitChange();
        break;
    }
  })
});

export default PredictStore;
