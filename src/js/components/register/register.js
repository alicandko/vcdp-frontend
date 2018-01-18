import React from 'react';
import AppActions from '../../actions/app-actions';
import RegisterStore from '../../stores/register-store';
import Button from '../app-button';
import Input from '../app-input';


class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      username: RegisterStore.getUsername(),
      password: RegisterStore.getPassword(),
      passwordConfirm: '',
    };
    this._onChange = this._onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    RegisterStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    RegisterStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    console.log("register.js onChange");
    this.setState({
      username: RegisterStore.getUsername(),
      password: RegisterStore.getPassword()
    });
  }

  render() {
    return (
      <div className="container">
        <h2 className="text-center">Create a new account</h2>
        <form className="form-horizontal">
          <div className="form-group">
            <label className="control-label col-sm-offset-2 col-sm-2">Username:</label>
            <div className="col-sm-4">
              <Input
                handler={AppActions.updateRegisterUsername}
                value={this.state.username}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-offset-2 col-sm-2">Password:</label>
            <div className="col-sm-4">
              <Input
                type={"password"}
                handler={AppActions.updateRegisterPassword}
                value={this.state.password}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-offset-2 col-sm-2">Confirm password:</label>
            <div className="col-sm-4">
              <Input
                type={"password"}
                handler={
                  (evt) => {this.setState({passwordConfirm: evt.target.value})}
                }
                value={this.state.passwordConfirm}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-4 col-sm-6">
              <Button
                handler={this.handleSubmit}
                txt="Submit"
              />
            </div>
          </div>
        </form>
        {this.renderErrorMsg()}
      </div>
    );
  }

  // submit data if filled in, or display error message
  handleSubmit() {
    const {username, password, passwordConfirm} = this.state;

    // if password dont match and username not provided
    if (!username && password !== passwordConfirm) {
      this.setState({
        errorMsg: 'All fields must be filled in and passwords must match.'
      });
    }
    // if passwords dont match
    else if (username && password !== passwordConfirm) {
      this.setState({
        errorMsg: 'Password provided do not match.'
      });
    }
    // in case a field is empty
    else if (!username || !password || !passwordConfirm) {
      this.setState({
        errorMsg: 'All fields must be filled in.'
      });
    }
    // if everything is fine, submit data
    else {
      AppActions.register(username, password);
    }
  }

  // render error msg logic
  renderErrorMsg() {
    const { errorMsg } = this.state;

    if (errorMsg) {
      return (
        <div className="err-msg alert alert-danger">{errorMsg}</div>
      );
    }
  }
}

export default Register;
