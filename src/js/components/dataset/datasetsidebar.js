import React from 'react';
import AppActions from '../../actions/app-actions';
import DatasetSidebarStore from '../../stores/datasetsidebar-store';
import {Link} from 'react-router';


class DatasetSidebar extends React.Component {
  constructor(props) {
    super();
    this.state = {
      videosByLabel: DatasetSidebarStore.getVideosByLabel(),
    };
    this._onChange = this._onChange.bind(this);
    this._onDatasetDelete = this._onDatasetDelete.bind(this);
  }

  componentWillMount() {
    DatasetSidebarStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    DatasetSidebarStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    console.log("datasetsidebar.js onChange");
    this.setState({
      videosByLabel: DatasetSidebarStore.getVideosByLabel(),
    });
  }

  render() {
    var labelInfo = [];
    var datasetSize = 0;
    var i = 0;
    for (var label in this.state.videosByLabel) {
      datasetSize += this.state.videosByLabel[label].length;
      labelInfo.push(<li key={i}><span className="badge">{label}</span> {this.state.videosByLabel[label].length}</li>)
      i++;
    }

    return (
      <div>
      <nav className="navbar navbar-default">
        <ul className="nav nav-pills nav-stacked" data-spy="affix" data-offset-top="205">
          <li><Link to={`/datasets/${this.props.dataset.id}`}>{this.props.dataset.title}
            <span className="badge pull-right">{datasetSize}</span></Link></li>
          <li><Link to={`/datasets/${this.props.dataset.id}/fetch`}>Fetch</Link></li>
          <li><Link to={`/datasets/${this.props.dataset.id}/learn`}>Learn</Link></li>
          <li><Link to={`/datasets/${this.props.dataset.id}/predict`}>Predict</Link></li>
          <li><a onClick={this._onDatasetDelete} style={{cursor: 'pointer'}}>
            Delete dataset</a></li>
        </ul>
      </nav>
      {labelInfo}
      </div>
    );
  }

  _onDatasetDelete() {
    var userAgrees = confirm("Are you sure want to delete this dataset?");

    if (userAgrees) {
      AppActions.deleteDataset(this.props.dataset.id)
    }
  }
}

export default DatasetSidebar;
