import React from 'react';
import styled, { css } from 'styled-components';
import { useBookingStore } from '../store/store';
import { shallow } from 'zustand/shallow';

function MusicalItem({
  handleDynamicFetch,
  id,
  image,
  title,
  ageLimit,
  rate,
  releasedDate,
}) {
  const [selectedMusical, setSelectedMusical, setSelectedTheatre] =
    useBookingStore(
      state => [
        state.bookingState.selectedMusical,
        state.setMusical,
        state.setTheatre,
      ],
      shallow
    );

  const updateSelectedMusical = musical => {
    const { id, image, title, ageLimit } = musical;
    setSelectedMusical({
      id: id,
      image: image,
      title: title,
      ageLimit: ageLimit,
    });
  };

  const handleMusicalClick = () => {
    handleDynamicFetch('musical', id);
    updateSelectedMusical({ id, image, title, ageLimit });
  };

  const ageLimitObj = {
    18: 18,
    15: 15,
    12: 12,
  };
  return (
    <Item
      isSelected={id === selectedMusical?.id ? true : false}
      onClick={handleMusicalClick}
    >
      <MusicalThumb imageUrl={image} />
      <MusicalTextContent>
        <Header>
          <AgeLimit ageLimit={ageLimit}>
            {ageLimitObj[ageLimit] || 'All'}
          </AgeLimit>
          <p>{title}</p>
        </Header>
        <SubText>
          <p>예매율</p>
          <span>{rate}% </span>
        </SubText>
        <SubText>
          <p>개봉일</p>
          <div>{releasedDate}</div>
        </SubText>
      </MusicalTextContent>
    </Item>
  );
}

export default MusicalItem;

const Item = styled.div`
  user-select: none;
  padding: 16px;
  display: flex;
  flex-shrink: 0;
  width: 100%;
  background: #ffffff;
  transition: 0.3s;
  cursor: pointer;

  ${props =>
    props.isSelected === true &&
    css`
      background: ${({ theme }) => theme.colors.primary.main};
      color: #ffffff;
    `}

  &:hover {
    ${props => props.isClicked === false && css``}
  }
`;

const MusicalThumb = styled.div`
  ${props =>
    props.imageUrl &&
    css`
      background-image: url(${props.imageUrl});
    `}
  transition: .5s;
  flex-shrink: 0;
  background-size: cover;
  height: 120px;
  width: 90px;
  border-radius: 5px;
`;
const MusicalTextContent = styled.div`
  margin-left: 16px;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  align-items: center;

  p {
    font-weight: bold;
    padding-left: 10px;
    line-height: 0;
  }
`;

const AgeLimit = styled.div`
  background-color: ${({ ageLimit }) => {
    const obj = {
      18: '#FF0363',
      15: '#F48131',
      12: '#F5C951',
    };
    return obj[ageLimit] || '#36C640';
  }};
  font-size: 14px;
  width: 22px;
  height: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-weight: bold;
  border-radius: 3px;
`;

const SubText = styled.div`
  display: flex;
  align-items: center;
  padding-top: 8px;
  font-size: 12px;

  p {
    margin: 0;
    opacity: 0.75;
  }

  span {
    margin-left: 6px;
    font-weight: 600;
  }

  div {
    margin-left: 6px;
    opacity: 1;
  }
`;
