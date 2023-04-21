import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import {
  format,
  addDays,
  startOfWeek,
  lastDayOfWeek,
  getWeek,
  addWeeks,
  subWeeks,
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { useBookingStore } from '../../store/store';
import { shallow } from 'zustand/shallow';

function Calendar({ handleDynamicFetch }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));

  const [selectedDate, setSelectedDate] = useBookingStore(
    state => [state.bookingState.selectedDate, state.setDate],
    shallow
  );

  const handleChangeWeek = type => {
    if (type === 'prev') {
      let nowWeek = getWeek(new Date());
      if (currentWeek === nowWeek) {
        return;
      }
      setCurrentMonth(subWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(subWeeks(currentMonth, 1)));
    }
    if (type === 'next') {
      setCurrentMonth(addWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(addWeeks(currentMonth, 1)));
    }
  };

  const handleDateClick = day => {
    setSelectedDate(day);
    handleDynamicFetch('date', day);
  };

  const renderMonth = () => {
    const dateFormat = 'M';
    return <div>{format(currentMonth, dateFormat)}월</div>;
  };

  const renderDays = () => {
    const startingDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 1 });
    const dateFormat = 'd';
    const weekDateFormat = 'EEE';
    const rows = [];
    let days = [];
    let day = startingDate;
    let formattedDate = '';
    let formattedWeekDate = '';
    while (day < endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        formattedWeekDate = format(day, weekDateFormat);
        const dayCopy = day;
        let compareDate =
          format(day, 'MM-dd-yyyy') ===
          format(selectedDate && selectedDate, 'MM-dd-yyyy');

        const checkIfDaysArePassed =
          day.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);
        days.push(
          <DayItem
            passed={checkIfDaysArePassed ? true : false}
            selected={compareDate ? true : false}
            key={day}
            onClick={() => {
              handleDateClick(dayCopy);
            }}
          >
            <p>{formattedDate}</p>
            <span>{formattedWeekDate}</span>
          </DayItem>
        );
        day = addDays(day, 1);
      }
      rows.push(<DayItemRow key={day}>{days}</DayItemRow>);
      if (rows.length > 1) {
        rows.shift();
      }
      days = [];
    }
    return <div>{rows}</div>;
  };
  return (
    <Container>
      <MonthContainer>{renderMonth()}</MonthContainer>
      <DaysContainer>
        <IconBtnContainer onClick={() => handleChangeWeek('prev')}>
          <ChevronLeft />
        </IconBtnContainer>
        {renderDays()}
        <IconBtnContainer onClick={() => handleChangeWeek('next')}>
          <ChevronRight />
        </IconBtnContainer>
      </DaysContainer>
    </Container>
  );
}

export default Calendar;

const Container = styled.div``;

const MonthContainer = styled.div`
  padding-top: 20px;
  padding-left: 16px;
  font-size: 14px;
`;
const DaysContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const DayItemRow = styled.div`
  display: flex;
  border-bottom: 1px solid #dbdbdb;
`;

const IconBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const DayItem = styled.div`
  ${props =>
    props.selected === true &&
    css`
      background: ${({ theme }) => theme.colors.primary.main};
      color: #ffffff;
    `}
  ${props =>
    props.passed === true &&
    css`
      opacity: 0.3;
      pointer-events: none;
      cursor: not-allowed;
    `}
  user-select: none;
  text-align: center;
  padding: 6px 12px;
  font-size: 12px;
  cursor: pointer;
  transition: 0.3s;
  border-radius: 10px;
  &:hover {
    ${props =>
      props.selected === false &&
      css`
        background: #ba99e8;
        color: ${({ theme }) => theme.colors.primary.main};
      `}
  }
  p {
    font-size: 16px;
    font-weight: 600;
    margin: 0;
  }
`;
