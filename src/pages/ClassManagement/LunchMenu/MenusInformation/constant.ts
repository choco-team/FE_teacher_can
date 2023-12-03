import { RuleSet, css } from 'styled-components';

import theme from '@Styles/theme';

import { ThemeName } from '@Types/style';

export const LUNCH_MENU_GUIDES = [
  '학생에 알러지가 있다면 식단표에서 확인할 수 있어요.',
  '알러지를 등록하지 않았다면 학생 정보에서 알러지를 등록해보세요.',
  '원산지 정보에서는 이번주 메뉴의 원산지 정보를 확인할 수 있어요.',
  '알러지 정보에서는 번호에 해당하는 알러지를 확인할 수 있어요.',
];

export const INFORMATION_CONTENTS_THEME: Record<ThemeName, RuleSet> = {
  light: css`
    color: ${theme.color.gray[500]};
    background-color: ${theme.color.gray[200]};
    li {
      &::marker {
        color: ${theme.color.gray[500]};
      }
    }
  `,

  dark: css`
    color: ${theme.color.gray[300]};
    background-color: ${theme.color.gray[700]};
    li {
      &::marker {
        color: ${theme.color.gray[300]};
      }
    }
  `,
};
