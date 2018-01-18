import React from 'react';
import AppActions from '../../actions/app-actions';
import DatasetStore from '../../stores/dataset-store';
import DatasetVideoText from './datasetvideotext';
import DatasetSidebar from './datasetsidebar';


class Dataset extends React.Component {
  constructor(props) {
    super();
    AppActions.getDataset(props.params.dataset);
    this.state = {
      dataset: null
    };
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    DatasetStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    DatasetStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    console.log("dataset.js onChange");
    this.setState({
      dataset: DatasetStore.getDataset()
    });
  }

  render() {
    var datasetVideos = null;
    var datasetSidebar = null;
    var datasetVideosText = null;

    if (this.state.dataset != null) {
      datasetSidebar = <DatasetSidebar dataset={this.state.dataset}/>;

      datasetVideosText = this.state.dataset.videos.map((video) => {
        return <DatasetVideoText key={video.id} video={video} />
      });
    }

    return (
      <div className="container-fluid">
        <div className="col-sm-2">
          {datasetSidebar}
        </div>
        <div className="col-sm-10">
          <ul className="list-group">
            {datasetVideosText}
          </ul>
        </div>
      </div>
    );
  }
}

export default Dataset;
