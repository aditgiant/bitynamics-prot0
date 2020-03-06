import React, {Component} from 'react';  
/* Import Components */
import CSVReader from 'react-csv-reader'
import Button from '../components/Button';
import {Container, Row, Col} from 'react-bootstrap'

class CSVupload extends Component {  
    constructor(props) {
      super(props);
  
      this.state = {
        newData: {
          csvfiles:''
        }}
      this.handleCSVFile = this.handleCSVFile.bind(this);
    }
  
    /* This life cycle hook gets executed when the component mounts */
    handleCSVFile(e){
    }
  
    render() {
      return (
        <Container style={{marginTop: '30px', width:'40%', border: '1px solid #ccc', padding: '20px', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)' }}>
          <CSVReader
                  cssClass="csv-reader-input"
                  label="Upload .csv file as input"
                  onFileLoaded={this.handleCSVFile}
                  // onError={this.handleDarkSideForce}
                  inputId="TrainingData"
                  inputStyle={{margin: '0px 0px 15px 0px' }}
                  />
        </Container>
      );
    }
  }
  
  export default CSVupload;