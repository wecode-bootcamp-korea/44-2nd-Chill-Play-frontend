import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PaymentMethod from './PaymentMethod';
import AgreementTerms from './AgreementTerms';
import { API } from '../../config';
import { loadTossPayments } from '@tosspayments/payment-sdk';
const clientKey = process.env.REACT_APP_CLIENTKEY;

function Payment() {
  const [musical, setMusical] = useState({});
  const [simplePay, setSimplePay] = useState('');
  const [userName, setUserName] = useState('');
  const [paymentText, setPaymentText] = useState('신용카드');
  const [isAgreeTermChecked, setAgreeTermsIsChecked] = useState(false);
  const navigate = useNavigate();

  const askAfterPay = () => {
    const answerToAsk = window.confirm(
      '결제가 완료되었습니다! 마이페이지로 이동해 확인하시겠습니까?'
    );
    return answerToAsk ? navigate('/My') : navigate('/');
  };

  const tossPaymentOperator = () => {
    if (simplePay === '토스페이' && isAgreeTermChecked) {
      loadTossPayments(clientKey).then(tossPayments => {
        tossPayments
          .requestPayment(simplePay, {
            // 결제수단 파라미터
            // 결제 정보 파라미터
            amount: 460000,
            orderId: 'RBxkWlcf1bFBP5LGTpOdf',
            orderName: `${musical.selectedMusical?.title}, ${
              musical.selectedSeats?.seatValues[0]
            } 외 ${musical.selectedSeats?.numberOfSeats - 2}석`,
            customerName: userName,
          })
          .then(function (result) {
            // 결제가 성공했을 때 처리
            fetch(`${API.payment}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json;charset=utf-8',
                authorization: localStorage.getItem('Token'),
              },
              body: JSON.stringify({
                totalAmount: musical.totalAmount,
                musicalId: musical.selectedMusical.id,
                seatArray: musical.selectedSeats.seatValues,
                musicalScheduleId: musical.selectedTime.id,
              }),
            }).then(askAfterPay());
          })
          .catch(function (error) {
            if (error.code === 'USER_CANCEL') {
              // 결제 고객이 결제창을 닫았을 때 에러 처리
              alert('결제도중 취소하였습니다.');
            } else if (error.code === 'INVALID_CARD_COMPANY') {
              // 유효하지 않은 카드 코드에 대한 에러 처리
              alert('카드번호가 유효하지 않습니다.');
            }
          });
      });
    } else {
      alert('결제수단 선택 및 이용약관에 동의해 주시기 바랍니다.');
    }
  };

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const kakaoUserName = JSON.parse(localStorage.getItem('userName'));
    setMusical(userData);
    setUserName(kakaoUserName);
  }, []);

  return (
    <PaymentWrap>
      <PaymentHead>예약하기</PaymentHead>
      <PaymentBody>
        <PaymentInfo>
          <ChooseMusical>
            <img src={musical.selectedMusical?.image} alt="뮤지컬 포스트" />
            <MusicalInfo>
              <strong>{musical.selectedMusical?.title}</strong>
              <MusicalInfoText>{musical.selectedTheatre?.name}</MusicalInfoText>
              <MusicalInfoText>{musical.selectedDate}</MusicalInfoText>
              <MusicalInfoText>
                {musical.selectedSeats?.seatValues.join(', ')} | 좌석수 :{' '}
                {musical.selectedSeats?.numberOfSeats}
              </MusicalInfoText>
            </MusicalInfo>
          </ChooseMusical>
          <PaymentMethod
            setSimplePay={setSimplePay}
            setPaymentText={setPaymentText}
          />
        </PaymentInfo>
        <PriceInfo>
          <TotalPrice>
            <span>최종결제금액</span>
            <em>
              <strong>{musical.totalAmount}</strong>
              <span>원</span>
            </em>
          </TotalPrice>
          <HowToPay>
            <span>결제수단</span>
            <strong>
              {paymentText !== '간편결제' ? paymentText : simplePay}
            </strong>
          </HowToPay>
          <PayButton onClick={tossPaymentOperator}>결제하기</PayButton>
        </PriceInfo>
      </PaymentBody>
      {simplePay ? (
        <AgreementTerms setAgreeTermsIsChecked={setAgreeTermsIsChecked} />
      ) : null}
    </PaymentWrap>
  );
}
const PayButton = styled.button`
  width: auto;
  padding: 12px 0 14px;
  font-weight: 500;
  font-size: 16px;
  color: #fff;
  background: linear-gradient(to right, #4a00b4, #6200ee 59%, #7c21ff);
  border: none;
  border-radius: 15px;
  cursor: pointer;
`;

const HowToPay = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;

  span {
    font-size: 14px;
  }
  strong {
    font-size: 16px;
    color: #7c20ff;
  }
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid lightgrey;

  span {
    font-size: 14px;
  }
  em {
    font-size: 18px;
  }
  strong {
    margin-right: 7px;
    color: #7c21ff;
  }
`;

const PriceInfo = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  position: sticky;
  margin-top: 20px;
  margin-left: 30px;
  padding: 10px 20px;
  border: 1px solid lightgrey;
  border-radius: 10px;
  width: 250px;
  height: auto;
`;

const MusicalInfoText = styled.span`
  font-size: 14px;
`;

const MusicalInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  border-left: 2px dashed lightgrey;
  padding: 10px;
  width: 200px;
  height: 100%;

  strong {
    font-size: 16px;
    font-weight: 500;
  }
`;

const ChooseMusical = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-top: 20px;
  margin-bottom: 40px;
  border: 2px solid lightgrey;
  border-radius: 10px;
  width: 100%;
  height: 190px;
  box-shadow: 0 0 15px lightgrey;

  img {
    width: 120px;
    height: 100%;
    border-radius: 10px;
    background-color: beige;
  }
`;

const PaymentInfo = styled.div`
  width: 720px;
`;

const PaymentBody = styled.div`
  display: flex;
  margin-top: 10px;
  height: 100%;

  p {
    margin: 5px 0;
    font-size: 18px;
    font-weight: 400;
  }
`;

const PaymentHead = styled.h4`
  padding: 0 0 20px 0;
  margin: 0;
  font-size: 26px;
  font-weight: 500;
  border-bottom: 1px solid #252525;
`;

const QuickReserve = styled.div`
  position: relative;
`;

const PaymentWrap = styled.div`
  width: 1000px;
  margin: 60px auto;
`;

export default Payment;
