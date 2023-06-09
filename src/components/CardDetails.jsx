import { forwardRef, useState } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from './../config';
import { Backdrop } from './Backdrop';
import { CardHeader } from './Card';
import { PopUpContainer } from './PopUpContainer';
import { Arrow } from './Arrow';
import { Button } from './Button';
import { Icon } from '../utils/Icon.js';

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
`;

const CardHeaderWrapper = styled(CardHeader)`
  img {
    height: 4rem;
  }

  h2 {
    font-size: ${theme.font_size.medium};
  }
`;

const MotionDiv = styled(motion.div).attrs({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { delay: 0.2 },
})``;

const Description = styled(MotionDiv)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  text-align: center;
  line-height: 150%;
  font-family: ${({ theme }) => theme.font.fancy};
  font-size: ${({ theme }) => theme.font_size.small};
  position: relative;
  border-radius: 0.4em;
  background-color: white;
  margin: 0;
  color: ${({ theme }) => theme.color.secondary};

  @media (min-width: 768px) {
    margin: 0 1rem;
  }

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 89%;
    width: 0;
    height: 0;
    border: 20px solid transparent;
    border-top-color: white;
    border-bottom: 0;
    border-right: 0;
    margin-left: -10px;
    margin-bottom: -20px;
  }
`;

const ArrowWrapper = styled(Arrow)`
  margin-top: 0.55rem;
  flex-shrink: 0;
`;

const LinkContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.35rem;
  padding-right: 1.25rem;

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.color.primary.main};
  }

  &:hover {
    color: ${({ theme }) => theme.color.primary.dark};

    path {
      fill: ${({ theme }) => theme.color.primary.dark};
    }

    a {
      color: ${({ theme }) => theme.color.primary.dark};
    }
  }
`;

const ImageContainer = styled(MotionDiv)`
  height: ${({ theme }) => theme.size.medium};
  display: flex;
  align-self: flex-end;
  margin-top: 0.5rem;
  margin-right: 0.25rem;

  @media (min-width: 768px) {
    margin-right: 1.75rem;
  }
`;

const CopyContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  padding-right: 1.25rem;
  color: ${({ theme }) => theme.color.primary.main};

  &:hover {
    color: ${({ theme }) => theme.color.primary.dark};

    button {
      background-color: ${({ theme }) => theme.color.primary.dark};
    }
  }
`;

/**
 * Card Details Component.
 * Displays `all` information of an info card.
 * Meant to be displayed when a card is selected from the grid.
 */
export const CardDetails = forwardRef(
  (
    {
      icon,
      name,
      title,
      description,
      link,
      copyButton,
      conditionalIframe,
      onClick,
      onOpenForm,
      ...props
    },
    ref
  ) => {
    // state for the copy button
    const [copiedText, setCopiedText] = useState(false);

    return (
      <>
        <Backdrop onClick={onClick} />
        <Container ref={ref} onClick={onClick} {...props}>
          <CardHeaderWrapper
            icon={icon}
            name={name}
            title={title}
            style={{ transform: 'scale(1.5)', marginBottom: '1rem' }}
          />
          <Description>
            {description}
            {link && (
              <LinkContainer>
                <ArrowWrapper size={14} color={theme.color.primary.main} />
                <a href={link.href} target='_blank' rel='noreferrer'>
                  {link.text}
                </a>
              </LinkContainer>
            )}
            {copyButton && (
              <CopyContent
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigator.clipboard.writeText(copyButton.textToCopy);
                  setCopiedText(true);
                }}
              >
                {copyButton.description}
                <Button>{!copiedText ? copyButton.label : 'Copiado!'}</Button>
              </CopyContent>
            )}
            {conditionalIframe && (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onOpenForm(conditionalIframe.src);
                }}
              >
                {conditionalIframe.buttonLabel}
              </Button>
            )}
          </Description>
          <ImageContainer>
            <img src={Icon['personitas']} alt={name} />
          </ImageContainer>
        </Container>
      </>
    );
  }
);

CardDetails.propTypes = {
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  link: PropTypes.shape({
    href: PropTypes.string,
    text: PropTypes.string,
  }),
  copyButton: PropTypes.shape({
    description: PropTypes.string,
    label: PropTypes.string,
    textToCopy: PropTypes.string,
  }),
  conditionalIframe: PropTypes.shape({
    src: PropTypes.string,
    buttonLabel: PropTypes.string,
  }),
  onClick: PropTypes.func,
  onOpenForm: PropTypes.func,
};

CardDetails.defaultProps = {
  description: '',
  link: null,
  copyButton: null,
  conditionalIframe: null,
  onClick: () => {},
  onOpenForm: () => {},
};
