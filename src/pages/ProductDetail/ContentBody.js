import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PieChart from './PieChart';
import BarChart from './BarChart';
import { ChevronLeft } from 'feather-icons-react/build/IconComponents';
import { ChevronRight } from 'feather-icons-react/build/IconComponents';
const swipeBanner = 100;

const ContentBody = ({ musicalData }) => {
  const [index, setIndex] = useState(0);
  const newSynopsis =
    musicalData.synopsis && musicalData.synopsis.replace(/\\n/g, '\n');

  const addIndex = () => {
    index >= musicalData.musicalImages.length - 1
      ? setIndex(0)
      : setIndex(index + 1);
  };

  const subIndex = () => {
    index <= 0
      ? setIndex(musicalData.musicalImages.length - 1)
      : setIndex(index - 1);
  };

  const translateBanner = index => {
    return index * swipeBanner;
  };

  return (
    <>
      <Information>
        <Synopsis>
          <strong>시놉시스</strong>
          <TextBox>{newSynopsis}</TextBox>
        </Synopsis>
      </Information>
      <RatingChart>
        <ChartTable>
          <li>
            <strong>성별 예매 분포</strong>
            <PieChart
              width="250px"
              height="250px"
              pieChartRate={musicalData.genderBookingRate}
            />
          </li>
          <li>
            <strong>연령별 예매 분포</strong>
            <BarChart
              width="470px"
              height="250px"
              BarChartRate={musicalData.ageBookingRate}
            />
          </li>
        </ChartTable>
      </RatingChart>
      <Stillcut>
        <strong>뮤지컬 스틸컷</strong>
        <StillcutSlide>
          <StyledChevronLeft onClick={subIndex} />
          {musicalData.musicalImages?.map(item => {
            return (
              <SlideWrap key={item.id} trans={translateBanner(index)}>
                <img src={item} alt="뮤지컬 스틸컷" />
              </SlideWrap>
            );
          })}
          <StyledChevronRight onClick={addIndex} />
        </StillcutSlide>
      </Stillcut>
    </>
  );
};

const Information = styled.div`
  overflow: hidden;
  margin: 0 0 45px 0;
`;

const Synopsis = styled.div`
  float: left;
  width: 100%;
  font-weight: 500;

  p {
    margin-top: 20px;
  }
  strong {
    font-size: 24px;
  }
`;

const TextBox = styled.p`
  padding-right: 80px;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 230px;
  font-size: 14px;
  white-space: pre-line;
  line-height: 1.8;

  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.1) transparent;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    border: 3px solid transparent;
    background-clip: content-box;
  }
`;

const RatingChart = styled.div`
  padding-top: 40px;
  width: 980px;
  margin: 0 auto;
  &::after {
    content: '';
    display: table;
    clear: both;
  }
`;

const ChartTable = styled.ul`
  display: flex;
  padding-left: 0;
  border-bottom: 1px solid #cccccc;
  list-style: none;

  li {
    float: left;
    padding-bottom: 10px;
    border-top: 1px solid #cccccc;
    width: 50%;
    height: 350px;
    margin-right: -1px;
  }
  li:nth-child(2) {
    border-left: 1px solid #cccccc;
  }

  strong {
    display: block;
    height: 58px;
    border-bottom: 1px solid #cccccc;
    color: #252525;
    text-align: center;
    line-height: 58px;
  }
`;

const Stillcut = styled.div`
  width: 100%;
  height: 500px;
  margin-top: 100px;
  margin-bottom: 100px;

  strong {
    font-size: 24px;
  }
`;

const SlideWrap = styled.div`
  width: 100%;
  height: 450px;
  display: flex;
  justify-content: center;
  background: #222;
  flex-shrink: 0;
  background-size: contain;
  transition: all 0.5s;
  transform: translateX(-${props => props.trans}%);

  img {
    height: 100%;
  }
`;

const StillcutSlide = styled.div`
  position: relative;
  display: flex;
  overflow: hidden;
  margin-top: 15px;
`;

const StyledChevronLeft = styled(ChevronLeft)`
  position: absolute;
  left: 3%;
  top: 50%;
  width: 36px;
  height: 36px;
  color: white;
  cursor: pointer;
  z-index: 1;
`;

const StyledChevronRight = styled(ChevronRight)`
  position: absolute;
  right: 3%;
  top: 50%;
  width: 36px;
  height: 36px;
  color: white;
  cursor: pointer;
  z-index: 1;
`;

export default ContentBody;
