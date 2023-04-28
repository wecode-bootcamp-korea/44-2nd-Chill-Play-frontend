import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

function MusicalChartList({ item, index }) {
  const [onPoster, setOnPoster] = useState(false);

  function onHover() {
    setOnPoster(true);
  }

  function removeHover() {
    setOnPoster(false);
  }

  function handleAgeRated() {
    if (item.ageRated === 1) {
      return 'All';
    } else {
      return item.ageRated;
    }
  }
  if (index < 5) {
    return (
      <MusicalItem onMouseEnter={onHover} onMouseLeave={removeHover}>
        <PosterWrap>
          <LimitedAge ageRated={item.ageRated}>{handleAgeRated()}</LimitedAge>
          <ChartNum>{index + 1}</ChartNum>
          <Poster src={item.postImageUrl} alt="포스터" />
          {onPoster && (
            <HoverView>
              <TicketBtnWrap>
                <Link key={item.musicalId} to="/booking" state={item}>
                  <TicketBtn>예매하기</TicketBtn>
                </Link>
                <Link
                  key={item.musicalId}
                  to={`/productdetail/${item.musicalId}`}
                >
                  <TicketBtn>상세정보</TicketBtn>
                </Link>
              </TicketBtnWrap>
            </HoverView>
          )}
        </PosterWrap>

        <TitleWrap>
          <Title>{item.musicalName}</Title>
          <Info>
            <p>
              예매율 <b>{`${item.reservationRate}%`}</b>
            </p>
            <p>{`${item.releasedDate} ~ ${item.endDate}`}</p>
          </Info>
        </TitleWrap>
      </MusicalItem>
    );
  }
}

export default MusicalChartList;

const MusicalItem = styled.div`
  width: 260px;
  padding: 10px;
`;

const PosterWrap = styled.div`
  position: relative;
  height: 346px;
  margin-left: auto;
  margin-bottom: 16px;
  border: 1px solid #333333;
  border-radius: 12px;
  overflow-y: hidden;
`;

const ageRatedColor = {
  1: css`
    background-color: green;
  `,
  12: css`
    background-color: blue;
  `,
  15: css`
    background-color: orange;
  `,
  18: css`
    background-color: red;
  `,
};

const LimitedAge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 28px;
  height: 28px;
  padding: 4px 6px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;

  ${({ ageRated }) => {
    return ageRatedColor[ageRated];
  }}
`;

const ChartNum = styled.h3`
  position: absolute;
  left: 10px;
  bottom: -60px;
  font-size: 44px;
  font-style: italic;
  color: #ffffff;
`;

const Poster = styled.img`
  width: 100%;
  object-fit: cover;
  overflow: hidden;
`;

const TitleWrap = styled.div`
  width: 100%;
  text-align: center;
`;

const Title = styled.h6`
  margin-top: 30px;
  margin-bottom: 10px;
  font-size: 20px;
  color: #ffffff;
`;

const Info = styled.div`
  p {
    margin-bottom: -10px;
    font-size: 16px;
    font-weight: 400;
    color: #eeeeee;
  }
`;

const HoverView = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
`;

const TicketBtnWrap = styled.div`
  display: table-cell;
  vertical-align: middle;
  height: 346px;
  border-radius: 12px;
  background-color: #000000;
  opacity: 80%;
`;

const TicketBtn = styled.button`
  width: 200px;
  margin: 5px;
  border: 1px solid #ffffff;
  border-radius: 8px;
  padding: 8px 24px;
  background-color: rgba(000, 000, 000, 00);
  font-size: 16px;
  color: #ffffff;
  cursor: pointer;

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;
