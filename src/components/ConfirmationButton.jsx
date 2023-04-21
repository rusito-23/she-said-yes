import { content } from './../config';
import { Card } from './Card/Card.jsx';

/**
 * Confirmation Button component.
 * A button that people needs to tap to confirm they're coming.
 */
export const ConfirmationButton = () => (
  <Card {...content.confirmation_button} />
);
