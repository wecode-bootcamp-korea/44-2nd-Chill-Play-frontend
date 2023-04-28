import React from 'react';
import styled from 'styled-components';

function HistoryItemHeader({ history }) {
  return (
    <HistoryItemHead>
      <ItemText>{history.purchasedDate}</ItemText>
      <Separator>|</Separator>
      <MusicalTitle>{history.musicalName}</MusicalTitle>
      <Separator>|</Separator>
      <ItemText>
        {history.totalAmount?.toLocaleString()}
        <span>원</span>
      </ItemText>
      <Separator>|</Separator>
      <OrderNum>
        예매번호 <span>{history.orderNumber}</span>
      </OrderNum>
    </HistoryItemHead>
  );
}

export default HistoryItemHeader;

const HistoryItemHead = styled.div`
  padding: 12px 16px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  user-select: none;
  transition: 0.3s;
  cursor: pointer;
`;

const Separator = styled.div`
  font-size: 14px;
  padding: 0 12px;
  color: #b9b9b9;
`;

const SeatsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ItemText = styled.div`
  font-size: 14px;
  font-weight: 600;

  span {
    font-size: 12px;
    font-weight: 400;
  }
`;

const MusicalTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

const OrderNum = styled.div`
  color: #707070;
  font-size: 12px;

  span {
    padding-left: 6px;
  }
`;
