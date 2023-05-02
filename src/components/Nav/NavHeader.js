import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Lock, Unlock, UserPlus, User, Headphones } from 'react-feather';
import logo from '../../assets/images/muse-logo-theme-3x.png';

function NavHeader() {
  const [currentLogin, setCurrentLogin] = useState(false);
  const navigate = useNavigate();
  const isLogin = localStorage.getItem('TOKEN');

  const LogoutHandler = () => {
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('username');
    setCurrentLogin(prev => !prev);
  };

  return (
    <HeaderContent>
      <HeaderTitle
        onClick={() => {
          navigate('/');
        }}
      >
        <div />
        <span>
          당신의
          <span style={{ color: '#6200EE', fontWeight: '400' }}> 뮤즈</span>를
          찾으세요
        </span>
      </HeaderTitle>
      <HeaderMenu>
        {isLogin ? (
          <HeaderItem onClick={() => LogoutHandler()}>
            <Unlock size={24} />
            <span>로그아웃</span>
          </HeaderItem>
        ) : (
          <HeaderItem>
            <Link to="/signin">
              <Lock size={24} />
              <span>로그인</span>
            </Link>
          </HeaderItem>
        )}
        {HEADER_MENU_LIST.map(list => {
          return (
            <HeaderItem key={list.id}>
              <Link to={list.path}>
                {list.icon}
                <span>{list.Text}</span>
              </Link>
            </HeaderItem>
          );
        })}
      </HeaderMenu>
    </HeaderContent>
  );
}

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 980px;
  margin: 0 auto;
  padding: 30px 6px 25px 5px;
  background-color: #fff;
`;

const HeaderTitle = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  div {
    display: block;
    float: left;
    width: 120px;
    height: 49px;
    margin-right: 10px;
    background-image: url(${logo});
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
  }

  span {
    font-weight: 300;
    font-size: 14px;
    margin-top: 5px;
    color: #212124;
  }
`;

const HeaderMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;

  li {
    margin-left: 44px;
    margin-top: 2px;
  }
`;

const HeaderItem = styled.li`
  display: block;
  position: relative;
  padding-bottom: 19px;
  cursor: pointer;

  a {
    text-decoration: none !important;
  }

  span {
    position: absolute;
    bottom: 0;
    left: 50%;
    font-size: 13px;
    color: #666;
    white-space: nowrap;
    transform: translateX(-50%);
  }
`;

const HEADER_MENU_LIST = [
  {
    id: 1,
    path: '/signup',
    Text: '회원가입',
    icon: <UserPlus size={24} />,
  },
  {
    id: 2,
    path: '/my',
    Text: 'My Muse',
    icon: <User size={24} />,
  },
  {
    id: 3,
    path: '',
    Text: '고객센터',
    icon: <Headphones size={24} />,
  },
];

export default NavHeader;
