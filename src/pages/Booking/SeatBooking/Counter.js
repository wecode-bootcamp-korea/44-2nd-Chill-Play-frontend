import React from 'react';
import styled, { css } from 'styled-components';
import { Minus, Plus } from 'react-feather';

function Counter({ ticketCount, setTicketCount }) {
  const handleCounter = num => {
    if (ticketCount + num === 0 || ticketCount + num === 7) {
      return;
    }
    setTicketCount(ticketCount + num);
  };
  return (
    <CounterContainer>
      <CounterLabel>관람 인원</CounterLabel>
      <ActualCounter>
        <Button
          disabled={ticketCount === 1 && true}
          onClick={() => handleCounter(-1)}
        >
          <Minus />
        </Button>
        <CounterNum>
          <span>{ticketCount}</span>명
        </CounterNum>
        <Button onClick={() => handleCounter(1)}>
          <Plus />
        </Button>
      </ActualCounter>
      <LimitInfo>
        한번에 예약 시 <span>최대 6명</span>까지
        <br /> 예약 가능합니다.
      </LimitInfo>
    </CounterContainer>
  );
}

export default Counter;

const CounterContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CounterLabel = styled.div`
  font-size: 12px;
  color: #ffffff;
  margin-bottom: 6px;
`;

const ActualCounter = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #bfbfbf;
  color: ${({ theme }) => theme.colors.black};
  outline: 0;
  border: 0;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.main};
    color: #ffffff;
  }

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.25;
      pointer-events: none;
      cursor: not-allowed;
    `}
`;

const CounterNum = styled.div`
  font-size: 20px;
  color: #ffffff;
  margin: 0 12px;

  span {
    margin-right: 2px;
    font-size: 26px;
    font-weight: bold;
  }
`;

const LimitInfo = styled.div`
  white-space: pre-wrap;
  white-space: pre-line;
  word-wrap: break-word;
  margin-top: 10px;
  font-size: 10px;
  color: #e8e8e8;

  span {
    opacity: 1;
    font-weight: 600;
    color: #fff;
  }
`;
