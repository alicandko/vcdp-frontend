import React from 'react';
import VcdpAPI from '../api/VcdpAPI';


const SearcherAPI = {
  query: "",
  displayWaitMsg: false,

  init() {
    this.query = "";
    this.displayWaitMsg = false;
  },

  updateQuery(query) {
    this.query = query;
  },

  updateDisplayWaitMsg(shouldDisplay) {
    this.displayWaitMsg = shouldDisplay;
  },

  searchVideos(query) {
    VcdpAPI.searchVideos(query)
  }
}

export default SearcherAPI;
