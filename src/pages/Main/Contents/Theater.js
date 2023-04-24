import React from 'react';
import styled from 'styled-components';
import useScrollFadeIn from './useScrollFadeIn';
import { MAIN_THEATER } from './data/MainContentsData';

function Theater() {
  return (
    <TheaterContents>
      <ContentsTitle>극장 안내</ContentsTitle>
      <TheaterList {...useScrollFadeIn('up', 0.5, 0)}>
        {MAIN_THEATER.map(theater => (
          <TheaterItem imgUrl={theater.image} key={theater.id}>
            <h4>{theater.theater}</h4>
          </TheaterItem>
        ))}
      </TheaterList>
    </TheaterContents>
  );
}

export default Theater;

const TheaterContents = styled.div`
  width: 1080px;
  margin: auto;
  padding-top: 120px;
  padding-bottom: 120px;
`;

const ContentsTitle = styled.h2`
  font-size: 40px;
  font-weight: 500;
`;

const TheaterList = styled.div`
  display: flex;
  justify-content: center;
`;

const TheaterItem = styled.div`
  background-image: ${({ imgUrl }) => `url('${imgUrl}')`};
  background-size: cover;
  background-position: center center;
  display: flex;
  padding: 24px;
  align-items: center;
  width: 200px;
  height: 200px;
  margin-left: 10px;
  margin-right: 10px;
  border: 1px solid #eeeeee;
  border-radius: 12px;
  background-color: #666666;
  opacity: 0.8;

  &:hover {
    opacity: 1;
    scale: 1.05;
    transition: all 0.5s;
  }

  h4 {
    margin: 0;
    padding: 0;
    font-size: 22px;
    color: #ffffff;
    opacity: 1;
  }
`;
