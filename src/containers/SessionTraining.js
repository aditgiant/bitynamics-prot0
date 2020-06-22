import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import '../App.css';
import ParameterSettings from './ParameterSettings';  
import {Container, Row, Col} from 'react-bootstrap';
import IconBasic from '../imgsrc/basicTrainingMode.png'
import IconAdvanced from '../imgsrc/advancedTrainingMode.png'
import IconMLP from '../imgsrc/networkMLP.png'
import IconCNN from '../imgsrc/networkCNN.png'
import IconLSTM from '../imgsrc/networkLSTM.png'

function SessionTraining() {
      const [step, setStep]= useState(0);
      const [trainingMode, setTrainingMode]= useState('basic')
      const [networkType, setNetworkType]= useState('MLP')
      return (
        <Container id="home-container">
          {step==0 &&
          <div class = "mode-selector">
                <h3 style={{"font-size":"1em"}}><strong>Alright, let's understand each other better!</strong></h3>
                <p style={{"font-size":"1em"}}>We believe that everyone is unique, so choose one that suits you</p>
                <div id="mode-selector-switch">
                    <div id="mode-selector-option">
                    <input 
                        id="basic-selector-option" class="input-hidden" type="radio" onChange={() => setTrainingMode('basic')} checked={trainingMode === 'basic'} value="basic"
                        />
                    <label for="basic-selector-option">
                        <p>Basic</p>
                    </label>
                    <input 
                        id="advanced-selector-option" class="input-hidden" type="radio" onChange={() => setTrainingMode('advanced')} checked={trainingMode === 'advanced'} value="advanced"
                        />
                    <label for="advanced-selector-option">
                        <p>Advanced</p>
                    </label>
                    </div>
                </div>
                {trainingMode=='basic' &&
                <div>
                <img src={IconBasic} className="mode-selector-icon"/>
                <p>Now, sit and relax... we'll take it from here!<br/>
                Our algorithm generates and compares the models, then gives you the best one!</p>
                </div>}
                {trainingMode=='advanced' &&
                <div>
                <img src={IconAdvanced} className="mode-selector-icon"/>
                <p>Customize the training the way you want!<br/>
                Choose the network type and build the structure that generate your model.</p>
                </div>}
          </div>}
          {(step==0 && trainingMode=='basic') && <button className='btn btn-primary' style={buttonStyle}>Start training</button>}
          {(step==0 && trainingMode=='advanced') && <button className='btn btn-primary' style={buttonStyle} onClick={() => setStep(step+1)}>Next</button>}
          
          {step==1 && 
          <div class = "mode-selector">
          <h3 style={{"font-size":"1em"}}><strong>Pick a network type</strong></h3>
          <p style={{"font-size":"1em"}}>We'll prepare what's best for your selected network.</p>
          <div id="mode-selector-switch">
              <div id="mode-selector-option">
              <input 
                  id="mlp-selector-option" class="input-hidden" type="radio" onChange={() => setNetworkType('MLP')} checked={networkType === 'MLP'} value="MLP"
                  />
              <label for="mlp-selector-option">
                  <p>Multilayer Perceptrons</p>
              </label>
              <input 
                  id="cnn-selector-option" class="input-hidden" type="radio" onChange={() => setNetworkType('CNN')} checked={networkType === 'CNN'} value="CNN"
                  />
              <label for="cnn-selector-option">
                  <p>Convolutional Neural Network</p>
              </label>
              <input 
                  id="lstm-selector-option" class="input-hidden" type="radio" onChange={() => setNetworkType('LSTM')} checked={networkType === 'LSTM'} value="LSTM"
                  />
              <label for="lstm-selector-option">
                  <p>Long Short-term Memory</p>
              </label>
              </div>
          </div>
          {networkType=='MLP' &&
          <div>
            <img src={IconMLP} className="mode-selector-icon"/>
            <p>Multilayer Perceptrons uses fully-connected layers<br/> that consist of multiple nodes with binary classifiers.</p>
          </div>}
          {networkType=='CNN' &&
          <div>
            <img src={IconCNN} className="mode-selector-icon"/>
            <p>Convolutional Neural Network applies convolutional preprocessing to <br/>compress input nodes before generating fully-connected layers.</p>
          </div>}
          {networkType=='LSTM' &&
          <div>
            <img src={IconLSTM} className="mode-selector-icon"/>
            <p>Long Short-term Memory is a time-series processing algorithm, <br/>composed from cells that regulate the flow of information.</p>
          </div>}
          </div>}
          {step==1 && <button className='btn btn-secondary' style={changeButtonStyle} onClick={() => setStep(step-1)}>Back</button>}
          {step==1 && <Link to='/networksettings' ><button className='btn btn-primary' style={buttonStyle}>Build network</button></Link>}
        </Container>
      );
  }
  
  const buttonStyle = {
    margin : '10px 10px 10px 0px',
    position : 'absolute',
    bottom : '20px',
    right:'10px'
  }
  
  const changeButtonStyle = {
    margin : '10px 10px 10px 0px',
    position : 'absolute',
    bottom : '20px',
    right:'150px'
  }
  
  export default SessionTraining;