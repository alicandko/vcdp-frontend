import React from 'react';
import VcdpAPI from './VcdpAPI';


const PredictAPI = {
  vpVideoIds: "",
  clfType: "",
  predicted: [],

  init() {
    this.vpVideoIds = "";
    this.predicted = [];
  },

  updateVpVideoIds(vpVideoIds) {
    this.vpVideoIds = vpVideoIds;
  },

  updateClfType(clfType) {
    this.clfType = clfType;
  },

  predict(datasetId, clfType, vpVideoIds) {
    var vpVideoIdsArray = this.vpVideoIds.split(',');
    var predictData = {
      vp_video_ids: vpVideoIdsArray,
      clf_type: this._mapClfType(clfType)
    };
    VcdpAPI.predict(datasetId, predictData)
  },

  _mapClfType(clfType) {
    var options = ["MultinomialNB", "SGDClassifier"];
    return options.indexOf(clfType);
  }
}

export default PredictAPI;
