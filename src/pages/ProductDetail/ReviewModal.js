import React, { useRef } from 'react';
import styled from 'styled-components';
import { X, Image } from 'react-feather';
import { AiFillStar } from 'react-icons/ai';

function ReviewModal({
  modalOpen,
  closeModal,
  submitData,
  image,
  reply,
  score,
  setImage,
  setReply,
  setScore,
}) {
  const starArray = [0, 1, 2, 3, 4];
  const imageRef = useRef(null);

  function uploadImage() {
    if (!imageRef.current) return;
    imageRef.current.click();
  }

  function handleImage({ target: { files } }) {
    setImage(files[0]);
  }

  function handleReply(e) {
    setReply(e.target.value);
  }

  function handleScore(index) {
    let clickStates = [...score];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setScore(clickStates);
  }

  return (
    <Modal>
      {modalOpen === true && (
        <ModalView>
          <ModalDim onClick={closeModal} />
          <ModalWrap>
            <TitleWrap>
              <strong>포토 리뷰 작성</strong>
              <X size={28} onClick={closeModal} />
            </TitleWrap>
            <UploadContents>
              <ImageUpload onClick={uploadImage}>
                {image ? (
                  <img src={URL.createObjectURL(image)} alt="업로드 이미지" />
                ) : (
                  <ImageInput>
                    <div>
                      <Image className="imgIcon" size={60} />
                      <p>이미지를 선택해 주세요!</p>
                    </div>
                  </ImageInput>
                )}
                <input
                  ref={imageRef}
                  type="file"
                  hidden
                  accept="image/jpg, image/jpeg, image/png, image/gif"
                  onChange={handleImage}
                />
              </ImageUpload>
              <TextUpload>
                <Score>
                  <p>보신 뮤지컬 만족하셨나요?</p>
                  {starArray.map(star => (
                    <AiFillStar
                      key={star}
                      onClick={() => handleScore(star)}
                      size={48}
                      className={score[star] && 'yellow'}
                    />
                  ))}
                </Score>
                <Reply>
                  <p>코멘트를 남겨주세요!</p>
                  <textarea
                    placeholder="내용을 작성해 주세요!"
                    onChange={handleReply}
                    value={reply}
                  />
                </Reply>
              </TextUpload>
            </UploadContents>
            <ButtonWrap>
              <button onClick={submitData}>리뷰 남기기</button>
            </ButtonWrap>
          </ModalWrap>
        </ModalView>
      )}
    </Modal>
  );
}

export default ReviewModal;

const Modal = styled.div``;

const ModalView = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 99999;
`;

const ModalDim = styled.div`
  width: 100%;
  height: 100%;
  background-color: #000000;
  opacity: 60%;
`;

const ModalWrap = styled.div`
  position: absolute;
  width: 720px;
  height: 630px;
  border-radius: 12px;
  padding: 30px;
  background-color: #ffffff;
  overflow-y: scroll;

  p {
    font-size: 16px;
  }
`;

const TitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  strong {
    font-size: 24px;
  }
`;

const UploadContents = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const ImageUpload = styled.div`
  margin-right: 20px;
  border-radius: 8px;
  background-color: #eeeeee;
  color: #999999;
  cursor: pointer;

  img {
    width: 280px;
    height: 420px;
    border-radius: 8px;
    object-fit: contain;
  }
`;

const ImageInput = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 280px;
  height: 420px;

  div {
    text-align: center;
    .imgIcon {
      color: #cccccc;
    }

    p {
      font-size: 16px;
    }
  }
`;

const TextUpload = styled.div`
  width: 100%;
  height: 420px;

  p {
    margin-top: 2px;
    margin-bottom: 20px;
    font-size: 18px;
  }
`;

const Score = styled.div`
  position: relative;
  color: #cccccc;

  p {
    color: #333333;
  }

  .yellow {
    color: #ffd134;
  }
`;

const Reply = styled.div`
  margin-top: 70px;

  textarea {
    width: 100%;
    height: 200px;
    padding: 16px;
    border: 1px solid #333333;
    border-radius: 8px;
    font-size: 16px;
    color: #333333;
    resize: vertical;

    &::placeholder {
      font-size: 16px;
      color: #999999;
    }
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;

  button {
    width: 180px;
    border: none;
    border-radius: 8px;
    padding: 16px 24px;
    background-color: ${props => props.theme.colors.primary.main};
    font-size: 16px;
    color: #ffffff;
    cursor: pointer;
  }
`;
