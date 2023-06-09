import { useState, useEffect, forwardRef, useRef } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../config';
import { Backdrop } from './Backdrop';
import { PopUpContainer } from './PopUpContainer';
import { Spinner } from './Spinner';

// The card details container.
// Gets displayed in the center of the screen
// and its size depends on the type of screen.
const Container = styled(PopUpContainer)`
  display: flex;
  flex-direction: column;
  background-color: ${theme.color.primary.main};
  border-radius: ${theme.border_radius.small};
  align-items: center;
  justify-content: center;
  gap: 1rem;
  max-width: 34rem;
  height: auto;
  max-height: calc(100% - 96px);
  margin: 3rem auto;
  padding: 2.5rem 1rem 1.5rem;

  iframe {
    background-color: transparent;
    border: none;
    overflow-x: hidden;
  }
`;

const MotionDiv = styled(motion.div).attrs({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
})``;

/**
 * Confirmation Form Component.
 * Meant to be displayed when a Confirmation Button is clicked.
 */
export const Form = forwardRef(({ onClick, iframeSrc, ...props }, ref) => {
  const containerRef = useRef(ref);
  const [dimensions, setDimensions] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (containerRef?.current?.offsetHeight) {
      setDimensions({
        height: containerRef?.current?.offsetHeight - 64,
        width: containerRef?.current?.offsetWidth - 8,
      });
    }
    return () => {
      setIsLoading(true);
      setDimensions(null);
    };
  }, [containerRef]);

  return (
    <>
      <Backdrop onClick={onClick} />
      <Container ref={containerRef} onClick={onClick} {...props}>
        {dimensions && (
          <MotionDiv>
            <iframe
              src={iframeSrc}
              width={dimensions.width}
              height={dimensions.height}
              style={{
                frameBorder: '0',
                marginHeight: '0',
                marginWidth: '0',
              }}
              onLoad={() => setIsLoading(false)}
            >
              Cargando…
            </iframe>
          </MotionDiv>
        )}
        {isLoading && <Spinner />}
      </Container>
    </>
  );
});

Form.propTypes = {
  iframeSrc: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Form.defaultProps = {
  onClick: () => {},
};
