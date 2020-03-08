import React, { Component, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Nav from './Nav'
import Button from './components/Button';
import {Container, Row, Col} from 'react-bootstrap'
import CSVupload from './containers/CSVupload';
import FormContainer from './containers/ParameterSettings';
import FormContainerNew from './containers/SessionSettings';
import ParameterSettings from './containers/ParameterSettings';
import SessionSettings from './containers/SessionSettings';


class App extends Component {
  render() {
    return (
      <Router>
      <div>
        <Nav/>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/uploaddataset" component={CSVupload} />
          <Route path="/networksettings" component={ParameterSettings}/>
          <Route path="/sessionsettings" component={SessionSettings} />
        </Switch>
      </div>
      </Router>
    );
  }
}

class Home extends Component {
  
  handleHistory(){
    fetch("/showtraining").then(response =>
      response.json().then(data => {
        console.log(data);
      })) 
  }

  render() {
  return(
  <Container style={{marginTop: '10px'}}>
    <h1>Build your machine learning model faster than ever! </h1>
    <Button 
            action = {this.handleHistory}
            type = {'primary'}
            title = {'History'}
            style ={{margin : '0px 0px 0px 0px'}}
            /> {/*Show the History*/}
  </Container>
  )}
}

export default App;
