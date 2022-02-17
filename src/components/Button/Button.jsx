import PropTypes from 'prop-types';
import { ButtonLoad, ButtonContainer } from './Button.styled';

export default function Button({ onClick }) {
  return (
    <ButtonContainer>
      <ButtonLoad type="button" onClick={() => onClick()}>
        Load more
      </ButtonLoad>
    </ButtonContainer>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
