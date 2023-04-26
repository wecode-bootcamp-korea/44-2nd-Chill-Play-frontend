import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import ContentBody from './ContentBody';
import { API } from '../../config';
function ProductDetail() {
  const [musicalData, setMusicalData] = useState({});
  const [musicalBanner, setMusicalBanner] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  const musicalId = params.id;

  const goToBooking = musical => {
    navigate(`/booking`, { state: musical });
  };

  const ageRateHandler = age => {
    const ageRating = {
      18: '18',
      15: '15',
      12: '12',
    };
    return ageRating[age] || 'All';
  };

  const headerVideoHandler = () => {
    const findMusicalId = musicalBanner.find(musical => {
      return musical.musicalId === musicalData.musicalId;
    });
    return findMusicalId && findMusicalId.thumbnail;
  };

  useEffect(() => {
    fetch(`${API.productDetail}/${musicalId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
    })
      .then(response => response.json())
      .then(result => setMusicalData(result));
  }, [musicalId]);

  useEffect(() => {
    fetch('/data/musicaldetail.json', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
    })
      .then(response => response.json())
      .then(result => setMusicalBanner(result));
  }, [musicalId]);

  return (
    <div>
      {musicalData && (
        <>
          <Header>
            <HeaderVideo>
              <img
                src={headerVideoHandler() || '/images/defaultImg.jpg'}
                alt="하이라이트"
              />
              <div />
            </HeaderVideo>
          </Header>
          <Content>
            <ContentsTop>
              <PosterWrap>
                <Poster src={musicalData.postImageUrl} alt="포스터" />
              </PosterWrap>
              <PlayTitle>
                <Grade grade={musicalData.ageRated}>
                  {ageRateHandler(musicalData.age)}
                </Grade>
                <span>{musicalData.musicalName}</span>
              </PlayTitle>
              <Rating>
                <span>예매율</span>
                <RatingSpan>{musicalData.reservationRate}%</RatingSpan>
              </Rating>
              <PlayInfo>
                <li>
                  <em>시간정보</em>
                  <span>{musicalData.releasedDate} 개봉 ㅣ </span>
                  <span>{musicalData.endDate} 마감 ㅣ </span>
                  <span>상영시간 {musicalData.runningTime}분</span>
                </li>
                <li>
                  <em>극장</em>
                  <span>{musicalData.theaterName}</span>
                </li>
                <li>
                  <em>출연진 : </em>
                  <span>
                    {musicalData.musicalActors &&
                      musicalData.musicalActors.actor}
                  </span>
                </li>
              </PlayInfo>
              <TicketBtn onClick={() => goToBooking(musicalData)}>
                예매하기
              </TicketBtn>
            </ContentsTop>
            <ContentBody musicalData={musicalData} />
          </Content>
        </>
      )}
    </div>
  );
}

const HeaderVideo = styled.div`
  width: 100%;
  z-index: -1;
  height: 570px;
  background-color: #000000;

  img {
    width: 100%;
    height: 100%;
    background-size: contain;
  }

  div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000000;
    opacity: 30%;
  }
`;

const Header = styled.div`
  position: relative;
  display: flex;
`;

const Content = styled.div`
  width: 980px;
  margin: 0 auto;
  padding: 20px 0 0 0;
`;

const PosterWrap = styled.div`
  position: absolute;
  top: -40px;
  left: 0;
  width: 205px;
  height: 305px;
  z-index: 1;
`;

const Poster = styled.img`
  width: 100%;
  border-radius: 4px;
`;

const TicketBtn = styled.button`
  position: absolute;
  right: 0;
  bottom: -35px;
  width: 17%;
  background: linear-gradient(to right, #6200ee, #7c21ff);
  border-radius: 24px;
  outline: 0;
  border: 0;
  padding: 16px 24px;
  font-size: 16px;
  color: #ffffff;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 5px 3px rgba(124, 33, 255, 0.2);
    transition: all 0.2s;
  }
`;

const ContentsTop = styled.div`
  position: relative;
  padding-left: 245px;
  margin-bottom: 100px;
  border-bottom: 1px solid transparent;
`;

const PlayTitle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  span {
    font-size: 32px;
    font-weight: bold;
    margin-left: 16px;
  }
`;

const Grade = styled.div`
  background-color: ${({ grade }) => {
    const gradeScore = {
      18: '#FF0363',
      15: '#F48131',
      12: '#F5C951',
    };
    return gradeScore[grade] || '#36C640';
  }};
  font-size: 14px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-weight: bold;
  border-radius: 3px;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #ddd;

  span {
    margin-right: 10px;
  }
`;

const RatingSpan = styled.span`
  margin-right: 25px;
  font-size: 22px;
  font-weight: bold;
  color: #7c21ff;
`;

const PlayInfo = styled.ul`
  margin: 0;
  padding-left: 0;

  em {
    margin-right: 10px;
  }

  li {
    list-style: none;
    margin-top: 11px;
    font-size: 13px;
  }
`;

export default ProductDetail;
