import React, {Component} from 'react';
import {Container} from 'react-bootstrap';
import SideBar from '../sideBar/sideBar';
import Nav from '../Nav';
import Model from './Model';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {selectedModels} from '../redux/actions/models';

class TopListModel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      selected: 0,
      sorted: false,
    };
  }

  render() {
    console.log(this.state.id);
    const models = this.props.models.models;
    console.log(models);
    const selectedModels = this.props.models.selectedModels;

    let storage = [];
    storage = JSON.parse(localStorage.getItem('selectedmodels')) || [];
    console.log(storage);
    const handleCompareModel = () => {
      console.log(storage.length);
      if (storage.length == 0) {
        return (
          <div>
            <div className="text-compare" id="txt-compare">
              <p>Select two models to compare</p>
            </div>

            <button className="btn btn-compared disabled">
              Compare Models
            </button>
          </div>
        );
      } else if (storage.length === 1) {
        return (
          <div>
            <div className="text-compare" id="txt-compare">
              <p>Pick another model</p>
            </div>
            <button className="btn btn-compared disabled">
              Compare Models
            </button>
          </div>
        );
      } else if (storage.length === 2) {
        return (
          <div>
            <div className="text-compare" id="txt-compare"></div>
            <Link
              to={`/comparemodels/${this.state.id}/${selectedModels[0]}&${selectedModels[1]}`}>
              <button className="btn btn-compared ">Compare Models</button>
            </Link>
          </div>
        );
      } else if (selectedModels.length > 2) {
        return (
          <div>
            <div className="text-compare" id="txt-compare">
              Only can compare two models
            </div>
            <button className="btn btn-compared disabled">
              Compare Models
            </button>
          </div>
        );
      }
    };
    return (
      <div>
        <Container id="models-container">
          <div style={{height: '100vh'}}>
            <div className="models-description mt-5">
              We have trained 10 model combinations. Here are top 5 models with
              the best performances
            </div>
            <hr />

            <div className="row">
              {models.map((train_model, index) => (
                <Model
                  sessionId={this.state.id}
                  key={index}
                  train_model={train_model}
                  listSelected={selectedModels}
                />
              ))}
            </div>
            <div className="compare-action">{handleCompareModel()}</div>
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
    selectedModels: (id) => dispatch(selectedModels(id)),
  };
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    models: state.models,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopListModel);
