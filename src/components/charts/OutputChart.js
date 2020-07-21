import React from 'react';
import {Scatter} from 'react-chartjs-2';

const OutputChart = () => {
  const state = {
    type: 'scatter',

    datasets: [
      {
        label: 'Number 0',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
        display: true,
        pointRadius: 10,
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

      {
        label: 'Number 1',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'black',
        borderColor: 'black',
        borderWidth: 2,
        display: true,
        pointRadius: 10,

        data: [
          {
            x: -20,
            y: 5,
          },
          {
            x: 20,
            y: 20,
          },
          {
            x: 130,
            y: 70,
          },
          {
            x: 4,
            y: 9,
          },
          {
            x: 20,
            y: 33,
          },
          {
            x: 33,
            y: 34,
          },
          {
            x: 10,
            y: 30,
          },
        ],
      },

      {
        label: 'Number 2',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'red',
        borderColor: 'red',
        borderWidth: 2,
        display: true,
        pointRadius: 10,

        data: [
          {
            x: -20,
            y: 19,
          },
          {
            x: -20,
            y: 30,
          },
          {
            x: 30,
            y: 24,
          },
          {
            x: 20,
            y: 34,
          },
          {
            x: -15,
            y: 20,
          },
          {
            x: 18,
            y: 22,
          },
          {
            x: 27,
            y: 22,
          },
        ],
      },

      {
        label: 'Number 3',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'green',
        borderColor: 'green',
        borderWidth: 2,
        display: true,
        pointRadius: 10,

        data: [
          {
            x: 40,
            y: 69,
          },
          {
            x: -60,
            y: 90,
          },
          {
            x: 120,
            y: 200,
          },
          {
            x: 130,
            y: 33,
          },
          {
            x: 65,
            y: 89,
          },
          {
            x: 58,
            y: 62,
          },
          {
            x: 47,
            y: 62,
          },
        ],
      },
      {
        label: 'Number 4',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'pink',
        borderColor: 'pink',
        borderWidth: 2,
        display: true,
        pointRadius: 10,

        data: [
          {
            x: 20,
            y: 49,
          },
          {
            x: -40,
            y: 70,
          },
          {
            x: 100,
            y: 180,
          },
          {
            x: 120,
            y: 30,
          },
          {
            x: 35,
            y: 39,
          },
          {
            x: 48,
            y: 62,
          },
          {
            x: 27,
            y: 42,
          },
        ],
      },

      {
        label: 'Number 5',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'orange',
        borderColor: 'orange',
        borderWidth: 2,
        display: true,
        pointRadius: 10,

        data: [
          {
            x: 30,
            y: 59,
          },
          {
            x: -30,
            y: 80,
          },
          {
            x: 110,
            y: 190,
          },
          {
            x: 130,
            y: 40,
          },
          {
            x: 45,
            y: 59,
          },
          {
            x: 58,
            y: 72,
          },
          {
            x: 37,
            y: 52,
          },
        ],
      },

      {
        label: 'Number 6',
        fill: false,
        lineTension: 0.5,
        backgroundColor: '#005791',
        borderColor: '#005791',
        borderWidth: 2,
        display: true,
        pointRadius: 10,

        data: [
          {
            x: 0,
            y: -1,
          },
          {
            x: -60,
            y: 50,
          },
          {
            x: 80,
            y: 160,
          },
          {
            x: 100,
            y: 10,
          },
          {
            x: 15,
            y: 29,
          },
          {
            x: 28,
            y: 42,
          },
          {
            x: 7,
            y: 22,
          },
        ],
      },

      {
        label: 'Number 7',
        fill: false,
        lineTension: 0.5,
        backgroundColor: '#8B572A',
        borderColor: '#8B572A',
        borderWidth: 2,
        display: true,
        pointRadius: 10,

        data: [
          {
            x: 100,
            y: 120,
          },
          {
            x: 120,
            y: 150,
          },
          {
            x: 180,
            y: 160,
          },
          {
            x: 120,
            y: 110,
          },
          {
            x: 115,
            y: 129,
          },
          {
            x: 128,
            y: 142,
          },
          {
            x: 107,
            y: 122,
          },
        ],
      },

      {
        label: 'Number 8',
        fill: false,
        lineTension: 0.5,
        backgroundColor: '#417505',
        borderColor: '#417505',
        borderWidth: 2,
        display: true,
        pointRadius: 10,
        data: [
          {
            x: 10,
            y: 120,
          },
          {
            x: 20,
            y: 130,
          },
          {
            x: 40,
            y: 130,
          },
          {
            x: 20,
            y: 110,
          },
          {
            x: 15,
            y: 129,
          },
          {
            x: 28,
            y: 142,
          },
          {
            x: 7,
            y: 122,
          },
        ],
      },

      {
        label: 'Number 9',
        fill: false,
        lineTension: 0.5,
        backgroundColor: '#BD10E0',
        borderColor: '#BD10E0',
        borderWidth: 2,
        display: true,
        pointRadius: 10,
        data: [
          {
            x: -50,
            y: 120,
          },
          {
            x: -36,
            y: 130,
          },
          {
            x: -43,
            y: 110,
          },
          {
            x: -45,
            y: 110,
          },
          {
            x: -65,
            y: 129,
          },
          {
            x: -78,
            y: 142,
          },
          {
            x: -70,
            y: 122,
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
    <div style={{backgroundColor: 'white'}}>
      <Scatter
        data={state}
        options={{
          // title: {
          //   display: true,
          //   text: 'Output',
          //   fontSize: 16,
          //   position: 'top',
          //   fontFamily: 'Lato',
          //   fontColor: '#9B9B9B',
          //   fontStyle: 400,
          //   xAxis: 'Principle Component 1',
          // },
          legend: {
            display: true,
            position: 'right',
          },
        }}
      />
    </div>
  );
};

export default OutputChart;
