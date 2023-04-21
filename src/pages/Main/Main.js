import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background: ${props => props.theme.colors.themeRed};
  border-radius: 5px;
  outline: 0;
  border: 0;
  padding: 12px 24px;
  font-size: 16px;
  color: #ffffff;
  cursor: pointer;

  &:hover {
    background: black;
  }
`;

function Main() {
  return <Button>Click Me</Button>;
}

export default Main;
