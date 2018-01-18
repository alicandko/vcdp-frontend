import {dispatch, register} from '../dispatchers/app-dispatcher';
import AppConstants from '../constants/app-constants';
import {EventEmitter} from 'events';
import DatasetSidebarAPI from '../api/DatasetSidebarAPI';


const CHANGE_EVENT = 'change';

const DatasetSidebarStore = Object.assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  },

  getVideosByLabel() {
    return DatasetSidebarAPI.videosByLabel;
  },

  dispatcherIndex: register(function(action) {
    switch(action.actionType) {
      case AppConstants.GET_DATASET_SUCCESS:
        DatasetSidebarAPI.groupVideosByLabel(action.dataset.videos);
        DatasetSidebarStore.emitChange();
        break;

      case AppConstants.LABEL_VIDEO_SUCCESS:
        DatasetSidebarAPI.updateVideosByLabelBySingle(action.video);
        DatasetSidebarStore.emitChange();
        break;

      case AppConstants.LABEL_ALL_VIDEOS_SUCCESS:
        DatasetSidebarAPI.updateVideosByLabelByMultiple(action.videos);
        DatasetSidebarStore.emitChange();
        break;
    }
  })
});

export default DatasetSidebarStore;
