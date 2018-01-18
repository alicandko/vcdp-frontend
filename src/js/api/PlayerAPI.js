import React from 'react';


const PlayerAPI = {
  videos: [],
  videoIndex: 0,

  init() {
    this.videos = [];
    this.videoIndex = 0;
  },

  getVideoInVideoIndex() {
    let video = null;
    if (this.videos.length != 0) {
      video = this.videos[this.videoIndex];
    }
    return video;
  },

  increaseVideoIndex() {
    if (this.videoIndex < this.videos.length) {
      this.videoIndex++;
    }
  },

  decreaseVideoIndex() {
    if (this.videoIndex > 0) {
      this.videoIndex--;
    }
  }
}

export default PlayerAPI;
