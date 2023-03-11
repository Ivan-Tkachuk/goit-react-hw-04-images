import { ButtonLoadMore } from './Button.styled';

const Button = ({ text, onClick }) => {
  return (
    <ButtonLoadMore type="button" onClick={onClick}>
      {text}
    </ButtonLoadMore>
  );
};

export default Button;
