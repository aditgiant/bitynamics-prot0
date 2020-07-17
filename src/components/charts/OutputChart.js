import React from 'react';
import {Scatter} from 'react-chartjs-2';

const OutputChart = () => {
  const state = {
    type: 'scatter',

    datasets: [
      {
        label: 'Training Output',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: '#f5a623',
        borderWidth: 2,
        display: true,
        data: [
          {
            x: -10,
            y: 0,
          },
          {
            x: 0,
            y: 10,
          },
          {
            x: 100,
            y: 50,
          },
          {
            x: 2,
            y: 4,
          },
          {
            x: 10,
            y: 5,
          },
          {
            x: 20,
            y: 45,
          },
          {
            x: 10,
            y: 50,
          },
        ],
      },
    ],

    options: {
      scales: {
        xAxes: [
          {
            type: 'linear',
            position: 'bottom',
          },
        ],
      },
    },
  };
  console.log(state);
  return (
    <div>
      <Scatter
        data={state}
        options={{
          title: {
            display: true,
            text: 'Output',
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
    </div>
  );
};

export default OutputChart;
