import React, {Component, useState} from 'react';
import {Link} from 'react-router-dom';
import '../App.css';
import fire from '../Fire';
import Nav from '../Nav';
import SideBar from '../sideBar/sideBar';
import ParameterSettings from './ParameterSettings';
import {Container, Row, Col} from 'react-bootstrap';
import IconBasic from '../imgsrc/basicTrainingMode.png';
import IconAdvanced from '../imgsrc/advancedTrainingMode.png';
import IconMLP from '../imgsrc/networkMLP.png';
import IconCNN from '../imgsrc/networkCNN.png';
import IconLSTM from '../imgsrc/networkLSTM.png';
import {render} from '@testing-library/react';
import {Redirect} from 'react-router-dom';
import * as ROUTES from '../ROUTES';

class SessionTraining extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      step: 0,
      newSession: {
        trainingMode: 'basic',
        networkType: 'MLP',
      },
    };
    this.nextStep = this.nextStep.bind(this);
    this.previousStep = this.previousStep.bind(this);
    this.handleTrainingMode = this.handleTrainingMode.bind(this);
    this.handleNetworkType = this.handleNetworkType.bind(this);
  }

  // componentDidMount() {
  //   const ref = fire.firestore().collection('projects').doc(this.state.id);
  //   ref.get().then((doc) => {
  //     if (doc.exists) {
  //       const board = doc.data();
  //       this.setState({ ...this.state,
  //         csvDatasetLink : board.csvDatasetLink,
  //         csvDatasetLinkPrep : board.csvDatasetLinkPrep});
  //   if (this.state.csvDatasetLink != '') {
  //     this.setState({ ...this.state,
  //       step : 1}
  //     )
  //     if (this.state.csvDatasetLinkPrep != '') {
  //       this.setState({ ...this.state,
  //         step : 2}
  //       )
  // }}
  //     } else {
  //       console.log("No such document!");
  //     }
  //   });
  // }
  // }

  nextStep() {
    this.setState((prevState) => {
      return {
        ...prevState,
        step: prevState.step + 1,
      };
    });
  }

  previousStep() {
    this.setState((prevState) => {
      return {
        ...prevState,
        step: prevState.step - 1,
      };
    });
  }

  handleTrainingMode(e) {
    let value = e.target.value;
    this.setState(
      (prevState) => ({
        newSession: {...prevState.newSession, trainingMode: value},
      }),
      () => console.log(this.state.newSession)
    );
  }

  handleNetworkType(e) {
    let value = e.target.value;
    this.setState(
      (prevState) => ({
        newSession: {...prevState.newSession, networkType: value},
      }),
      () => console.log(this.state.newSession)
    );
  }

  startTraining() {
    console.log('training...');
  }

  render() {
    return (
      <div>
        <Container id="home-container">
          {this.state.step == 0 && (
            <div class="mode-selector">
              <h3 style={{'font-size': '1em'}}>
                <strong>Alright, let's understand each other better!</strong>
              </h3>
              <p style={{'font-size': '1em'}}>
                We believe that everyone is unique, so choose one that suits you
              </p>
              <div id="mode-selector-switch">
                <div id="mode-selector-option">
                  <input
                    id="basic-selector-option"
                    class="input-hidden"
                    type="radio"
                    onChange={this.handleTrainingMode}
                    checked={this.state.newSession.trainingMode === 'basic'}
                    value="basic"
                  />
                  <label for="basic-selector-option">
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Basic&nbsp;&nbsp;&nbsp;&nbsp;</p>
                  </label>
                  <input
                    id="advanced-selector-option"
                    class="input-hidden"
                    type="radio"
                    onChange={this.handleTrainingMode}
                    checked={this.state.newSession.trainingMode === 'advanced'}
                    value="advanced"
                  />
                  <label for="advanced-selector-option">
                    <p>Advanced</p>
                  </label>
                </div>
              </div>
              {this.state.newSession.trainingMode == 'basic' && (
                <div>
                  <img src={IconBasic} className="mode-selector-icon" />
                  <p>
                    Now, sit and relax... we'll take it from here!
                    <br />
                    Our algorithm generates and compares the models, then gives
                    you the best one!
                  </p>
                </div>
              )}
              {this.state.newSession.trainingMode == 'advanced' && (
                <div>
                  <img src={IconAdvanced} className="mode-selector-icon" />
                  <p>
                    Customize the training the way you want!
                    <br />
                    Choose the network type and build the structure that
                    generate your model.
                  </p>
                </div>
              )}
            </div>
          )}
          {this.state.step == 0 &&
            this.state.newSession.trainingMode == 'basic' && (
              <Link to={`/sessionmodel/${this.state.id}`}>
                <button className="btn btn-primary" style={buttonStyle}>
                  Start training
                </button>
              </Link>
            )}
          {this.state.step == 0 &&
            this.state.newSession.trainingMode == 'advanced' && (
              <button
                className="btn btn-primary"
                style={buttonStyle}
                onClick={this.nextStep}>
                Next
              </button>
            )}

          {this.state.step == 1 && (
            <div class="mode-selector">
              <h3 style={{'font-size': '1em'}}>
                <strong>Pick a network type</strong>
              </h3>
              <p style={{'font-size': '1em'}}>
                We'll prepare what's best for your selected network.
              </p>
              <div id="mode-selector-switch">
                <div id="mode-selector-option">
                  <input
                    id="mlp-selector-option"
                    class="input-hidden"
                    type="radio"
                    onChange={this.handleNetworkType}
                    checked={this.state.newSession.networkType === 'MLP'}
                    value="MLP"
                  />
                  <label for="mlp-selector-option">
                    <p>Multilayer Perceptrons</p>
                  </label>
                  <input
                    id="cnn-selector-option"
                    class="input-hidden"
                    type="radio"
                    onChange={this.handleNetworkType}
                    checked={this.state.newSession.networkType === 'CNN'}
                    value="CNN"
                  />
                  <label for="cnn-selector-option">
                    <p>Convolutional Neural Network</p>
                  </label>
                  <input
                    id="lstm-selector-option"
                    class="input-hidden"
                    type="radio"
                    onChange={this.handleNetworkType}
                    checked={this.state.newSession.networkType === 'LSTM'}
                    value="LSTM"
                  />
                  <label for="lstm-selector-option">
                    <p>Long Short-term Memory</p>
                  </label>
                </div>
              </div>
              {this.state.newSession.networkType == 'MLP' && (
                <div>
                  <img src={IconMLP} className="mode-selector-icon" />
                  <p>
                    Multilayer Perceptrons uses fully-connected layers
                    <br /> that consist of multiple nodes with binary
                    classifiers.
                  </p>
                </div>
              )}
              {this.state.newSession.networkType == 'CNN' && (
                <div>
                  <img src={IconCNN} className="mode-selector-icon" />
                  <p>
                    Convolutional Neural Network applies convolutional
                    preprocessing to <br />
                    compress input nodes before generating fully-connected
                    layers.
                  </p>
                </div>
              )}
              {this.state.newSession.networkType == 'LSTM' && (
                <div>
                  <img src={IconLSTM} className="mode-selector-icon" />
                  <p>
                    Long Short-term Memory is a time-series processing
                    algorithm, <br />
                    composed from cells that regulate the flow of information.
                  </p>
                </div>
              )}
            </div>
          )}
          {this.state.step == 1 && (
            <button
              className="btn btn-secondary"
              style={changeButtonStyle}
              onClick={this.previousStep}>
              Back
            </button>
          )}
          {this.state.step == 1 && (
            <Link to="/networksettings">
              <button className="btn btn-primary" style={buttonStyle}>
                Build network
              </button>
            </Link>
          )}
        </Container>
        <SideBar id={this.state.id} />
        <Nav id={this.state.id} />
      </div>
    );
  }
}

const buttonStyle = {
  margin: '10px 10px 10px 0px',
  position: 'absolute',
  bottom: '20px',
  right: '10px',
};

const changeButtonStyle = {
  margin: '10px 10px 10px 0px',
  position: 'absolute',
  bottom: '20px',
  right: '150px',
};

export default SessionTraining;
