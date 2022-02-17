import styled from 'styled-components';

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1200;
`;

export const ModalContainerForImage = styled.div`
  max-width: calc(100vw - 96px);
  max-height: calc(100vh - 48px);
`;
