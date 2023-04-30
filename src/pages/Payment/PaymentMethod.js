import React, { useState } from 'react';
import styled from 'styled-components';
import CreditCard from './CreditCard';
import Cellphone from './Cellphone';
import SimplePay from './SimplePay';
import BankBook from './BankBook';

function PaymentMethod({ setSimplePay, setPaymentText }) {
  const [payMethod, setPayMethod] = useState('신용카드');
  const radioValueHandler = e => {
    setPayMethod(e.target.value);
    setPaymentText(e.target.value);
    e.target.value !== 3 && setSimplePay('');
  };
  const PayMethodOutput = method => {
    const paymentProcess = {
      신용카드: <CreditCard />,
      휴대폰결제: <Cellphone />,
      간편결제: <SimplePay setSimplePay={setSimplePay} />,
    };
    return paymentProcess[method] || <BankBook />;
  };

  return (
    <PaymentMethodWrap>
      <RadioGroup>
        {PAYMENT_METHOD.map(method => {
          return (
            <span key={method.id}>
              <RadioButton
                type="radio"
                value={method.value}
                onChange={radioValueHandler}
                checked={payMethod === method.value}
                name="radioPayment"
              />
              <label>{method.payment}</label>
            </span>
          );
        })}
      </RadioGroup>
      {PayMethodOutput(payMethod)}
    </PaymentMethodWrap>
  );
}

const RadioButton = styled.input.attrs({ type: 'radio' })`
  /* 공통 스타일 */
  position: absolute;
  margin: 0;
  padding: 0;
  outline: none;
  border: none;
  box-shadow: none;

  /* type="radio" 선택자 */
  &[type='radio'] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 1px solid #ccc;
    background-color: #fff;
    cursor: pointer;

    &:checked {
      padding: 5px;
      border: 7px solid #7c21ff;
      border-color: #7c21ff;
      background-color: white;
    }
  }
`;

const RadioGroup = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid lightgrey;

  span {
    display: flex;
    align-items: center;
    margin-right: 20px;
  }
  label {
    position: relative;
    margin-top: 4px;
    margin-left: 27px;
  }
`;

const PaymentMethodWrap = styled.div`
  margin-top: 20px;
  border: 1px solid lightgrey;
  /* border-top-left-radius: 10px;
  border-top-right-radius: 10px; */
  border-radius: 10px;
  width: 100%;
`;

const PAYMENT_METHOD = [
  {
    id: 1,
    payment: '신용카드',
    value: '신용카드',
  },
  {
    id: 2,
    payment: '휴대폰 결제',
    value: '휴대폰결제',
  },
  {
    id: 3,
    payment: '간편결제',
    value: '간편결제',
  },
  {
    id: 4,
    payment: '내 통장 결제',
    value: '무통장입금',
  },
];

export default PaymentMethod;
