import React from 'react';
import styled, { css } from 'styled-components';
import { format } from 'date-fns';
import { useBookingStore } from '../store/store';

function SelectedMusicalInfo() {
  const bookingState = useBookingStore(state => state.bookingState);
  const { selectedMusical, selectedTheatre, selectedDate, selectedTime } =
    bookingState;
  return (
    <MusicalInfoContainer>
      <MusicalThumb imageUrl={selectedMusical?.image} />
      <MusicalTextContent>
        <MusicalHeader>
          <AgeLimit ageLimit={selectedMusical?.ageLimit}>
            {selectedMusical?.ageLimit}
          </AgeLimit>
          <Title>{selectedMusical?.title}</Title>
        </MusicalHeader>
        <SubTextWrap>
          <MusicalSubText>
            {selectedDate && format(selectedDate, 'yy.MM.dd(EEE)')}
          </MusicalSubText>
          <Separator>|</Separator>
          <MusicalSubText>{selectedTime?.time}</MusicalSubText>
        </SubTextWrap>
        <SubTextWrap>
          <MusicalSubText>{selectedTheatre?.name}</MusicalSubText>
        </SubTextWrap>
      </MusicalTextContent>
    </MusicalInfoContainer>
  );
}

export default SelectedMusicalInfo;

const MusicalInfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 80px;
`;

const MusicalThumb = styled.div`
  ${({ imageUrl }) =>
    imageUrl &&
    css`
      background-image: url(${imageUrl});
    `}
  background-position: center center;
  transition: 0.5s;
  flex-shrink: 0;
  background-size: cover;
  height: 80px;
  width: 60px;
  border-radius: 5px;
`;

const MusicalTextContent = styled.div`
  margin-left: 12px;
`;

const MusicalHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
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
  border-radius: 2px;
`;

const Title = styled.div`
  margin-left: 8px;
  font-size: 20px;
  color: #ffffff;
`;

const SubTextWrap = styled.div`
  display: flex;
  align-items: center;
`;

const MusicalSubText = styled.div`
  font-size: 12px;
  color: #ffffff;
  opacity: 0.6;
`;

const Separator = styled.div`
  margin: 0 10px;
  color: #ffffff;
  opacity: 0.3;
  font-size: 12px;
  font-weight: bold;
`;
