import { BsShieldExclamation } from 'react-icons/bs';
import styled from 'styled-components';

import theme from '@Styles/theme';

export const ModalContainer = styled.div`
  padding: 5px;
  // display: flex; /* Use flexbox */
  // align-items: center;

  display: grid;
  grid-template-columns: auto 1fr;

  // &:last-child {
  //   flex: 1;
  // }
`;

export const SmallButtonWrapper = styled.div`
  display: flex;
  padding: 0;
  margin-top: 24px;
  justify-content: right;
  button {
    margin-right: 5px;
  }
`;

export const SmallButton = styled.button<{ isOnClick?: boolean }>`
  display: flex;
  border-radius: 2px;
  margin-right: 8px;
`;

export const IconWrapper = styled.span`
  display: flex;
  margin-right: 2px;
  align-items: center;
`;

export const ListSpan = styled.span`
  margin: 5px;
  border-radius: 2px;
  min-height: 24px;
  min-width: 96px;
  padding: 8px;
  color: 'black';
`;

export const ListSelect = styled.select`
  border: 1px solid ${theme.color.gray[300]};
  border-radius: 4px;
  min-height: 32px;
  color: black;
  &:hover {
    border-color: ${({ theme }) => theme.hoverBorder.gray};
  }

  &:focus {
    border-color: ${({ theme }) => theme.accentText};
  }
  align-items: center;
  text-align: center;
  padding: 8px 12px;
`;

export const BigBsShield = styled(BsShieldExclamation)`
  width: 20px;
  height: 20px;
  margin: 4px;
  color: #cc0000;
`;

export const WarningSpan = styled.span`
  color: #cc0000;
`;
