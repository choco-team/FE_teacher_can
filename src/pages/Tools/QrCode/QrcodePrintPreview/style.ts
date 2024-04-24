import styled from 'styled-components';

interface GridContainer {
  selectedSize: string;
}

interface GridItem {
  selectedSize: string;
}

interface GridItemProps {
  selectedSize: string;
}

export const GridContainer = styled.div<{ selectedSize: string }>`
  display: grid;
  grid-template-columns: repeat(
    ${(props) =>
      props.selectedSize === '소(5X8)'
        ? 5
        : props.selectedSize === '중(2X4)'
          ? 2
          : 1},
    1fr
  );
  grid-gap: 10px;
  background: white;
  padding: 10px;
  width: 100%;
  aspect-ratio: 210 / 297;
  justify-content: center;
  align-items: center;
  place-items: center;
`;

export const GridItem = styled.div<GridItemProps>`
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  aspect-ratio: 1;
  overflow: auto;
  height: ${(props) =>
    props.selectedSize === '소(5X8)'
      ? '25px'
      : props.selectedSize === '중(2X4)'
        ? '60px'
        : '150px'};
  margin: ${(props) => (props.selectedSize === '대(1X1)' ? '50px' : '0px')};
`;
