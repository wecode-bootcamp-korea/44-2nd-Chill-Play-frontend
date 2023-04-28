import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { ChevronRight } from 'react-feather';

function ButtonOptions({
  handleOptionClick,
  options,
  link,
  handleCursorLeave,
}) {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  const handleButtonClick = (value, pageId = null) => {
    if (link) {
      handleCursorLeave();
      navigate(`/productdetail/${pageId}`);
      return;
    }
    handleOptionClick(value);
  };

  if (loading === false) {
    return (
      <ButtonOptionComponent>
        {options?.map((option, i) => (
          <OptionButton
            key={i}
            onClick={() => handleButtonClick(option.value, option.pageId)}
            primary={option.isPrimary === true ? true : false}
            isLink={link === true ? true : false}
          >
            {option.text}
            {link === true && (
              <span>
                <ChevronRight color="white" size={16} />
              </span>
            )}
          </OptionButton>
        ))}
        {link === true && (
          <LinkMessage>
            클릭하면 해당 뮤지컬의 상세 페이지로 이동합니다
          </LinkMessage>
        )}
      </ButtonOptionComponent>
    );
  }
}

export default ButtonOptions;

const ButtonOptionComponent = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 12px;
  flex-wrap: wrap;
  gap: 10px;
`;

const OptionButton = styled.button`
  display: flex;
  align-items: center;
  border: 0;
  outline: 0;
  border-radius: 15px;
  padding: 8px 12px;
  transition: 0.2s;
  flex-shrink: 0;
  cursor: pointer;
  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.primary.light};
    transform: scale(1.05);
  }
  ${({ primary }) =>
    primary === true
      ? css`
          background: ${({ theme }) => theme.colors.primary.light};
          font-weight: 600;
          color: #fff;

          &:hover {
            background: ${({ theme }) => theme.colors.primary.main};
          }
        `
      : css`
          border: 1px solid #e8e8e8;
          font-weight: 600;
          background-color: #fff;
          color: 2px solid ${({ theme }) => theme.colors.primary.light};
        `}

  ${({ isLink }) =>
    isLink === true &&
    css`
      background: ${({ theme }) => theme.colors.primary.light};
      font-weight: 600;
      color: #fff;
      padding: 8px 8px 8px 12px;

      span {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 4px;
        width: 20px;
        height: 20px;
        background: rgba(255, 255, 255, 0.25);
        border-radius: 7px;
      }

      &:hover {
        background: ${({ theme }) => theme.colors.primary.main};
      }
    `}
`;

const LinkMessage = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  font-size: 10px;
  opacity: 0.5;
`;
