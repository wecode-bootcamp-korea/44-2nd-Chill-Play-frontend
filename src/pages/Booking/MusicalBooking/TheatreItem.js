import React from 'react';
import styled, { css } from 'styled-components';
import { useBookingStore } from '../store/store';
import { shallow } from 'zustand/shallow';

function TheatreItem({ handleDynamicFetch, id, image, name, description }) {
  const [selectedTheatre, setSelectedTheatre, setSelectedTime] =
    useBookingStore(
      state => [
        state.bookingState.selectedTheatre,
        state.setTheatre,
        state.setTime,
      ],
      shallow
    );

  const updateTheatre = theatre => {
    const { id, name } = theatre;
    setSelectedTheatre({
      id: id,
      name: name,
    });
    setSelectedTime(null);
  };

  const handleTheatreClick = () => {
    handleDynamicFetch('theater', id);
    updateTheatre({
      id,
      name,
    });
  };

  return (
    <TheatreItemContainer
      isSelected={id === selectedTheatre?.id ? true : false}
      onClick={handleTheatreClick}
    >
      <TheatreItemThumb imageUrl={image} />
      <TheatreTextContent>
        <Header>{name}</Header>
        <Description>{description}</Description>
      </TheatreTextContent>
    </TheatreItemContainer>
  );
}

export default TheatreItem;

const TheatreItemContainer = styled.div`
  ${props =>
    props.isSelected === true &&
    css`
      background: ${({ theme }) => theme.colors.primary.main};
      color: #ffffff;
    `}
  transition: 0.3s;
  padding: 16px;
  cursor: pointer;
`;

const TheatreItemThumb = styled.div`
  ${props =>
    props.imageUrl &&
    css`
      background-image: url(${props.imageUrl});
    `}

  background-size: cover;
  height: 80px;
  border-radius: 5px;
`;

const TheatreTextContent = styled.div`
  margin-top: 12px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

const Description = styled.div`
  opacity: 0.8;
  margin-top: 6px;
  font-size: 12px;
  font-weight: lighter;
`;
