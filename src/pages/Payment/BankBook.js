import React from 'react';
import styled from 'styled-components';

const BankBook = () => {
  return (
    <BankBookWrap>
      {GUIDANCE_PHRASE.map(phrase => {
        return <em key={phrase.id}> - {phrase.guide}</em>;
      })}
    </BankBookWrap>
  );
};

const BankBookWrap = styled.div`
  padding: 20px;
  margin-top: 5px;

  em {
    display: inline-block;
    font-size: 14px;
    font-style: normal;
  }
`;

const GUIDANCE_PHRASE = [
  {
    id: 1,
    guide:
      '내 통장 결제는 본인명의의 계좌를 최초 1회 등록 후 비밀번호 입력만으로 간편하게 이용할 수 있는 현금결제 서비스 입니다.',
  },
  {
    id: 2,
    guide: '은행 점검시간의 경우 내 통장결제 서비스 이용이 불가합니다.',
  },
];

export default BankBook;
