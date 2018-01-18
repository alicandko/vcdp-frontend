import {dispatch, register} from '../dispatchers/app-dispatcher';
import AppConstants from '../constants/app-constants';
import {EventEmitter} from 'events';
import PlayerAPI from '../api/PlayerAPI';


const CHANGE_EVENT = 'change';

const PlayerStore = Object.assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  },

  getVideo() {
    return PlayerAPI.getVideoInVideoIndex();
  },

  getVideos() {
    return PlayerAPI.videos;
  },

  getVideoIndex() {
    return PlayerAPI.videoIndex;
  },

  dispatcherIndex: register(function(action) {
    switch(action.actionType) {
      case AppConstants.SEARCH_VIDEOS_SUCCESS:
        PlayerAPI.videos = action.videos;
        PlayerStore.emitChange();
        break;

      case AppConstants.NEXT_VIDEO:
        PlayerAPI.increaseVideoIndex();
        PlayerStore.emitChange();
        break;

      case AppConstants.PREV_VIDEO:
        PlayerAPI.decreaseVideoIndex();
        PlayerStore.emitChange();
        break;
    }
  })
});

export default PlayerStore;
