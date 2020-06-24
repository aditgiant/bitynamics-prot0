import React, {Component, useState} from 'react';
import '../App.css';
import fire from '../Fire';
import Nav from '../Nav'
import SideBar from '../sideBar/sideBar';
import DragDrop from '../components/DragDrop';
import DataPreprocessor from '../components/DataPreprocessor';
import DataPreprocessed from '../components/DataPreprocessed';  
import {Container, Row, Col} from 'react-bootstrap';

class CSVupload extends Component {
  constructor(props) {
    super(props);
    this.ref = fire.firestore().collection('projects');
    this.unsubscribe = null;
    this.state = {
        id:'projectnotfound',
        step:0,
        boards: []
    };
    this.nextStep = this.nextStep.bind(this);
    this.previousStep = this.previousStep.bind(this);
    this.removeDataset = this.removeDataset.bind(this);
  } 
  
  componentDidMount() {
    console.log("componentDidMount: Dataset")
    this.setState({ ...this.state,
      id : this.props.match.params.id});
    console.log(this.state.id);
  }    

  nextStep(){
    this.setState(prevState =>{
      return{
           ...prevState,
           step : prevState.step+1
      }
   })
  }

  previousStep(){
    this.setState(prevState =>{
      return{
           ...prevState,
           step : prevState.step-1
      }
   })
  }

  removeDataset(){
    this.setState({ ...this.state,
      step : 0})
  }

  render() {
      console.log(this.state.id)
      return (
        <div>
        <Container id="home-container">
          {this.state.step==0 && <DragDrop id={this.state.id}/>}
          {this.state.step==0 && <button className='btn btn-primary' style={buttonStyle} onClick={this.nextStep}>Next</button>}
          {this.state.step==1 && <DataPreprocessor id={this.state.id}/>}
          {this.state.step==1 && <button className='btn btn-secondary' style={changeButtonStyle} onClick={this.previousStep}>Back</button>}
          {this.state.step==1 && <button className='btn btn-primary' style={buttonStyle} onClick={this.nextStep}>Use dataset</button>}
          {this.state.step==2 && <DataPreprocessed id={this.state.id}/>}
          {this.state.step==2 && <button className='btn btn-secondary' style={changeButtonStyle} onClick={this.removeDataset}>Edit Dataset</button>}
        </Container>
        <SideBar id={this.state.id}/>
        <Nav id={this.state.id}/>
        </div>
      );
  }
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
  
  export default CSVupload;