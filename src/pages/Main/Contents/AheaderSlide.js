import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectFade, Parallax } from 'swiper';
import { MAIN_HEADER } from './data/MainContentsData';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/parallax';

function AheaderSlide() {
  return (
    <Swiper
      style={{
        height: '700px',
        '--swiper-navigation-color': '#ffffff',
      }}
      modules={[Navigation, Autoplay, EffectFade, Parallax]}
      effect="fade"
      spaceBetween={0}
      slidesPerView={1}
      navigation
      autoplay={{ delay: 20000, disableOnInteraction: false }}
      loop={true}
    >
      {MAIN_HEADER.map(item => (
        <SwiperSlide key={item.id}>
          <SlideImg src={item.image} />
          <SlideDim />
          <SlideText data-swiper-parallax="-200">
            <h1>{item.title}</h1>
            <h5>{item.text}</h5>
            <p>{item.date}</p>
            <p>{item.theater}</p>
          </SlideText>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default AheaderSlide;

const SlideImg = styled.img`
  width: 100vw;
  height: 680px;
  object-fit: cover;
`;

const SlideText = styled.div`
  position: absolute;
  top: 160px;
  left: 160px;
  transition: all 0.5;

  h1 {
    margin-bottom: -20px;
    font-size: 60px;
    font-weight: 500;
    color: #ffffff;
  }

  h5 {
    margin-bottom: 80px;
    font-size: 20px;
    font-weight: 400;
    color: #aaaaaa;
  }

  p {
    font-size: 18px;
    font-weight: 400;
    color: #cccccc;
  }
`;

const SlideDim = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.8) 40%,
    rgba(0, 0, 0, 0)
  );
`;
