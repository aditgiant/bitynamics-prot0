import React, {Component, useState} from 'react';
import '../App.css';
import fire from '../Fire';
import Nav from '../Nav'
import SideBar from '../sideBar/sideBar';
import DataSelector from '../components/DataSelector';
import DataPreprocessor from '../components/DataPreprocessor';
import DataPreprocessed from '../components/DataPreprocessed';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {Container, Row, Col} from 'react-bootstrap';

class Dataset extends Component {
  constructor(props) {
    super(props);
    this.ref = fire.firestore().collection('projects');
    this.unsubscribe = null;
    this.state = {
        id:this.props.match.params.id,
        step:0,
        uploadFinish:false,
        csvDatasetLink:'',
        csvDatasetLinkPrep:'',
    };
    this.nextStep = this.nextStep.bind(this);
    this.previousStep = this.previousStep.bind(this);
    this.editDataset = this.editDataset.bind(this);
    this.deleteCsvDataset = this.deleteCsvDataset.bind(this);
    this.isUploadFinish = this.isUploadFinish.bind(this);
  } 
  
  componentDidMount() {
    console.log("componentDidMount: Dataset")
    console.log('Read Dataset with this project ID: '+this.state.id);
    //Check if the project has already been assigned with a dataset
    const ref = fire.firestore().collection('projects').doc(this.state.id).collection('csvDataset').doc('preprocessor');
    ref.get().then((doc) => {
      if (doc.exists) {
        console.log("componentDidMount: Dataset-success");
        const board = doc.data();
        this.setState({ ...this.state,
          csvDatasetLink : board.csvDatasetLink,
          csvDatasetLinkPrep : board.csvDatasetLinkPrep});
        console.log("componentDidMount: "+this.state.csvDatasetLinkPrep);
        if (this.state.csvDatasetLink != '') {
          this.setState({ ...this.state,
            step : 1}
          )
          if (this.state.csvDatasetLinkPrep != '') {
            this.setState({ ...this.state,
              step : 2}
            )
      }}} else {
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

  isUploadFinish(){
    this.setState(prevState =>{
      return{
           ...prevState,
           uploadFinish : true
      }
   })
  }

  //Delete preprocessor content
  deleteCsvDataset () {
    const ref = fire.firestore().collection('projects').doc(this.state.id).collection('csvDataset').doc('preprocessor');
    confirmAlert({
      title: 'Current dataset will be removed.',
      message: 'Are you sure to do this?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => 
            {ref.delete()
            .then(() => {
              console.log("Dataset successfully deleted!");
              this.setState ({...this.state,
                uploadFinish : false})
              this.previousStep();
              })
            .catch((error) => {
              console.error("Error deleting dataset: ", error);
            });
            }
        },
        {
          label: 'No',
          onClick: () => console.log('Click No')
        }
      ]
    })     
  }

  render() {
      console.log(this.state.csvDatasetLink)
      return (
        <div>
        <Container id="home-container">
          {this.state.step==0 && <DataSelector id={this.state.id} isUploadFinish={this.isUploadFinish}/>}
          {(this.state.step==0 && this.state.uploadFinish == true) && <button className='btn btn-primary' style={buttonStyle} onClick={this.nextStep}>Next&nbsp;&gt;</button>}
          {(this.state.step==0 && this.state.uploadFinish == false) && <button className='btn btn-primary' style={inactiveButtonStyle}>Next&nbsp;&gt;</button>}
          {this.state.step==1 && <DataPreprocessor id={this.state.id} nextStep={this.nextStep}/>}
          {this.state.step==1 && <button className='btn btn-secondary' style={changeButtonStyle} onClick={this.deleteCsvDataset}>&lt;&nbsp;Back</button>}
          {/* {this.state.step==1 && <button className='btn btn-primary' style={buttonStyle} onClick={this.nextStep}>Next&nbsp;&gt;</button>} */}
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

  const inactiveButtonStyle = {
    opacity : '0.25',
    margin : '10px 10px 10px 0px',
    position : 'absolute',
    bottom : '20px',
    right:'10px',
  }
  
  const changeButtonStyle = {
    margin : '10px 10px 10px 0px',
    position : 'absolute',
    bottom : '20px',
    left:'20px'
  }
  
  
  export default Dataset;