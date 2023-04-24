import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const MusicalCard = ({ item }) => {
  const navigate = useNavigate();
  const ratedAge = age => {
    const ageRate = {
      18: '18',
      15: '15',
      12: '12',
    };
    return ageRate[age] || 'All';
  };

  const goToDetail = musicalId => {
    navigate(`/productdetail/detail/${musicalId}`);
  };

  const goToBooking = musical => {
    navigate(`/booking`, { state: musical });
  };

  const compareDate = day => {
    const nowTime = new Date();
    const nowMonth = nowTime.getMonth() + 1;
    const nowDate = nowTime.getDate();
    const musicalDate = Number(day.substring(8, 10));
    const musicalMonth = Number(day.substring(5, 7));
    let dDay = 0;

    if (nowMonth < musicalMonth) {
      if (nowMonth === 2) {
        dDay = 28 - nowDate + musicalDate;
      } else if (nowMonth === 4 || 6 || 9 || 11) {
        dDay = 30 - nowDate + musicalDate;
      } else {
        dDay = 31 - nowDate + musicalDate;
      }
    } else {
      dDay = musicalDate - nowDate;
    }
    if (dDay > 0) {
      return 'D-' + dDay;
    } else {
      return '상영중';
    }
  };

  return (
    <CardWrap>
      <Card>
        <RankImage>
          <MusicalRank rank={item.id}>No.{item.id}</MusicalRank>
          <Thumbnail
            onClick={() => {
              goToDetail(item.musicalId);
            }}
          >
            <img src={item.postImageUrl} alt="뮤지컬 포스터" />
            <FilmRating limit={item.ageRated}>
              {ratedAge(item.ageRated)}
            </FilmRating>
          </Thumbnail>
        </RankImage>
        <CardContent>
          <div>
            <a>{item.musicalName}</a>
          </div>
          <div>
            <Rating>
              예매율
              <span>{item.reservationRated}%</span>
            </Rating>
          </div>
          <Release>
            <strong>{item.releasedDate}</strong>
            <span>개봉</span>
            <em>{compareDate(item.releasedDate)}</em>
          </Release>
        </CardContent>
        <BookingBtn onClick={() => goToBooking(item)}>예매하기</BookingBtn>
      </Card>
    </CardWrap>
  );
};
const BookingBtn = styled.button`
  width: 100%;
  height: 30px;
  padding: 5px 15px;
  margin-top: 35px;
  outline: 0;
  border: 0;
  background: linear-gradient(to right, #6200ee, #7c21ff);
  border-radius: 5px;
  color: white;
  cursor: pointer;
`;

const Release = styled.span`
  margin-top: 3px;
  height: 13px;
  color: #666666;
  font-weight: 500;
  white-space: nowrap;
  font-size: 30px;

  em {
    margin-left: 5px;
    font-size: 14px;
    font-weight: bold;
    color: #6200ee;
  }
`;

const Rating = styled.strong`
  font-size: 12px;
  span {
    margin-left: 10px;
    color: #333333;
    font-size: 30px;
    font-weight: 500;
  }
`;

const CardContent = styled.div`
  a {
    text-decoration: none;
    font-weight: bold;
  }
  strong {
    margin-right: 10px;
  }
  span {
    color: #333333;
    font-size: 14px;
  }
`;

const Thumbnail = styled.div`
  position: relative;
  cursor: pointer;

  img {
    width: 100%;
    height: 260px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

const FilmRating = styled.i`
  position: absolute;
  top: 5px;
  left: 5px;
  background-color: ${({ limit }) => {
    const ageLimit = {
      18: '#FF0363',
      15: '#F48131',
      12: '#F5C951',
    };
    return ageLimit[limit] || '#36C640';
  }};
  font-size: 12px;
  width: 22px;
  height: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-weight: bold;
  border-radius: 3px;
`;

const RankImage = styled.div`
  width: 100%;
  margin-bottom: 10px;
`;

const MusicalRank = styled.p`
  height: 28px;
  margin-bottom: 4px;
  color: #ffffff;
  background-color: ${({ rank }) => (rank > 4 ? '#252525' : '#7c21ff')};
  font-size: 19px;
  text-align: center;
  line-height: 28px;
  font-weight: 400;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const Card = styled.li`
  width: 197px;
`;

const CardWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  padding: 15px;
  border: 2px solid lightgrey;
  border-radius: 20px;
  box-shadow: 0 0 5px 3px rgba(211, 211, 211, 0.4);
`;

export default MusicalCard;
