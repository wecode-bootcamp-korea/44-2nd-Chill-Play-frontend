import React from 'react';
import styled, { css } from 'styled-components';
import { useBookingStore } from '../store/store';

function SelectedSeatsInfo({ vipPrice, regPrice }) {
  const selectedSeats = useBookingStore(
    state => state.bookingState.selectedSeats.seatValues
  );
  const vipSeatCount = selectedSeats?.filter(
    seat => seat.startsWith('A') || seat.startsWith('B') || seat.startsWith('C')
  ).length;

  const regSeatCount = selectedSeats?.length - vipSeatCount;
  const totalVipPrice = vipSeatCount * vipPrice;
  const totalRegPrice = regSeatCount * regPrice;

  const checkVip = value => {
    if (
      value.startsWith('A') ||
      value.startsWith('B') ||
      value.startsWith('C')
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <SelectedSeatsContainer>
      <ContentWrapper>
        <Header>
          <Label>선택한 좌석</Label>
          <div>
            <SeatCountContainer>
              <CountLabel>VIP&nbsp;{vipSeatCount}</CountLabel>
            </SeatCountContainer>
            <SeatCountContainer>
              <CountLabel>일반&nbsp;{regSeatCount}</CountLabel>
            </SeatCountContainer>
          </div>
        </Header>
        <SeatsAndPriceContainer>
          {selectedSeats?.length === 0 ? (
            <ChoosePrice>좌석을 선택해주세요</ChoosePrice>
          ) : (
            <SeatsContainer>
              {selectedSeats?.map(seat => (
                <Seat isVip={checkVip(seat)} key={seat}>
                  {seat}
                </Seat>
              ))}
            </SeatsContainer>
          )}

          <TotalPrice>
            <div>총&nbsp;&nbsp;</div>
            {(totalVipPrice + totalRegPrice).toLocaleString()}&nbsp;
            <span>원</span>
          </TotalPrice>
        </SeatsAndPriceContainer>
      </ContentWrapper>
    </SelectedSeatsContainer>
  );
}

export default SelectedSeatsInfo;

const SelectedSeatsContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  padding: 16px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.black};
`;

const Header = styled.div`
  width: 400px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;

  div {
    display: flex;
  }
`;

const Label = styled.div`
  font-size: 12px;
  color: #ffffff;
`;

const SeatsAndPriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SeatsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Seat = styled.div`
  background: ${({ theme }) => theme.colors.primary.dark};
  color: #d8bdff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 34px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;

  &:not(:first-child) {
    margin-left: 6px;
  }
  ${({ isVip }) =>
    isVip === true &&
    css`
      background: #ed9209;
      color: #ffdba6;
    `}
`;

const SeatCountContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CountLabel = styled.div`
  font-size: 14px;
  margin-left: 24px;
`;

const TotalPrice = styled.div`
  display: flex;
  align-items: baseline;
  font-size: 24px;
  font-weight: 600;

  div {
    font-size: 14px;
    font-weight: 400;
  }

  span {
    font-size: 16px;
  }
`;

const ChoosePrice = styled.div`
  font-size: 24px;
  opacity: 0.3;
`;
