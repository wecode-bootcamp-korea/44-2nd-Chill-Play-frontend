import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PulseLoader } from 'react-spinners';
import { API } from '../../../config';

function KakaoAuth() {
  const navigate = useNavigate();
  const location = useLocation();
  const CODE = location.search.split('=')[1];

  function getKakaoToken() {
    fetch(`${API.kakaoAuthToken}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      body: `grant_type=authorization_code&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&code=${CODE}`,
    })
      .then(res => res.json())
      .then(data => {
        if (data.access_token) {
          fetch(`${API.kakaoLogin}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({
              kakaoAccessToken: data.access_token,
              nickname: '',
            }),
          })
            .then(response => response.json())
            .then(result => {
              if (result.token) {
                localStorage.setItem('TOKEN', result.token);
                localStorage.setItem('username', result.nickname);
                alert('로그인 성공했어요!');
                navigate('/');
              }
            });
        } else {
          alert('다시 한 번 로그인해주세요!');
          navigate('/signin');
        }
      });
  }

  useEffect(() => {
    getKakaoToken();
  }, []);

  return (
    <Spinner>
      <PulseLoader color="#6200EE" margin={8} size={20} />
    </Spinner>
  );
}

export default KakaoAuth;

const Spinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
