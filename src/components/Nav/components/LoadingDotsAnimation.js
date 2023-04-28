import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

function LoadingDotAnimation() {
  return (
    <DotsContainer
      as={motion.div}
      variants={loadingContainerVariants}
      initial="start"
      animate="end"
    >
      <Dot
        as={motion.span}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
      <Dot
        as={motion.span}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
      <Dot
        as={motion.span}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
    </DotsContainer>
  );
}

export default LoadingDotAnimation;

const DotsContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0 16px 16px;
`;

const Dot = styled.div`
  width: 6px;
  height: 6px;
  margin: 3px;
  background: ${({ theme }) => theme.colors.black};
  opacity: 0.5;
  border-radius: 50%;
`;
const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const loadingCircleVariants = {
  start: {
    y: '0%',
  },
  end: {
    y: '100%',
  },
};
const loadingCircleTransition = {
  duration: 0.4,
  yoyo: Infinity,
  ease: 'easeInOut',
};
