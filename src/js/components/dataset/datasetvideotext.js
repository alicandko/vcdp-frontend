import React from 'react';
import {Link} from 'react-router';


const DatasetVideoText = (props) => {
  return (
    <li className="list-group-item">
       <a href={`https://www.youtube.com/watch?v=${props.video.vp_video_id}`} target="_blank">{props.video.title}</a>
       <span className="badge">{props.video.label}</span>
    </li>
  );
};

export default DatasetVideoText;
