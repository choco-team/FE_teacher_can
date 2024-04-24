/* eslint-disable react/display-name */
import React, { forwardRef, useEffect, useState } from 'react';

import * as S from './style';

interface GridContainerProps {
  selectedSize: string;
}

const QrcodePrintPreview = forwardRef<HTMLDivElement, GridContainerProps>(
  ({ selectedSize }, ref) => {
    const [items, setItems] = useState<number[]>([]);

    useEffect(() => {
      const rows = 8;
      const cols = 5;
      const numItems = rows * cols;
      setItems(Array.from({ length: numItems }, (_, index) => index));
    }, [selectedSize]);

    return (
      <div ref={ref}>
        <S.GridContainer selectedSize={selectedSize}>
          {items.map((index) => (
            <S.GridItem key={index} selectedSize={selectedSize} />
          ))}
        </S.GridContainer>
      </div>
    );
  },
);

export default QrcodePrintPreview;
