import React, { useState } from 'react';
import styled from 'styled-components';

const SimplePay = ({ setSimplePay }) => {
  const [simplePayMethod, setSimplePayMethod] = useState('');
  const paymentRadioValueHandler = e => {
    setSimplePayMethod(e.target.value);
    setSimplePay(e.target.value);
  };

  return (
    <SimplePayWrap>
      <SimplePayRadioGroup>
        {SIMPLEPAY_METHOD.map(method => {
          return (
            <span key={method.id}>
              <SimplePayRadioButton
                type="radio"
                value={method.value}
                onChange={paymentRadioValueHandler}
                checked={simplePayMethod === method.value}
                name="radioSimplePayment"
              />
              <label>{method.name}</label>
            </span>
          );
        })}
      </SimplePayRadioGroup>
    </SimplePayWrap>
  );
};

const SimplePayRadioButton = styled.input.attrs({ type: 'radio' })`
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
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 1px solid #ccc;
    background-color: #fff;
    cursor: pointer;

    &:checked {
      padding: 3px;
      border: 5px solid #6200ee;
      border-color: #6200ee;
      background-color: white;
    }
  }
`;

const SimplePayRadioGroup = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;

  span {
    display: flex;
    align-items: center;
    margin-right: 20px;
  }
  label {
    position: relative;
    margin-top: 2px;
    margin-left: 22px;
  }
`;

const SimplePayWrap = styled.div`
  display: flex;
  align-items: center;
`;

const SIMPLEPAY_METHOD = [
  {
    id: 1,
    name: '토스페이',
    value: '토스페이',
  },
  {
    id: 2,
    name: '네이버페이',
    value: '네이버페이',
  },
  {
    id: 3,
    name: '카카오페이',
    value: '카카오페이',
  },
  {
    id: 4,
    name: '페이코',
    value: '페이코',
  },
];

export default SimplePay;
