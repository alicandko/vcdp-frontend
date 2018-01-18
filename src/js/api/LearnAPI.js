import React from 'react';
import VcdpAPI from './VcdpAPI';
import DatasetAPI from './DatasetAPI';


const LearnAPI = {
  trainSize: 0,
  validateSize: 0,
  testSize: 0,
  totalSize: 0,
  clfType: "",
  validateAnalyses: {},
  testAnalysis: {},
  displayPrepareSuccessMsg: false,

  init() {
    this.trainSize = 0;
    this.validateSize = 0;
    this.testSize = 0;
    this.clfType = "";
    this.validateAnalyses = {};
    this.testAnalysis = {};
    this.displayPrepareSuccessMsg = false;
  },

  updateTrainSize(trainSize) {
    this.trainSize = trainSize;
  },

  updateValidateSize(validateSize) {
    this.validateSize = validateSize;
  },

  updateTestSize(testSize) {
    this.testSize = testSize;
  },

  updateClfType(clfType) {
    this.clfType = clfType;
  },

  updateDisplayPrepareSuccessMsg(shouldDisplay) {
    this.displayPrepareSuccessMsg = shouldDisplay;
  },

  setValidateAnalyses(validateAnalyses) {
    for (var clfType in validateAnalyses) {
      var validateAnalysisStr = "";
      var validateAnalysis = validateAnalyses[clfType];
      for (var key in validateAnalysis) {
        validateAnalysisStr += key + ":\n" + validateAnalysis[key] + "\n";
      }
      this.validateAnalyses[clfType] = validateAnalysisStr;
    }
  },

  setTestAnalysis(testAnalysis) {
    var testAnalysisStr = "";
    for (var key in testAnalysis) {
      testAnalysisStr += key + ":\n" + testAnalysis[key] + "\n";
    }
    this.testAnalysis[this.clfType] = testAnalysisStr;
  },

  prepareDataset(datasetId, trainSize, testSize) {
    var sizes = {
      train_size: trainSize,
      test_size: testSize
    };
    VcdpAPI.prepareDataset(datasetId, sizes);
  },

  validate(datasetId) {
    this.validateAnalyses = {};
    VcdpAPI.validate(datasetId);
  },

  test(datasetId, clfType) {
    this.testAnalysis = {};
    var options = ["MultinomialNB", "SGDClassifier"];
    var clfTypeObj = {clf_type: this._mapClfType(clfType)};
    VcdpAPI.test(datasetId, clfTypeObj);
  },

  _mapClfType(clfType) {
    var options = ["MultinomialNB", "SGDClassifier"];
    return options.indexOf(clfType);
  }
}

export default LearnAPI;
