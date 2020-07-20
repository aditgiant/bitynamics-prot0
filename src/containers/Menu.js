import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import * as ROUTES from '../ROUTES';
import {currentmodel, currentPage} from '../redux/actions/models';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
const Menu = (props) => {
  const {models, sessionId, modelId} = props;
  const currentPage = models.currentPage;
  console.log(currentPage);
  console.log(props.location.pathname);

  const resetStyling = () => {
    document.getElementById('menu-evaluate').style.backgroundColor =
      'transparent';
    document.getElementById('menu-evaluate').style.color = 'black';
    document.getElementById('menu-test').style.color = 'black';
    document.getElementById('menu-test').style.backgroundColor = 'transparent';
    document.getElementById('menu-prediction').style.color = 'black';
    document.getElementById('menu-prediction').style.backgroundColor =
      'transparent';
  };

  useEffect(() => {
    const currentPage = models.currentPage;
    console.log(currentPage);
    if (currentPage === 'evaluate') {
      console.log(currentPage);
      resetStyling();
      document.getElementById('menu-evaluate').style.backgroundColor =
        '#005791';
      document.getElementById('menu-evaluate').style.color = 'white';
    }
    if (currentPage === 'testing') {
      console.log(currentPage);
      resetStyling();
      document.getElementById('menu-test').style.backgroundColor = '#005791';
      document.getElementById('menu-test').style.color = '#ffffff';
    }

    if (currentPage === 'prediction') {
      console.log(currentPage);
      resetStyling();
      document.getElementById('menu-prediction').style.backgroundColor =
        '#005791';
      document.getElementById('menu-prediction').style.color = '#ffffff';
    }
  });
  const currentmodel = models.currentmodel;
  console.log(props);

  return (
    <div className="menu-top">
      <ul>
        <li>
          <Link to={`/evaluate/${sessionId}/${modelId}`}>
            <a id="menu-evaluate" onClick={() => props.currentPage('evaluate')}>
              EVALUATE
            </a>
          </Link>
        </li>
        <li>
          <Link to={`/testing/${sessionId}/${modelId}`}>
            <a id="menu-test" onClick={() => props.currentPage('testing')}>
              TEST
            </a>
          </Link>
        </li>
        <li>
          <Link to={`/prediction/${sessionId}/${modelId}`}>
            <a
              id="menu-prediction"
              onClick={() => props.currentPage('prediction')}>
              PREDICT
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    models: state.models,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    currentmodel: (id) => dispatch(currentmodel(id)),
    currentPage: (page) => dispatch(currentPage(page)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Menu));
