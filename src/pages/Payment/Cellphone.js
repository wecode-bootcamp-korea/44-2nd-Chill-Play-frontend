import React from 'react';
import styled from 'styled-components';

const Cellphone = () => {
  return (
    <CellphoneWrap>
      {GUIDANCE_PHRASE.map(phrase => {
        return <em key={phrase.id}> - {phrase.guide}</em>;
      })}
    </CellphoneWrap>
  );
};

const CellphoneWrap = styled.div`
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
      '결제하신 금액은 익월 요금에 합산되어 청구되며, 휴대폰 결제한도는 통신사별 월 누적 이용제한에 따라 적용됩니다.',
  },
  {
    id: 2,
    guide:
      '매월 말일 23시30분 ~ 익월 00시 10분까지(40분간)는 시스템 점검시간으로 이용이 어려울 수 있습니다.',
  },
  {
    id: 3,
    guide: '휴대폰 결제와 관련된 추가 안내는 FAQ를 참조해주세요.',
  },
];

export default Cellphone;
