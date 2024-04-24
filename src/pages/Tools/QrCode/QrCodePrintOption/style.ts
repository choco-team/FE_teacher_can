import styled from 'styled-components';

// import theme from '@Styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  width: 100%;
  gap: 20px;
`;

export const Preview = styled.div`
  /* transform: scale(0.3); */
  transform-origin: top center;
  padding: 10px;
  overflow: hidden;
  display: block;
  width: 210px;
  height: 297px;
  margin: 0 auto;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const OptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
  gap: 20px;
`;

export const NameSpan = styled.span`
  margin: 5px;
  border-radius: 2px;
  min-height: 24px;
  min-width: 96px;
  padding: 8px;
  color: black;
  align-self: flex-start;
`;

export const SizeSelectContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const NumberSelectContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const NumberContainer = styled.div`
  display: flex;
  /* align-items: center; */
  border: solid 1px #ccc;
  border-radius: 2px;
`;

export const NumberInput = styled.input`
  width: 60px;
  text-align: center;
`;

export const NumberUpdownButton = styled.div`
  width: 20px;
  height: 20px;
  cursor: pointer;
  user-select: none;
  text-align: center;
  color: #f48d8d;
`;

export const SizeSelectButton = styled.div<{ isSelected: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const ListSpan = styled.span`
  margin: 5px;
  border-radius: 2px;
  min-height: 24px;
  min-width: 96px;
  padding: 8px;
  color: 'black';
`;
export const SmallButtonWrapper = styled.div`
  display: flex;
  padding: 0;
  align-items: flex-end;
  justify-content: flex-end;
  button {
    margin-right: 5px;
  }
`;
