import React, {useState} from 'react';
import Collapse from 'react-bootstrap/Collapse'
import {Container, Button} from 'react-bootstrap'
import PropTypes from 'prop-types';

const DenseLayer = ({ idx, layerState, networkState, handleLayerChange }) => {
    //   Declare Layer Type
    // const [typeState, setTypeState] = useState({
    //     type: ''
    // });
    // function handleTypeChange(e){
    //     setTypeState(e.target.value);
    // };

    //   Declare Layer Parameters
    //   Only Dense Layers (Temporary)
    const typeId = `type-${idx}`;
    const nodesId = `nodes-${idx}`;
    const kernelId = `kernel-${idx}`;
    const biasId = `bias-${idx}`;
    const activationId =`activation-${idx}`;

    // Collapse Layer
    const [open, setOpen] = useState(false);

    return (
        <Container style={{marginTop: '10px', width:'100%', border: '1px solid #ccc', padding: '10px', boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.3)'}} key={`layer-${idx}`}>
        {/* Collapse Button */}
        <Button
          onClick={() => setOpen(!open)}
          aria-controls="layerparameters"
          aria-expanded={open}>
          {`Layer #${idx + 1}`}
        </Button>
        <Collapse in={open}>
        {/* Layer Type */}
        <div id="layerparameters" style={{marginTop: '10px'}}>
            <div className="form-group row">
            <label className="form-label col-sm-6" htmlFor={typeId}>Layer Type</label>
            <div className="col-sm-6">
                <select onChange={handleLayerChange}
                        name={typeId}
                        data-idx={idx}
                        id={typeId}
                        className="type"
                        value={layerState[idx].type}>
                    <option value="dense">Dense Layer</option>
                    {networkState === "cnn" && (<option value="conv">Convolutional Layer</option>)}
                    {networkState === "lstm" && (<option value="lstml">LSTM Layer</option>)}
                    <option value="drop">Dropout Layer</option>
                </select>
             </div>
            </div>
        {/* MLP - Number of Nodes */}
        {layerState[idx].type === "dense" && (
        <div className="form-group row">
            <label className="form-label col-sm-6" htmlFor={nodesId}>Number of Nodes</label>
            <div className="col-sm-6">
                <input onChange={handleLayerChange}
                        type="number"
                        name={nodesId}
                        data-idx={idx}
                        id={nodesId}
                        className="nodes"
                        value={layerState[idx].nodes}
                />
             </div>
        </div>)}
        {/* CNN - Number of Filters */}
        {layerState[idx].type === "conv" && (
        <div className="form-group row">
            <label className="form-label col-sm-6" htmlFor={nodesId}>Number of Filters</label>
            <div className="col-sm-6">
                <input onChange={handleLayerChange}
                        type="number"
                        name={nodesId}
                        data-idx={idx}
                        id={nodesId}
                        className="nodes"
                        value={layerState[idx].nodes}
                />
             </div>
        </div>)}
        {/* LSTM - Number of Units */}
        {layerState[idx].type === "lstml" && (
        <div className="form-group row">
            <label className="form-label col-sm-6" htmlFor={nodesId}>Number of Units</label>
            <div className="col-sm-6">
                <input onChange={handleLayerChange}
                        type="number"
                        name={nodesId}
                        data-idx={idx}
                        id={nodesId}
                        className="nodes"
                        value={layerState[idx].nodes}
                />
             </div>
        </div>)}
        {/* Dropout - Dropout Rate */}
        {layerState[idx].type === "drop" && (
        <div className="form-group row">
            <label className="form-label col-sm-6" htmlFor={nodesId}>Dropout Rate</label>
            <div className="col-sm-6">
                <input onChange={handleLayerChange}
                        type="number"
                        name={nodesId}
                        data-idx={idx}
                        id={nodesId}
                        className="nodes"
                        value={layerState[idx].nodes}
                />
             </div>
        </div>)}
        {/* Continue */}
        </div>
          </Collapse>
        </Container>
      ); 
 };

DenseLayer.propTypes = {
    idx: PropTypes.number,
    layerState: PropTypes.array,
    handleLayerChange: PropTypes.func,
};

export default DenseLayer;
