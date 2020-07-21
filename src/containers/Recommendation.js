import React, {Component} from 'react';

class Recommendation extends Component {
  render() {
    return (
      <div class="card-tips">
        <div class="card-body">
          <div className="label-metrics">Improvement Tips</div>
          <div className="row m-3">
            <i
              className="fa fa-lightbulb fa-3x mr-3 "
              style={{color: '#005791'}}></i>
            <div className="card-text-performance">
              <ul>
                <li>Change Learning Rate to 0.1</li>
                <li>Increase Dropout Value</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Recommendation;
