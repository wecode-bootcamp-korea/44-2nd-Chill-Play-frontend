import React from 'react';
import styled from 'styled-components';

const AgreementTerms = ({ setAgreeTermsIsChecked }) => {
  return (
    <TermsList>
      <AgreeTerms>
        <span>
          <input
            type="checkbox"
            id="agree"
            onClick={() => setAgreeTermsIsChecked(prev => !prev)}
          />
          <label>결제대행 서비스 약관 필수 동의</label>
        </span>
      </AgreeTerms>
      {TERMS_LIST.map(terms => {
        return (
          <Terms key={terms.id}>
            {terms.terms}
            <span>내용보기</span>
          </Terms>
        );
      })}
    </TermsList>
  );
};
const Terms = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  border: 1px solid #d8d9db;
  padding: 0 19px;
  width: 720px;
  height: 38px;
  border-radius: 5px;
  font-size: 15px;

  span {
    font-size: 13px;
    text-decoration: underline;
    cursor: pointer;
  }
`;

const AgreeTerms = styled.div`
  padding-bottom: 10px;

  label {
    padding: 0 0 0 16px;
    line-height: 28px;
    font-size: 18px;
    color: #252525;
    font-weight: 700;
  }
  input[type='checkbox'] {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
  span {
    display: flex;
    align-items: center;
  }
`;

const TermsList = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 60px;
`;

const TERMS_LIST = [
  {
    id: 1,
    terms: '전자금융거래 이용약관',
  },
  {
    id: 2,
    terms: '개인정보 수집 및 이용안내',
  },
  {
    id: 3,
    terms: '개인정보 제공 및 위탁 안내',
  },
];

export default AgreementTerms;
