import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BookSeats from './SeatBooking/BookSeats';
import SelectedMusicalInfo from './SeatBooking/SelectedMusicalInfo';
import Counter from './SeatBooking/Counter';
import SelectedSeatsInfo from './SeatBooking/SelectedSeatsInfo';
import { useBookingStore } from './store/store';
import { API } from '../../config';

function BookingSecondStep() {
  const [ticketCount, setTicketCount] = useState(1);
  const [bookedSeatsData, setBookedSeatsData] = useState({});
  const selectedSchedule = useBookingStore(
    state => state.bookingState.selectedTime
  );

  useEffect(() => {
    fetch(`${API.seatSelection}${selectedSchedule.id}`, {
      method: 'GET',
      'Content-Type': 'application/json',
    })
      .then(response => response.json())
      .then(result => setBookedSeatsData(result));
  }, []);

  return (
    <PageContainer>
      <PageContent>
        <NumberControlBar>
          <BarContent>
            <SelectedMusicalInfo />
            <Counter
              ticketCount={ticketCount}
              setTicketCount={setTicketCount}
            />
          </BarContent>
        </NumberControlBar>
        <StageContainer>
          <Stage />
        </StageContainer>
        <SeatsContainer>
          <BookSeats
            ticketCount={ticketCount}
            bookedSeats={bookedSeatsData[0]?.bookedSeats}
          />
        </SeatsContainer>
        <SelectedSeatsInfo
          vipPrice={bookedSeatsData[0]?.vipPrice}
          regPrice={bookedSeatsData[0]?.regPrice}
        />
      </PageContent>
    </PageContainer>
  );
}

export default BookingSecondStep;

const PageContainer = styled.div`
  padding: 20px 0;
  background-color: #000000;
  color: #ffffff;
`;

const PageContent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const NumberControlBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BarContent = styled.div`
  z-index: 10;
  display: flex;
  align-items: center;
  padding: 16px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.black};
  margin-top: 24px;
`;

const StageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Stage = styled.div`
  background: #fff;
  border-radius: 5px;
  width: 450px;
  height: 45px;
  margin-top: 15px;
  transform: perspective(20px) rotateX(-3deg);
  box-shadow: 0 20px 100px rgba(255, 255, 255, 0.7);
`;

const SeatsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;
