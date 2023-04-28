import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import LoadingDotsAnimation from './LoadingDotsAnimation';
import alphabetLogo from '../../../assets/images/alphabetLogo.png';

function BotChat({ optionValue = '', message }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  const optionText = {
    historical: '역사/감동',
    judgment: '범죄/심판',
    thriller: '스릴러/판타지',
    music: '음악/댄스',
  };

  return (
    <BotChatComponent>
      <BotProfile>
        <BotProfilePic imageSrc={alphabetLogo} />
        <BotName>뮤즈 추천봇</BotName>
      </BotProfile>
      <ChatContent>
        {loading === true ? (
          <LoadingDotsAnimation />
        ) : (
          <>
            <Genre>{optionText[optionValue]}</Genre>
            {message}
          </>
        )}
      </ChatContent>
    </BotChatComponent>
  );
}

export default BotChat;

const BotChatComponent = styled.div`
  padding: 14px;
`;

const BotProfile = styled.div`
  display: flex;
  align-items: center;
`;

const BotProfilePic = styled.div`
  ${({ imageSrc }) =>
    imageSrc &&
    css`
      background-image: url(${imageSrc});
      background-size: cover;
      background-position: center center;
    `}
  width: 18px;
  height: 18px;
  border-radius: 5px;
  background-color: orange;
  margin-right: 6px;
`;

const BotName = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

const ChatContent = styled.div`
  border-radius: 15px;
  background-color: #e8e8e8;
  padding: 10px 12px;
  font-size: 14px;
  margin-top: 6px;
  margin-left: 18px;
  margin-right: 38px;
`;

const Genre = styled.span`
  font-weight: 600;
  padding-right: 4px;
`;
