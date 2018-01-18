import React from 'react';


const DatasetSidebarAPI = {
  videosByLabel: null,

  init() {
    this.videosByLabel = null;
  },

  groupVideosByLabel(videos) {
    this.videosByLabel = this._groupBy(videos, 'label');
  },

  updateVideosByLabelBySingle(video) {
    if (this.videosByLabel.hasOwnProperty(video.label)) {
      this.videosByLabel[video.label].push(video);
    } else {
      this.videosByLabel[video.label] = [video];
    }
  },

  updateVideosByLabelByMultiple(videos) {
    var newVideosByLabel = this._groupBy(videos, 'label');
    for (var label in newVideosByLabel) {
      if (this.videosByLabel.hasOwnProperty(label)) {
        this.videosByLabel[label] = this.videosByLabel[label].concat(newVideosByLabel[label]);
      } else {
        this.videosByLabel[label] = newVideosByLabel[label];
      }
    }
  },

  _groupBy(list, prop) {
    return list.reduce(function(groups, item) {
      var val = item[prop];
      groups[val] = groups[val] || [];
      groups[val].push(item);
      return groups;
    }, {});
  }
}

export default DatasetSidebarAPI;
