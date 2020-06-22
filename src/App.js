import React, { Component, useEffect } from 'react';
import logo from './logo.svg';
import SideBar from './sideBar/sideBar';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Nav from './Nav'
import Button from './components/Button';
import {Container, Row, Col} from 'react-bootstrap'
import CSVupload from './containers/CSVupload';
import FormContainer from './containers/ParameterSettings';
import FormContainerNew from './containers/SessionSettings';
import Home from './Home';
import SessionTraining from './containers/SessionTraining';
import NetworkSettings from './containers/ParameterSettings';


class App extends Component {
  render() {
    return (
      <div className="dashboard">
      <Router>
        <SideBar />
        <Nav/>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/uploaddataset" component={CSVupload} />
          <Route path="/sessiontraining" component={SessionTraining} />
          <Route path="/networksettings" component={NetworkSettings} />
        </Switch>
      </Router>
      </div>
    );
  }
}

export default App;
