import React from 'react';
import {Line} from 'react-chartjs-2';

const AccuracyCharts = (props) => {
  const {epochs, accuracy, val_accuracy} = props;

  const state = {
    labels: epochs,
    datasets: [
      {
        label: 'Training',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: '#005791',
        borderWidth: 2,
        data: accuracy,
      },
      {
        label: 'Validation',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: '#f5a623',
        borderWidth: 2,
        data: val_accuracy,
        display: true,
      },
    ],
    options: {
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: 'percentage',
            },
          },
        ],
      },
    },
  };

  const downloadChart = () => {
    var url_base64jp = document
      .getElementById('accuracy-chart')
      .toDataURL('image/jpg');
    var a = document.getElementById('download-chart');
    a.href = url_base64jp;
  };

  return (
    <div>
      <Line
        data={state}
        id="accuracy-chart"
        options={{
          title: {
            display: true,
            text: 'Accuracy per Epoch',
            fontSize: 16,
            position: 'top',
            fontFamily: 'Lato',
            fontColor: '#9B9B9B',
            fontStyle: 400,
          },
          legend: {
            display: true,
            position: 'bottom',
          },
        }}
      />

      <a
        onClick={() => downloadChart()}
        id="download-chart"
        download="ChartAccuracy.jpg"
        href=""
        className="btn btn-primary">
        <i className="fa fa-download"></i>
      </a>
    </div>
  );
};

export default AccuracyCharts;
