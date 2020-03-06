import React from 'react';
import {Container} from 'react-bootstrap'
import PropTypes from 'prop-types';

const DenseLayer = ({ idx, layerState, handleLayerChange }) => {
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
    return (
        <Container style={{marginTop: '30px', width:'80%', border: '1px solid #ccc', padding: '10px', boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.3)'}} key={`layer-${idx}`}>
        {/* Layer Type */}
            <div className="form-group row">
            <label className="form-label col-sm-4" htmlFor={typeId}>{`Layer #${idx + 1}`}</label>
            <div className="col-sm-8">
                <select onChange={handleLayerChange}
                        name={typeId}
                        data-idx={idx}
                        id={typeId}
                        className="type"
                        value={layerState[idx].type}>
                    <option value="dense">Dense Layer</option>
                    <option value="conv">Convolutional Layer</option>
                    <option value="lstml">LSTM Layer</option>
                </select>
             </div>
            </div>
        {/* Number of Nodes */}
        <div className="form-group row">
            <label className="form-label col-sm-4" htmlFor={nodesId}>Nodes</label>
            <div className="col-sm-8">
                <input onChange={handleLayerChange}
                        type="number"
                        name={nodesId}
                        data-idx={idx}
                        id={nodesId}
                        className="nodes"
                        value={layerState[idx].nodes}
                />
             </div>
            </div>
          {/* <label htmlFor={typeId}>{'Dense Layer #${idx + 1}'}</label>
          <input
            type="text"
            name={layerId}
            data-idx={idx}
            id={catId}
            className="name" 
          />
          <label htmlFor={ageId}>Age</label>
          <input
            type="text"
            name={ageId}
            data-idx={idx}
            id={ageId}
            className="age"
          /> */}
        </Container>
      ); 
 };

DenseLayer.propTypes = {
    idx: PropTypes.number,
    layerState: PropTypes.array,
    handleLayerChange: PropTypes.func,
};

export default DenseLayer;
