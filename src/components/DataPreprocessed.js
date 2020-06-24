import React, {Component} from 'react';  
import 'react-bootstrap';
import Collapse from 'react-bootstrap/Collapse';
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
        const ref = fire.firestore().collection('projects').doc(this.state.id);
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
    return (
      <div>
          <h4>props.id {this.props.id}</h4>
          <h4>{this.state.newDataset.csvDatasetName}</h4>
          <p>{this.state.newDataset.csvDatasetLink}</p>
      </div>
    );
  }
}


const buttonStyle = {
    margin : '10px 10px 10px 0px'
  }

export default DataPreprocessed;