import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useScrollFadeIn from './useScrollFadeIn';
import { CURATION_DATA } from './data/MainContentsData';

function Curation() {
  return (
    <CurationContents>
      <BackgroundColor />
      <CurationWrap>
        <ContentsTitle>큐레이션</ContentsTitle>
        <CardWrap {...useScrollFadeIn('up', 0.3, 0)}>
          <CardMain>
            <CardMainImg>
              <img src={CURATION_DATA[0].src} alt="뮤지컬작품" />
              <Link to="/booking">
                <button>
                  <strong>{`' ${CURATION_DATA[0].title} '`}</strong> 예매하기
                </button>
              </Link>
            </CardMainImg>
            <CardMainText>
              <h5>{CURATION_DATA[0].subtitle}</h5>
              <h3>{CURATION_DATA[0].title}</h3>
              <p>{CURATION_DATA[0].description}</p>
            </CardMainText>
            <Tag>MUSE CLASSIC SOCIETY</Tag>
          </CardMain>
          <CardSub>
            <li>
              <img src={CURATION_DATA[1].src} alt="뮤지컬작품" />
            </li>
            <li>
              <img src={CURATION_DATA[2].src} alt="뮤지컬작품" />
            </li>
            <li>
              <img src={CURATION_DATA[3].src} alt="뮤지컬작품" />
            </li>
          </CardSub>
        </CardWrap>
      </CurationWrap>
    </CurationContents>
  );
}

export default Curation;

const CurationContents = styled.div`
  position: relative;
  padding-top: 120px;
  padding-bottom: 120px;
`;

const BackgroundColor = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #231538;
`;

const CurationWrap = styled.div`
  position: relative;
  width: 1080px;
  margin: auto;
  text-align: left;
`;
const ContentsTitle = styled.h2`
  font-size: 40px;
  font-weight: 500;
  color: #ffffff;
`;

const CardWrap = styled.div`
  position: relative;
  width: 1100px;
  height: 720px;
  margin: 0 auto;
`;

const CardMain = styled.div`
  position: relative;
  display: flex;
`;

const CardMainImg = styled.div`
  width: 400px;
  margin-right: 60px;

  img {
    width: 400px;
    height: 540px;
    border-radius: 12px;
    object-fit: cover;
    filter: drop-shadow(4px 1px 8px rgba(0, 0, 0, 0.5));
  }

  button {
    width: 100%;
    margin-top: 30px;
    border-radius: 8px;
    padding: 24px;
    border: none;
    background-color: ${props => props.theme.colors.primary.main};
    font-size: 20px;
    color: #ffffff;
    cursor: pointer;
  }
`;

const CardMainText = styled.div`
  width: 640px;
  color: #ffffff;

  h3 {
    margin-bottom: 40px;
    font-size: 32px;
    font-weight: 500;
  }

  h5 {
    margin-top: 0px;
    margin-bottom: -20px;
    font-size: 20px;
    font-weight: 400;
    color: #cccccc;
  }

  p {
    font-size: 18px;
    font-weight: 400;
    color: #aaaaaa;
    white-space: pre-wrap;
  }
`;

const Tag = styled.div`
  position: absolute;
  top: -10px;
  left: -10px;
  width: 110px;
  height: 120px;
  padding: 12px;
  border-radius: 0 0 50px 50px;
  background-color: ${props => props.theme.colors.primary.light};
  text-align: left;
  font-size: 18px;
  font-weight: 700;
  line-height: 1;
  color: #ffffff;
`;

const CardSub = styled.ul`
  position: absolute;
  display: flex;
  right: 0;
  bottom: 0;

  li {
    width: 200px;
    margin-left: 20px;
    list-style: none;

    img {
      width: 200px;
      height: 270px;
      border-radius: 12px;
      object-fit: cover;
      filter: drop-shadow(4px 1px 8px rgba(0, 0, 0, 0.5));
    }
  }
`;
