import React from 'react';
import AppActions from '../../actions/app-actions';
import LoginStore from '../../stores/login-store';
import Button from '../app-button';
import Input from '../app-input';


class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: LoginStore.getUsername(),
      password: LoginStore.getPassword(),
      token: LoginStore.getToken(),
      errorMsg: '',
    };
    this._onChange = this._onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    LoginStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    LoginStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    console.log("login.js onChange");
    this.setState({
      token: LoginStore.getToken(),
      username: LoginStore.getUsername(),
      password: LoginStore.getPassword()
    });
  }

  render() {
    return (
      <div className="container">
        <h2 className="text-center">Log in</h2>
        <form className="form-horizontal">
          <div className="form-group">
            <label className="control-label col-sm-offset-2 col-sm-2">Username:</label>
            <div className="col-sm-4">
              <Input
                handler={
                  AppActions.updateLoginUsername
                }
                value={this.state.username}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-offset-2 col-sm-2">Password:</label>
            <div className="col-sm-4">
              <Input
                type={"password"}
                handler={
                  AppActions.updateLoginPassword
                }
                value={this.state.password}
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
    const {username, password} = this.state;

    // in case a field is empty
    if (!username || !password) {
      this.setState({
        errorMsg: 'All fields must be filled in.'
      });
    }
    // if everything is fine, submit data
    else {
      AppActions.getToken(username, password);
    }
  }

  // render error msg logic
  renderErrorMsg() {
    const {errorMsg} = this.state;

    if (errorMsg) {
      return (
        <div className="err-msg alert alert-danger">{errorMsg}</div>
      );
    }
  }
}

export default Login;
