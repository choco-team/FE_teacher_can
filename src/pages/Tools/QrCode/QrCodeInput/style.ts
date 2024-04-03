import styled from 'styled-components';

// import Button from '@Components/Button';
// import theme from '@Styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin-top: 30px; */
  padding: 10px;
  width: 100%;
`;

export const InputContainer = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  width: 100%;
  justify-content: center;
`;

export const Input = styled.input`
  width: 60%;
  margin: 20px;
  padding: 10px;
  font-size: 16px;
  text-align: center;
  border: none;
  outline: none;
  background: transparent;
  border-bottom: 2px solid #f48d8d;
  transition: background-size 0.3s;

  &::placeholder {
    color: #ccc;
  }

  &:focus {
    border: 2px solid #f48d8d;
    border-radius: 5px;
  }
`;

export const ClearButton = styled.div`
  padding: 10px 20px;
  height: 35px;
  width: fit-content;
  text-align: center;
  font-size: 14px;
  background-color: #f48d8d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #ff6f61;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px;
  gap: 20px;
`;

export const Button = styled.div`
  padding: 10px;
  font-size: 14px;
  background-color: #f48d8d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #ff6f61;
  }
`;

export const StorageButton = styled.div`
  padding: 10px 20px;
  font-size: 14px;
  background-color: #f48d8d;
  color: white;
  border: none;
  border-radius: 5px;
  margin-left: auto;
  display: flex;
  cursor: pointer;

  &:hover {
    background-color: #ff6f61;
  }
`;

export const ModalContent = styled.div`
  background-color: white;
  max-width: 100%;
  max-height: 100%;
  padding: 20px;
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  overflow-y: auto;

  img {
    max-width: 100%;
    max-height: 100%;
    margin-bottom: 20px;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const CloseButton = styled.button`
  background-color: #f48d8d;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 10px;

  &:hover {
    background-color: #ff6f61;
  }
`;
