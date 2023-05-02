import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useBookingStore } from './store/store';
import { shallow } from 'zustand/shallow';
import { RotateCcw } from 'react-feather';
import BookingProgress from './MusicalBooking/BookingProgress/BookingProgress';
import BookingFirstStep from './BookingFirstStep';
import BookingSecondStep from './BookingSecondStep';
import { format } from 'date-fns';

function Booking() {
  const [bookingPageData, setBookingPageData] = useState([]);
  const [
    bookingState,
    selectedDate,
    setMusical,
    setTheatre,
    setTime,
    resetStore,
  ] = useBookingStore(
    state => [
      state.bookingState,
      state.bookingState.selectedDate,
      state.setMusical,
      state.setTheatre,
      state.setTime,
      state.reset,
    ],
    shallow
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const [seatSelectionStage, setSeatSelectionStage] = useState(false);

  const location = useLocation();
  let queryString = location.search;
  let receivedState = location.state;

  useEffect(() => {
    fetch(`/data/booking/newBookingData${queryString}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(json => setBookingPageData(json));
  }, [queryString]);

  useEffect(() => {
    if (receivedState) {
      console.log(receivedState);
      handleDynamicFetch('musicalId', receivedState.musicalId);
      setMusical({
        id: receivedState.musicalId,
        image: receivedState.postImageUrl,
        title: receivedState.musicalName,
        ageLimit: receivedState.ageRated,
      });
    }
  }, []);

  const handleResetClick = () => {
    setSearchParams([]);
    resetStore();
    setSeatSelectionStage(false);
  };

  const handleDynamicFetch = (paramToSet, queryValue) => {
    const obj = {
      musicalId: (paramToSet, queryValue) => {
        searchParams.delete('theatreId');
        searchParams.delete('date');
        searchParams.delete('musicalScheduleId');
        setTheatre(null);
        setTime(null);

        searchParams.set(paramToSet, queryValue);
        setSearchParams(searchParams);
      },
      theatreId: (paramToSet, queryValue) => {
        searchParams.delete('date');
        searchParams.delete('musicalScheduleId');
        setTime(null);

        searchParams.set(paramToSet, queryValue);
        searchParams.set('date', format(selectedDate, 'yyyy-MM-dd'));
        setSearchParams(searchParams);
      },
      date: (paramToSet, clickedDay) => {
        searchParams.delete('musicalScheduleId');
        setTime(null);

        searchParams.set(paramToSet, format(clickedDay, 'yyyy-MM-dd'));
        setSearchParams(searchParams);
      },
      musicalScheduleId: (paramToSet, queryValue) => {
        searchParams.set('musicalScheduleId', queryValue);
        setSearchParams(searchParams);
      },
    };
    return obj[paramToSet](paramToSet, queryValue);
  };

  console.log(bookingState);

  return (
    <PageContainer>
      <BookingContainer>
        <BookingHeaderBar>
          <HeaderBarItem flexPos="center" />
          <HeaderBarItem flexPos="center">
            {seatSelectionStage ? '인원 / 좌석 선택' : '뮤지컬 예매하기'}
          </HeaderBarItem>
          <HeaderBarItem flexPos="flex-end">
            <ResetButton onClick={handleResetClick}>
              <RotateCcw size={16} />
              <p>처음으로 돌아가기</p>
            </ResetButton>
          </HeaderBarItem>
        </BookingHeaderBar>
        {seatSelectionStage ? (
          <BookingSecondStep />
        ) : (
          <BookingFirstStep
            handleDynamicFetch={handleDynamicFetch}
            bookingPageData={bookingPageData}
            receivedState={receivedState}
          />
        )}
        <BookingProgress
          seatSelectionStage={seatSelectionStage}
          setSeatSelectionStage={setSeatSelectionStage}
        />
      </BookingContainer>
    </PageContainer>
  );
}

export default Booking;

const PageContainer = styled.div`
  user-select: none;
  width: 100%;
  padding: 60px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.primary.main};
  background-image: url('../../assets/images/booking/bookingBg.jpg');
`;

const BookingContainer = styled.div`
  background: #ffffff;
  width: 1000px;
  border-radius: 5px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
    0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07),
    0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);
`;

const BookingHeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  background: ${({ theme }) => theme.colors.black};
  border-radius: 5px 5px 0 0;
  color: #ffffff;
  font-size: 18px;
`;

const HeaderBarItem = styled.div`
  ${({ flexPos }) =>
    flexPos &&
    css`
      display: flex;
      justify-content: ${flexPos};
    `}
  padding: 0 36px;
  display: flex;
  align-items: center;
  width: 33.3%;

  p {
    padding-left: 6px;
    font-size: 12px;
    opacity: 0.75;
  }
`;

const ResetButton = styled.div`
  padding: 0px 16px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    background-color: #3c4841;
  }
`;
