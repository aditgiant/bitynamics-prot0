import React from 'react';
import {Link} from 'react-router-dom';
import * as ROUTES from '../ROUTES';
import {connect} from 'react-redux';
import LossCharts from '../components/charts/LossCharts';
import AccuracyCharts from '../components/charts/AccuracyCharts';
import {Container} from 'react-bootstrap';
import SideBar from '../sideBar/sideBar';
import Nav from '../Nav';

const ComparedModels = (props) => {
  const train_models = props.models.models;
  const sessionId = props.match.params.id;
  console.log(JSON.parse(localStorage.getItem('selectedmodels')));
  // const selectedModels = props.models.selectedModels;
  const selectedModels = JSON.parse(localStorage.getItem('selectedmodels'));

  const getModelData = (id) => {
    return train_models.filter((train_model) => train_model.id == id);
  };

  const getParam = (models) => {
    return models.param;
  };

  const getMaxAccuracyTraining = (models) => {
    return Math.max(...models.training.metric);
  };
  const getMaxLossTraining = (models) => {
    return Math.max(...models.training.loss);
  };

  const getMaxAccuracyValidation = (models) => {
    return Math.max(...models.training.val_metric);
  };
  const getMaxLossValidation = (models) => {
    return Math.max(...models.training.val_loss);
  };

  const renderAccuracy = (result) => {
    return (
      <AccuracyCharts
        accuracy={result.training.metric}
        val_accuracy={result.training.val_metric}></AccuracyCharts>
    );
  };

  const renderLoss = (result) => {
    return (
      <LossCharts
        loss={result.training.loss}
        val_loss={result.training.val_loss}
        epochs={result.training.epochs}
      />
    );
  };

  return (
    <div>
      <Container id="models-container">
        <div className="compared-model-header mt-5">MODEL COMPARISON</div>
        <Link to={`/sessionmodel/${sessionId}`}>
          <i class="fas fa-angle-left mr-2"></i>
          <span> Back to Top Models</span>
        </Link>
        <table id="comparison-models" className="mt-3">
          <tr>
            <th>
              <div className="table-header">Parameters</div>
            </th>

            {selectedModels.map((id) => (
              <th>
                <div className="table-header"> Model {id}</div>
                {getModelData(id).map((result) => (
                  <div className="">
                    {(result.mean_val_metric * 100).toFixed(2)}%
                  </div>
                ))}
                <Link to={`/models/${id}`}>
                  <button type="button" className="btn btn-detail">
                    Details
                  </button>
                </Link>

                <button className="btn btn-yellow" type="button">
                  Export Model
                </button>
              </th>
            ))}
          </tr>

          <tr>
            <td>Training Accuracy</td>
            {selectedModels.map((id) => (
              <>
                {getModelData(id).map((result) => (
                  <td> {getMaxAccuracyTraining(result).toFixed(2) * 100}%</td>
                ))}
              </>
            ))}
          </tr>
          <tr>
            <td>Training Loss</td>
            {selectedModels.map((id) => (
              <>
                {getModelData(id).map((result) => (
                  <td> {getMaxLossTraining(result).toFixed(2)}</td>
                ))}
              </>
            ))}
          </tr>
          <tr>
            <td>Validation Accuracy</td>
            {selectedModels.map((id) => (
              <>
                {getModelData(id).map((result) => (
                  <td> {getMaxAccuracyValidation(result).toFixed(2) * 100}%</td>
                ))}
              </>
            ))}
          </tr>
          <tr>
            <td>Validation Loss</td>
            {selectedModels.map((id) => (
              <>
                {getModelData(id).map((result) => (
                  <td> {getMaxLossValidation(result).toFixed(2)}</td>
                ))}
              </>
            ))}
          </tr>

          <tr>
            <td> Accuracy per epoch</td>
            {selectedModels.map((id) => (
              <>
                {getModelData(id).map((result) => (
                  <td> {renderAccuracy(result)}</td>
                ))}
              </>
            ))}
          </tr>

          <tr>
            <td> Loss per epoch</td>
            {selectedModels.map((id) => (
              <>
                {getModelData(id).map((result) => (
                  <td> {renderLoss(result)}</td>
                ))}
              </>
            ))}
          </tr>

          <tr>
            <td>Batch Size</td>
            {selectedModels.map((id) => (
              <>
                {getModelData(id).map((result) => (
                  <td>{getParam(result).batch_size}</td>
                ))}
              </>
            ))}
          </tr>

          <tr>
            <td>Dense Layer</td>
            {selectedModels.map((id) => (
              <>
                {getModelData(id).map((result) => (
                  <td>{getParam(result).dense_layer_size}</td>
                ))}
              </>
            ))}
          </tr>

          <tr>
            <td>Dropout Layer</td>
            {selectedModels.map((id) => (
              <>
                {getModelData(id).map((result) => (
                  <td>{getParam(result).dropout}</td>
                ))}
              </>
            ))}
          </tr>
          <tr>
            <td>Epoch</td>
            {selectedModels.map((id) => (
              <>
                {getModelData(id).map((result) => (
                  <td>{getParam(result).epochs}</td>
                ))}
              </>
            ))}
          </tr>
          <tr>
            <td>Learning Rate</td>
            {selectedModels.map((id) => (
              <>
                {getModelData(id).map((result) => (
                  <td>{getParam(result).lr}</td>
                ))}
              </>
            ))}
          </tr>
          <tr>
            <td>Optimizer</td>
            {selectedModels.map((id) => (
              <>
                {getModelData(id).map((result) => (
                  <td>{getParam(result).optimizer}</td>
                ))}
              </>
            ))}
          </tr>
        </table>
      </Container>
      <SideBar id={sessionId} />
      <Nav id={sessionId} />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const selected = ownProps.match.params.id.split('&');

  return {
    models: state.models,
  };
};
export default connect(mapStateToProps)(ComparedModels);
