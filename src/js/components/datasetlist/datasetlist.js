import React from 'react';
import AppActions from '../../actions/app-actions';
import DatasetListStore from '../../stores/datasetlist-store';
import DatasetListDataset from './datasetlistdataset';
import Button from '../app-button';
import Input from '../app-input';


class DatasetList extends React.Component {
  constructor() {
    super();
    AppActions.getDatasets()
    this.state = {
      datasets: DatasetListStore.getDatasets(),
      newDatasetTitle: DatasetListStore.getNewDatasetTitle()
    };
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    DatasetListStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    DatasetListStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    console.log("datasetlist.js onChange");
    this.setState({
      datasets: DatasetListStore.getDatasets(),
      newDatasetTitle: DatasetListStore.getNewDatasetTitle()
    });
  }

  render() {
    var datasets = this.state.datasets.map((dataset, i) => {
      return <DatasetListDataset key={i} dataset={dataset} />
    });

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-4 col-sm-offset-7">
            <form className="form-inline dataset-create-form">
              <Input
                handler={
                  AppActions.updateNewDatasetTitle
                }
                value={this.state.newDatasetTitle}
                />
              <Button
                handler={
                  AppActions.createDataset.bind(null, this.state.newDatasetTitle)
                }
                txt="Create Dataset"
                />
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-10 col-sm-offset-1">
            <ul className="list-group">
              {datasets}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default DatasetList;
