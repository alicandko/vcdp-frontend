import React from 'react';
import VcdpAPI from '../api/VcdpAPI';


const DatasetListAPI = {
  datasets: [],
  newDatasetTitle: "",

  init() {
    this.datasets = [];
    this.newDatasetTitle = "";
  },

  getDatasets() {
    VcdpAPI.getDatasets();
  },

  updateNewDatasetTitle(newDatasetTitle) {
    this.newDatasetTitle = newDatasetTitle;
  },

  createDataset(newDatasetTitle) {
    newDatasetTitle = newDatasetTitle === "" ? "new dataset" : newDatasetTitle;
    var dataset = {title: newDatasetTitle};
    VcdpAPI.postDataset(dataset);
  },

  pushToDatasets(dataset) {
    this.datasets.push(dataset);
  }

}

export default DatasetListAPI;
