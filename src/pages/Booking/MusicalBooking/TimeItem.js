import React from 'react';
import styled, { css } from 'styled-components';
import { useBookingStore } from '../store/store';
import { shallow } from 'zustand/shallow';

function TimeItem({
  id,
  name,
  time,
  endTime,
  totalSeats,
  availableSeats,
  handleDynamicFetch,
}) {
  const [selectedMusical, selectedTime] = useBookingStore(
    state => [
      state.bookingState.selectedMusical,
      state.bookingState.selectedTime,
    ],
    shallow
  );
  const updateStoreTime = useBookingStore(state => state.setTime);

  const updateTimeInfo = timeInfo => {
    updateStoreTime(timeInfo);
  };

  const handleTimeClick = () => {
    handleDynamicFetch('musicalScheduleId', id);
    updateTimeInfo({ id, name, time, endTime });
  };

  return (
    <TimeItemContainer
      isSelected={id === selectedTime?.id ? true : false}
      onClick={handleTimeClick}
    >
      <TimeItemName>{selectedMusical.title}</TimeItemName>
      <TimeItemTime>
        <span>{time?.slice(0, -3)}</span>&nbsp;~&nbsp;
        <span>{endTime?.slice(0, -3)}</span>
      </TimeItemTime>
      <TotalSeats>총&nbsp;{totalSeats}석</TotalSeats>
      <SeatsFlexWrapper>
        {availableSeats > 0 && (
          <AvailableSeatsContainer>
            <div>예매가능</div>
            <span>{availableSeats}석</span>
          </AvailableSeatsContainer>
        )}
      </SeatsFlexWrapper>
    </TimeItemContainer>
  );
}

export default TimeItem;

const TimeItemContainer = styled.div`
  transition: 0.3s;
  ${({ isSelected }) =>
    isSelected === true &&
    css`
      background: ${({ theme }) => theme.colors.primary.main};
      color: #ffffff;
    `}
  padding: 16px;
  cursor: pointer;
  margin: 16px;
  border-radius: 5px;
  border: 1px solid #dbdbdb;
`;

const TimeItemName = styled.div`
  font-size: 16px;
`;

const TimeItemTime = styled.div`
  margin-top: 4px;
  font-size: 16px;
  font-weight: 600;

  span {
    font-size: 24px;
  }
`;
const SeatsFlexWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const TotalSeats = styled.div`
  margin: 6px 0;
  font-size: 14px;
  font-weight: lighter;
  opacity: 0.7;
`;

const AvailableSeatsContainer = styled.div`
  display: flex;
  align-items: center;

  div {
    display: flex;
    padding: 3px 6px;
    border-radius: 3px;
    font-size: 10px;
    font-weight: bolder;
    color: #ffffff;
    background-color: #2ca84d;
  }

  span {
    margin-left: 12px;
    font-size: 16px;
    color: #2ca84d;
    font-weight: bold;
  }
`;
