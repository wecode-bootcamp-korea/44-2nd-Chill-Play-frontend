import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import TicketSection from './TicketSection';
import HistorySection from './HistorySection';
import { API } from '../../config';

function MyPage() {
  const [myPageData, setMyPageData] = useState([]);
  const [showHistory, setShowHistory] = useState(true);
  const username = localStorage.getItem('username');

  const handleTabClick = () => {
    setShowHistory(!showHistory);
  };

  useEffect(() => {
    fetch(`${API.mypage}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('TOKEN'),
      },
    })
      .then(response => response.json())
      .then(result => {
        setMyPageData(result);
      });
  }, []);

  return (
    <div>
      <TopBanner>
        <InfoSection>
          <CenterDiv>
            <ProfilePic imgUrl={myPageData[0]?.profileImage} />
          </CenterDiv>
          <CenterDiv>
            <Greeting>
              안녕하세요,
              <span>&nbsp;{username ? username : '사용자'}</span>님
            </Greeting>
          </CenterDiv>
          <CenterDiv>
            <SignOutBtn>로그아웃</SignOutBtn>
          </CenterDiv>
        </InfoSection>
      </TopBanner>
      <TabMenuContainer>
        <TabMenu showFirst={showHistory}>
          {showHistory === false && (
            <TabMenuText onClick={handleTabClick}>예매한 티켓</TabMenuText>
          )}
          <TabHandle as={motion.div} onClick={handleTabClick} layout>
            {showHistory ? '예매한 티켓' : '결제 내역'}
          </TabHandle>
          {showHistory && (
            <TabMenuText onClick={handleTabClick}>결제 내역</TabMenuText>
          )}
        </TabMenu>
      </TabMenuContainer>
      <TabMenuContentContainer>
        {showHistory === true ? (
          <TicketSection ticketData={myPageData[0]?.orderInfo[0]} />
        ) : (
          <HistorySection historyData={myPageData[0]?.orderInfo} />
        )}
      </TabMenuContentContainer>
    </div>
  );
}

export default MyPage;

const TopBanner = styled.div`
  background: linear-gradient(
    280deg,
    ${({ theme }) => theme.colors.primary.dark},
    #a853fc
  );

  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InfoSection = styled.div`
  margin-bottom: -80px;
  width: 800px;
  background: #fff;
  padding: 24px;
  border-radius: 15px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
    0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07),
    0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);
`;

const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const ProfilePic = styled.div`
  margin-top: 24px;
  width: 80px;
  height: 80px;
  background-color: ${({ theme }) => theme.colors.primary.light};
  ${({ imgUrl }) =>
    imgUrl &&
    css`
      background-image: url(${imgUrl});
    `}

  background-size: cover;
  background-position: center center;
  border-radius: 50%;
`;

const Greeting = styled.div`
  padding-top: 24px;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.black};

  span {
    font-weight: bolder;
  }
`;

const SignOutBtn = styled.button`
  margin-top: 16px;
  padding: 4px 10px;
  outline: 0;
  border: 2px solid #c2c2c2;
  color: #c2c2c2;
  background: #fff;
  font-size: 12px;
  font-weight: 600;
  border-radius: 25px;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    border: 2px solid ${({ theme }) => theme.colors.themeRed};
    color: ${({ theme }) => theme.colors.themeRed};
  }
`;

const TabMenuContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 40px;
`;

const TabMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 800px;
  height: 70px;
  display: flex;

  ${({ showFirst }) =>
    showFirst === false &&
    css`
      justify-content: flex-end;
    `}
`;

const TabHandle = styled(motion.div)`
  height: 50px;
  width: 390px;
  background-color: ${({ theme }) => theme.colors.primary.light};
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  cursor: pointer;
`;

const TabMenuText = styled.div`
  height: 50px;
  width: 390px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.6;
  cursor: pointer;
`;

const TabMenuContentContainer = styled.div`
  display: flex;
  justify-content: center;
`;
