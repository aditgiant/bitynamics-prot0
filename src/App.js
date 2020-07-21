import React, {Component, useEffect} from 'react';
import './App.css';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Home from './containers/Home';
import ProjectHome from './containers/ProjectHome';
import Dataset from './containers/Dataset';
import SessionTraining from './containers/SessionTraining';
import NetworkSettings from './containers/ParameterSettings';
import fire from './Fire';
import Login from './Login';
import TopListModel from './containers/TopListModel';
import ItemDetail from './containers/ItemDetail';
import TestModel from './containers/TestModel';
import Prediction from './containers/Prediction';
import ComparedModels from './containers/ComparedModels';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({user});
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({user: null});
        localStorage.removeItem('user');
      }
    });
  }
  render() {
    const {models} = this.props;
    console.log(models);
    return (
      <div className="dashboard">
        {this.state.user ? (
          <Router>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route exact path="/project/:id" exact component={ProjectHome} />
              <Route path="/dataset/:id" component={Dataset} />
              <Route path="/sessiontraining/:id" component={SessionTraining} />
              <Route path="/networksettings" component={NetworkSettings} />
              <Route
                path="/sessionmodel/:id"
                models={models.models}
                component={TopListModel}
              />

              <Route
                exact
                path="/evaluate/:id/:type"
                models={models.models}
                component={ItemDetail}
              />

              <Route
                exact
                path="/testing/:id/:type"
                component={TestModel}
                models={models.models}
              />

              <Route
                exact
                path="/prediction/:id/:type"
                component={Prediction}
                models={models.models}
              />

              <Route
                exact
                path="/comparemodels/:id/:type"
                component={ComparedModels}
                models={models.models}
              />
            </Switch>

            {/* Move SideBar and Nav to each route */}
            {/* So that we can pass the props:id */}

            {/* <SideBar />
        <Nav/> */}
          </Router>
        ) : (
          <Login />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying,
    models: state.models,
  };
};
export default connect(mapStateToProps)(App);
