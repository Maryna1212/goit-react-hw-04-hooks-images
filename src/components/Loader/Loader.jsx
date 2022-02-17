import { BallTriangle } from 'react-loader-spinner';
import { LoaderContainer } from './Loader.styled';

export default function Loader() {
  return (
    <LoaderContainer>
      <BallTriangle
        color={'inherit'}
        height={100}
        width={100}
        textAlign="center"
      />
    </LoaderContainer>
  );
}
