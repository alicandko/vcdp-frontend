import React from 'react';
import AppActions from '../../actions/app-actions';
import DatasetStore from '../../stores/dataset-store';
import PredictStore from '../../stores/predict-store';
import DatasetSidebar from '../dataset/datasetsidebar';
import Select from '../app-select';
import Button from '../app-button';
import Prediction from './prediction'


class Predict extends React.Component {
  constructor() {
    super();
    this.state = {
      vpVideoIds: PredictStore.getVpVideoIds(),
      clfType: PredictStore.getClfType(),
      predicted: PredictStore.getPredicted()
    };
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    PredictStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    PredictStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    console.log("predict.js onChange");
    this.setState({
      vpVideoIds: PredictStore.getVpVideoIds(),
      clfType: PredictStore.getClfType(),
      predicted: PredictStore.getPredicted()
    });
  }

  render() {
    var dataset = DatasetStore.getDataset();
    var datasetSidebar = dataset != null ? <DatasetSidebar dataset={dataset}/> : null;
    var options = ["MultinomialNB", "SGDClassifier"];

    var vpVideoIdsArray = this.state.vpVideoIds.split(',');
    var predictions = [];
    console.log(vpVideoIdsArray);
    for (var i = 0; i < vpVideoIdsArray.length && i < this.state.predicted.length; i++) {
      predictions.push(<Prediction key={i} vpVideoId={vpVideoIdsArray[i]} prediction={this.state.predicted[i]} />)
    }

    return (
      <div className="container-fluid">
        <div className="col-sm-2">
          {datasetSidebar}
        </div>
        <div className="col-sm-10">
          <div className="container">
            <div className="row">
              <div className="col-sm-4 col-sm-offset-1">
                <form>
                  <div className="form-group">
                    <label>Video Ids:</label>
                    <textarea className="form-control" rows="5"
                      onChange={AppActions.updateVpVideoIds}
                      value={this.state.vpVideoIds}>
                    </textarea>
                  </div>
                  <div className="form-group">
                    <Select
                      handler={AppActions.updateClfType}
                      options={options}
                      value={this.state.clfType}
                    />
                  </div>
                  <div className="form-group">
                    <Button
                      handler={AppActions.predict.bind(null, dataset.id, this.state.clfType, this.state.vpVideoIds)}
                      txt="Predict"
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4 col-sm-offset-1">
                <ul className="list-group">
                  {predictions}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Predict;
