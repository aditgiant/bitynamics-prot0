import React from 'react';
import {Line} from 'react-chartjs-2';

const LossCharts = (props) => {
  const {epochs, loss, val_loss} = props;

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
        data: loss,
      },
      {
        label: 'Validation',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: '#f5a623',
        borderWidth: 2,
        data: val_loss,
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
      .getElementById('loss-chart')
      .toDataURL('image/jpg');
    var a = document.getElementById('download-chart-loss');
    a.href = url_base64jp;
  };

  return (
    <div>
      <Line
        data={state}
        id="loss-chart"
        options={{
          // title: {
          //   display: true,
          //   text: 'Loss per Epoch',
          //   fontSize: 16,
          //   position: 'top',
          //   fontFamily: 'Lato',
          //   fontColor: '#9B9B9B',
          //   fontStyle: 400,
          // },
          legend: {
            display: true,
            position: 'bottom',
          },
        }}
      />
      <button
        onClick={() => downloadChart()}
        id="download-chart-loss"
        className="btn"
        download="ChartLoss.jpg">
        <i class="fa fa-download"></i>
      </button>
    </div>
  );
};

export default LossCharts;
