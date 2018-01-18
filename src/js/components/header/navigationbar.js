import React from 'react';
import AppActions from '../../actions/app-actions';
import NavigationBarStore from '../../stores/navigationbar-store';
import LoginStore from '../../stores/login-store';
import NavigationBarButton from './navigationbarbutton';
import {Link} from 'react-router';


class NavigationBar extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: NavigationBarStore.getIsLoggedIn(),
    };
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    NavigationBarStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    NavigationBarStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    console.log("navigationbar.js onChange");
    this.setState({
      isLoggedIn: NavigationBarStore.getIsLoggedIn()
    });
  }

  render() {
    const { isLoggedIn } = this.state;

    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">VCDP</Link>
          </div>
          <ul className="nav navbar-nav navbar-left">
            {this.renderLeftButtons()}
          </ul>
          <ul className="nav navbar-nav navbar-right">
            {this.renderRightButtons()}
          </ul>
        </div>
      </nav>
    );
  }

  // Render register/log in or sign out buttons based on user logged in status
  renderRightButtons() {
    const { isLoggedIn } = this.state;

    if (isLoggedIn) {
      return [
        <NavigationBarButton key={0} txt={LoginStore.getUsername()} />,
        <li key={1}>
          <a onClick={AppActions.logout} style={{cursor: 'pointer'}}>Log out</a>
        </li>
      ];
    }
    else {
      return [
          <NavigationBarButton key={0} link={'/register'} txt={"Register"} />,
          <NavigationBarButton key={1} link={'/login'} txt={"Log in"} />
      ];
    }
  }

  // Render datasets button if logged in
  renderLeftButtons() {
    const { isLoggedIn } = this.state;

    if (isLoggedIn) {
      return <NavigationBarButton link={'/datasets'} txt={"Datasets"} />
    }
  }
}

export default NavigationBar;
