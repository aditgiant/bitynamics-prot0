import React, {useState} from 'react';
import '../App.css';
import DragDrop from '../components/DragDrop';
import DataPreprocessor from '../components/DataPreprocessor'  
import {Container, Row, Col} from 'react-bootstrap';

function CSVupload() {
      const [step, setStep]= useState(0);
      return (
        <Container id="home-container">
          {step==0 && <DragDrop/>}
          {step==0 && <button className='btn btn-primary' style={buttonStyle} onClick={() => setStep(step+1)}>Next</button>}
          {step==1 && <DataPreprocessor/>}
          {step==1 && <button className='btn btn-secondary' style={changeButtonStyle} onClick={() => setStep(step-1)}>Back</button>}
          {step==1 && <button className='btn btn-primary' style={buttonStyle}>Use dataset</button>}
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
  
  export default CSVupload;