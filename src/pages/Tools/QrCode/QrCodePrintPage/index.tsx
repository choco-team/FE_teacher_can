import React, { forwardRef, useEffect, useState } from 'react';

import * as S from './style';

interface GridContainerProps {
  selectedSize: string;
  selectedNumber: number;
}

// eslint-disable-next-line react/display-name
const QrcodePrintPage = forwardRef<HTMLDivElement, GridContainerProps>(
  ({ selectedSize, selectedNumber }, ref) => {
    const [rows, setRows] = useState(0);
    const [cols, setCols] = useState(0);

    useEffect(() => {
      const calculatedCols =
        selectedSize === '5*8' ? 5 : selectedSize === '2*4' ? 2 : 1;
      setCols(calculatedCols);
      const fullRows = Math.floor(selectedNumber / calculatedCols);
      const hasPartialRow = selectedNumber % calculatedCols > 0;
      const totalRows = fullRows + (hasPartialRow ? 1 : 0);
      setRows(totalRows);
    }, [selectedSize, selectedNumber]);

    return (
      <div ref={ref}>
        <h1>
          {selectedNumber}
          {selectedSize}
        </h1>
        <S.GridContainer selectedSize={selectedSize}>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div key={rowIndex} style={{ display: 'flex' }}>
              {Array.from({ length: cols }).map((_, colIndex) => (
                <S.GridItem key={colIndex} selectedSize={selectedSize} />
              ))}
            </div>
          ))}
        </S.GridContainer>
      </div>
    );
  },
);

export default QrcodePrintPage;
