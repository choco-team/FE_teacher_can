import styled from 'styled-components';

interface GridContainerProps {
  selectedSize: string;
}

interface GridItemProps {
  selectedSize: string;
}

export const GridItem = styled.div<GridItemProps>`
  border: 1px solid #ccc;
  text-align: center;
  width: ${({ selectedSize }) => {
    switch (selectedSize) {
      case '5*8':
        return '100%';
      case '4*4':
        return 'calc(98% + 8px)';
      case '2*2':
        return 'calc(98% + 9px)';
      case '1*1':
        return 'calc(98% + 10px)';
      default:
        return '100%';
    }
  }};
  height: auto;
  padding: ${({ selectedSize }) => (selectedSize === '1*1' ? '20px' : '10px')};
  box-sizing: border-box;
`;

export const GridContainer = styled.div<GridContainerProps>`
  display: grid;
  border: 1px solid #ccc;
  gap: 10px;
  padding: 10px;
  align-items: center;
  width: 794px;
  height: 1123px;
  margin: 0 auto;
  page-break-after: always;

  grid-template-columns: ${({ selectedSize }) => {
    switch (selectedSize) {
      case '5*8':
        return 'repeat(5, minmax(0, 1fr))';
      case '4*4':
        return 'repeat(4, minmax(0, 1fr))';
      case '2*2':
        return 'repeat(2, minmax(0, 1fr))';
      case '1*1':
        return '1fr';
      default:
        return 'repeat(5, minmax(0, 1fr))';
    }
  }};

  grid-template-rows: ${({ selectedSize }) => {
    switch (selectedSize) {
      case '5*8':
        return 'repeat(8, auto)';
      case '4*4':
        return 'repeat(4, auto)';
      case '2*2':
        return 'repeat(2, auto)';
      case '1*1':
        return 'auto';
      default:
        return 'repeat(8, auto)';
    }
  }};

  @media print {
    border: none;
    page-break-inside: avoid;
    break-inside: avoid;
    margin: 0 20px;
    padding: 0;
    width: auto;

    grid-template-columns: ${({ selectedSize }) => {
      switch (selectedSize) {
        case '5*8':
          return 'repeat(5, minmax(0, 1fr))';
        case '4*4':
          return 'repeat(4, minmax(0, 1fr))';
        case '2*2':
          return 'repeat(2, minmax(0, 1fr))';
        case '1*1':
          return '1fr';
        default:
          return 'repeat(5, minmax(0, 1fr))';
      }
    }};
    grid-template-rows: ${({ selectedSize }) => {
      switch (selectedSize) {
        case '5*8':
          return 'repeat(8, auto)';
        case '4*4':
          return 'repeat(4, auto)';
        case '2*2':
          return 'repeat(2, auto)';
        case '1*1':
          return 'auto';
        default:
          return 'repeat(8, auto)';
      }
    }};
  }
`;
