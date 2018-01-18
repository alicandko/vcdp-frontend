import {dispatch, register} from '../dispatchers/app-dispatcher';
import AppConstants from '../constants/app-constants';
import { EventEmitter } from 'events';
import DatasetListAPI from '../api/DatasetListAPI';


const CHANGE_EVENT = 'change';

const DatasetListStore = Object.assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  },

  getDatasets() {
    return DatasetListAPI.datasets;
  },

  getNewDatasetTitle() {
    return DatasetListAPI.newDatasetTitle;
  },

  dispatcherIndex: register(function(action) {
    switch(action.actionType) {
      case AppConstants.GET_DATASETS:
        DatasetListAPI.getDatasets();
        break;

      case AppConstants.GET_DATASETS_SUCCESS:
        DatasetListAPI.datasets = action.datasets;
        DatasetListStore.emitChange();
        break;

      case AppConstants.UPDATE_NEW_DATASET_TITLE:
        DatasetListAPI.updateNewDatasetTitle(action.newDatasetTitle);
        DatasetListStore.emitChange();
        break;

      case AppConstants.CREATE_DATASET:
        DatasetListAPI.createDataset(action.newDatasetTitle);
        DatasetListStore.emitChange();
        break;

      case AppConstants.CREATE_DATASET_SUCCESS:
        DatasetListAPI.pushToDatasets(action.dataset);
        DatasetListStore.emitChange();
        break;
    }
  })
});

export default DatasetListStore;
