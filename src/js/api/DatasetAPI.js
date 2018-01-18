import React from 'react';
import VcdpAPI from '../api/VcdpAPI';
import {hashHistory} from 'react-router'


const DatasetAPI = {
  dataset: null,

  init() {
    this.dataset = null;
  },

  getDataset(datasetId) {
    VcdpAPI.getDataset(datasetId);
  },

  deleteDataset(datasetId) {
    VcdpAPI.deleteDataset(datasetId);
  }

}

export default DatasetAPI;
