import React, {Component} from 'react';
import NetworkArtchitecture from '../containers/NetworkArchitecture';
import OptimizedParameter from '../containers/OptimizedParameter';
import Recommendation from './Recommendation';
import * as ROUTES from '../ROUTES';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Menu from './Menu';
import AccuracyCharts from '../components/charts/AccuracyCharts';
import LossCharts from '../components/charts/LossCharts';
import DurationCharts from '../components/charts/DurationCharts';
import RetrainPopUp from './RetrainPopUp';
import {currentPage} from '../redux/actions/models';
import OutputChart from '../components/charts/OutputChart';
import SideBar from '../sideBar/sideBar';
import Nav from '../Nav';
import {Container} from 'react-bootstrap';

class ItemDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      showPopup: false,
      fireRedirect: false,
    };
  }

  togglePopup() {
    console.log(this.state);
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }

  handleRetrain(e) {
    e.preventDefault();
    this.setState({
      fireRedirect: true,
    });
    console.log('go to blabla');
  }
  render() {
    const modelId = this.props.match.params.type;
    const sessionId = this.props.match.params.id;
    const models = this.props.models.models;
    const models_ = models.filter((train_model) => train_model.id == modelId);
    const model = models_[0];
    const training = model.training;
    const param = models[0].param;
    console.log(param);
    const max_accuracy_train = Math.max(...training.metric);
    const max_loss_train = Math.max(...training.loss);

    const max_accuracy_validation = Math.max(...training.val_metric);
    const max_loss_validation = Math.max(...training.val_loss);

    const exportModel = (exportObject, exportName) => {
      console.log('export models');

      var dataStr =
        'data:text/json;charset=utf-8,' +
        encodeURIComponent(JSON.stringify(exportObject));
      var downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute('href', dataStr);
      downloadAnchorNode.setAttribute('download', exportName + '.json');
      document.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    };
    return (
      <div>
        <Container id="training-container">
          <div className="analytics">
            <div className="menu-list">
              <Menu sessionId={sessionId} modelId={modelId} />
            </div>
            <div>
              <h3>Model {modelId}</h3>
              <div className="row">
                <div className="col-md-9 ">
                  <Link to={`/sessionmodel/${sessionId}`}>
                    <i class="fas fa-angle-left mr-2"></i>
                    <span>Back to Top Model</span>
                  </Link>
                </div>

                <div className="col-md-3">
                  <a
                    href={
                      'data:text/json;charset=utf-8,' +
                      encodeURIComponent(JSON.stringify(param))
                    }
                    download={'Model ' + Date() + '.json'}
                    type="button"
                    className="btn btn-yellow">
                    Export Model
                  </a>
                </div>
              </div>
              <div className="row">
                <div className="accuracy col-md-6">
                  <div className="accuracy-chart">
                    <div class="label-metrics mb-3">Accuracy per Epoch</div>
                    <AccuracyCharts
                      accuracy={training.metric}
                      val_accuracy={training.val_metric}
                      epochs={training.epochs}
                    />
                  </div>
                  <div className="row analytics-summary">
                    <div class="card-analytics metrics-training text-left">
                      <div class="card-body">
                        <div class="label-metrics">Training Accuracy</div>
                        <p class="value-metrics">
                          {(max_accuracy_train * 100).toFixed(2)}%
                        </p>
                      </div>
                    </div>
                    <div class="card-analytics metrics-validation text-left">
                      <div class="card-body">
                        <div class="label-metrics">Validation Accuracy</div>
                        <p class="value-metrics">
                          {(max_accuracy_validation * 100).toFixed(2)}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="loss col-md-6">
                  <div className="accuracy-chart">
                    <div class="label-metrics mb-3">Loss per Epoch</div>
                    <LossCharts
                      loss={training.loss}
                      val_loss={training.val_loss}
                      epochs={training.epochs}
                    />
                  </div>
                  <div className="row analytics-summary">
                    <div class="card-analytics metrics-training text-left">
                      <div class="card-body">
                        <div class="label-metrics">Training Loss</div>
                        <p class="value-metrics">{max_loss_train.toFixed(2)}</p>
                      </div>
                    </div>
                    <div class="card-analytics metrics-validation text-left">
                      <div class="card-body">
                        <div class="label-metrics">Validation Loss</div>
                        <p class="value-metrics">
                          {max_loss_validation.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-3 analytics-summary">
                <div class="card-analytics text-left col-md-6">
                  <div class="card-body">
                    <div class="label-metrics">Training Time</div>
                    <div className="row">
                      <div className="col-lg-8 mt-3">
                        <DurationCharts />
                      </div>
                      <div className="col-lg-4">
                        <p class="value-metrics">23h10m</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-analytics col-md-5">
                  <Recommendation />
                </div>
              </div>
              <div className="analytics-summary mt-3">
                <OptimizedParameter param={param} />
              </div>
              {/* <div className="analytics-summary mt-5">
                <NetworkArtchitecture />
              </div> */}
              <div className="card-analytics p-3">
                <div class="label-metrics mb-3">Training Output</div>
                <OutputChart />
              </div>

              <div className="analytics-summary mt-5">
                <div className="white-card "></div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-9"></div>

              <div className="mt-5 cold-md-3">
                <Link
                  to={`/testing/${sessionId}/${modelId}`}
                  onClick={() => this.props.currentPage('testing')}>
                  <button className="btn btn-yellow">Test Model</button>
                </Link>

                <button
                  onClick={this.togglePopup.bind(this)}
                  className="btn btn-white">
                  Retrain
                </button>
                {this.state.showPopup ? (
                  <RetrainPopUp
                    sessionId={sessionId}
                    closePopup={this.togglePopup.bind(this)}
                    handleRetrain={this.handleRetrain.bind(this)}
                    fireRedirect={this.state.fireRedirect}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </Container>

        <SideBar id={this.state.id} />
        <Nav id={this.state.id} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    currentPage: (page) => dispatch(currentPage(page)),
  };
};
const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const models = state.models;
  models.currentmodel = id;
  return {
    models: models,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail);
