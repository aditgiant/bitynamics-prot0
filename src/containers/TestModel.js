import React from 'react';
import {connect} from 'react-redux';
import * as ROUTES from '../ROUTES';
import {Link} from 'react-router-dom';
import Menu from './Menu';
import {currentPage} from '../redux/actions/models';
import OutputChart from '../components/charts/OutputChart';
import {Container} from 'react-bootstrap';
import SideBar from '../sideBar/sideBar';
import Nav from '../Nav';
function TestModel(props) {
  const testScore = props.testmodels;

  const sessionId = props.match.params.id;
  const modelId = props.match.params.type;

  return (
    <div>
      <Container>
        <div style={{height: '100vh'}}>
          <div className="menu-list">
            <Menu />
          </div>
          <div class="card-test text-left">
            <div className="row analytics-summary">
              <div class="card-analytics metrics-test text-left">
                <div class="card-body">
                  <div class="label-metrics">Testing Accuracy</div>
                  <p class="value-metrics">{testScore.metric * 100}%</p>
                </div>
              </div>
              <div class="card-analytics metrics-test text-left">
                <div class="card-body">
                  <div class="label-metrics">Testing Loss</div>
                  <p class="value-metrics">{testScore.loss.toFixed(2)}</p>
                </div>
              </div>
              <div class="card-analytics metrics-test text-left">
                <div class="card-body">
                  <div class="label-metrics">Testing Time</div>
                  <p class="value-metrics">12m</p>
                </div>
              </div>
            </div>
          </div>
          <div className="white-card">
            <OutputChart />
          </div>

          <div className="row">
            <div className="col-md-8"></div>
            <div className="col-md-4">
              <div className="mt-5">
                <Link
                  to={`/prediction/${sessionId}/${modelId}`}
                  onClick={() => props.currentPage('prediction')}>
                  <button className="btn btn-yellow">
                    Generate Prediction
                  </button>
                </Link>

                <button className="btn btn-white">Retrain</button>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <SideBar id={sessionId} />
      <Nav id={sessionId} />
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    currentPage: (page) => dispatch(currentPage(page)),
  };
};
const mapStateToProps = (state) => {
  return {
    testmodels: state.models.testmodels,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TestModel);
