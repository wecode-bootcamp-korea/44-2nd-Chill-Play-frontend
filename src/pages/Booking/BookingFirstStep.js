import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import MusicalItem from './MusicalBooking/MusicalItem';
import TheatreItem from './MusicalBooking/TheatreItem';
import Calendar from './MusicalBooking/Calendar/Calendar';
import TimeItem from './MusicalBooking/TimeItem';
import { useBookingStore } from './store/store';

function BookingFirstStep({ handleDynamicFetch, bookingPageData }) {
  const bookingState = useBookingStore(state => state.bookingState);
  const { selectedMusical, selectedTheatre, selectedDate, selectedTime } =
    bookingState;

  return (
    <BookingStepsContainer>
      <BookingStep width="33.3">
        <StepHeader>상영중인 작품</StepHeader>
        <StepBody $scrollable>
          {bookingPageData[0]?.map(
            ({
              musicalId,
              musicalImage,
              musicalTitle,
              ageLimit,
              reservationRate,
              releasedDate,
            }) => (
              <MusicalItem
                handleDynamicFetch={handleDynamicFetch}
                id={musicalId}
                key={musicalId}
                image={musicalImage}
                title={musicalTitle}
                ageLimit={ageLimit}
                rate={reservationRate}
                releasedDate={releasedDate}
              />
            )
          )}
        </StepBody>
      </BookingStep>
      <BookingStep width="28.3">
        <StepHeader>장소</StepHeader>
        <StepBody active={selectedMusical !== null ? true : false} $scrollable>
          {selectedMusical === null ? (
            <ChoosePrevItem>관람할 작품을 선택해주세요</ChoosePrevItem>
          ) : (
            bookingPageData[1]?.map(
              ({ theaterId, theaterImage, theaterName, description }) => (
                <TheatreItem
                  handleDynamicFetch={handleDynamicFetch}
                  key={theaterId}
                  id={theaterId}
                  image={theaterImage}
                  name={theaterName}
                  description={description}
                />
              )
            )
          )}
        </StepBody>
      </BookingStep>
      <BookingStep width="38.3">
        <StepHeader>날짜&nbsp;/&nbsp;시간</StepHeader>
        <StepBody active={selectedTheatre !== null ? true : false} $scrollable>
          {selectedTheatre === null ? (
            <ChoosePrevItem>장소를 선택해주세요</ChoosePrevItem>
          ) : (
            <>
              <Calendar handleDynamicFetch={handleDynamicFetch} />
              {bookingPageData[2]?.map(
                ({
                  musicalScheduleId,
                  name,
                  startTime,
                  endTime,
                  totalSeat,
                  remainingSeats,
                }) => (
                  <TimeItem
                    handleDynamicFetch={handleDynamicFetch}
                    key={musicalScheduleId}
                    id={musicalScheduleId}
                    name={name}
                    time={startTime}
                    endTime={endTime}
                    totalSeats={totalSeat}
                    availableSeats={remainingSeats}
                  />
                )
              )}
            </>
          )}
        </StepBody>
      </BookingStep>
    </BookingStepsContainer>
  );
}

export default BookingFirstStep;

const BookingStepsContainer = styled.div`
  display: flex;
  width: 100%;
  border-radius: 0 0 5px 5px;
`;

const BookingStep = styled.div`
  ${({ width }) =>
    width &&
    css`
      width: ${width}%;
    `};
  border-right: 1px solid #dbdbdb;
`;

const StepHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #dbdbdb;
  border-radius: inherit;
`;

const StepBody = styled.div`
  ${({ active }) =>
    active === false &&
    css`
      pointer-events: none;
    `}
  ${props =>
    props.$scrollable &&
    css`
      overflow-y: auto;
    `}
  height: 480px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #ffffff;
  }

  &::-webkit-scrollbar-thumb {
    width: 5px;
    height: 25px;
    border-radius: 5px;
    background-color: #d0d0d0;
  }
`;

const ChoosePrevItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: #ffffff;
  color: rgba(0, 0, 0, 0.5);
`;
