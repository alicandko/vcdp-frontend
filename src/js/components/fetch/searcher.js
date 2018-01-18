import React from 'react';
import AppActions from '../../actions/app-actions';
import Button from '../app-button';
import Input from '../app-input';
import SearcherStore from '../../stores/searcher-store';


class Searcher extends React.Component {
  constructor() {
    super();
    this.state = {
      query: SearcherStore.getQuery(),
      displayWaitMsg: SearcherStore.getDisplayWaitMsg(),
    };
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    SearcherStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    SearcherStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    console.log("searcher.js onChange");
    this.setState({
      query: SearcherStore.getQuery(),
      displayWaitMsg: SearcherStore.getDisplayWaitMsg(),
    });
  }

  _renderWaitMsg() {
    const { displayWaitMsg } = this.state;

    if (displayWaitMsg)
      return (
        <div style={{marginTop: '1rem'}} >
          <p className="alert alert-warning col-sm-offset-4 col-sm-4">
            Please wait. Searching for videos.
          </p>
        </div>
      )
    else
      return <div></div>
  }

  render() {
    return (
      <form className="form-inline search-form" onSubmit={ evt => evt.preventDefault() }>
        <Input
          handler={
            AppActions.updateQuery
          }
          value={this.state.query}
          />
        <Button
          handler={
            AppActions.searchVideos.bind(null, this.state.query)
          }
          txt="Search Videos"
          />
          { this._renderWaitMsg() }
      </form>
    );
  }
}

export default Searcher;
