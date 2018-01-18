import {dispatch, register} from '../dispatchers/app-dispatcher';
import AppConstants from '../constants/app-constants';
import { EventEmitter } from 'events';
import SearcherAPI from '../api/SearcherAPI';
import LabelerAPI from '../api/LabelerAPI';
import LabelerStore from './labeler-store';


const CHANGE_EVENT = 'change';

const SearcherStore = Object.assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  },

  getQuery() {
    return SearcherAPI.query;
  },

  getDisplayWaitMsg() {
    return SearcherAPI.displayWaitMsg;
  },

  dispatcherIndex: register(function(action) {
    switch(action.actionType) {
      case AppConstants.UPDATE_QUERY:
        SearcherAPI.updateQuery(action.query);
        SearcherStore.emitChange();
        break;

      case AppConstants.SEARCH_VIDEOS:
        SearcherAPI.searchVideos(action.query);
        SearcherAPI.updateDisplayWaitMsg(true);
        LabelerAPI.label = action.query;
        LabelerStore.emitChange();
        SearcherStore.emitChange();
        break;

      case AppConstants.SEARCH_VIDEOS_SUCCESS:
        SearcherAPI.updateDisplayWaitMsg(false);
        SearcherStore.emitChange();
        break;
    }
  })
});

export default SearcherStore;
