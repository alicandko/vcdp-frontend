import React from 'react'
import {Link} from 'react-router';


const SubmitButton = (props) => {
  return (
    <button
      type="button"
      className="btn btn-default btn-md"
      onClick={props.handler}>
      <Link to={props.link}>{props.txt}</Link>
    </button>
  );
};

export default SubmitButton;
