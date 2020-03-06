import React, {useState, Component} from 'react';  
import 'react-bootstrap';

/* Import Components */ 
import DenseLayer from '../components/DenseLayer';
import Input from '../components/Input';  
import Select from '../components/Select';
import Button from '../components/Button';
import {Container} from 'react-bootstrap';
import { isElementOfType } from 'react-dom/test-utils';

const FormContainerNew = () => {
    /// Network Type
    const [networkState, setNetworkState] = useState({
        network: ''
    });
    const handleNetworkChange = (e) => setNetworkState(e.target.value);
    // function handleNetworkChange(e){
    //     setNetworkState(e.target.value);
    //  };

    /// New Layer
    const newLayer =  {type:'',
            nodes:'',
            kernel:'',
            bias:'',
            activation:''};
    const [layerState, setLayerState] = useState([
        {...newLayer},]);
    const addLayer = () => {
            setLayerState([...layerState, { ...newLayer }]);
        };
    const handleLayerChange = (e) => {
            const updatedLayers = [...layerState];
            updatedLayers[e.target.dataset.idx][e.target.className] = e.target.value;
            setLayerState(updatedLayers);
        };
    
    /// Submit Form
    function handleFormSubmit(e){
        e.preventDefault();
        let layerList = layerState;
        console.log(layerList);
        window.alert(JSON.stringify(layerList, 0, 2))
      };

    return (
      <div>
      <form className="container" onSubmit = {handleFormSubmit}>
        <Container style={{marginTop: '30px', width:'40%', border: '1px solid #ccc', padding: '20px', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)'}}>
        
        {/* Network Type */}
        <div className="form-group row">
            <label className="form-label col-sm-4">Network Type</label>
            <div className="col-sm-8">
            <select onChange={handleNetworkChange} value={networkState}>
                <option value="mlp">Multi Layer Perceptors</option>
                <option value="cnn">Convolutional Neural Network</option>
                <option value="lstm">Long Short-Term Memory</option>
            </select>
            </div>
        </div>
        <div className="form-group-row">
        {
            layerState.map((val, idx) => (
            <DenseLayer 
                key={`layer-${idx}`}
                idx={idx}
                layerState={layerState}
                handleLayerChange={handleLayerChange}
                />
            ))
        }
        </div>
        <Button 
            action = {addLayer}
            type = {'primary'} 
            title = {'Add New Layer'} 
            style = {buttonStyle}
            /> { /*Submit */ }
        

        <Button 
            action = {handleFormSubmit}
            type = {'primary'} 
            title = {'Submit'} 
            style = {buttonStyle}
            /> { /*Submit */ }  
        </Container>
      </form>
      </div>
    );
  }

const buttonStyle = {
    margin : '10px 10px 10px 0px'
  }

export default FormContainerNew;