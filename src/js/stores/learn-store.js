import {dispatch, register} from '../dispatchers/app-dispatcher';
import AppConstants from '../constants/app-constants';
import { EventEmitter } from 'events';
import DatasetStore from './dataset-store';
import LearnAPI from '../api/LearnAPI';


const CHANGE_EVENT = 'change';

const LearnStore = Object.assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  },

  getTrainSize() {
    return LearnAPI.trainSize;
  },

  getValidateSize() {
    return LearnAPI.validateSize;
  },

  getTestSize() {
    return LearnAPI.testSize;
  },

  getTotalSize() {
    return LearnAPI.totalSize;
  },

  getClfType() {
    return LearnAPI.clfType;
  },

  getValidateAnalyses() {
    return LearnAPI.validateAnalyses;
  },

  getTestAnalysis() {
    return LearnAPI.testAnalysis;
  },

  getDisplayPrepareSuccessMsg() {
    return LearnAPI.displayPrepareSuccessMsg;    
  },

  dispatcherIndex: register(function(action) {
    switch(action.actionType) {
      case AppConstants.UPDATE_TRAIN_SIZE:
        LearnAPI.updateTrainSize(action.trainSize);
        LearnStore.emitChange();
        break;

      case AppConstants.UPDATE_VALIDATE_SIZE:
        LearnAPI.updateValidateSize(action.validateSize);
        LearnStore.emitChange();
        break;

      case AppConstants.UPDATE_TEST_SIZE:
        LearnAPI.updateTestSize(action.testSize);
        LearnStore.emitChange();
        break;

      case AppConstants.UPDATE_CLF_TYPE:
        LearnAPI.updateClfType(action.clfType);
        LearnStore.emitChange();
        break;

      case AppConstants.PREPARE_DATASET:
        LearnAPI.prepareDataset(action.datasetId, action.trainSize, action.testSize);
        LearnStore.emitChange();
        break;

      case AppConstants.PREPARE_DATASET_SUCCESS:
        LearnAPI.updateDisplayPrepareSuccessMsg(true);
        LearnStore.emitChange();
        break;

      case AppConstants.VALIDATE:
        LearnAPI.validate(action.datasetId);
        LearnStore.emitChange();
        break;

      case AppConstants.VALIDATE_SUCCESS:
        LearnAPI.setValidateAnalyses(action.analyses);
        LearnStore.emitChange();
        break;

      case AppConstants.TEST:
        LearnAPI.test(action.datasetId, action.clfType);
        LearnStore.emitChange();
        break;

      case AppConstants.TEST_SUCCESS:
        LearnAPI.setTestAnalysis(action.analysis);
        LearnStore.emitChange();
        break;
    }
  })
});

export default LearnStore;
