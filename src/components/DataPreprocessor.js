import React, {Component} from 'react';  
import 'react-bootstrap';
import Collapse from 'react-bootstrap/Collapse';
import fire from '../Fire';

class DataPreprocessor extends Component {  
    constructor(props) {
        super(props);
    
        this.state = {
          id:this.props.id,
          open:
            {
            advanced:false
          },
          newDataset: {
            csvDatasetName:'',
            csvDatasetLink:'',
            header:false,
            missingEncoded:'',
            removeMissingData:true,
            featuresPerTime:'',
            imageDimensionW:'',
            imageDimensionH:'',
            multipleOutputs:'1',
            featureSelection:false,
            normalization:false,
          }}
        this.handleDatasetParameter = this.handleDatasetParameter.bind(this);
        this.handleDatasetChecklist = this.handleDatasetChecklist.bind(this);
        this.handleCollapsible = this.handleCollapsible.bind(this);
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
          }
        });
      console.log("componentDidMount");
      }

      handleDatasetParameter(e) {
        let value = e.target.value;
        let name = e.target.name;
        this.setState( prevState => ({ newDataset : 
         {...prevState.newDataset, [name]: value
         }
         }), () => console.log(this.state.newDataset))
    }

    handleDatasetChecklist(e) {
      let value = e.target.checked;
      let name = e.target.name;
      this.setState( prevState => ({ newDataset : 
       {...prevState.newDataset, [name]: value
       }
       }), () => console.log(this.state.newDataset))
      }
    handleCollapsible() {
      console.log(this.state.open.advanced);
      this.setState(prevState => 
        ({open :
           {...prevState.open, advanced: !prevState.open.advanced}}), 
           () => console.log(this.state.open.advanced))
    }

  render() {
    return (
      <div>
      <form onSubmit={this.handleFormSubmit}>
      <h1>{this.state.id}</h1>
        <div id="dataset-name" className="form-group row">
        <label for={'dataset-name'} className="form-label col-sm-3">Name</label>
                <div className="col-sm-6">
                  <input
                    className="form-control"
                    id={'dataset-name'}
                    name={'csvDatasetName'}
                    type="string"
                    value={this.state.newDataset.csvDatasetName} 
                    onChange={this.handleDatasetParameter}
                    placeholder="This cannot be empty"
                    />
                </div>
        </div>
        
        <div id="dataset-header" className="form-group row" >
        <label for={'header'} className="form-label col-sm-3">First row as header</label>
                <div className="col-sm-6">
                  <input
                    id={'header'}
                    name={'header'}
                    type="checkbox"
                    checked={this.state.newDataset.header} 
                    // value={this.state.newDataset.header} 
                    onChange={this.handleDatasetChecklist}
                    />
                </div>
        </div>

        <div id="dataset-missing-encoded" className="form-group row">
                <label for={'missingEncoded'} className="form-label col-sm-3">Missing values encoded</label>
                <div className="col-sm-6">
                  <input
                    className="form-control"
                    id={'missingEncoded'}
                    name={'missingEncoded'}
                    type="string"
                    value={this.state.newDataset.missingEncoded} 
                    onChange={this.handleDatasetParameter}
                    placeholder="Type letters or numbers"
                    />
                </div>
              </div>

        <div id="dataset-remove-missing" className="form-group row">
                <label for={'removeMissingData'} className="form-label col-sm-3">Remove missing data</label>
                <div className="col-sm-6">
                  <input
                    id={'removeMissingData'}
                    name={'removeMissingData'}
                    type="checkbox"
                    checked={this.state.newDataset.removeMissingData} 
                    // value={this.state.newDataset.removeMissingData} 
                    onChange={this.handleDatasetChecklist}
                    />
                </div>
        </div>

        <div id="dataset-features-pertime" className="form-group row">
                <label for={'featuresPerTime'} className="form-label col-sm-3">Number of features</label>
                <div className="col-sm-6">
                  <input
                    className="form-control"
                    id={'featuresPerTime'}
                    name={'featuresPerTime'}
                    type="integer"
                    value={this.state.newDataset.featuresPerTime} 
                    onChange={this.handleDatasetParameter}
                    placeholder="Type numbers"
                    />
                </div>
        </div>

        <div id="dataset-image-dimension" className="form-group row">
                <label className="form-label col-sm-3">Image dimension</label>
                <div className="col-sm-6">
                  <label className="form-label col-sm-1">Width</label>
                  <div className="col-sm-4">
                  <input
                    className="form-control"
                    id={'imageDimensionW'}
                    name={'imageDimensionW'}
                    type="integer"
                    value={this.state.newDataset.imageDimensionW} 
                    onChange={this.handleDatasetParameter}
                    placeholder="pixels"
                    />
                  </div>
                  <label className="form-label col-sm-1">Height</label>
                  <div className="col-sm-4">
                  <input
                    className="form-control"
                    id={'imageDimensionH'}
                    name={'imageDimensionH'}
                    type="integer"
                    value={this.state.newDataset.imageDimensionH} 
                    onChange={this.handleDatasetParameter}
                    placeholder="pixels"
                    />
                  </div>  
                </div>
        </div>
        
        <button type='button' className='btn btn-secondary'
                onClick = {this.handleCollapsible}>Advanced settings</button>


        <Collapse in={this.state.open.advanced}>
        <div>
        <div id="dataset-multiple-outputs" className="form-group row">
                <label for={'multipleOutputs'} className="form-label col-sm-3">Number of outputs</label>
                <div className="col-sm-6">
                  <input
                    className="form-control"
                    id={'multipleOutputs'}
                    name={'multipleOutputs'}
                    type="integer"
                    value={this.state.newDataset.multipleOutputs} 
                    onChange={this.handleDatasetParameter}
                    placeholder="Type numbers"
                    />
                </div>
        </div>

        <div id="dataset-feature-selection" className="form-group row">
                <label for={'featureSelection'} className="form-label col-sm-3">Feature selection</label>
                <div className="col-sm-6">
                <input
                    id={'featureSelection'}
                    name={'featureSelection'}
                    type="checkbox"
                    checked={this.state.newDataset.featureSelection} 
                    // value={this.state.newDataset.removeMissingData} 
                    onChange={this.handleDatasetChecklist}
                    />
                </div>
        </div>

        <div id="dataset-normalization" className="form-group row">
                <label for={'normalization'} className="form-label col-sm-3">Normalization</label>
                <div className="col-sm-6">
                <input
                    id={'normalization'}
                    name={'normalization'}
                    type="checkbox"
                    checked={this.state.newDataset.normalization} 
                    // value={this.state.newDataset.removeMissingData} 
                    onChange={this.handleDatasetChecklist}
                    />
                </div>
        </div>
        </div>
        </Collapse>
      </form>
      </div>
    );
  }
}


const buttonStyle = {
    margin : '10px 10px 10px 0px'
  }

export default DataPreprocessor;