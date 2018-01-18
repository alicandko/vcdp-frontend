import React from 'react';
import NavigationBar from './header/navigationbar';


export default(props) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <NavigationBar />
      </div>
      <div className="row">
        {props.children}
      </div>
    </div>
  );
};
