import React from 'react';
import styled, { css } from 'styled-components';
import { useBookingStore } from '../../store/store';
import { ChevronRight } from 'react-feather';
import { format } from 'date-fns';

function BookingProgress({ seatSelectionStage, setSeatSelectionStage }) {
  const bookingStatus = useBookingStore(state => state.bookingState);

  const {
    selectedMusical,
    selectedTheatre,
    selectedDate,
    selectedTime,
    selectedSeats,
  } = bookingStatus;

  const firstStepsComplete =
    selectedMusical && selectedTheatre && selectedDate && selectedTime;

  const ageLimit = {
    18: 18,
    15: 15,
    12: 12,
  };
  return (
    <BookingProgressStatusBar>
      <div>
        <BookingStepsContainer>
          <BookingStep>
            {selectedMusical?.id ? (
              <MusicalInfo>
                <AgeLimit ageLimit={selectedMusical.ageLimit}>
                  {ageLimit[selectedMusical.ageLimit] || 'All'}
                </AgeLimit>
                <MusicalTitle>{selectedMusical.title}</MusicalTitle>
              </MusicalInfo>
            ) : (
              '뮤지컬 선택'
            )}
          </BookingStep>
        </BookingStepsContainer>
        <ChevronWrapper>
          <ChevronRight />
        </ChevronWrapper>
        <BookingStepsContainer active={selectedMusical?.id ? true : false}>
          <BookingStep>
            {selectedTheatre?.id ? (
              <SelectedTheatre>{selectedTheatre.name}</SelectedTheatre>
            ) : (
              '상영관 선택'
            )}
          </BookingStep>
        </BookingStepsContainer>
        <ChevronWrapper>
          <ChevronRight />
        </ChevronWrapper>
        <BookingStepsContainer active={selectedTheatre?.id ? true : false}>
          <BookingStep>
            {selectedTheatre?.id ? (
              <DateTimeContent>
                {selectedDate && format(selectedDate, 'yyyy년 MM월 dd일')}
              </DateTimeContent>
            ) : (
              <div>
                {selectedDate && format(selectedDate, 'yyyy년 MM월 dd일')}
              </div>
            )}
          </BookingStep>
        </BookingStepsContainer>

        <ChevronWrapper>
          <ChevronRight />
        </ChevronWrapper>
        <BookingStepsContainer active={selectedTime?.id ? true : false}>
          <BookingStep>
            {selectedTime?.id ? (
              <DateTimeContent>
                {selectedTime?.time.slice(0, -3)}&nbsp;~&nbsp;
                {selectedTime?.endTime.slice(0, -3)}
              </DateTimeContent>
            ) : (
              '시간 선택'
            )}
          </BookingStep>
        </BookingStepsContainer>
        <ChevronWrapper>
          <ChevronRight />
        </ChevronWrapper>
        <BookingStepsContainer active={selectedTime?.id ? true : false}>
          <BookingStep>
            {selectedSeats.seatValues?.length
              ? selectedSeats.seatValues.map(seat => (
                  <SelectedSeats key={seat}>{seat}</SelectedSeats>
                ))
              : '좌석 선택'}
          </BookingStep>
        </BookingStepsContainer>
      </div>
      <BookingButton
        onClick={() => setSeatSelectionStage(true)}
        isActive={firstStepsComplete ? true : false}
      >
        {seatSelectionStage ? '결제하기' : '좌석 선택하기'}
      </BookingButton>
    </BookingProgressStatusBar>
  );
}

export default BookingProgress;

const BookingProgressStatusBar = styled.div`
  display: flex;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.black};
  padding: 16px;
  border-radius: 0 0 5px 5px;

  div {
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }
`;

const BookingStepsContainer = styled.div`
  ${props =>
    props.active === false &&
    css`
      opacity: 0.4;
    `}
  margin: 0 8px;
`;

const ChevronWrapper = styled.div`
  opacity: 0.6;
  display: flex;
  align-items: center;
  color: #ffffff;
`;

const BookingStep = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #ffffff;
`;

const BookingButton = styled.button`
  ${props =>
    props.isActive === false &&
    css`
      opacity: 0.5;
      pointer-events: none;
      cursor: not-allowed;
    `}
  outline: 0;
  border: 0;
  background-color: ${({ theme }) => theme.colors.primary.main};
  padding: 18px 24px;
  font-size: 16px;
  color: #ffffff;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.dark};
  }
`;

const MusicalInfo = styled.div``;

const AgeLimit = styled.div`
  background-color: ${props =>
    props.ageLimit === 18
      ? '#FF0363'
      : props.ageLimit === 15
      ? '#F48131'
      : props.ageLimit === 12
      ? '#F5C951'
      : '#36C640'};
  font-size: 14px;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-weight: bold;
  border-radius: 3px;
`;

const MusicalTitle = styled.div`
  font-size: 18px;
  margin-left: 8px;
  font-weight: 600;
  color: #ffffff;
`;

const SelectedTheatre = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const DateTimeContent = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const SelectedSeats = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-right: 6px;
`;
