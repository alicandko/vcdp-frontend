import React from 'react';
import VcdpAPI from '../api/VcdpAPI';
import PlayerAPI from '../api/PlayerAPI';


const LabelerAPI = {
  label: "",

  init() {
    this.label = "";
  },

  updateLabel(label) {
    this.label = label;
  },

  labelVideo(label, datasetId) {
    var video = PlayerAPI.getVideoInVideoIndex();
    video.label = label;
    video.dataset = datasetId;
    VcdpAPI.postVideo(video);
  },

  labelAllVideos(label, datasetId) {
    PlayerAPI.videos.forEach((video) => {
      video.label = label;
      video.dataset = datasetId;
    });
    VcdpAPI.postVideo(PlayerAPI.videos);
  }
}

export default LabelerAPI;
