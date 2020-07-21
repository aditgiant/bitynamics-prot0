import React from 'react';
import {Doughnut} from 'react-chartjs-2';

const DurationCharts = (props) => {
  const data = {
    labels: ['Training', 'Validation'],
    datasets: [
      {
        data: [20, 3],
        backgroundColor: ['#005791', '#f5a623'],
        hoverBackgroundColor: ['#005791', '#36A2EB'],
        borderWidth: [1, 1],
      },
    ],
  };
  return (
    <Doughnut
      data={data}
      options={{
        legend: {
          display: true,
          position: 'left',
        },
      }}
    />
  );
};

export default DurationCharts;
