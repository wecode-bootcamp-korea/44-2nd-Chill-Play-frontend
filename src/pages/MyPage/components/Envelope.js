import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import themeColorLogo from '../../../assets/images/muse-logo-theme.png';
import barcode from '../../../assets/images/barcodeTest.png';
import whiteLogo from '../../../assets/images/muse-logo-white-3x.png';

function Envelope({ ticketData, ticketRef }) {
  const [ticketVisible, setTicketVisible] = useState(false);

  const controls = useAnimation();

  const handleEnvelopeClick = async () => {
    if (!ticketVisible) {
      await controls.start('translateY');
      controls.start('enlarged');
    } else {
      await controls.start('shrink');
      controls.start('translateYBack');
    }
    setTicketVisible(!ticketVisible);
  };

  const variants = {
    initial: {
      y: 0,
      scale: 1,
      zIndex: 2,
    },
    translateY: {
      y: -220,
      transition: { duration: 0.2 },
      zIndex: 2,
    },
    enlarged: {
      y: -220,
      scale: 1.2,
      transition: { duration: 0.3 },
      zIndex: 10,
    },
    shrink: {
      y: -200,
      scale: 1,
      transition: { duration: 0.3 },
      zIndex: 10,
    },
    translateYBack: {
      y: 0,
      transition: { duration: 0.2 },
      zIndex: 2,
    },
  };

  return (
    <Container onClick={handleEnvelopeClick}>
      <EnvelopeBack />
      {ticketData?.orderNumber && (
        <Ticket
          ref={ticketRef}
          onClick={handleEnvelopeClick}
          variants={variants}
          initial="initial"
          animate={controls}
        >
          <TicketBody>
            <MuseLogo imgUrl={themeColorLogo} />
            <ItemLabel>뮤지컬</ItemLabel>
            <MusicalName>{ticketData.musicalName}</MusicalName>
            <ItemRow>
              <div>
                <ItemLabel>날짜</ItemLabel>
                <ItemContent>{ticketData.musicalDate}</ItemContent>
              </div>
              <div>
                <ItemLabel>상영시간</ItemLabel>
                <ItemContent>
                  {ticketData.startTime}&nbsp;~&nbsp;{ticketData.endTime}
                </ItemContent>
              </div>
            </ItemRow>
            <ItemLabel>좌석</ItemLabel>
            <ItemContent>
              {ticketData.seatInfo?.map(seat => (
                <span key={seat}>{seat}</span>
              ))}
            </ItemContent>
          </TicketBody>
          <TicketTip>
            <TipContent imgUrl={barcode} />
          </TicketTip>
        </Ticket>
      )}
      <EnvelopeBody />
      <EnvelopeHead isOpen={ticketVisible} />
      <WhiteMuseLogo imgUrl={whiteLogo} />
    </Container>
  );
}

export default Envelope;

const Container = styled.div`
  position: relative;
  cursor: pointer;
  margin-top: 140px;
  margin-bottom: 20px;
`;

const EnvelopeHead = styled.div`
  position: absolute;
  border-top: 105px solid #53596e;
  border-left: 200px solid transparent;
  border-right: 200px solid transparent;
  height: 0;
  width: 0;
  top: 0;
  transform-origin: top;
  transition: 0.2s;
  transform: rotateX(180deg);
  z-index: 0;
`;

const EnvelopeBack = styled.div`
  position: relative;
  width: 400px;
  height: 200px;
  background-color: #393e4d;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
    0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07),
    0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);
`;

const EnvelopeBody = styled.div`
  position: absolute;
  border-right: 200px solid #454a5c;
  border-top: 100px solid transparent;
  border-bottom: 100px solid transparent;
  height: 0;
  width: 0;
  top: 0;
  left: 200px;
  z-index: 7;

  &:before {
    content: '';
    position: absolute;
    border-left: 200px solid #454a5c;
    border-top: 100px solid transparent;
    border-bottom: 100px solid transparent;
    height: 0;
    width: 0;
    top: -100px;
    left: -200px;
  }

  &:after {
    content: '';
    position: absolute;
    border-bottom: 105px solid #3c404f;
    border-left: 200px solid transparent;
    border-right: 200px solid transparent;
    height: 0;
    width: 0;
    top: -5px;
    left: -200px;
  }
`;

const Ticket = styled(motion.div)`
  position: absolute;
  display: flex;
  align-items: center;
  top: 10px;
  left: 10px;
  transition: 0.2s;
  user-select: none;

  ${({ isVisible }) =>
    isVisible === true &&
    css`
      transform: translateY(-200px);
    `}
`;

const TicketBody = styled.div`
  background-color: #fff;
  color: ${({ theme }) => theme.colors.black};
  height: 180px;
  width: 280px;
  border-radius: 10px 25px 25px 10px;
  z-index: 2;
  padding: 16px;
`;

const MuseLogo = styled.div`
  margin-bottom: 16px;
  width: 50px;
  height: 20px;
  ${({ imgUrl }) =>
    imgUrl &&
    css`
      background-image: url(${imgUrl});
    `}
  background-size: cover;
  background-position: center center;
`;

const ItemLabel = styled.div`
  margin-top: 4px;
  font-size: 10px;
  color: #8d8d8d;
`;

const MusicalName = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const ItemContent = styled.div`
  font-size: 14px;
  font-weight: bold;

  span {
    padding-right: 4px;
  }
`;

const ItemRow = styled.div`
  display: flex;

  div {
    width: 50%;

    div {
      width: 100%;
    }
  }
`;

const TicketTip = styled.div`
  background-color: #fff;
  height: 180px;
  width: 100px;
  border-radius: 25px 10px 10px 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TipContent = styled.div`
  ${({ imgUrl }) =>
    imgUrl &&
    css`
      width: 60px;
      height: 140px;
      background-image: url(${imgUrl});
      background-size: cover;
      background-position: center center;
    `}
`;

const WhiteMuseLogo = styled.div`
  position: absolute;
  z-index: 20;
  margin-top: -50px;
  margin-left: 175px;
  ${({ imgUrl }) =>
    imgUrl &&
    css`
      width: 50px;
      height: 20px;
      background-image: url(${imgUrl});
      background-size: cover;
      background-position: center center;
    `}
`;
