import React from 'react';
import Searcher from './searcher';
import Player from './player';
import Labeler from './labeler';
import DatasetSidebar from '../dataset/datasetsidebar';
import DatasetStore from '../../stores/dataset-store';


const Fetch = (props) => {
  var dataset =  DatasetStore.getDataset();

  return (
    <div className="container-fluid">
      <div className="col-sm-2">
        <DatasetSidebar dataset={dataset}/>
      </div>
      <div className="col-sm-10 text-center">
        <Searcher />
        <br></br>
        <Player />
        <br></br>
        <Labeler params={props.params}/>
      </div>
    </div>
  );
};

export default Fetch;
