import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Chart from 'chart.js/auto';

const BarChart = ({ width, height, BarChartRate }) => {
  const chartRef = useRef(null);
  useEffect(() => {
    const myChartRef = chartRef.current.getContext('2d');
    const labelsAndDataSets = {
      type: 'bar',
      data: {
        labels: ['10대', '20대', '30대', '40대'],
        datasets: [
          {
            label: '연령별',
            data: BarChartRate,
            backgroundColor: 'rgba(229, 190, 236, 0.6)',
            borderColor: 'rgba(229, 190, 236, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          ChartDataLabels: true,
        },
        tooltip: {
          enabled: false,
        },
        responsive: false,
        maintainAspectRatio: false,
        maxBarThickness: 40,
        scales: {
          x: {
            stacked: true,
            display: true,
          },
          y: {
            stacked: true,
            display: false,
            beginAtZero: true,
          },
        },
        categorySpacing: 0,
      },
    };

    const barChart = new Chart(myChartRef, labelsAndDataSets);
    return () => {
      return barChart.destroy();
    };
  }, [BarChartRate]);

  return <StyledCanvas ref={chartRef} width={width} height={height} />;
};

const StyledCanvas = styled.canvas`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin: 25px auto 0 auto;
`;

export default BarChart;
