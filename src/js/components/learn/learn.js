import React from 'react';
import AppActions from '../../actions/app-actions';
import LearnStore from '../../stores/learn-store';
import DatasetStore from '../../stores/dataset-store';
import DatasetSidebar from '../dataset/datasetsidebar';
import Button from '../app-button';
import Input from '../app-input';
import ReadOnlyInput from '../app-readonlyinput';
import Select from '../app-select';


class Learn extends React.Component {
  constructor(props) {
    super();
    AppActions.getDataset(props.params.dataset);
    this.state = {
      trainSize: LearnStore.getTrainSize(),
      validateSize: LearnStore.getValidateSize(),
      testSize: LearnStore.getTestSize(),
      totalSize: LearnStore.getTotalSize(),
      clfType: LearnStore.getClfType(),
      validateAnalyses: LearnStore.getValidateAnalyses(),
      testAnalysis: LearnStore.getTestAnalysis(),
      displayErrorMsg: false,
      displaySuccessMsg: LearnStore.getDisplayPrepareSuccessMsg(),
    };
    this._onChange = this._onChange.bind(this);
    this._onClickPrepareBtn = this._onClickPrepareBtn.bind(this);
  }

  componentWillMount() {
    LearnStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    LearnStore.removeChangeListener(this._onChange);
  }

  _renderErrorMsg() {
    const { displayErrorMsg } = this.state;

    if (displayErrorMsg) {
      return (
        <div className="form-group">
          <p className="col-sm-offset-2 col-sm-4 alert alert-danger">
            The sum of set sizes must be equal to {this.state.totalSize}.
          </p>
        </div>
      )
    }
    else
      return <div></div>
  }

  _renderSuccessMsg() {
    const { displaySuccessMsg } = this.state;

    if (displaySuccessMsg) {
      return (
        <div className="form-group">
          <p className="col-sm-offset-2 col-sm-4 alert alert-success">
            Dataset is successfully prepared.
          </p>
        </div>
      )
    }
    else
      return <div></div>
  }

  _onClickPrepareBtn() {
    const { trainSize, validateSize, testSize, totalSize } = this.state;
    const dataset = DatasetStore.getDataset();
    const sumEqualsTotal = parseInt(trainSize) + parseInt(validateSize) + parseInt(testSize) == totalSize;

    if (sumEqualsTotal) {
      this.setState({
        displayErrorMsg: false,
      });
      AppActions.prepareDataset(dataset.id, trainSize, testSize)
    }
    else {
      this.setState({
        displayErrorMsg: true,
        displaySuccessMsg: false,
      });
    }
  }

  _onChange() {
    console.log("learn.js onChange");
    this.setState({
      trainSize: LearnStore.getTrainSize(),
      validateSize: LearnStore.getValidateSize(),
      testSize: LearnStore.getTestSize(),
      totalSize: LearnStore.getTotalSize(),
      clfType: LearnStore.getClfType(),
      validateAnalyses: LearnStore.getValidateAnalyses(),
      testAnalysis: LearnStore.getTestAnalysis(),
      displaySuccessMsg: LearnStore.getDisplayPrepareSuccessMsg(),
    });

    console.log(this.state.displaySuccessMsg, LearnStore.getDisplayPrepareSuccessMsg());
  }

  render() {
    var dataset = DatasetStore.getDataset();
    var datasetSidebar = dataset != null ? <DatasetSidebar dataset={dataset}/> : null;
    var options = ["MultinomialNB", "SGDClassifier"];

    return (
      <div className="container-fluid">
        <div className="col-sm-2">
          {datasetSidebar}
        </div>
        <div className="col-sm-10">
          <form className="form-horizontal">
            <div className="form-group">
              <label className="control-label col-sm-2">Train Size:</label>
              <div className="col-sm-2">
                <Input
                  type = "number"
                  handler={AppActions.updateTrainSize}
                  value={this.state.trainSize}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-2">Validation Size:</label>
              <div className="col-sm-2">
                <Input
                  type = "number"
                  handler={AppActions.updateValidateSize}
                  value={this.state.validateSize}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-2">Test Size:</label>
              <div className="col-sm-2">
                <Input
                  type = "number"
                  handler={AppActions.updateTestSize}
                  value={this.state.testSize}
                />
              </div>
            </div>
            <div className="form-group prepare-validate-formg">
              <div className="col-sm-4 col-md-offset-2">
                <Button
                  handler={this._onClickPrepareBtn}
                  txt="Prepare"
                />
                <Button
                  handler={AppActions.validate.bind(null, dataset.id)}
                  txt="Validate"
                />
              </div>
            </div>
            { this._renderErrorMsg() }
            { this._renderSuccessMsg() }
            <div className="form-group">
              <div className="col-sm-4 col-md-offset-2">
                <Select
                  handler={AppActions.updateClfType}
                  options={options}
                  value={this.state.clfType}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-4 col-md-offset-2">
                <Button
                  handler={AppActions.test.bind(null, dataset.id, this.state.clfType)}
                  txt="Test"
                />
              </div>
            </div>
          </form>
          {this.handleValidationAnalysesRender()}
          {this.handleTestAnalysisRender()}
        </div>
      </div>
    );
  }

  handleValidationAnalysesRender() {
    var validateAnalyses = [];
    var i = 0;
    for (var clfType in this.state.validateAnalyses) {
      validateAnalyses.push(
        <div key={i}>
          <h4>Validation: {clfType}</h4>
          <pre>{this.state.validateAnalyses[clfType]}</pre>
        </div>
      );
      i++;
    }
    return validateAnalyses;
  }

  handleTestAnalysisRender() {
    var testAnalysis = [];
    var i = 0;
    for (var clfType in this.state.testAnalysis) {
      testAnalysis.push(
        <div key={i}>
          <h4>Test: {clfType}</h4>
          <pre>{this.state.testAnalysis[clfType]}</pre>
        </div>
      );
      i++;
    }
    return testAnalysis;
  }
}

export default Learn;
