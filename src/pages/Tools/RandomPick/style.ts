import styled from 'styled-components';

import { flexCustom } from '@Styles/common';
import theme from '@Styles/theme';

type RandomResultLayoutProps = {
  backgroundImage?: string;
  media: string;
};

export const Layout = styled.div`
  ${flexCustom('column', 'center', 'center')}
  width: 100%;
  height: 100%;
`;

export const RandomResult = styled.div<RandomResultLayoutProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 96%;
  aspect-ratio: 5/3;
  margin: auto;
  border-radius: 10px;
`;

export const ChoosedComponentsContainer = styled.div`
  ${flexCustom('row', 'center', 'flex-start')}
  width: 100%;
  max-width: 720px;
  border: 3px solid ${theme.color.primary};
  border-radius: 3px;
  margin: 20px 0 20px 0;
  padding: 16px;
`;

type ResultWrapperProps = {
  color: string;
};

export const ResultWrapper = styled.div<ResultWrapperProps>`
  color: ${(props) => props.theme.text};
  font-weight: bold;
  font-size: 3.6rem;
  text-align: center;
`;

export const ResultSpan = styled.span`
  display: inline-block;
  text-align: center;
  font-size: 3rem;
  max-width: 840px;
  word-break: break-all;
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
  right: 0;
  left: 0;
  bottom: 0;
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
