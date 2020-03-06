import React, {Component} from 'react';  
import 'react-bootstrap';

/* Import Components */ 
import Input from '../components/Input';  
import Select from '../components/Select';
import Button from '../components/Button';
import {Container, Row, Col} from 'react-bootstrap'
import { isElementOfType } from 'react-dom/test-utils';

class FormContainer extends Component {  
  constructor(props) {
    super(props);

    this.state = {
      newTraining: {
        output:'',
        network:'',
        epochs: '',
        numlayers: '',
        learningrate: '',
        batchsize: '',
        optimizer: '',
        dropout:'',
        mlpnodes:'',
        cnndenselayers: '',
        cnnsizelayers:''
      },

      outputOptions: ['Classification', 'Regression'],
      networkOptions: ['MLP', 'CNN', 'LSTM'],
      optimizerOptions: ['Adam', 'SGD', 'RMSPROP']

    }
    this.handleMLPNodes = this.handleMLPNodes.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleNetwork = this.handleNetwork.bind(this);
    this.handleCNNDenseLayers = this.handleCNNDenseLayers.bind(this);
    this.handleCNNSizeLayers = this.handleCNNSizeLayers.bind(this);
  }

  /* This life cycle hook gets executed when the component mounts */

  handleFormSubmit(e) {
    e.preventDefault();
    let trainingData = this.state.newTraining;
    window.alert(JSON.stringify(trainingData, 0, 2))
    fetch('/addtraining',{
        method: "POST",
        body: JSON.stringify(trainingData),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(response => {
        response.json().then(data =>{
          console.log("Successful" + data);
        })
    })
  }   
  
  handleClearForm(e) {
  
    e.preventDefault();
    this.setState({ 
        newTraining: {
            output:'',
            network:'',
            epochs: '',
            numlayers: '',
            learningrate: '',
            batchsize: '',
            optimizer: '',
            dropout:'',
            mlpnodes:'',
            cnndenselayers: '',
            cnnsizelayers:''},
    })
}
  handleInput(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState( prevState => ({ newTraining : 
     {...prevState.newTraining, [name]: value
     }
     }), () => console.log(this.state.newTraining))
}

  handleNetwork(e) {
  let value = e.target.value;
  if (value == 'MLP') {
  this.setState( prevState => ({ newTraining : 
      {...prevState.newTraining, network: value, cnndenselayers : '', cnnsizelayers : ''
      }
    }), () => console.log(this.state.newTraining))
  } else if (value == 'CNN') {
    this.setState( prevState => ({ newTraining : 
      {...prevState.newTraining, network: value, mlpnodes : ''
      }
    }), () => console.log(this.state.newTraining))
  } else {
    this.setState( prevState => ({ newTraining : 
      {...prevState.newTraining, network: value
      }
    }), () => console.log(this.state.newTraining))
  }
}  

  handleMLPNodes(e) {
    let value = e.target.value;
    this.setState( prevState => ({ newTraining : 
        {...prevState.newTraining, mlpnodes: value
        }
      }), () => console.log(this.state.newTraining))
  }

  handleCNNDenseLayers(e){
    let value = e.target.value;
    this.setState( prevState => ({ newTraining : 
        {...prevState.newTraining, mlpnodes: '', cnndenselayers : value
        }
      }), () => console.log(this.state.newTraining))
  }

  handleCNNSizeLayers(e){
    let value = e.target.value;
    this.setState( prevState => ({ newTraining : 
        {...prevState.newTraining, mlpnodes: '', cnnsizelayers : value
        }
      }), () => console.log(this.state.newTraining))
  }

  render() {
    // function isMLP(e) {
    //   if (e = 'MLP') {
    //     return <Input inputType={'number'} 
    //           name={'mlpnodes'}
    //           title= {'Number of Nodes'} 
    //           value={this.state.newTraining.mlpnodes} 
    //           placeholder = {'Insert integer >=1'}
    //           handleChange={this.handleInput}
    //           required
    //           />
    //   }
    // }
    return (
      <div>
      <form className="container" onSubmit={this.handleFormSubmit}>
        <Container style={{marginTop: '30px', width:'40%', border: '1px solid #ccc', padding: '20px', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)'}}>
        <Select title={'Output Type'}
                name={'output'}
                options = {this.state.outputOptions} 
                value = {this.state.newTraining.output}
                placeholder = {'Select type'}
                handleChange = {this.handleInput}
                required
                /> {/* Output Selection */}
        <Select title={'Network Type'}
                name={'network'}
                options = {this.state.networkOptions} 
                value = {this.state.newTraining.network}
                placeholder = {'Select type'}
                handleChange = {this.handleNetwork}
                required
                /> {/* Network Selection */}
        <Input inputType={'number'} 
                name={'epochs'}
                title= {'Number of Epochs'} 
                value={this.state.newTraining.epochs} 
                placeholder = {'Insert integer >=1'}
                handleChange={this.handleInput}
                required
                /> {/* Number of Epochs */}
        <Input inputType={'number'} 
                name={'numlayers'}
                title= {'Number of Layers'} 
                value={this.state.newTraining.numlayers} 
                placeholder = {'Insert integer >=1'}
                handleChange={this.handleInput}
                required
                /> {/* Number of Layers */}
        <Input inputType={'number'} 
                name={'learningrate'}
                title= {'Learning Rate'} 
                value={this.state.newTraining.learningrate} 
                placeholder = {'Insert integer >=1'}
                handleChange={this.handleInput}
                required
                /> {/* Learning Rate */}
        <Input inputType={'number'} 
                name={'batchsize'}
                title= {'Batch Size'} 
                value={this.state.newTraining.batchsize} 
                placeholder = {'Insert integer >=1'}
                handleChange={this.handleInput}
                required
                /> {/* Batch Size */}
        <Select title={'Optimizer'}
                name={'optimizer'}
                options = {this.state.optimizerOptions} 
                value = {this.state.newTraining.optimizer}
                placeholder = {'Select type'}
                handleChange = {this.handleInput}
                required
                /> {/* Optimizer*/}
        <Input inputType={'number'} 
                name={'dropout'}
                title= {'Dropout'} 
                value={this.state.newTraining.dropout} 
                placeholder = {'Insert integer >=1'}
                handleChange={this.handleInput}
                required
                /> {/* Dropout */}
        {this.state.newTraining.network === 'MLP' && (
        <Input inputType={'number'} 
                name={'mlpnodes'}
                title= {'Number of Nodes'} 
                value={this.state.newTraining.mlpnodes} 
                placeholder = {'Insert integer >=1'}
                handleChange={this.handleMLPNodes}
                required
                />)}
        {this.state.newTraining.network === 'CNN' && (
        <Input inputType={'number'} 
                name={'cnndenselayers'}
                title= {'Dense of Layers'} 
                value={this.state.newTraining.cnndenselayers} 
                placeholder = {'Insert integer >=1'}
                handleChange={this.handleCNNDenseLayers}
                required
                />)}
        {this.state.newTraining.network === 'CNN' && (
        <Input inputType={'number'} 
                name={'cnnsizelayers'}
                title= {'Size of Layers'} 
                value={this.state.newTraining.cnnsizelayers} 
                placeholder = {'Insert integer >=1'}
                handleChange={this.handleCNNSizeLayers}
                required
                />)}
        {/* {isMLP(this.state.newTraining.network)} */}
        <Button 
            action = {this.handleFormSubmit}
            type = {'primary'} 
            title = {'Submit'} 
            style = {buttonStyle}
            /> { /*Submit */ }  
        <Button 
            action = {this.handleClearForm}
            type = {'secondary'}
            title = {'Clear'}
            style ={buttonStyle}
            /> {/* Clear the form */}
        </Container>
      </form>
      </div>
    );
  }
}

{/* function isMLP(e) {
  if (e = 'MLP') {
    return <Input inputType={'number'} 
          name={'mlpnodes'}
          title= {'Number of Nodes'} 
          value={this.state.newTraining.mlpnodes} 
          placeholder = {'Insert integer >=1'}
          handleChange={this.handleInput}
          required
          />
  }
} */}

const buttonStyle = {
    margin : '10px 10px 10px 0px'
  }

export default FormContainer;