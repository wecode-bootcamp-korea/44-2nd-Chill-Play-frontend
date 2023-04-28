import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { X } from 'react-feather';
import CHAT_BOT_DATA from './components/CHAT_BOT_DATA';
import BotChat from './components/BotChat';
import ButtonOptions from './components/ButtonOptions';
import { AlignJustify } from 'feather-icons-react/build/IconComponents';

function ChatService() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [chatBody, setChatBody] = useState([]);

  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (chatBodyRef.current !== null) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;

      const intervalId = setInterval(() => {
        chatBody.scrollTop = chatBody.scrollHeight;
      }, 100);

      return () => clearInterval(intervalId);
    }
  }, [isExpanded, chatBody]);

  const handleMouseAction = {
    enter: () => {
      setIsHovering(true);
      document.body.style.overflow = 'hidden';
    },
    leave: () => {
      setIsHovering(false);
      document.body.style.overflow = 'auto';
    },
  };

  const handleExpandClick = () => {
    setIsExpanded(true);
  };

  const handleCloseChat = () => {
    setIsExpanded(false);
    setChatBody([]);
    handleMouseAction.leave();
  };

  const handleOptionClick = optionValue => {
    if (optionValue === 'recommend') {
      setChatBody([
        ...chatBody,
        <>
          <BotChat message={CHAT_BOT_DATA.second.message} />
          <ButtonOptions
            options={CHAT_BOT_DATA.second.options}
            handleOptionClick={handleOptionClick}
          />
        </>,
      ]);
    } else if (optionValue === 'no') {
      handleCloseChat();
    } else if (optionValue === 'reset') {
      setChatBody([]);
    } else if (
      optionValue === '아이다' ||
      '레미제라블' ||
      '시카고' ||
      '오페라의 유령' ||
      '데스노트' ||
      '맨오브라만차' ||
      '캣츠' ||
      '슈퍼클로젯'
    ) {
      setChatBody(prev => [
        ...prev,
        <>
          <BotChat
            optionValue={optionValue}
            message={CHAT_BOT_DATA.third.message}
          />
          <ButtonOptions
            options={CHAT_BOT_DATA.third.options.filter(
              musical => musical.category === optionValue
            )}
            handleOptionClick={handleOptionClick}
            link={true}
            handleCursorLeave={handleMouseAction.leave}
          />
        </>,
      ]);
    }
  };

  return (
    <div>
      {isExpanded ? (
        <ChatMode
          onMouseEnter={handleMouseAction.enter}
          onMouseLeave={handleMouseAction.leave}
          as={motion.div}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: 'spring',
            duration: 0.4,
            delay: 0.2,
          }}
        >
          <CharModeHeader>
            <LogoTitleWrap>
              <LogoImg>🤩</LogoImg>
              <div>
                <HeaderTitle>뮤즈 추천봇</HeaderTitle>
                <HeaderSubText>보통 1-2분 이내에 응답합니다</HeaderSubText>
              </div>
            </LogoTitleWrap>
            <CloseBtn onClick={handleCloseChat}>
              <X color="#6200EE" />
            </CloseBtn>
          </CharModeHeader>
          <ChatBody ref={chatBodyRef}>
            <BotChat message={CHAT_BOT_DATA.initial.message} />
            <ButtonOptions
              options={CHAT_BOT_DATA.initial.options}
              handleOptionClick={handleOptionClick}
            />
            {chatBody}
          </ChatBody>
        </ChatMode>
      ) : (
        <ChatInputButton
          as={motion.div}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: 'spring',
            duration: 0.1,
            delay: 0.3,
          }}
          onClick={handleExpandClick}
        >
          👋
        </ChatInputButton>
      )}
    </div>
  );
}

export default ChatService;

const ChatInputButton = styled.div`
  position: fixed;
  z-index: 9999;
  left: 80px;
  bottom: 80px;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  font-size: 26px;
  background-color: ${({ theme }) => theme.colors.primary.main};
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.4);
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 16px 40px rgb(0 0 0 / 0.3);
  }
`;

const ChatMode = styled.div`
  position: fixed;
  z-index: 9999;
  left: 80px;
  bottom: 80px;
  width: 350px;
  height: 550px;
  background: #fff;
  border-radius: 25px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.4);
`;

const CharModeHeader = styled.div`
  border-radius: 25px 25px 0 0;
  background-color: rgb(255, 255, 255);
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoTitleWrap = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImg = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  border-radius: 5px;
  /* s */
  margin-right: 6px;
`;

const HeaderTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

const HeaderSubText = styled.div`
  font-size: 10px;
  opacity: 0.5;
`;

const CloseBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  opacity: 0.5;
  border-radius: 5px;
  transition: 0.3s;

  &:hover {
    background: rgba(98, 0, 238, 0.3);
  }
`;

const ChatBody = styled.div`
  overflow-x: auto;
  border-radius: 0 0 15px 15px;
  width: 100%;
  height: calc(100% - 60px);

  &::-webkit-scrollbar {
    display: none;
  }
`;
