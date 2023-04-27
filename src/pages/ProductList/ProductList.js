import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import MusicalCard from './MusicalCard';
import { API } from '../../config';

function ProductList() {
  const [lists, setLists] = useState([]);
  const [select, setSelect] = useState('reservationRated-DESC');
  const [nowInTheaters, setNowInTheaters] = useState(false);
  const commingSoon = nowInTheaters ? '&where=comingsoon' : '';

  const handleSelect = e => {
    setSelect(e.target.value);
  };
  const handleCheck = e => {
    setNowInTheaters(prev => !prev);
  };
  useEffect(() => {
    fetch(`${API.productList}?sort=${select}${commingSoon}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then(res => res.json())
      .then(data => {
        // 모든 공연 작품을 포함하는 경우, 각 객체에 id 속성을 추가합니다.
        const musicalList = data.map((musical, i) => {
          musical.id = i + 1;
          return musical;
        });
        setLists(musicalList);
      });
  }, [select, nowInTheaters]);

  return (
    <MusicalListWrap>
      <ListTitle>
        <h4>뮤지컬 차트</h4>
      </ListTitle>
      <SortTitle>
        <NowShow>
          <input type="checkbox" id="nowshowCheck" onChange={handleCheck} />
          <span>상영 예정작만 보기</span>
        </NowShow>
        <SortType>
          <select id="SortType" name="SortType" onChange={handleSelect}>
            <option value="reservationRated-DESC" selected>
              예매율순
            </option>
            <option value="ageRated-ASC">연령별</option>
            <option value="releasedDate-ASC">개봉일 오름차순</option>
            <option value="releasedDate-DESC">개봉일 내림차순</option>
          </select>
          <button>Go</button>
        </SortType>
      </SortTitle>
      <MusicalChart>
        <ol>
          {lists?.map(item => {
            return <MusicalCard item={item} key={item.id} />;
          })}
        </ol>
      </MusicalChart>
    </MusicalListWrap>
  );
}
const MusicalChart = styled.div`
  margin-top: 30px;

  ol {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
    list-style: none;
    gap: 18.6px;
  }
`;

const SortType = styled.div`
  display: flex;
  align-items: center;
  select {
    width: 120px;
    padding: 3px 7px;
    line-height: 27px;
    border: 1px solid #b4b3aa;
    border-radius: 5px;
  }
  button {
    line-height: 19px;
    font-weight: 500;
    font-size: 12px;
    border: 2px solid #7b7b7b;
    border-radius: 5px;
    color: #7b7b7b;
    margin-left: 5px;
    cursor: pointer;
  }
`;

const NowShow = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 1px;

  input {
    width: 18px;
    height: 18px;
  }

  span {
    margin-top: 2px;
    margin-left: 5px;
    font-size: 14px;
  }
`;

const SortTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 20px;
`;

const MusicalListWrap = styled.div`
  width: 980px;
  margin: 0 auto;
  padding-bottom: 50px;
`;

const ListTitle = styled.div`
  padding-top: 20px;
  border-bottom: 3px solid #241d1e;

  h4 {
    font-size: 38px;
    font-weight: 500;
  }
`;

export default ProductList;
