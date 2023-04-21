import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useBookingStore } from '../store/store';

function Seats({ values, ticketCount, bookedSeats }) {
  const [selectedSeats, setSelectedSeats] = useState({
    numberOfSeats: ticketCount,
    seatValues: [],
  });

  const { numberOfSeats, seatValues } = selectedSeats;

  useEffect(() => {
    setSelectedSeats(prev => ({
      ...prev,
      numberOfSeats: ticketCount,
    }));

    if (seatValues.length > ticketCount) {
      setSelectedSeats(prev => ({
        ...prev,
        seatValues: [],
      }));
    }
  }, [ticketCount]);

  const updateSeats = useBookingStore(state => state.setSeats);

  useEffect(() => {
    updateSeats(selectedSeats);
  }, [selectedSeats]);

  const checkVipSeat = seatValue => {
    if (
      seatValue.startsWith('A') ||
      seatValue.startsWith('B') ||
      seatValue.startsWith('C')
    ) {
      return true;
    } else {
      return false;
    }
  };

  const seatIsSelected = seat => {
    if (seatValues.includes(seat)) {
      return true;
    } else {
      return false;
    }
  };

  const handleSelectSeat = (seat, seatCount) => {
    if (seatValues.includes(seat)) {
      setSelectedSeats(prev => ({
        ...prev,
        seatValues: [...seatValues.filter(seats => seats !== seat)],
      }));
      return;
    }
    if (seatValues.length === seatCount) {
      setSelectedSeats(prev => ({
        ...prev,
        seatValues: [...seatValues.shift(), seat],
      }));
    }
    setSelectedSeats(prev => ({
      ...prev,
      seatValues: [...seatValues, seat],
    }));
  };

  const charToIntConvertValue = 65;

  return (
    <SeatsGrid>
      <SeatsAlphabet>
        {new Array(10).fill(1).map((item, i) => (
          <GridLabel key={i}>
            {String.fromCharCode(item * i + charToIntConvertValue)}
          </GridLabel>
        ))}
      </SeatsAlphabet>
      <SeatsNumber>
        {new Array(10).fill(1).map((item, i) => (
          <GridLabel key={i}>{item * i + 1}</GridLabel>
        ))}
      </SeatsNumber>
      <SeatsRow>
        {values.map(seat =>
          bookedSeats?.includes(seat) ? (
            <Seat isBooked={true} isVip={checkVipSeat(seat)} key={seat}>
              {seat}
            </Seat>
          ) : (
            <Seat
              onClick={() => handleSelectSeat(seat, ticketCount)}
              isBooked={false}
              isVip={checkVipSeat(seat)}
              isSelected={seatIsSelected(seat)}
              key={seat}
            >
              {seat}
            </Seat>
          )
        )}
      </SeatsRow>
    </SeatsGrid>
  );
}

export default Seats;

const SeatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(11, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
`;

const SeatsNumber = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-area: 1 / 2 / 2 / 12;
`;

const GridLabel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  opacity: 0.8;
`;

const SeatsAlphabet = styled.div`
  grid-area: 2 / 1 / 12 / 2;
  display: grid;
  grid-template-rows: repeat(10, 1fr);
`;

const SeatsRow = styled.div`
  grid-area: 2 / 2 / 12 / 12;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
`;

const Seat = styled.div`
  ${({ isBooked }) =>
    isBooked === true &&
    css`
      opacity: 0.3;
      cursor: not-allowed;
      pointer-events: none;
    `}
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  font-size: 8px;
  border-radius: 3px;
  margin: 3px 6px;
  transition: 0.2s;
  color: #a473e6;
  background: ${({ theme }) => theme.colors.primary.dark};
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.primary.light};
  }

  ${({ isVip }) =>
    isVip === true &&
    css`
      background: #ed9209;
      color: #ffd08a;

      &:hover {
        background: #fcb03f;
        box-shadow: 0 0 8px rgba(255, 255, 255, 0.7);
      }
    `}

  ${({ isSelected }) =>
    isSelected === true &&
    css`
      background: #0ec78f;
      color: #ffffff;
      box-shadow: 0 0 8px rgba(255, 255, 255, 0.8);

      &:hover {
        background: #05a877;
      }
    `}
`;
