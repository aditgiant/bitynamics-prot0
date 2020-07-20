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
import Template from '../template.csv';

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
      console.log(jsonData);
      let data = [];
      jsonData.forEach((element, index) => {
        if (index) {
          const elementRaw = element.split(',');
          console.log(data);

          if (element) {
            let param = {
              sample: elementRaw[0],
              feature1: elementRaw[1],
              feature2: elementRaw[2],
              feature3: elementRaw[3],
              feature4: elementRaw[4],
              feature5: elementRaw[5],
              feature6: elementRaw[6],
              feature7: elementRaw[7],
              feature8: elementRaw[8],
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
            <th>Sample</th>
            <th>Feature1</th>
            <th>Feature2</th>
            <th>Feature3</th>
            <th>Feature4</th>
            <th>Feature5</th>
            <th>Feature6</th>
            <th>Feature7</th>
            <th>Feature8</th>
            <th>Prediction</th>
          </tr>
          {data.map((sample) => (
            <tr>
              <td>{sample.sample}</td>
              <td>{sample.feature1}</td>
              <td>{sample.feature2}</td>
              <td>{sample.feature3}</td>
              <td>{sample.feature4}</td>
              <td>{sample.feature5}</td>
              <td>{sample.feature6}</td>
              <td>{sample.feature7}</td>
              <td>{sample.feature8}</td>
              <td>{sample.sample}</td>
            </tr>
          ))}
        </table>
      );
    }
  };

  // const downloadPrediction = (exportObject, exportName) => {
  //   var dataStr =
  //     'data:text/json;charset=utf-8,' +
  //     encodeURIComponent(JSON.stringify(exportObject));
  //   var downloadAnchorNode = document.createElement('a');
  //   downloadAnchorNode.setAttribute('href', dataStr);
  //   downloadAnchorNode.setAttribute('download', exportName + '.json');
  //   document.appendChild(downloadAnchorNode);
  //   downloadAnchorNode.click();
  //   downloadAnchorNode.remove();
  // };

  const loadData = () => {
    console.log(data);
    if (data.length === 0) {
      return (
        <div className="container-prediction">
          <div class="card-drop-file">
            <div className="row">
              <div class="col">
                <div>
                  <i
                    className="fas fa-file-csv fa-4x ml-2"
                    style={{color: '#005791'}}></i>
                  <p style={{textDecoration: 'underline', color: '#005791'}}>
                    <a href={Template} download="Template.csv">
                      Template
                    </a>
                  </p>
                </div>
              </div>
              <ReactFileReader handleFiles={handleFiles} fileTypes={'.csv'}>
                <div className=" col text-drop-file ml-4 mt-4">
                  Drop your file or{' '}
                  <strong style={{color: '#005791'}}>Browse here!</strong>
                </div>
              </ReactFileReader>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-md-9"></div>
            <div className="col-md-3">
              {/* <button className="btn btn-yellow btn-prediction" type="button">
                Generate Prediction
              </button> */}
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
              <a
                href={data}
                download={data.length}
                className="btn btn-yellow btn-prediction"
                type="button">
                Download Data
              </a>
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
        <div className="menu-list">
          <Menu sessionId={sessionId} modelId={modelId} />
        </div>
        {loadData()}
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
