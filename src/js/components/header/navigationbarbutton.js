import React from 'react'
import {Link} from 'react-router';


const NavigationBarButton = (props) => {
  return (
    <li>
      <Link to={props.link}>{props.txt}</Link>
    </li>
  );
};

export default NavigationBarButton;
