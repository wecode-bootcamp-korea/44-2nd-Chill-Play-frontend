import { useRef, useEffect, useCallback } from 'react';

const useScrollFadeIn = (direction = 'up', duration = 0.5, delay = 0) => {
  const dom = useRef();

  const handleDirection = name => {
    const transition = {
      up: 'translate3d(0, 30%, 0)',
      down: 'translate3d(0, -30%, 0)',
      left: 'translate3d(30%, 0, 0)',
      right: 'translate3d(-30%, 0, 0)',
    };
    return transition[name];
  };

  const handleScroll = useCallback(
    ([entry]) => {
      const { current } = dom;
      if (entry.isIntersecting) {
        current.style.transitionProperty = 'all';
        current.style.transitionDuration = `${duration}s`;
        current.style.transitionTimingFunction = 'cubic-bezier(0, 0, 0.5, 1)';
        current.style.transitionDelay = `${delay}s`;
        current.style.opacity = 1;
        current.style.transform = 'translate3d(0,0,0)';
      }
    },
    [delay, duration]
  );

  useEffect(() => {
    let observer;
    const { current } = dom;

    if (current) {
      observer = new IntersectionObserver(handleScroll, { threshold: 0.1 });
      observer.observe(current);
    }

    return () => observer && observer.disconnect();
  }, [handleScroll]);

  return {
    ref: dom,
    style: {
      opacity: 0,
      transform: handleDirection(direction),
    },
  };
};

export default useScrollFadeIn;
