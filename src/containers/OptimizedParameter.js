import React, {Component} from 'react';

class OptimizedParameter extends Component {
  render() {
    const {param} = this.props;
    return (
      <div class="card-parameter">
        <div class="card-body">
          <div class="card-title-parameter">Model Parameters</div>
          <div className="row card-parameter-items">
            <div class="card card-parameter-item">
              <div class="card-body">
                <h4 class="card-title">OUTPUT TYPE</h4>

                <p class="card-text model-parameter">Classification</p>
              </div>
            </div>
            <div class="card card-parameter-item">
              <div class="card-body">
                <h4 class="card-title">NETWORK CLASS</h4>
                <p class="card-text model-parameter">
                  Convolutional Neural Network
                </p>
              </div>
            </div>
            <div class="card card-parameter-item">
              <div class="card-body">
                <h4 class="card-title">OPTIMIZER</h4>
                <p class="card-text model-parameter">Name: {param.optimizer}</p>
                <p class="card-text model-parameter">
                  Learning Rate: {param.lr}
                </p>
                <p class="card-text model-parameter">
                  Momentum: {param.momentum}
                </p>
              </div>
            </div>
            <div class="card card-parameter-item">
              <div class="card-body">
                <h4 class="card-title">BATCH SIZE</h4>
                <p class="card-text model-parameter">{param.batch_size}</p>
              </div>
            </div>
            <div class="card card-parameter-item">
              <div class="card-body">
                <h4 class="card-title">EPOCHS</h4>
                <p class="card-text model-parameter">{param.epochs}</p>
              </div>
            </div>
          </div>
          {/* <div class="card-text">
            <ul>
              <li>Batch Size: {param.batch_size}</li>
              <li>Dense Layer Size: {param.dense_layer_size}</li>
              <li>Dropout: {param.dropout}</li>
              <li>Epochs: {param.epochs}</li>
              <li>Learning Rate: {param.lr}</li>
              <li>Optimizer: {param.optimizer}</li>
            </ul>
          </div> */}
        </div>
      </div>
    );
  }
}

export default OptimizedParameter;
