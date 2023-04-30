import React from 'react';
import styled from 'styled-components';

const CreditCard = () => {
  return (
    <CreditCardWrap>
      <label>카드사 선택 </label>
      <select id="cardSelect" name="cardSelect">
        {CARD_OPTION.map(card => {
          return (
            <option key={card.id} value={card.value}>
              {card.cardName}
            </option>
          );
        })}
      </select>
    </CreditCardWrap>
  );
};

const CreditCardWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  margin-top: 5px;

  label {
    margin-right: 10px;
  }

  select {
    padding: 5px;
    height: 32px;
  }
`;

const CARD_OPTION = [
  {
    id: 1,
    cardName: '카드 선택',
    value: 'none',
  },
  {
    id: 2,
    cardName: '비씨카드',
    value: 'BC',
  },
  {
    id: 3,
    cardName: '국민카드',
    value: 'KB',
  },
  {
    id: 4,
    cardName: '신한카드',
    value: 'ShinHan',
  },
  {
    id: 5,
    cardName: '삼성카드',
    value: 'Samsung',
  },
  {
    id: 6,
    cardName: '롯데카드',
    value: 'Lotte',
  },
  {
    id: 7,
    cardName: '농협카드',
    value: 'NH',
  },
  {
    id: 8,
    cardName: '현대카드',
    value: 'HyunDae',
  },
];

export default CreditCard;
