import React from 'react';
import Template from './app-template';
import Home from './home';
import Login from './login/login';
import Register from './register/register';
import DatasetList from './datasetlist/datasetlist';
import Dataset from './dataset/dataset';
import Fetch from './fetch/fetch';
import Learn from './learn/learn';
import Predict from './predict/predict';
import DatasetListAPI from '../api/DatasetListAPI';
import DatasetAPI from '../api/DatasetAPI';
import DatasetSidebarAPI from '../api/DatasetSidebarAPI';
import LabelerAPI from '../api/LabelerAPI';
import PlayerAPI from '../api/PlayerAPI';
import SearcherAPI from '../api/SearcherAPI';
import LearnAPI from '../api/LearnAPI';
import LoginAPI from '../api/LoginAPI';
import RegisterAPI from '../api/RegisterAPI';
import PredictAPI from '../api/PredictAPI';


import {Router, Route, IndexRoute, hashHistory} from 'react-router';

export default () => {

  const _loginOnEnter = () => {
    LoginAPI.init();
    const token = localStorage.getItem('token');
    if (token)
      hashHistory.push('/');
  }

  const _registerOnEnter = () => {
    RegisterAPI.init();
    const token = localStorage.getItem('token');
    if (token)
      hashHistory.push('/');
  }

  const _datasetOnEnter = () => {
    DatasetAPI.init();
    DatasetSidebarAPI.init();
  }

  const _fetchOnEnter = () => {
    SearcherAPI.init();
    PlayerAPI.init();
    LabelerAPI.init();
  }

  const _datasetListOnEnter = () => {
    DatasetListAPI.init();
  }

  const _learnOnEnter = () => {
    LearnAPI.init();
  }

  const _predictOnEnter = () => {
    PredictAPI.init();
  }

  return (
    <Router history={hashHistory}>
      <Route path="/" component={Template}>
        <IndexRoute component={Home}/>
        <Route path="login" component={Login} onEnter={_loginOnEnter} />
        <Route path="register" component={Register} onEnter={_registerOnEnter} />
        <Route path="datasets" component={DatasetList} onEnter={_datasetListOnEnter}/>
        <Route path="datasets/:dataset" component={Dataset} onEnter={_datasetOnEnter}/>
        <Route path="datasets/:dataset/fetch" component={Fetch} onEnter={_fetchOnEnter}/>
        <Route path="datasets/:dataset/learn" component={Learn} onEnter={_learnOnEnter}/>
        <Route path="datasets/:dataset/predict" component={Predict} onEnter={_predictOnEnter}/>
      </Route>
    </Router>
  );
};
