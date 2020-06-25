import React, { Component, useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Home from './containers/Home';
import ProjectHome from './containers/ProjectHome';
import Dataset from './containers/Dataset';
import SessionTraining from './containers/SessionTraining';
import NetworkSettings from './containers/ParameterSettings';
import fire from './Fire';
import Login from './Login';

class App extends Component {
  constructor() {
    super();
    this.state = ({
      user: null,
    });
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    });
  }
  render() {
    return (
      <div className="dashboard">
      {this.state.user ?  
      (<Router>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/project/:id" exact component={ProjectHome}/>
          <Route path="/dataset/:id" component={Dataset} />
          <Route path="/sessiontraining" component={SessionTraining} />
          <Route path="/networksettings" component={NetworkSettings} />
        </Switch>

        {/* Move SideBar and Nav to each route */}
        {/* So that we can pass the props:id */}
        
        {/* <SideBar />
        <Nav/> */}
      </Router>) : ( <Login/>)}
      </div>
    );
  }
}

export default App;
