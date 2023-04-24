import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Chart from 'chart.js/auto';

const StyledCanvas = styled.canvas`
  width: ${props => props.width};
  height: ${props => props.height};
  margin: 15px auto;
`;

const PieChart = ({ width, height }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const myChartRef = chartRef.current.getContext('2d');
    const labelsAndDataSets = {
      type: 'pie',
      data: {
        // labels와 datasets 프로퍼티 설정
        labels: ['여성', '남성'],
        datasets: [
          {
            label: '성별',
            data: [42, 58],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: false,
        aspectRatio: 1,
      },
    };
    new Chart(myChartRef, labelsAndDataSets);
  }, []);

  return <StyledCanvas ref={chartRef} width={width} height={height} />;
};

export default PieChart;
