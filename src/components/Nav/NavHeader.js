import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Lock, UserPlus, User, Headphones } from 'react-feather';

function NavHeader() {
  const navigate = useNavigate();
  return (
    <HeaderContent>
      <HeaderTitle
        onClick={() => {
          navigate('/');
        }}
      >
        <img src="/images/muse-logo-theme.png" alt="Muse Logo" />
        <span>
          당신의
          <span style={{ color: '#6200EE', fontWeight: '400' }}>뮤즈</span>를
          찾으세요
        </span>
      </HeaderTitle>
      <HeaderMenu>
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
  align-items: flex-end;
  cursor: pointer;

  img {
    display: block;
    float: left;
    height: 100%;
    margin-right: 10px;
  }

  span {
    font-weight: 300;
    font-size: 14px;
    margin-top: 5px;
    margin-left: 10px;
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
    path: '/signin',
    Text: '로그인',
    icon: <Lock size={24} />,
  },
  {
    id: 2,
    path: '/signup',
    Text: '회원가입',
    icon: <UserPlus size={24} />,
  },
  {
    id: 3,
    path: '',
    Text: 'My Muse',
    icon: <User size={24} />,
  },
  {
    id: 4,
    path: '',
    Text: '고객센터',
    icon: <Headphones size={24} />,
  },
];

export default NavHeader;
