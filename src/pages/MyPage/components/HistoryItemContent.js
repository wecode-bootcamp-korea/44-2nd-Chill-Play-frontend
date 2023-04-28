import React from 'react';
import styled, { css } from 'styled-components';

function HistoryItemContent({ history }) {
  return (
    <ContentContainer>
      <MusicalThumb imageUrl={history.postImage} />
      <TextSection>
        <TextLine>
          <div>공연일시</div>
          <span>{history.musicalDate}</span>
        </TextLine>
        <TextLine>
          <div>장소</div>
          <span>{history.theatersName}</span>
        </TextLine>
        <TextLine>
          <div>관람인원</div>
          <span>{history.personnel}명</span>
        </TextLine>
        <TextLine>
          <div>좌석</div>
          <span>
            {history.seatInfo.map(seat => (
              <span key={seat}>{seat}</span>
            ))}
          </span>
        </TextLine>
      </TextSection>
    </ContentContainer>
  );
}

export default HistoryItemContent;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
`;

const MusicalThumb = styled.div`
  width: 80px;
  height: 120px;
  ${({ imageUrl }) =>
    imageUrl &&
    css`
      background-image: url(${imageUrl});
    `};
  background-size: cover;
  background-position: center center;
  border-radius: 5px;
  flex-shrink: 0;
`;

const TextSection = styled.div`
  width: 100%;
  margin-left: 20px;
`;

const TextLine = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  padding: 2px 0;
  font-size: 14px;

  div {
    width: 80px;
  }

  span {
    display: flex;
    align-items: center;
    font-weight: 400;
    opacity: 0.8;

    span {
      display: inline;
      padding-right: 4px;
    }
  }
`;
