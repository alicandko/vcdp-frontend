import React from 'react'
import {Link} from 'react-router';


const DatasetListDataset = (props) => {
  return (
    <li className="list-group-item">
       <Link to={`/datasets/${props.dataset.id}`}>{props.dataset.title}</Link><span className="badge">{props.dataset.videos.length}</span>
    </li>
  );
};

export default DatasetListDataset;
