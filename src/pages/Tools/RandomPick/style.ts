import styled from 'styled-components';

import { flexCustom } from '@Styles/common';

export const Layout = styled.div`
  ${flexCustom('column', 'center', 'center')}
  width: 90%;
  height: 90%;
  border: 6.4px solid #f48d8d;
  border-radius: 4px;
  margin-left: 32px;
  position: relative;
`;

export const RandomResult = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 96%;
  aspect-ratio: 5/3;
  margin: auto;
  /* border-radius: 10px; */
`;

type ResultWrapperProps = {
  color: string;
};

export const ResultWrapper = styled.div<ResultWrapperProps>`
  max-width: 80%;
  color: ${(props) => props.theme.text};
  font-weight: bold;
  font-size: 3.6rem;
  text-align: center;
`;

export const ResultSpan = styled.span`
  display: inline-block;
  text-align: center;
  font-size: 3rem;
  /* max-width: 80%; */
  overflow-wrap: break-word;
  margin: 4px;
`;

export const CheckParagraph = styled.p`
  margin-top: 8px;
  text-align: center;
  max-width: 840px;
  font-size: 3rem;
  word-break: keep-all;
`;

export const ButtonWrapper = styled.div`
  position: absolute;
  right: 4px;
  bottom: 4px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 10px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
`;

// 이미지 로고
export const LogoImage_2 = styled.img`
  position: fixed;
  bottom: 440px;
  left: 280px;
  width: 72px;
  height: auto;
  transform: rotate(-30deg);
`;

export const LogoImage = styled.img`
  position: fixed;
  bottom: 360px;
  right: 90px;
  width: 72px;
  height: auto;
  transform: rotate(30deg);
`;
