import React from 'react';
import Chart from 'react-apexcharts';

const AnalyticsChart: React.FC = () => {
  const data = {
    series: [
      {
        name: 'User Signups',
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'line' as const, // specifying 'line' type explicitly
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth' as const, // specifying 'smooth' curve explicitly
      },
      title: {
        text: 'Monthly Signups',
        align: 'left' as const, // specifying 'left' alignment explicitly
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on rows
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      },
    },
  };

  return (
    <div>
      <h2>Monthly Signups</h2>
      <Chart options={data.options} series={data.series} type="line" height={350} />
    </div>
  );
};

export default AnalyticsChart;
