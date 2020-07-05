import React, {Component} from 'react';  
import 'react-bootstrap';
import Collapse from 'react-bootstrap/Collapse';
import iconCSV from '../imgsrc/iconCSV.png'
import fire from '../Fire';

class DataPreprocessed extends Component {  
    constructor(props) {
        super(props);
    
        this.state = {
          id:this.props.id,
          newDataset: {
            csvDatasetName:'',
            csvDatasetLink:'',
          }}
      }

    componentDidMount() {
        const ref = fire.firestore().collection('projects').doc(this.state.id).collection('csvDataset').doc('preprocessor');;
        ref.get().then((doc) => {
          if (doc.exists) {
            console.log("componentDidMount-success");
            const board = doc.data();
            this.setState({ ...this.state, newDataset : {
              csvDatasetName : board.csvDatasetName,
              csvDatasetLink : board.csvDatasetLink
            }});
          } else {
            console.log("No such document!");
            console.log("props.id "+this.props.id);
            console.log("state.id "+this.state.id)
          }
        });
    console.log("componentDidMount");
    }

  render() {
    console.log(this.state);
    return (
      <div style={{'height':'100%','display': 'flex', 'align-items': 'center', 'justify-content': 'center'}}>
          <div>
          <img style={{'maxHeight':'50px'}}src={iconCSV}/>
          <h3 style={{"font-size":"1em", "color":"#09D48B"}}><strong>Dataset is ready!</strong></h3>
          <h4>{this.state.newDataset.csvDatasetName}</h4>
          <p>is selected for this project.</p>
          </div>
      </div>
    );
  }
}


const buttonStyle = {
    margin : '10px 10px 10px 0px'
  }

export default DataPreprocessed;