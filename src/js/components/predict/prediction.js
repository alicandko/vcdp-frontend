import React from 'react'
import {Link} from 'react-router';


const Prediction = (props) => {
  return (
    <li className="list-group-item">
      <a href={`https://www.youtube.com/watch?v=${props.vpVideoId}`} target="_blank">${props.vpVideoId}</a>
      <span className="badge">{props.prediction}</span>
    </li>
  );
};

export default Prediction;
