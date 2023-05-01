import React from 'react';
import styled from 'styled-components';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { Swiper, SwiperSlide } from 'swiper/react';
import useScrollFadeIn from './useScrollFadeIn';
import { MAIN_BENEFITS, MAIN_BENEFITS_CARD } from './data/MainContentsData';
import { Navigation, Autoplay, EffectFade } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/parallax';

function Benefits() {
  return (
    <BenefitContents>
      <BackgroundColor />
      <BenefitWrap>
        <ContentsTitle>혜택</ContentsTitle>
        <EventCard {...useScrollFadeIn('up', 0.2, 0)}>
          {MAIN_BENEFITS_CARD.map(card => (
            <Card key={card.id}>
              <img src={card.image} alt="키드뉴스" />
              <CardDim />
              <CardText>
                <h5>{card.title}</h5>
                <p>{card.text}</p>
              </CardText>
            </Card>
          ))}
        </EventCard>
        <Swiper
          style={{
            width: '700px',
            height: '440px',
            marginLeft: '0px',
          }}
          modules={[Autoplay, EffectFade, Navigation]}
          effect="fade"
          spaceBetween={0}
          slidesPerView={1}
          navigation={{
            prevEl: '.slidePrev-btn',
            nextEl: '.slideNext-btn',
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
        >
          <SlideBenefitsWrap>
            {MAIN_BENEFITS.map(item => (
              <SwiperSlide key={item.id}>
                <SlideBenefitsBg>
                  <SlideBenefitsImg src={item.image} />
                  <SlideBenefitsText>
                    <span>{item.text}</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </SlideBenefitsText>
                </SlideBenefitsBg>
              </SwiperSlide>
            ))}
          </SlideBenefitsWrap>
          <ArrowWrap>
            <Arrow className="slidePrev-btn">
              <ChevronLeft size={20} />
            </Arrow>
            <Arrow className="slideNext-btn">
              <ChevronRight size={20} />
            </Arrow>
          </ArrowWrap>
        </Swiper>
      </BenefitWrap>
    </BenefitContents>
  );
}

export default Benefits;

const BenefitContents = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding-top: 120px;
  padding-bottom: 160px;
`;

const BenefitWrap = styled.div`
  position: relative;
  width: 1080px;
  height: 620px;
  margin: auto;
  text-align: left;
`;

const BackgroundColor = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 300px;
  background-color: ${props => props.theme.colors.primary.main};
`;

const ContentsTitle = styled.h2`
  font-size: 40px;
  font-weight: 500;
`;

const SlideBenefitsWrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const SlideBenefitsBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 700px;
  height: 360px;
  background-color: #ffffff;
  overflow-y: hidden;
`;

const SlideBenefitsImg = styled.img`
  position: absolute;
  right: 20px;
  top: 50px;
  width: 420px;
  height: 420px;
  object-position: top right;
  object-fit: contain;
`;

const SlideBenefitsText = styled.div`
  position: absolute;
  top: 80px;
  left: 20px;
  width: 280px;
  transition: all 0.5;
  white-space: pre-wrap;

  h3 {
    margin-top: 10px;
    margin-bottom: 20px;
    font-size: 32px;
    font-weight: 700;
    color: ${props => props.theme.colors.primary.dark};
  }

  span {
    font-size: 16px;
    font-weight: 400;
    color: ${props => props.theme.colors.black};
  }

  p {
    font-size: 16px;
    font-weight: 400;
    color: #666;
  }
`;

const EventCard = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: end;
  left: 0;
  bottom: 0;
  width: 1100px;
  z-index: 3;
`;

const Card = styled.div`
  position: relative;
  width: 220px;
  height: 220px;
  white-space: pre-wrap;
  filter: drop-shadow(8px 1px 12px rgba(35, 21, 56, 0.15));

  &:nth-child(2) {
    width: 480px;
    height: 220px;
  }

  &:last-child {
    width: 360px;
    height: 480px;
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 12px;
    object-fit: cover;
  }
`;

const CardText = styled.div`
  position: absolute;
  bottom: 10px;
  left: 30px;

  h5 {
    margin-bottom: -10px;
    font-size: 20px;
    font-weight: 700;
    color: #ffffff;
  }

  p {
    font-size: 18px;
    font-weight: 400;
    color: #cccccc;
  }
`;

const CardDim = styled.div`
  position: absolute;
  width: 100%;
  height: 50%;
  bottom: 0;
  border-radius: 12px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.5) 20%, rgba(0, 0, 0, 0));
`;

const ArrowWrap = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 25px;
  left: 10px;
  z-index: 10;
  border-radius: 50%;
  padding: 5px;
  transition: background-color 0.3s;
`;

const Arrow = styled.span`
  height: 20px;
  width: 20px;
  color: #000000;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.colors.primary.main};
  }
`;
