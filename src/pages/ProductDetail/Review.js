import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AiFillStar, AiOutlineDown } from 'react-icons/ai';
import { Edit3, Trash2 } from 'react-feather';
import ReviewModal from './ReviewModal';
import { API } from '../../config';

function Review({ musicalId }) {
  const offset = 0;
  const [limit, setLimit] = useState(3);
  const moreViewQueryString = `&offset=${offset}&limit=${limit}`;
  const [modalOpen, setModalOpen] = useState(false);
  const [reviewData, setReviewData] = useState([]);
  const [image, setImage] = useState(null);
  const [reply, setReply] = useState('');
  const [score, setScore] = useState([false, false, false, false, false]);

  function moreView() {
    return setLimit(limit + 3);
  }

  function showModal() {
    fetch(`${API.photoReview}/checkorder/${musicalId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: localStorage.getItem('TOKEN'),
      },
    }).then(res => {
      if (res.status === 200) {
        return setModalOpen(prev => !prev);
      } else {
        alert('예매 내역이 없어 리뷰를 쓸 수 없습니다!');
      }
    });
  }

  function closeModal() {
    setModalOpen(prev => !prev);
  }

  function handleDelete(reviewId) {
    fetch(`${API.photoReview}/remove/${reviewId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: localStorage.getItem('TOKEN'),
      },
    }).then(res => {
      if (res.status === 200) {
        fetchReviewData();
      } else {
        alert('삭제할 수 없어요!');
      }
    });
  }

  function submitData() {
    const formData = new FormData();
    const star = score.filter(Boolean).length;
    formData.append('content', reply);
    formData.append('score', star);
    formData.append('musicalId', '1');
    formData.append('image', image);
    setImage(null);
    setReply('');
    setScore([false, false, false, false, false]);

    fetch(`${API.photoReview}/new`, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        authorization: localStorage.getItem('TOKEN'),
      },
      body: formData,
    }).then(response => {
      if (response.status === 201) {
        setModalOpen(prev => !prev);
        fetchReviewData();
      } else {
        return alert('이미지 필수로 넣어주세요!');
      }
    });
  }

  useEffect(() => {
    musicalId && fetchReviewData();
  }, [moreViewQueryString, musicalId]);

  function fetchReviewData() {
    fetch(`${API.photoReview}/?musicalId=${musicalId}${moreViewQueryString}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then(response => response.json())
      .then(result => {
        setReviewData(result[0]);
      });
  }

  return (
    <>
      <ReviewModal
        modalOpen={modalOpen}
        closeModal={closeModal}
        submitData={submitData}
        image={image}
        reply={reply}
        score={score}
        setImage={setImage}
        setReply={setReply}
        setScore={setScore}
      />
      <PhotoReviewWrap>
        <TitleWrap>
          <strong>포토 리뷰</strong>
          <div>
            <AveragePoint>
              <p>관람객 평점</p>
              <div>
                <AiFillStar size={24} color=" #ffd134" />
              </div>
              <span>
                <strong>{reviewData.averagePoint} </strong>/ 5
              </span>
            </AveragePoint>
            <UploadButton onClick={showModal}>
              <UploadIcon>
                <Edit3 size={16} />
              </UploadIcon>
              내 포토리뷰 작성
            </UploadButton>
          </div>
        </TitleWrap>
        {reviewData?.reviews?.length > 0 ? (
          <PhotoCardWrap>
            {reviewData?.reviews?.map(
              ({
                reviewId,
                content,
                profileNickname,
                reviewImages,
                score,
                timeAgo,
              }) => (
                <PhotoCardUnit key={reviewId}>
                  <img src={reviewImages && reviewImages[0]} alt="사진리뷰" />
                  <Content>
                    <ContentInfo>
                      <strong>{profileNickname}</strong>
                      <div>
                        <p>{timeAgo}</p>
                        <Trash2
                          style={{
                            flexShrink: 0,
                          }}
                          size={16}
                          color="#666666"
                          onClick={() => {
                            handleDelete(reviewId);
                          }}
                        />
                      </div>
                    </ContentInfo>
                    <ContentText>{content}</ContentText>
                    <Score>
                      <AiFillStar
                        style={{
                          flexShrink: 0,
                        }}
                        size={20}
                        color=" #ffd134"
                      />
                      <span>{score}</span>
                    </Score>
                  </Content>
                </PhotoCardUnit>
              )
            )}
          </PhotoCardWrap>
        ) : (
          <NoReview>
            <p>포스트된 리뷰가 없어요.</p>
          </NoReview>
        )}
      </PhotoReviewWrap>
      <MoreButtonWrap onClick={moreView}>
        <MoreButton>
          <p>리뷰 더보기</p> <AiOutlineDown size={12} />
        </MoreButton>
      </MoreButtonWrap>
    </>
  );
}

export default Review;

const PhotoReviewWrap = styled.div`
  position: relative;
  margin-bottom: 100px;
`;

const TitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  strong {
    font-size: 24px;
    align-items: center;
  }

  div {
    display: flex;
    align-items: center;
  }
`;

const AveragePoint = styled.div`
  display: flex;
  margin-right: 30px;

  div {
    margin-left: 12px;
    margin-right: 6px;
  }

  p {
    font-size: 16px;
    color: #333333;
  }

  span {
    font-size: 18px;
    font-weight: 400;
    color: #666666;

    strong {
      font-size: 24px;
      color: #212124;
    }
  }
`;

const UploadButton = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #6200ee;
  border-radius: 4px;
  padding: 8px 12px;
  background-color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  color: #6200ee;
  cursor: pointer;
`;

const UploadIcon = styled.div`
  margin-right: 6px;
`;

const PhotoCardWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 22px;
  margin-top: 20px;
  text-align: center;

  p {
    width: 100%;
    font-size: 28px;
    font-weight: 400;
    line-height: 300px;
    color: #aaaaaa;
  }
`;

const NoReview = styled.p`
  width: 100%;
  height: 400px;
  align-items: center;
  text-align: center;
  line-height: 400px;
`;

const PhotoCardUnit = styled.div`
  height: 100%;
  width: 310px;
  border: 1px solid #eeeeee;
  background-color: #f8f8f8;
  flex-shrink: 0;

  img {
    display: block;
    width: 100%;
    height: 310px;
    background-color: #f8f8f8;
    object-fit: cover;
  }
`;

const Content = styled.div`
  padding: 20px;
  font-size: 16px;
`;

const ContentInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;

  div {
    display: flex;
    justify-content: right;
    align-items: start;

    p {
      font-size: 16px;
      margin-top: 0;
      margin-right: 20px;
      line-height: 20px;
    }
  }
`;

const ContentText = styled.div`
  text-align: left;
  height: 96px;
  padding-bottom: 10px;
  line-height: 24px;
  overflow-y: hidden;
`;

const Score = styled.div`
  display: flex;
  justify-content: left;
  align-items: start;

  span {
    margin-left: 6px;
    margin-right: 20px;
    margin-bottom: 0px;
    font-size: 16px;
    line-height: 20px;
  }
`;

const MoreButtonWrap = styled.button`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: -30px;
  border-style: none;
  background-color: transparent;
  font-size: 16px;
  color: #666666;
`;

const MoreButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 140px;
  height: 48px;
  border: 1px solid #eeeeee;
  border-radius: 8px;
  margin-bottom: 100px;
  cursor: pointer;

  p {
    margin-right: 6px;
  }
`;
