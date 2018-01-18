import React from 'react';
import AppActions from '../../actions/app-actions';
import LabelerStore from '../../stores/labeler-store';
import Button from '../app-button';
import Input from '../app-input';


class Labeler extends React.Component {
  constructor(props) {
    super();
    this.state = {
      label: ""
    };
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    LabelerStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    LabelerStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    console.log("labeler.js onChange");
    this.setState({
      label: LabelerStore.getLabel()
    });
  }

  render() {
    return (
      <form className="form-inline label-form">
        <Input
          handler={
            AppActions.updateLabel
          }
          value={this.state.label}
          />
        <Button
          handler={
            AppActions.labelVideo.bind(null, this.state.label, this.props.params.dataset)
          }
          txt="Label Video"
          />
        <Button
          handler={
            AppActions.labelAllVideos.bind(null, this.state.label, this.props.params.dataset)
          }
          txt="Label All Videos"
          />
      </form>
    );
  }
}

export default Labeler;
