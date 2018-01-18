import AppConstants from '../constants/app-constants';
import {dispatch, register} from '../dispatchers/app-dispatcher';

export default {
  updateRegisterUsername(e) {
    dispatch({
      actionType: AppConstants.UPDATE_REGISTER_USERNAME,
      username: e.target.value
    })
  },

  updateRegisterPassword(e) {
    dispatch({
      actionType: AppConstants.UPDATE_REGISTER_PASSWORD,
      password: e.target.value
    })
  },

  register(username, password) {
    dispatch({
      actionType: AppConstants.REGISTER,
      username: username,
      password: password
    })
  },

  registerSuccess(user) {
    dispatch({
      actionType: AppConstants.REGISTER_SUCCESS,
      user: user
    })
  },

  getDatasets() {
    dispatch({
      actionType: AppConstants.GET_DATASETS
    })
  },

  getDatasetsSuccess(datasets) {
    dispatch({
      actionType: AppConstants.GET_DATASETS_SUCCESS,
      datasets: datasets
    })
  },

  updateNewDatasetTitle(e) {
    dispatch({
      actionType: AppConstants.UPDATE_NEW_DATASET_TITLE,
      newDatasetTitle: e.target.value
    })
  },

  createDataset(newDatasetTitle) {
    dispatch({
      actionType: AppConstants.CREATE_DATASET,
      newDatasetTitle: newDatasetTitle
    })
  },

  createDatasetSuccess(dataset) {
    dispatch({
      actionType: AppConstants.CREATE_DATASET_SUCCESS,
      dataset: dataset
    })
  },

  deleteDataset(datasetId) {
    dispatch({
      actionType: AppConstants.DELETE_DATASET,
      datasetId: datasetId
    })
  },

  deleteDatasetSuccess(datasetId) {
    dispatch({
      actionType: AppConstants.DELETE_DATASET_SUCCESS,
      datasetId: datasetId
    })
  },

  updateQuery(e) {
    dispatch({
      actionType: AppConstants.UPDATE_QUERY,
      query: e.target.value
    })
  },

  searchVideos(query) {
    dispatch({
      actionType: AppConstants.SEARCH_VIDEOS,
      query: query
    })
  },

  searchVideosSuccess(videos) {
    dispatch({
      actionType: AppConstants.SEARCH_VIDEOS_SUCCESS,
      videos: videos
    })
  },

  nextVideo() {
    dispatch({
      actionType: AppConstants.NEXT_VIDEO
    })
  },

  prevVideo() {
    dispatch({
      actionType: AppConstants.PREV_VIDEO
    })
  },

  updateLabel(e) {
    dispatch({
      actionType: AppConstants.UPDATE_LABEL,
      label: e.target.value
    })
  },

  labelVideo(label, datasetId) {
    dispatch({
      actionType: AppConstants.LABEL_VIDEO,
      label: label,
      datasetId: datasetId
    })
  },

  labelAllVideos(label, datasetId) {
    dispatch({
      actionType: AppConstants.LABEL_ALL_VIDEOS,
      label: label,
      datasetId: datasetId
    })
  },

  labelVideoSuccess(video) {
    dispatch({
      actionType: AppConstants.LABEL_VIDEO_SUCCESS,
      video: video
    })
  },

  labelAllVideosSuccess(videos) {
    dispatch({
      actionType: AppConstants.LABEL_ALL_VIDEOS_SUCCESS,
      videos: videos
    })
  },

  updateLoginUsername(e) {
    dispatch({
      actionType: AppConstants.UPDATE_LOGIN_USERNAME,
      username: e.target.value
    })
  },

  updateLoginPassword(e) {
    dispatch({
      actionType: AppConstants.UPDATE_LOGIN_PASSWORD,
      password: e.target.value
    })
  },

  getToken(username, password) {
    dispatch({
      actionType: AppConstants.GET_TOKEN,
      username: username,
      password: password
    })
  },

  getTokenSuccess(token) {
    dispatch({
      actionType: AppConstants.GET_TOKEN_SUCCESS,
      token: token
    })
  },

  logout() {
    dispatch({
      actionType: AppConstants.LOGOUT,
    })
  },

  getDataset(datasetId) {
    dispatch({
      actionType: AppConstants.GET_DATASET,
      datasetId: datasetId
    })
  },

  getDatasetSuccess(dataset) {
    dispatch({
      actionType: AppConstants.GET_DATASET_SUCCESS,
      dataset: dataset
    })
  },

  updateTrainSize(e) {
    dispatch({
      actionType: AppConstants.UPDATE_TRAIN_SIZE,
      trainSize: e.target.value
    })
  },

  updateValidateSize(e) {
    dispatch({
      actionType: AppConstants.UPDATE_VALIDATE_SIZE,
      validateSize: e.target.value
    })
  },

  updateTestSize(e) {
    dispatch({
      actionType: AppConstants.UPDATE_TEST_SIZE,
      testSize: e.target.value
    })
  },

  updateClfType(e) {
    dispatch({
      actionType: AppConstants.UPDATE_CLF_TYPE,
      clfType: e.target.value
    })
  },

  prepareDataset(datasetId, trainSize, testSize) {
    dispatch({
      actionType: AppConstants.PREPARE_DATASET,
      datasetId: datasetId,
      trainSize: trainSize,
      testSize: testSize
    })
  },

  prepareDatasetSuccess() {
    dispatch({
      actionType: AppConstants.PREPARE_DATASET_SUCCESS
    })
  },

  validate(datasetId) {
    dispatch({
      actionType: AppConstants.VALIDATE,
      datasetId: datasetId
    })
  },

  validateSuccess(analyses) {
    dispatch({
      actionType: AppConstants.VALIDATE_SUCCESS,
      analyses: analyses
    })
  },

  test(datasetId, clfType) {
    dispatch({
      actionType: AppConstants.TEST,
      datasetId: datasetId,
      clfType: clfType
    })
  },

  testSuccess(analysis) {
    dispatch({
      actionType: AppConstants.TEST_SUCCESS,
      analysis: analysis
    })
  },

  updateVpVideoIds(e) {
    dispatch({
      actionType: AppConstants.UPDATE_VP_VIDEO_IDS,
      vpVideoIds: e.target.value
    })
  },

  predict(datasetId, clfType, vpVideoIds) {
    dispatch({
      actionType: AppConstants.PREDICT,
      datasetId: datasetId,
      clfType: clfType,
      vpVideoIds: vpVideoIds
    })
  },

  predictSuccess(predicted) {
    dispatch({
      actionType: AppConstants.PREDICT_SUCCESS,
      predicted: predicted
    })
  },
}
