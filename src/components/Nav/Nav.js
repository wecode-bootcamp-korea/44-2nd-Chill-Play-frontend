import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';
import NavHeader from './NavHeader';
import Navigation from './Navigation';
import { ArrowUp } from 'react-feather';
const CHANGE_NAV_COLOR_THEME = 150;

function Nav() {
  const targetRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = location.pathname;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTarget = targetRef.current;
      const scrollTop = window.pageYOffset;
      if (scrollTop > CHANGE_NAV_COLOR_THEME) {
        scrollTarget.style.background =
          'linear-gradient(to right, #4A00B4, #6200EE 59%, #7C21FF)';
        setIsActive(true);
      } else {
        scrollTarget.style.background = 'white';
        setIsActive(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <HeaderWrap>
        <NavHeader />
      </HeaderWrap>
      <NavContainer ref={targetRef}>
        <NavWrap>
          <Navigation isActive={isActive} />
        </NavWrap>
      </NavContainer>
      {isActive ? (
        <FixedBtn>
          <ToMainTop>
            <ArrowUp size={28} onClick={scrollToTop} />
          </ToMainTop>
          {currentPage !== '/booking' && currentPage !== '/signin' ? (
            <ToBooking
              isActive={isActive}
              onClick={() => {
                navigate('/booking');
              }}
            >
              예매하기
            </ToBooking>
          ) : null}
        </FixedBtn>
      ) : null}
    </>
  );
}

export default Nav;

const HeaderWrap = styled.div`
  width: 100%;
  border-bottom: 1px solid lightgrey;
`;

const NavContainer = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  background: white;
  z-index: 1000;
`;

const NavWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 980px;
  margin: 0 auto;
`;

const FixedBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  position: fixed;
  bottom: 80px;
  margin-left: 280px;
  text-align: center;
  z-index: 10;
  right: 17%;
`;

const ToMainTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  left: 75px;
  width: 48px;
  height: 48px;
  background-color: #f5f8fa;
  border: 1px solid #252525;
  border-radius: 50%;
  box-shadow: 1px 3px 6px 0 rgb(0 0 0 / 30%);
  opacity: 1;
  transition: opacity 0.4s;
  cursor: pointer;
`;

const ToBooking = styled.div`
  position: absolute;
  right: auto;
  ${props =>
    props.isActive &&
    css`
      animation: ${move} 0.25s ease-in-out;
    `}
  width: 136px;
  padding: 12px 0 14px;
  font-weight: 500;
  font-size: 16px;
  color: #fff;
  background: linear-gradient(to right, #4a00b4, #6200ee 59%, #7c21ff);
  box-shadow: 1px 3px 6px 0 rgb(0 0 0 / 30%);
  border-radius: 25px;
  cursor: pointer;
`;

const move = keyframes`
  0% {
    left: 0;
  }
  100% {
    left: -75px;
  }
`;
