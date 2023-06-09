import { forwardRef, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { theme } from './../config';
import { Icon } from '../utils/Icon.js';

// A styled container to display a pop up.
// Displays its content in a fixed manner on top of the viewport.
const Container = styled.div`
  position: fixed;
  inset: ${theme.spacing.none};
  padding: ${theme.spacing.medium};
  margin: auto;
  max-width: ${theme.size.extraLarge};
  height: fit-content;
  width: 75vw;
`;

// The close button of the card item.
const CloseButton = styled.img`
  height: 2rem;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  cursor: pointer;
`;

export const PopUpContainer = forwardRef(({ children, ...props }, ref) => {
  useEffect(() => {
    // Prevent scrolling when the pop up is open.
    const scrollHeight = window?.scrollY;
    console.log(scrollHeight);
    document.body.style.top = `-${scrollHeight}px`;
    document.body.style.position = 'fixed';

    return () => {
      document.body.style.top = '0px';
      document.body.style.position = '';
      window.scrollTo(0, scrollHeight);
    };
  }, [children]);

  return (
    <Container ref={ref} {...props}>
      <CloseButton src={Icon['close']} alt='close' />
      {children}
    </Container>
  );
});

PopUpContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
