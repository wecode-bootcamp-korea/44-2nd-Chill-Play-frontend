import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AheaderSlide from './Contents/AheaderSlide';
import Benefits from './Contents/Benefits';
import Theater from './Contents/Theater';
import Curation from './Contents/Curation';
import MusicalChartList from './Contents/MusicalChartList';

function Main() {
  const [mainMusicalData, setMainMusicalData] = useState([]);

  useEffect(() => {
    fetch('/data/mainMusicalData.json', {
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
    })
      .then(response => response.json())
      .then(result => setMainMusicalData(result));
  }, []);

  return (
    <div>
      <Header>
        <AheaderSlide />
        <Dim />
        <MusicalChart>
          {mainMusicalData &&
            mainMusicalData.map((item, i) => {
              return (
                <MusicalChartList key={item.musicalId} item={item} index={i} />
              );
            })}
        </MusicalChart>
      </Header>
      <Contents>
        <Benefits />
        <Curation />
        <Theater />
      </Contents>
    </div>
  );
}

export default Main;

const Header = styled.div`
  position: relative;
  display: flex;
  height: 1100px;
  background-color: #111111;
`;

const Dim = styled.div`
  position: absolute;
  z-index: 1;
  bottom: 0;
  width: 100%;
  height: 680px;
  background: linear-gradient(to top, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 0));
`;

const MusicalChart = styled.div`
  position: absolute;
  display: flex;
  z-index: 2;
  left: 50%;
  bottom: 60px;
  transform: translateX(-50%);
`;

const Contents = styled.div``;
