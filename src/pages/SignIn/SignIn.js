import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { KAKAO_AUTH_URL } from './KakaoAuth/KakaoAuthUrl';
import logoBtnImg from '../../assets/images/SignIn/kakaoBtn.png';
import logo from '../../assets/images/muse-logo-white-3x.png';
import backgroundImg from '../../assets/images/SignIn/img.png';

function SignIn() {
  const navigate = useNavigate();

  function handleLogin() {
    window.location.href = KAKAO_AUTH_URL;
  }

  return (
    <>
      <Wrap imgUrl={backgroundImg}>
        <div />
      </Wrap>
      <Container imgUrl={backgroundImg}>
        <Title
          onClick={() => {
            navigate('/');
          }}
        />
        <SubTitle>
          당신의 <span>뮤즈</span>를 찾으세요.
        </SubTitle>
        <SubText>로그인하고 빠른 시작하기</SubText>
        <KakaoButton imgUrl={logoBtnImg} onClick={handleLogin} />
      </Container>
    </>
  );
}

export default SignIn;

const Wrap = styled.div`
  position: relative;

  div {
    ${prop =>
      prop.imgUrl &&
      css`
        background-image: url(${backgroundImg});
      `}
    width: 100%;
    height: 100vh;
    background-size: cover;
  }
`;

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  transform: translate(-50%, -10%);
`;

const Title = styled.div`
  background-image: url(${logo});
  background-size: cover;
  background-position: center center;
  width: 238px;
  height: 98px;
  margin: auto;
  margin-bottom: 20px;
`;

const SubTitle = styled.p`
  margin-bottom: 20px;
  font-size: 18px;
  color: #cccccc;

  span {
    color: #ffffff;
    font-weight: 700;
  }
`;

const SubText = styled.p`
  display: inline-block;
  margin-top: 140px;
  margin-bottom: 16px;
  border: 2px solid #cccccc;
  border-radius: 40px 40px 40px 0px;
  padding: 10px 16px;
  font-size: 14px;
  color: #ffffff;
`;

const KakaoButton = styled.div`
  ${prop =>
    prop.imgUrl &&
    css`
      background-image: url(${logoBtnImg});
    `}
  background-size: cover;
  background-position: center center;
  width: 400px;
  height: 60px;
  border-radius: 12px;
  cursor: pointer;
`;
