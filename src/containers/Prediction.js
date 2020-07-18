import React, {Component} from 'react';
import ReactFileReader from 'react-file-reader';
import {render} from '@testing-library/react';
import {useState, useEffect} from 'react';
import Menu from './Menu';
import {connect} from 'react-redux';
import {currentmodel, currentPage} from '../redux/actions/models';
import {Container} from 'react-bootstrap';
import SideBar from '../sideBar/sideBar';
import Nav from '../Nav';
let reader;
const Prediction = (props) => {
  const [data, setData] = useState([]);
  const {models} = props;
  const sessionId = props.match.params.id;
  const modelId = props.match.params.type;
  console.log(models.currentPage);

  useEffect(() => {});

  const handleFiles = (files) => {
    reader = new FileReader();
    reader.onload = (e) => {
      let jsonData = reader.result.split('\n');
      let data = [];
      jsonData.forEach((element, index) => {
        if (index) {
          const elementRaw = element.split(',');

          if (element) {
            let param = {
              id: elementRaw[0],
              name: elementRaw[1],
              hobby: elementRaw[2],
              dream: elementRaw[3],
            };
            data.push(param);
          }
        }
      });

      render.onloadend = setData(data);
    };

    reader.readAsText(files[0]);
  };

  const renderTable = () => {
    if (data.length > 0) {
      return (
        <table id="prediction">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Hobby</th>
            <th>Dream</th>
          </tr>
          {data.map((sample) => (
            <tr>
              <td>{sample.id}</td>
              <td>{sample.name}</td>
              <td>{sample.hobby}</td>
              <td>{sample.dream}</td>
            </tr>
          ))}
        </table>
      );
    }
  };

  const loadData = () => {
    console.log(data);
    if (data.length === 0) {
      return (
        <div className="container-prediction">
          <ReactFileReader handleFiles={handleFiles} fileTypes={'.csv'}>
            <div class="card-drop-file">
              <div className="row">
                <div>
                  <i
                    className="fas fa-file-csv fa-4x"
                    style={{color: '#005791'}}></i>
                  <p style={{textDecoration: 'underline', color: '#005791'}}>
                    template
                  </p>
                </div>

                <div className="text-drop-file ml-4 mt-4">
                  Drop your file or{' '}
                  <strong style={{color: '#005791'}}>Browse here!</strong>
                </div>
              </div>
            </div>
          </ReactFileReader>

          <div className="row mt-5">
            <div className="col-md-9"></div>
            <div className="col-md-3">
              <button className="btn btn-yellow btn-prediction" type="button">
                Generate Prediction
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="render-table">{renderTable()}</div>
          <div className="row mt-5">
            <div className="col-md-9"></div>
            <div className="col-md-3">
              <button className="btn btn-yellow btn-prediction" type="button">
                Download Data
              </button>
            </div>
          </div>
        </div>
      );
    }
  };
  // if (data.length === 0) {
  return (
    <div>
      <Container id="models-container">
        <div className="container" style={{height: '100vh'}}>
          <div className="menu-list">
            <Menu sessionId={sessionId} modelId={modelId} />
          </div>
          {loadData()}
        </div>
      </Container>
      <SideBar id={sessionId} />
      <Nav id={sessionId} />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    currentPage: (page) => dispatch(currentPage(page)),
  };
};
const mapStateToProps = (state) => {
  console.log(state);
  return {
    models: state.models,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Prediction);
