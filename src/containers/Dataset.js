import React, {Component, useState} from 'react';
import '../App.css';
import fire from '../Fire';
import Nav from '../Nav'
import SideBar from '../sideBar/sideBar';
import DragDrop from '../components/DragDrop';
import DataPreprocessor from '../components/DataPreprocessor';
import DataPreprocessed from '../components/DataPreprocessed';  
import {Container, Row, Col} from 'react-bootstrap';

class Dataset extends Component {
  constructor(props) {
    super(props);
    this.ref = fire.firestore().collection('projects');
    this.unsubscribe = null;
    this.state = {
        id:this.props.match.params.id,
        step:0,
        csvDatasetLinkPrep:'',
    };
    this.nextStep = this.nextStep.bind(this);
    this.previousStep = this.previousStep.bind(this);
    this.editDataset = this.editDataset.bind(this);
  } 
  
  componentDidMount() {
    console.log("componentDidMount: Dataset")
    console.log('Read Dataset with this project ID: '+this.state.id);
    const ref = fire.firestore().collection('projects').doc(this.state.id).collection('csvDataset').doc('preprocessor');
    ref.get().then((doc) => {
      if (doc.exists) {
        console.log("componentDidMount: Dataset-success");
        const board = doc.data();
        this.setState({ ...this.state,
          csvDatasetLinkPrep : board.csvDatasetLinkPrep});
        console.log("componentDidMount: "+this.state.csvDatasetLinkPrep);
        if (this.state.csvDatasetLinkPrep != '') {
          this.setState({ ...this.state,
            step : 2}
          )
      }
      } else {
        console.log("No such document!");
      }
    });
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

  editDataset(){
    this.setState({ ...this.state,
      step : 1})
  }

  render() {
      console.log(this.state.id)
      return (
        <div>
        <Container id="home-container">
          {this.state.step==0 && <DragDrop id={this.state.id}/>}
          {/* Since the following line has the same condition, merge with previous line */}
          {this.state.step==0 && <button className='btn btn-primary' style={buttonStyle} onClick={this.nextStep}>Choose Dataset</button>}
          {/* 3. Add function to Add New Collection 'preprocessing' + Load from existing collection 'preprocessing' */}
          {this.state.step==1 && <DataPreprocessor id={this.state.id}/>}
          {this.state.step==1 && <button className='btn btn-secondary' style={changeButtonStyle} onClick={this.previousStep}>Change Dataset</button>}
          {this.state.step==1 && <button className='btn btn-primary' style={buttonStyle} onClick={this.nextStep}>Use dataset</button>}
          {this.state.step==2 && <DataPreprocessed id={this.state.id}/>}
          {this.state.step==2 && <button className='btn btn-secondary' style={changeButtonStyle} onClick={this.editDataset}>Edit Dataset</button>}
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
  
  export default Dataset;