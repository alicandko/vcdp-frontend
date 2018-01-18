import {dispatch, register} from '../dispatchers/app-dispatcher';
import AppConstants from '../constants/app-constants';
import {EventEmitter} from 'events';
import DatasetAPI from '../api/DatasetAPI';
import LearnAPI from '../api/LearnAPI';
import LearnStore from './learn-store';
import {hashHistory} from 'react-router'


const CHANGE_EVENT = 'change';

const DatasetStore = Object.assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  },

  getDataset() {
    return DatasetAPI.dataset;
  },

  dispatcherIndex: register(function(action) {
    switch(action.actionType) {
      case AppConstants.GET_DATASET:
        DatasetAPI.getDataset(action.datasetId);
        break;

      case AppConstants.GET_DATASET_SUCCESS:
        LearnAPI.totalSize = action.dataset.videos.length;
        LearnAPI.trainSize = action.dataset.videos.length;
        DatasetAPI.dataset = action.dataset;
        DatasetStore.emitChange();
        LearnStore.emitChange();
        break;

      case AppConstants.DELETE_DATASET:
        DatasetAPI.deleteDataset(action.datasetId);
        DatasetStore.emitChange();
        break;

      case AppConstants.DELETE_DATASET_SUCCESS:
        setTimeout(function() { hashHistory.push("/datasets") }, 10);
        break;
    }
  })
});

export default DatasetStore;
